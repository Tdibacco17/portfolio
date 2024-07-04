import { LocaleType, getDictionary } from "@/utils/dictionaries";
import Section from "../Section/Section";
import data from "@/models/data.json"
import { TechIconComponent, TechIconInterface } from "../Icons/Icons";

export default async function Stack({ flag, isMobile }: { flag: LocaleType, isMobile: boolean }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative w-full">
            <Section text={dict.technologies.title} />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] w-full gap-[.675rem]">
                {Object.values(data.technologies).map((iconData: TechIconInterface) => {
                    return <TechIconComponent
                        key={iconData.iconId}
                        iconData={iconData}
                        isMobile={isMobile}
                    />
                })}
            </div>
        </section>
    )
}