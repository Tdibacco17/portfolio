import { getDictionary, LocaleType } from "@/utils/dictionaries";
import ScrollToTopClient from "./ScrollToTop.client";

export default async function ScrollToTop({ flag, isMobile }: { flag: LocaleType, isMobile: boolean }) {
    const dict = await getDictionary(flag);

    return (
        <section className="flex justify-center absolute -bottom-40 w-full">
            <ScrollToTopClient dict={dict} isMobile={isMobile}/>
        </section>
    )
}