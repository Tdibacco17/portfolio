'use client'
import { LocaleType } from "@/utils/dictionaries"
import { notFound } from "next/navigation"
import { useEffect } from "react";

const fetchCookieData = async (lang: string) => {
    const response = await fetch(`${process.env.BASE_PATH}/api/cookie`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lang),
    })
    const rawRseponse = await response.json();
    return rawRseponse
}

export default function Internationalization({ localeLang, cookieLang }: { localeLang: LocaleType, cookieLang: LocaleType | undefined }) {
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

    return <button onClick={handleSetCookie}>
        Cambiar idioma
    </button>
}

