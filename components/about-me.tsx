import type { Dictionary } from '@/models/dictionary';
import SectionHeading from './section-heading';

export default function AboutMe({ content }: { content: Dictionary['aboutMe'] }) {
  return (
    <section className="relative" aria-labelledby="about-heading">
      <SectionHeading id="about-heading" text={content.section} />
      <p className="text-base">{content.description}</p>
    </section>
  );
}
