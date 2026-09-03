import Image from 'next/image';
import { experiences } from '@/models/experiences';
import type { Dictionary, ExperienceTranslation } from '@/models/dictionary';
import SectionHeading from './section-heading';

function StageContent({ stage }: { stage: ExperienceTranslation['stages'][number] }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-bold">{stage.title}</h4>
        <p className="text-sm text-lightPrimary">{stage.period}</p>
      </div>
      <ul className="mt-4 text-base">
        {stage.list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </>
  );
}

export default function Experience({ content }: { content: Dictionary['experience'] }) {
  return (
    <section className="relative" aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading" text={content.section} />
      <div className="flex flex-col gap-40">
        {experiences.map(({ id, img, layout }) => (
          <article key={id} className="flex flex-col gap-6" aria-labelledby={`experience-${id}`}>
            <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-center select-none pointer-events-none">
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height}
                sizes="(max-width: 723px) calc(100vw - 3rem), 42rem"
                quality={100} placeholder="blur" blurDataURL={img.blurData} />
            </div>
            <div>
              <h3 id={`experience-${id}`} className="text-2xl">{content[id].title}</h3>
              <p className="text-base text-lightPrimary">{content[id].subTitle}</p>
            </div>
            {layout === 'timeline' ? (
              <ol className="flex flex-col list-none" aria-label={`${content[id].title}: ${content[id].subTitle}`}>
                {content[id].stages.map(stage => (
                  <li key={stage.id}
                    className="relative pb-10 pl-8 before:absolute before:bottom-0 before:left-[5px] before:top-3 before:w-px before:bg-soft last:pb-0 last:before:hidden">
                    <span className="absolute left-0 top-2 z-10 h-3 w-3 rounded-full border border-lightPrimary bg-[#232323]"
                      aria-hidden="true" />
                    <StageContent stage={stage} />
                  </li>
                ))}
              </ol>
            ) : (
              <div className="flex flex-col gap-10">
                {content[id].stages.map(stage => (
                  <div key={stage.id}>
                    <StageContent stage={stage} />
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
