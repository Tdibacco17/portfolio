'use client'
import { handleScrollToSection } from "@/utils/scrollToSection";

export default function ScrollToTopClient({ dict, isMobile }: { dict: any, isMobile: boolean }) {
    return <p className={`text-sm cursor-pointer font-bold ${isMobile ? "" : "hover:text-lightPrimary"} text-soft`} onClick={() => handleScrollToSection("top")}>
        {dict.scrollToTop}
    </p>
}