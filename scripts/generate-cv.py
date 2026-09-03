"""Build the four CV variants from cv/content.json.

Install dependencies: python -m pip install -r cv/requirements.txt
Generate PDFs: python scripts/generate-cv.py
An optional --output-dir keeps layout previews outside the final output folder.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path
from xml.sax.saxutils import escape

import reportlab
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Flowable, PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
INK = colors.black
MUTED = colors.HexColor('#555555')
LINK = '#1155cc'
LINE = colors.HexColor('#888888')


def register_fonts():
    font_dir = Path(os.environ.get('CV_FONT_DIR', 'C:/Windows/Fonts'))
    if all((font_dir / name).is_file() for name in ['arial.ttf', 'arialbd.ttf', 'ariali.ttf', 'arialbi.ttf']):
        filenames = ['arial.ttf', 'arialbd.ttf', 'ariali.ttf', 'arialbi.ttf']
    else:
        font_dir = Path(reportlab.__file__).resolve().parent / 'fonts'
        filenames = ['Vera.ttf', 'VeraBd.ttf', 'VeraIt.ttf', 'VeraBI.ttf']
    for name, filename in zip(['CV', 'CVBold', 'CVItalic', 'CVBoldItalic'], filenames):
        pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
    pdfmetrics.registerFontFamily('CV', normal='CV', bold='CVBold', italic='CVItalic', boldItalic='CVBoldItalic')


class Rule(Flowable):
    def __init__(self):
        super().__init__()
        self.height = 3

    def draw(self):
        self.canv.setStrokeColor(LINE)
        self.canv.setLineWidth(0.6)
        self.canv.line(0, 1, self._availWidth, 1)

    def wrap(self, avail_width, avail_height):
        self._availWidth = avail_width
        return avail_width, self.height


MONTHS = {
    'es': ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
    'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}


def month_index(value):
    if not isinstance(value, str) or not re.fullmatch(r'\d{4}-(0[1-9]|1[0-2])', value):
        raise ValueError(f'Expected a YYYY-MM date, got {value!r}')
    year, month = map(int, value.split('-'))
    return year * 12 + month - 1


def format_month(value, locale):
    year, month = map(int, value.split('-'))
    return f'{MONTHS[locale][month - 1]} {year}'


def format_period(period, locale):
    end = format_month(period['end'], locale) if period['end'] else ('actualidad' if locale == 'es' else 'Present')
    return f'{format_month(period["start"], locale)} - {end}'


def validate_timelines(source):
    timelines = source['timelines']
    as_of = month_index(timelines['as_of'])
    for company in timelines['companies'].values():
        if company['kind'] == 'duration':
            if not isinstance(company['months'], int) or company['months'] < 1:
                raise ValueError('Project duration must be a positive number of months')
        elif company['kind'] == 'calendar':
            if not company['periods']:
                raise ValueError('A calendar timeline requires at least one period')
            period_ids = [period['id'] for period in company['periods']]
            if len(period_ids) != len(set(period_ids)):
                raise ValueError('Timeline period IDs must be unique within a company')
            for period in company['periods']:
                start = month_index(period['start'])
                end = month_index(period['end']) if period['end'] else as_of
                if not start <= end <= as_of:
                    raise ValueError(f'Invalid period relative to timeline snapshot: {period}')
        else:
            raise ValueError(f'Unknown timeline kind: {company["kind"]}')
    for translation in source['locales'].values():
        for variant in translation['variants'].values():
            for entry in variant['experience'] + variant['projects']:
                timeline = timelines['companies'][entry['timeline_id']]
                periods = {p['id'] for p in timeline.get('periods', [])}
                for phase in entry.get('phases', []):
                    timeline_period = phase.get('timeline_period')
                    if timeline_period and timeline_period not in periods:
                        raise ValueError('A project phase references a missing timeline period')
                    if 'context' in phase and not phase['context'].strip():
                        raise ValueError('A phase context must not be empty')


class VerticalTimeline(Flowable):
    """Connect headings vertically; indented milestones branch from the main rail."""

    def __init__(self, items):
        super().__init__()
        self.items = items
        self.text_x = 22
        self.dot_x = 5

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        self.placements = []
        self.nodes = []
        offset = 0
        for index, item in enumerate(self.items):
            if index:
                offset += 10
            indent = item.get('indent', 0)
            text_x = self.text_x + indent
            for row, paragraph in enumerate(item['content']):
                _, height = paragraph.wrap(avail_width - text_x, 10000)
                if row == 0:
                    # Center the marker on the visible first line of the heading.
                    self.nodes.append((offset + paragraph.style.fontSize * 0.58,
                                       self.dot_x + indent, item.get('radius', 3)))
                self.placements.append((paragraph, offset, height, text_x))
                offset += height + paragraph.getSpaceAfter()
        self.height = offset
        return avail_width, self.height

    def draw(self):
        canvas = self.canv
        canvas.saveState()
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.8)
        if len(self.nodes) > 1:
            canvas.line(self.dot_x, self.height - self.nodes[0][0],
                        self.dot_x, self.height - self.nodes[-1][0])
        canvas.setFillColor(INK)
        for offset, node_x, radius in self.nodes:
            node_y = self.height - offset
            if node_x > self.dot_x:
                canvas.line(self.dot_x, node_y, node_x, node_y)
            canvas.circle(node_x, node_y, radius, stroke=0, fill=1)
        for paragraph, offset, height, text_x in self.placements:
            paragraph.drawOn(canvas, text_x, self.height - offset - height)
        canvas.restoreState()


def build_pdf(source, locale, variant, output_dir):
    person = source['person']
    translation = source['locales'][locale]
    content = translation['variants'][variant]
    label = 'FullStack' if variant == 'fullstack' else 'Frontend'
    output_path = output_dir / f'TomasDiBacco_CV_{label}_{locale.upper()}.pdf'
    styles = {
        'name': ParagraphStyle('name', fontName='CVBold', fontSize=16, leading=20, textColor=INK,
                               alignment=TA_CENTER, spaceAfter=2),
        'headline': ParagraphStyle('headline', fontName='CV', fontSize=10.2, leading=14, textColor=INK,
                                   alignment=TA_CENTER, spaceAfter=4),
        'contact': ParagraphStyle('contact', fontName='CV', fontSize=9.4, leading=13, textColor=INK,
                                  alignment=TA_CENTER),
        'links': ParagraphStyle('links', fontName='CV', fontSize=8.8, leading=12, textColor=INK,
                                alignment=TA_CENTER),
        'body': ParagraphStyle('body', fontName='CV', fontSize=11, leading=15, textColor=INK, alignment=TA_LEFT),
        'section': ParagraphStyle('section', fontName='CVBold', fontSize=11.5, leading=15, textColor=INK,
                                  spaceAfter=10, keepWithNext=True),
        'entry': ParagraphStyle('entry', fontName='CVBold', fontSize=11, leading=15, textColor=INK,
                                spaceBefore=8, spaceAfter=1, keepWithNext=True),
        'company': ParagraphStyle('company', fontName='CVBold', fontSize=12, leading=16, textColor=INK,
                                  spaceAfter=1, keepWithNext=True),
        'role': ParagraphStyle('role', fontName='CVItalic', fontSize=11, leading=15, textColor=INK,
                               spaceAfter=5, keepWithNext=True),
        'phase': ParagraphStyle('phase', fontName='CV', fontSize=11, leading=15, textColor=INK,
                                spaceBefore=7, spaceAfter=4, keepWithNext=True),
        'bullet': ParagraphStyle('bullet', fontName='CV', fontSize=11, leading=15, textColor=INK,
                                 leftIndent=16, firstLineIndent=0, bulletIndent=2, bulletFontName='CV',
                                 bulletFontSize=10, spaceAfter=2),
        'compact': ParagraphStyle('compact', fontName='CV', fontSize=11, leading=15, textColor=INK),
    }
    story = [Paragraph(escape(person['name']), styles['name'])]
    headline = f'<b>{escape(content["title"])}</b> | ' + ' · '.join(map(escape, content['headline_stack']))
    story.append(Paragraph(headline, styles['headline']))

    def contact_link(label, url):
        return f'<link href="{escape(url)}" color="{LINK}"><u>{escape(label)}</u></link>'

    contact = [escape(person['phone']), contact_link(person['email'], 'mailto:' + person['email'])]
    story.append(Paragraph(' · '.join(contact), styles['contact']))
    # Visible URLs stay useful when the document is printed or parsed as plain text.
    links = [contact_link(re.sub(r'^https?://(?:www\.)?', '', link['url']).rstrip('/'), link['url'])
             for link in person['links']]
    story.append(Paragraph(' · '.join(links), styles['links']))

    def section(label, separator=True):
        if separator:
            story.extend([Spacer(1, 8), Rule(), Spacer(1, 8)])
        story.append(Paragraph(escape(label), styles['section']))

    section('Perfil profesional' if locale == 'es' else 'Professional Summary')
    story.append(Paragraph(content['summary'], styles['body']))

    for group in ['experience', 'projects']:
        if group == 'projects':
            story.append(PageBreak())
        section(translation['labels'][group], separator=group != 'projects')
        for entry_index, entry in enumerate(content[group]):
            timeline = source['timelines']['companies'][entry['timeline_id']]
            company = escape(entry['name'])
            period_label = ''
            if timeline['kind'] == 'duration':
                months = timeline['months']
                period_label = f'{months} meses de desarrollo' if locale == 'es' else f'{months}-month development project'
            elif len(timeline['periods']) == 1:
                period_label = format_period(timeline['periods'][0], locale)
            if group == 'projects':
                role = escape(entry['role']) + (' | ' + period_label if period_label else '')
                heading = [Paragraph(company, styles['company']), Paragraph(role, styles['role'])]
            else:
                company += ' - ' + period_label if period_label else ''
                heading = [Paragraph(escape(entry['role']), styles['entry']),
                           Paragraph(company, styles['role'])]
            entry_items = []
            if entry.get('phases'):
                entry_items.append({'content': heading, 'radius': 3.5 if group == 'projects' else 3})
                for phase in entry['phases']:
                    phase_label = ''
                    if phase.get('timeline_period'):
                        period = next(p for p in timeline['periods'] if p['id'] == phase['timeline_period'])
                        phase_label = format_period(period, locale)
                    elif phase.get('context'):
                        phase_label = phase['context']
                    phase_heading = f'<b>{escape(phase["name"])}</b>'
                    if phase_label:
                        phase_heading += f' | <i>{escape(phase_label)}</i>'
                    paragraphs = [Paragraph(phase_heading, styles['phase'])]
                    paragraphs.extend(Paragraph(escape(bullet), styles['bullet'], bulletText='•') for bullet in phase['bullets'])
                    entry_items.append({'content': paragraphs, 'indent': 14, 'radius': 2.4})
            else:
                paragraphs = heading + [Paragraph(escape(bullet), styles['bullet'], bulletText='•') for bullet in entry['bullets']]
                entry_items.append({'content': paragraphs, 'radius': 3.5 if group == 'projects' else 3})
            # A separate rail for each company keeps its phases visually scoped.
            if entry_index:
                story.append(Spacer(1, 14))
            story.append(VerticalTimeline(entry_items))

    section('Formación' if locale == 'es' else 'Education')
    story.append(Paragraph(translation['education'], styles['compact']))

    section(translation['labels']['skills'])
    for skill in content['skills']:
        story.append(Paragraph(skill, styles['compact']))
    story.append(Spacer(1, 10))
    section('Idiomas' if locale == 'es' else 'Languages', separator=False)
    # The section heading replaces the existing bold inline label.
    story.append(Paragraph(translation['languages'].split('</b>', 1)[-1].strip(), styles['compact']))

    def page_furniture(canvas, document):
        canvas.saveState()
        canvas.setFont('CV', 8)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(A4[0] - 54, 23, str(document.page))
        canvas.restoreState()

    doc = SimpleDocTemplate(str(output_path), pagesize=A4, rightMargin=54, leftMargin=54,
                            topMargin=32, bottomMargin=40, title=f'{person["name"]} | {content["title"]}',
                            author=person['name'], subject='Curriculum Vitae' if locale == 'es' else 'Resume',
                            pageCompression=1)
    doc.build(story, onFirstPage=page_furniture, onLaterPages=page_furniture)
    print(output_path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-dir', type=Path, default=ROOT / 'output' / 'pdf')
    args = parser.parse_args()
    source = json.loads((ROOT / 'cv' / 'content.json').read_text(encoding='utf-8'))
    validate_timelines(source)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    register_fonts()
    for locale in ['es', 'en']:
        for variant in ['fullstack', 'frontend']:
            build_pdf(source, locale, variant, args.output_dir)


if __name__ == '__main__':
    main()
