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
    viewBox: string
}

export const IconLinkComponent = ({ iconData, isMobile }: { iconData: LinkIconInterface, isMobile?: boolean }) => {
    return (
        <Link target="_blank" rel="noopener noreferrer" aria-label={`${iconData.title}`} href={isMobile ? iconData.otherLink! : iconData.link}
            className="[&_path]:hover:fill-softHover cursor-pointer">
            <div className="flex justify-center items-center w-6 h-6">
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <svg stroke="none" fill="none" viewBox={iconData.viewBox} xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth="2"
                    className={`${stroke ? "stroke-soft" : ""} ${fill ? "fill-soft" : ""}`}
                    d={iconData.path}>
                </path>
            </svg>
        </div>
    )
};

// <div className={`${styles['icon-container']} card`}>
//     <div className={`${styles['container-icon-svg']}`}>
//         <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path
//                 className={`${styles['icon-svg']} ${styles[`fill-${iconData.color}`]}`}
//                 d={iconData.path}>
//             </path>
//         </svg>
//     </div>
//     <small className={`${styles["text-icon"]} ${styles[`color-${iconData.color}`]}`}>{iconData.title}</small>
// </div>