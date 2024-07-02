'use client'
import data from "@/models/data.json"
import { IconComponent } from "../Icons/Icons";
import { useState } from "react";

export default function CopyToClipboard({ dict, isMobile }: { dict: any, isMobile: boolean }) {
    const [success, setSuccess] = useState<boolean>(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
            }, 4000)
        }).catch((err) => {
            console.error('Error: ', err);
        });
    };

    return (
        <div className={`cursor-pointer sm:w-44 w-full h-10 text-lightSecondary flex items-center justify-center gap-2 py-2 px-4 rounded-custom border-solid border-[1px] bg-darkPrimary border-darkPrimary font-bold ${isMobile ? "" : "hover:darkPrimaryHover hover:bg-darkPrimaryHover"}`}
            onClick={() => copyToClipboard(data.personalIdentity.contact.copy.link)}
        >
            {!success
                ? dict.personalIdentity.contact.copy
                : dict.personalIdentity.contact.success}
            {!success
                ? <IconComponent iconData={data.personalIdentity.contact.copy} fill={true} reduce={true} />
                : <IconComponent iconData={data.personalIdentity.contact.success} fill={true} reduce={true} />}
        </div>
    )
}