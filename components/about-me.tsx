import type { Dictionary } from '@/models/dictionary';
import SectionHeading from './section-heading';

export default function AboutMe({ content }: { content: Dictionary['aboutMe'] }) {
  return (
    <section className="relative" aria-labelledby="about-heading">
      <SectionHeading id="about-heading" text={content.section} />
      <div className="flex flex-col items-start gap-4 text-base">
        {content.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}
