import { getDictionary, LocaleType } from "@/utils/dictionaries";
import getLocale from "@/utils/getLocale";

export default async function Home() {
  const lang = await getLocale() as LocaleType;
  const dict = await getDictionary(lang)

  return (
    <div>
      {dict.presentation.name}<br></br>
      {dict.presentation.roll}<br></br>
    </div>
  );
}
