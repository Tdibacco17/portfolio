import { getDictionary, LocaleType } from "@/utils/dictionaries";
import ScrollToTopClient from "./ScrollToTop.client";

export default async function ScrollToTop({ flag }: { flag: LocaleType }) {
    const dict = await getDictionary(flag);

    return (
        <section className="flex justify-center absolute -bottom-40 w-full">
            <ScrollToTopClient dict={dict} />
        </section>
    )
}