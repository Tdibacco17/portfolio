import type { Dictionary } from '@/models/dictionary';
import SectionHeading from './section-heading';

export default function AboutMe({ content }: { content: Dictionary['aboutMe'] }) {
  return (
    <section className="relative" aria-labelledby="about-heading">
      <SectionHeading id="about-heading" text={content.section} />
      <div className="flex flex-col items-start gap-4 text-base">
        <p>{content.description.first}</p>
        <p>{content.description.second}</p>
        <p>{content.description.third}</p>
      </div>
    </section>
  );
}
