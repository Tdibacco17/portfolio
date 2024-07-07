export function handleScrollToSection(targetSection: string) {
    if (targetSection === "top") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const section = document.getElementById(targetSection);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}