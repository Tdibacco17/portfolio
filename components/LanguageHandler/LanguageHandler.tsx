'use client'
import { LocaleType } from "@/utils/dictionaries"
import { notFound } from "next/navigation"
import { useEffect } from "react";
import { IconComponent } from "../Icons/Icons";
import data from "@/models/data.json"

const fetchCookieData = async (lang: string) => {
    try {
        const response = await fetch(`${process.env.BASE_PATH}/api/cookie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lang),
        })
        const rawRseponse = await response.json();
        return rawRseponse
    } catch(e){
        console.log(e)
    }
}

export default function LanguageHandler({ localeLang, cookieLang, isMobile }: { localeLang: LocaleType, cookieLang: LocaleType | undefined, isMobile: boolean }) {
    const changeLang: LocaleType = localeLang === 'en' ? 'es' : 'en';

    const handleSetCookie = async () => {
        const fetchCookie = await fetchCookieData(changeLang)
        if (fetchCookie.status !== 201) return notFound()
        return window.location.href = '/'
    }

    useEffect(() => {
        if (!cookieLang || cookieLang !== localeLang) {
            fetchCookieData(localeLang)
        }
    }, [cookieLang, localeLang])

    return <button onClick={handleSetCookie} className={`absolute right-0 sm:-top-3 -top-12 text-base flex gap-2 items-center uppercase rounded-custom p-3 ${isMobile ? "text-white [&_path]:fill-white bg-darkPrimaryHover" : "hover:bg-darkPrimaryHover text-lightPrimary hover:text-white [&_path]:fill-softHover [&_path]:hover:fill-white"}`}>
        {localeLang === 'en' ? 'en' : 'es'}
        <IconComponent iconData={data.language} fill={true} reduce={true} />
    </button>
}

