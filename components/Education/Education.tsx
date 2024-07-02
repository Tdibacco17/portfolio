import Link from "next/link";
import Section from "../Section/Section";
import { LocaleType, getDictionary } from "@/utils/dictionaries";

export default async function Education({ flag }: { flag: LocaleType }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative flex flex-col gap-5">
            <Section text={dict.education.section} />
            <div>
                <p className="text-2xl">{dict.education.title}</p>
                <p className="text-base text-lightPrimary">{dict.education.subTitle}</p>
            </div>
            <p className="text-base">
                {dict.education.firstParagraph.text}
            </p>
            <ul className="text-base">
                <li>
                    <strong className="font-bold">{dict.education.individualProyect.title}</strong> {dict.education.individualProyect.description}
                </li>
                <li>
                    <strong className="font-bold">{dict.education.grupalProyect.title}</strong> {dict.education.grupalProyect.description}
                </li>
            </ul>
            <p className="text-base">
                <Link target="_blank" rel="noopener noreferrer" href={"https://certificates.soyhenry.com/cert?id=ab1a5fb5-9b2e-454b-a8fb-5e4d3ae64eb1"} aria-label="https://certificates.soyhenry.com/cert?id=ab1a5fb5-9b2e-454b-a8fb-5e4d3ae64eb1"
                    className="underline-offset-2 underline decoration-[#707070] font-semibold">
                    {dict.education.certificate}
                </Link>.
            </p>
        </section>
    )
}