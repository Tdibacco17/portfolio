'use client'
import { handleScrollToSection } from "@/utils/scrollToSection";

export default function ScrollToTopClient({ dict  }: { dict: any }) {
    return <p className={`text-sm cursor-pointer font-bold text-lightPrimary`} onClick={() => handleScrollToSection("top")}>
        {dict.scrollToTop}
    </p>
}