import Link from "next/link";
import Section from "../Section/Section";
import { LocaleType, getDictionary } from "@/utils/dictionaries";

export default async function Education({ flag, isMobile }: { flag: LocaleType, isMobile: boolean }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative">
            <Section text={dict.education.section} />
            <div className="flex flex-col gap-5">
                <div>
                    <p className="text-2xl">{dict.education.title}</p>
                    <p className="text-base text-lightPrimary">{dict.education.subTitle}</p>
                </div>
                <p className="text-base">
                    {dict.education.firstParagraph.text}
                </p>
                <p className="text-base">
                    <Link target="_blank" rel="noopener noreferrer" href={"https://certificates.soyhenry.com/cert?id=ab1a5fb5-9b2e-454b-a8fb-5e4d3ae64eb1"} aria-label="https://certificates.soyhenry.com/cert?id=ab1a5fb5-9b2e-454b-a8fb-5e4d3ae64eb1"
                        className={`underline-offset-2 underline decoration-[#A0A0A0] font-bold ${isMobile ? "" : "hover:text-link-hover"}`}>
                        {dict.education.certificate}
                    </Link>.
                </p>
            </div>
        </section>
    )
}