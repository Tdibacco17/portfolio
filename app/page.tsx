import AboutMe from "@/components/AboutMe/AboutMe";
import Experience from "@/components/Experience/Experience";
import PersonalIdentity from "@/components/PersonalIdentity/PersonalIdentity";
import getLocale from "@/utils/getLocale";
import { getUserAgent } from "@/utils/getUserAgent";
import { headers } from "next/headers";

export default async function Home() {
  const { flag } = await getLocale();

  const { isMobile } = await getUserAgent(headers().get('user-agent'));

  return (
    <main>
      <PersonalIdentity flag={flag} isMobile={isMobile} />
      <AboutMe flag={flag} />
      <Experience flag={flag} />
    </main>
  );
}
