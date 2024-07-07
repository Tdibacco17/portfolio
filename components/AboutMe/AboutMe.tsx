import { LocaleType, getDictionary } from "@/utils/dictionaries";
import Section from "../Section/Section";

export default async function AboutMe({ flag }: { flag: LocaleType }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative">
            <Section text={dict.aboutMe.section} />
            <div className="flex flex-col items-start gap-4 text-base">
                <p>{dict.aboutMe.description.first}</p>
                <p>{dict.aboutMe.description.second}</p>
                <p>{dict.aboutMe.description.third}</p>
            </div>
        </section>
    )
}