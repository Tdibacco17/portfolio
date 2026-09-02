import AboutMe from '@/components/about-me';
import Education from '@/components/education';
import Experience from '@/components/experience';
import PersonalIdentity from '@/components/personal-identity';
import ScrollToTop from '@/components/scroll-to-top';
import Stack from '@/components/stack';
import { getLocale } from '@/utils/get-locale';
import { getDictionary } from '@/utils/dictionaries';

export default async function Home() {
  const { locale } = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <>
      <PersonalIdentity content={dict.personalIdentity} />
      <AboutMe content={dict.aboutMe} />
      <Experience content={dict.experience} />
      <Stack title={dict.technologies.title} />
      <Education content={dict.education} languages={dict.languages} />
      <ScrollToTop label={dict.scrollToTop} />
    </>
  );
}
