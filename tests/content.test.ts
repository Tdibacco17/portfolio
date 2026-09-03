import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import english from '@/models/en.json';
import spanish from '@/models/es.json';
import data from '@/models/data.json';
import { experiences } from '@/models/experiences';

const monthNames = {
  es: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
} as const;

type Locale = keyof typeof monthNames;

interface CvPeriod {
  start: string;
  end: string | null;
}

interface CvTimeline {
  periods: CvPeriod[];
}

function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split('-').map(Number);
  return `${monthNames[locale][month - 1]} ${year}`;
}

function formatPeriod(period: CvPeriod, locale: Locale): string {
  const end = period.end ? formatMonth(period.end, locale) : (locale === 'es' ? 'actualidad' : 'Present');
  return `${formatMonth(period.start, locale)} - ${end}`;
}

function singlePeriod(source: { timelines: { companies: Record<string, CvTimeline> } }, timelineId: string, locale: Locale): string {
  const [period] = source.timelines.companies[timelineId].periods;
  return formatPeriod(period, locale);
}

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return Array.from(new Set(value.map(item => JSON.stringify(shape(item))))).sort();
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, shape(item)]));
  }
  return typeof value;
}

function assetPaths(value: unknown): string[] {
  if (typeof value === 'string') return value.startsWith('/assets/') ? [value] : [];
  if (value && typeof value === 'object') return Object.values(value).flatMap(assetPaths);
  return [];
}

describe('bilingual content', () => {
  it('has identical dictionary keys and value types', () => {
    expect(shape(english)).toEqual(shape(spanish));
  });

  it('has one translation per catalog entry in both languages', () => {
    const ids = experiences.map(entry => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const dictionary of [english, spanish]) {
      expect(Object.keys(dictionary.experience).filter(key => key !== 'section').sort()).toEqual([...ids].sort());
      for (const id of ids) {
        const experience = dictionary.experience[id];
        expect(experience.title.trim()).not.toBe('');
        expect(experience.subTitle.trim()).not.toBe('');
        expect(experience.stages.length).toBeGreaterThan(0);
        expect(new Set(experience.stages.map(stage => stage.id)).size).toBe(experience.stages.length);
        for (const stage of experience.stages) {
          expect(stage.title.trim()).not.toBe('');
          if ('period' in stage && stage.period !== undefined) expect(stage.period.trim()).not.toBe('');
          expect(stage.list.length).toBeGreaterThan(0);
        }
      }
    }

    for (const id of ids) {
      expect(english.experience[id].stages.map(stage => stage.id))
        .toEqual(spanish.experience[id].stages.map(stage => stage.id));
    }
  });

  it('references real assets with matching filename casing', () => {
    for (const path of assetPaths([data, experiences])) {
      const file = resolve('public', path.slice(1));
      expect(existsSync(file), path).toBe(true);
      expect(readdirSync(dirname(file)), path).toContain(basename(file));
    }
  });

  it('defines positive image dimensions', () => {
    for (const { img } of experiences) {
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    }
  });

  it('uses the confirmed average traffic figure in CV source content', () => {
    const source = readFileSync(resolve('cv/content.json'), 'utf8');
    expect(source).not.toMatch(/3[.,]?000|3,000/);
    expect(source).toContain('promedio de 2.000 usuarios por hora');
    expect(source).toContain('average of 2,000 users per hour');
  });

  it('keeps the website introduction synchronized with the Full Stack CV', () => {
    const source = JSON.parse(readFileSync(resolve('cv/content.json'), 'utf8'));
    expect(spanish.aboutMe.description).toHaveLength(2);
    expect(english.aboutMe.description).toHaveLength(2);
    expect(spanish.aboutMe.description.join(' ')).toBe(source.locales.es.variants.fullstack.summary);
    expect(english.aboutMe.description.join(' ')).toBe(source.locales.en.variants.fullstack.summary);
  });

  it('keeps the House of CB website sections synchronized with the Full Stack CV', () => {
    const source = JSON.parse(readFileSync(resolve('cv/content.json'), 'utf8'));
    for (const [locale, dictionary] of [['es', spanish], ['en', english]] as const) {
      const cvEntry = source.locales[locale].variants.fullstack.experience
        .find((entry: { timeline_id: string }) => entry.timeline_id === 'houseofcb');
      expect(cvEntry.phases.map((phase: { name: string }) => phase.name))
        .toEqual(dictionary.experience.houseofcb.stages.map(stage => stage.title));
      expect(cvEntry.phases.map((phase: { bullets: string[] }) => phase.bullets))
        .toEqual(dictionary.experience.houseofcb.stages.map(stage => stage.list));
      expect(cvEntry.phases[1].context).toBe(dictionary.experience.houseofcb.stages[1].period);
    }
  });

  it('keeps single-period subtitles and education synchronized with the Full Stack CV', () => {
    const source = JSON.parse(readFileSync(resolve('cv/content.json'), 'utf8'));
    for (const [locale, dictionary] of [['es', spanish], ['en', english]] as const) {
      const content = source.locales[locale].variants.fullstack;
      const houseofcb = content.experience.find((entry: { timeline_id: string }) => entry.timeline_id === 'houseofcb');
      const watts = content.experience.find((entry: { timeline_id: string }) => entry.timeline_id === 'watts');
      const donatella = content.projects.find((entry: { timeline_id: string }) => entry.timeline_id === 'donatella');
      const education = source.locales[locale].education;

      expect(dictionary.experience.houseofcb.subTitle)
        .toBe(`${houseofcb.role} · ${singlePeriod(source, houseofcb.timeline_id, locale)}`);
      expect(dictionary.experience.houseofcb.stages[0]).not.toHaveProperty('period');
      expect(dictionary.experience.watts.subTitle)
        .toBe(`${watts.role} · ${singlePeriod(source, watts.timeline_id, locale)}`);
      expect(dictionary.experience.watts.stages[0]).not.toHaveProperty('period');
      expect(dictionary.experience.donatella.stages[0].period)
        .toBe(singlePeriod(source, donatella.timeline_id, locale));
      expect(dictionary.education.title).toBe(education.name);
      expect(dictionary.education.subTitle)
        .toBe(`${education.role} | ${singlePeriod(source, education.timeline_id, locale)}`);
      expect(dictionary.education.firstParagraph.text).toBe(education.description);
    }
  });

  it('reserves the visual timeline for Strongwood multiple stages', () => {
    for (const dictionary of [english, spanish]) {
      const timelineIds = experiences.filter(({ layout }) => layout === 'timeline').map(({ id }) => id);
      expect(timelineIds).toEqual(['strongwood']);
      expect(dictionary.experience.houseofcb.stages).toHaveLength(2);
    }
  });

  it('serves the current Full Stack PDFs for both locales', () => {
    for (const locale of ['ES', 'EN']) {
      const filename = `TomasDiBacco_CV_FullStack_${locale}.pdf`;
      expect(readFileSync(resolve('public/assets/pdf', filename)))
        .toEqual(readFileSync(resolve('output/pdf', filename)));
    }
    expect(readFileSync(resolve('public/assets/pdf/TomasDiBacco_Resume.pdf')))
      .toEqual(readFileSync(resolve('output/pdf/TomasDiBacco_CV_FullStack_ES.pdf')));
  });
});
