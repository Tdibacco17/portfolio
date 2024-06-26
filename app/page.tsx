import { getDictionary } from "@/utils/dictionaries";
import getLocale from "@/utils/getLocale";

export default async function Home() {
  const { flag } = await getLocale();
  const dict = await getDictionary(flag)

  return (
    <div className="bg-red-950 h-full max-w-content min-w-content flex flex-col items-center">
      <div>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
      </div>
      <br></br><br></br><br></br>
      <div>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
      </div>
      <br></br><br></br><br></br>
      <div>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
      </div>
      <br></br><br></br><br></br>
      <div>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
      </div>
      <br></br><br></br><br></br>
      <div>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
        {dict.presentation.roll}<br></br>
      </div>
    </div>
  );
}
