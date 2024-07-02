import Image from "next/image";
import data from "@/models/data.json"
import Section from "../Section/Section";
import { LocaleType, getDictionary } from "@/utils/dictionaries";
import Link from "next/link";

export default async function Experience({ flag }: { flag: LocaleType }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative w-full flex flex-col gap-40">
            <Section text={dict.experience.section} />
            <div className="flex flex-col gap-5">
                <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-center select-none pointer-events-none">
                    <Image
                        src={data.experience.houseofcb.img.src}
                        alt={data.experience.houseofcb.img.alt}
                        width={2560}
                        height={1127}
                        priority
                        quality={100}
                        placeholder="blur"
                        blurDataURL={data.experience.houseofcb.img.blurData}
                    />
                </div>
                <div>
                    <p className="text-2xl">{dict.experience.houseofcb.title}</p>
                    <p className="text-base text-lightPrimary">{dict.experience.houseofcb.subTitle}</p>
                </div>
                <p className="text-base">
                    <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/houseofcb/"} aria-label={"Instagram"}
                        className="underline-offset-2 underline decoration-[#707070] font-semibold">
                        {dict.experience.houseofcb.firstParagraph.link}
                    </Link>
                    {dict.experience.houseofcb.firstParagraph.text}
                    <Link target="_blank" rel="noopener noreferrer" href={"https://www.houseofcb.com/"} aria-label={"https://www.houseofcb.com/"}
                        className="underline-offset-2 underline decoration-[#707070] font-semibold">
                        {dict.experience.houseofcb.firstParagraph.otherLink}
                    </Link>.
                </p>
            </div>
            <div className="flex flex-col gap-5">
                <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-center select-none pointer-events-none">
                    <Image
                        src={data.experience.strongwood.img.src}
                        alt={data.experience.strongwood.img.alt}
                        width={2560}
                        height={1127}
                        priority
                        quality={100}
                        placeholder="blur"
                        blurDataURL={data.experience.strongwood.img.blurData}
                    />
                </div>
                <div>
                    <p className="text-2xl">{dict.experience.strongwood.title}</p>
                    <p className="text-base text-lightPrimary">{dict.experience.strongwood.subTitle}</p>
                </div>
                <p className="text-base">
                    <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/strongwood_ar/"} aria-label={"https://www.instagram.com/strongwood_ar/"}
                        className="underline-offset-2 underline decoration-[#707070] font-semibold">
                        {dict.experience.strongwood.firstParagraph.link}
                    </Link>
                    {dict.experience.strongwood.firstParagraph.text}
                </p>
                <p className="text-base">
                    {dict.experience.strongwood.secondParagraph.text}
                    <Link target="_blank" rel="noopener noreferrer" href={"https://www.strongwood.com.ar/"} aria-label={"https://www.strongwood.com.ar/"}
                        className="underline-offset-2 underline decoration-[#707070] font-semibold">
                        {dict.experience.strongwood.secondParagraph.link}
                    </Link>
                    {dict.experience.strongwood.secondParagraph.otherText}
                </p>
            </div>
            <div className="flex flex-col gap-5">
                <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-center select-none pointer-events-none">
                    <Image
                        src={data.experience.watts.img.src}
                        alt={data.experience.watts.img.alt}
                        width={1200}
                        height={675}
                        priority
                        quality={100}
                        placeholder="blur"
                        blurDataURL={data.experience.watts.img.blurData}
                    />
                </div>
                <div>
                    <p className="text-2xl">{dict.experience.watts.title}</p>
                    <p className="text-base text-lightPrimary">{dict.experience.watts.subTitle}</p>
                </div>
                <p>
                    {dict.experience.watts.firstParagraph.text}
                    <Link target="_blank" rel="noopener noreferrer" href={"https://25watts.com.ar/"} aria-label={"https://25watts.com.ar/"}
                        className="underline-offset-2 underline decoration-[#707070] font-semibold">
                        {dict.experience.watts.firstParagraph.link}
                    </Link>
                    {dict.experience.watts.firstParagraph.otherText}
                </p>
                <ul className="text-base">
                    {dict.experience.watts.list.map((text: string, index: number) => {
                        return <li key={index}>{text}</li>
                    })}
                </ul>
                <p>
                    {dict.experience.watts.secondParagraph.text}
                </p>
            </div>
        </section>
    )
}