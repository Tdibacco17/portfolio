import Image from "next/image";
import data from "@/models/data.json"
import Section from "../Section/Section";
import { LocaleType, getDictionary } from "@/utils/dictionaries";
import Link from "next/link";

export default async function Experience({ flag, isMobile }: { flag: LocaleType, isMobile: boolean }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative">
            <Section text={dict.experience.section} />
            <div className="flex flex-col gap-40">
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
                    <ul className="text-base">
                        {dict.experience.houseofcb.list.map((item: string, index: number) => {
                            return (
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        })}
                    </ul>
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
                    <ul className="text-base">
                        {dict.experience.strongwood.list.map((item: string, index: number) => {
                            return (
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-center select-none pointer-events-none">
                        <Image
                            src={data.experience.watts.img.src}
                            alt={data.experience.watts.img.alt}
                            width={1920}
                            height={847}
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
                    <ul className="text-base">
                        {dict.experience.watts.list.map((text: string, index: number) => {
                            return <li key={index} className="text-base">
                                {text}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}