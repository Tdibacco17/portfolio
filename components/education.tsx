import type { Dictionary } from '@/models/dictionary';
import SectionHeading from './section-heading';

export default function Education({ content, languages }: { content: Dictionary['education']; languages: Dictionary['languages'] }) {
  return (
    <section className="relative" aria-labelledby="education-heading">
      <SectionHeading id="education-heading" text={content.section} />
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-2xl">{content.title}</h3>
          <p className="text-base text-lightPrimary">{content.subTitle}</p>
        </div>
        <p className="text-base">{content.firstParagraph.text}</p>
        <p className="text-base">
          <a target="_blank" rel="noopener noreferrer" href="https://certificates.soyhenry.com/cert?id=ab1a5fb5-9b2e-454b-a8fb-5e4d3ae64eb1"
            className="underline-offset-2 underline decoration-[#A0A0A0] font-bold hover:text-link-hover">
            {content.certificate}
          </a>.
        </p>
        <div className="pt-6 flex flex-col gap-2">
          <div className="text-lightPrimary"><h3 className="font-bold">{languages.section}</h3></div>
          <ul className="text-base">
            {languages.list.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
