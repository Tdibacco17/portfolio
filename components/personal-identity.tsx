import Image from 'next/image';
import data from '@/models/data.json';
import type { Dictionary } from '@/models/dictionary';
import IconLink from './icons/icon-link';
import type { Locale } from '@/utils/locale';

export default function PersonalIdentity({ content, locale }: { content: Dictionary['personalIdentity']; locale: Locale }) {
  const cvSrc = data.personalIdentity.cv.pdfSrc[locale];

  return (
    <section className="flex flex-col items-center gap-4" aria-labelledby="identity-heading">
      <div className="w-40 min-w-40 min-h-40 h-40 overflow-hidden rounded-full flex justify-center items-center select-none pointer-events-none">
        <Image src={data.personalIdentity.img.src} alt={data.personalIdentity.img.alt} width={1200} height={1600}
          sizes="160px" preload quality={100} placeholder="blur" blurDataURL={data.personalIdentity.img.blurData} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h1 id="identity-heading" className="text-2xl">{content.name}</h1>
        <p className="text-lightPrimary text-xl">{content.roll}</p>
      </div>
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex items-center gap-4">
          {Object.values(data.personalIdentity.networks).map(iconData => <IconLink key={iconData.iconId} iconData={iconData} />)}
        </div>
        <a href={data.personalIdentity.contact.gmail.link}
          className="text-lightPrimary underline decoration-[#A0A0A0] underline-offset-2 hover:text-link-hover">
          {data.personalIdentity.contact.copy.link}
        </a>
      </div>
      {/* Contact actions temporarily hidden for visual review.
      <div className="flex items-center justify-center gap-4 text-base sm:flex-row flex-col w-full sm:w-auto">
        <a target="_blank" rel="noopener noreferrer" href={data.personalIdentity.contact.gmail.link}
          className="cursor-pointer sm:w-44 w-full h-10 text-darkSecondary flex items-center justify-center gap-2 py-2 px-4 rounded-custom border-solid border-[1px] bg-lightPrimary border-lightPrimary font-bold hover:bg-lightPrimary-hover">
          {content.contact.gmail}<Icon iconData={data.personalIdentity.contact.gmail} stroke />
        </a>
        <p className="text-soft">{content.contact.or}</p>
        <CopyToClipboard email={data.personalIdentity.contact.copy.link}
          labels={{ copy: content.contact.copy, success: content.contact.success, error: content.contact.error }}
          copyIcon={<Icon iconData={data.personalIdentity.contact.copy} fill reduce />}
          successIcon={<Icon iconData={data.personalIdentity.contact.success} fill reduce />} />
      </div>
      */}
      <div className="py-4">
        <a href={cvSrc} download={cvSrc.split('/').pop()}
          className="text-lightPrimary font-bold underline-offset-2 underline decoration-[#A0A0A0] hover:text-link-hover"
          rel="noopener noreferrer" target="_blank">{content.cv}</a>
      </div>
    </section>
  );
}
