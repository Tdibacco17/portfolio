import Image from "next/image";
import data from "@/models/data.json"
import Section from "../Section/Section";
import { LocaleType, getDictionary } from "@/utils/dictionaries";

export default async function Experience({ flag }: { flag: LocaleType }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative">
            <Section text={dict.experience.section} />
            <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-start select-none pointer-events-none">
                <Image
                    src={data.experience.strongwood.img.src}
                    alt={data.experience.strongwood.img.alt}
                    width={4016}
                    height={2259}
                    priority
                    quality={100}
                    placeholder="blur"
                    blurDataURL={data.experience.strongwood.img.blurData}
                />
            </div>
        </section>
    )
}