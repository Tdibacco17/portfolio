import { LocaleType } from "@/utils/dictionaries";
import Internationalization from "../Internationalization/Internationalization";

export default function Navigation({ localeLang, cookieLang }: { localeLang: LocaleType, cookieLang: LocaleType | undefined }) {
    return (
        <header>
            <Internationalization localeLang={localeLang} cookieLang={cookieLang} />
        </header>
    )
}