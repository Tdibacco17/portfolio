import Image from 'next/image';
import { experiences } from '@/models/experiences';
import type { Dictionary } from '@/models/dictionary';
import SectionHeading from './section-heading';

export default function Experience({ content }: { content: Dictionary['experience'] }) {
  return (
    <section className="relative" aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading" text={content.section} />
      <div className="flex flex-col gap-40">
        {experiences.map(({ id, img }) => (
          <article key={id} className="flex flex-col gap-5" aria-labelledby={`experience-${id}`}>
            <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-center select-none pointer-events-none">
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height}
                sizes="(max-width: 723px) calc(100vw - 3rem), 42rem"
                quality={100} placeholder="blur" blurDataURL={img.blurData} />
            </div>
            <div>
              <h3 id={`experience-${id}`} className="text-2xl">{content[id].title}</h3>
              <p className="text-base text-lightPrimary">{content[id].subTitle}</p>
            </div>
            <ul className="text-base">
              {content[id].list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
