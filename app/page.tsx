import AboutMe from "@/components/AboutMe/AboutMe";
import Education from "@/components/Education/Education";
import Experience from "@/components/Experience/Experience";
import PersonalIdentity from "@/components/PersonalIdentity/PersonalIdentity";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Stack from "@/components/Stack/Stack";
import getLocale from "@/utils/getLocale";
import { getUserAgent } from "@/utils/getUserAgent";
import { headers } from "next/headers";

export default async function Home() {
  const { flag } = await getLocale();
  const { isMobile } = await getUserAgent(headers().get('user-agent'));

  return (
    <>
      <PersonalIdentity flag={flag} isMobile={isMobile} />
      <AboutMe flag={flag} />
      <Experience flag={flag} isMobile={isMobile} />
      <Stack flag={flag} isMobile={isMobile} />
      <Education flag={flag} isMobile={isMobile} />
      <ScrollToTop flag={flag} isMobile={isMobile} />
    </>
  );
}
