
import { LocaleType, getDictionary } from "@/utils/dictionaries";
import Image from "next/image";
import data from "@/models/data.json"
import { IconComponent, IconLinkComponent, LinkIconInterface } from "../Icons/Icons";
import Link from "next/link";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default async function PersonalIdentity({ flag, isMobile }: { flag: LocaleType, isMobile: boolean }) {
    const dict = await getDictionary(flag);

    return (
        <section className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 overflow-hidden rounded-full flex justify-center items-center select-none pointer-events-none">
                <Image
                    src={data.personalIdentity.img.src}
                    alt={data.personalIdentity.img.alt}
                    width={1200}
                    height={1600}
                    priority
                    quality={100}
                    placeholder="blur"
                    blurDataURL={data.personalIdentity.img.blurData}
                />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-2xl">{dict.personalIdentity.name}</h1>
                <h2 className="text-lightPrimary text-xl">{dict.personalIdentity.roll}</h2>
            </div>
            <div className="flex items-center gap-4 py-6">
                {Object.values(data.personalIdentity.networks).map((iconData: LinkIconInterface) => {
                    return <IconLinkComponent
                        key={iconData.iconId}
                        iconData={iconData}
                        isMobile={isMobile}
                        otherLink={iconData.iconId === 3}
                    />
                })}
            </div>
            <div className="flex items-center justify-center gap-4 text-base sm:flex-row flex-col w-full sm:w-auto">
                <Link target="_blank" rel="noopener noreferrer" aria-label={`${data.personalIdentity.contact.gmail.title}`} href={data.personalIdentity.contact.gmail.link}
                    className={`cursor-pointer sm:w-44 w-full h-10 text-darkSecondary flex items-center justify-center gap-2 py-2 px-4 rounded-custom border-solid border-[1px] bg-lightPrimary border-lightPrimary font-bold ${isMobile ? "" : "hover:bg-lightPrimary-hover"}`}>
                    {dict.personalIdentity.contact.gmail}
                    <IconComponent iconData={data.personalIdentity.contact.gmail} stroke={true} />
                </Link>
                <p className="text-soft">
                    {dict.personalIdentity.contact.or}
                </p>
                <CopyToClipboard dict={dict} isMobile={isMobile} />
            </div>
        </section>
    )
}