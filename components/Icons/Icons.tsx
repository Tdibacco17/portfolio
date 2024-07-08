import Link from "next/link";

export interface LinkIconInterface {
    iconId: number,
    title: string,
    path: string,
    link: string,
    otherLink?: string
}

export interface IconInterface {
    iconId: number,
    path: string,
    viewBox: string,
    strokeWidth: string
}

export interface TechIconInterface {
    iconId: number,
    path: string,
    title: string,
    color: string,
}

export const IconLinkComponent = ({ iconData, isMobile, otherLink }: { iconData: LinkIconInterface, isMobile?: boolean, otherLink: boolean }) => {
    return (
        <Link target="_blank" rel="noopener noreferrer" aria-label={`${iconData.title}`} href={otherLink ? iconData.otherLink! : iconData.link}
            className={`${isMobile ? "" : "[&_path]:hover:fill-softHover"} cursor-pointer p-3`}>
            <div className={`flex justify-center items-center w-6 h-6 ${isMobile ? "" : "hover:text-link-hover"}`}>
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path
                        className="fill-soft"
                        d={iconData.path}>
                    </path>
                </svg>
            </div>
        </Link>
    )
}

export const IconComponent = ({
    iconData,
    stroke, fill,
    reduce
}: {
    iconData: IconInterface,
    stroke?: boolean, fill?: boolean,
    reduce?: boolean
}) => {
    return (
        <div className={`flex justify-center items-center ${reduce ? "w-5 h-5" : "w-6 h-6"}`}>
            <svg stroke="none" fill="none" viewBox={iconData.viewBox} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                    strokeWidth={iconData.strokeWidth}
                    className={`${stroke ? "stroke-dark" : fill ? "fill-soft" : ""}`}
                    d={iconData.path}>
                </path>
            </svg>
        </div>
    )
};

export const TechIconComponent = ({
    iconData,
    isMobile
}: {
    iconData: TechIconInterface,
    isMobile: boolean
}) => {
    return (
        <div className={`flex flex-col justify-center gap-3 items-center rounded-custom p-6 border-solid border-[1px] bg-darkPrimary border-darkPrimary ${isMobile ? "" : "icon-container hover:darkPrimaryHover hover:bg-darkPrimaryHover"}`}>
            <svg className="max-h-[2.25rem] max-w-[2.25rem]" stroke="none" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth="0"
                    className={`${isMobile ? `mobile-color-${iconData.color}` : `color-${iconData.color}`}`}
                    d={iconData.path}>
                </path>
            </svg>
            <p className={`text-xs font-medium uppercase ${isMobile ? `mobile-color-${iconData.color}` : `color-${iconData.color}`}`}>
                {iconData.title}
            </p>
        </div>
    )
}