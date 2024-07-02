import Image from "next/image";
import data from "@/models/data.json"
import Section from "../Section/Section";
import { LocaleType, getDictionary } from "@/utils/dictionaries";
import Link from "next/link";

export default async function Experience({ flag }: { flag: LocaleType }) {
    const dict = await getDictionary(flag);

    return (
        <section className="relative w-full flex flex-col gap-40">
            <Section text={dict.experience.section} />
            <div>
                <div className="flex flex-col gap-5">
                    <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-start select-none pointer-events-none">
                        <Image
                            src={data.experience.houseofcb.img.src}
                            alt={data.experience.houseofcb.img.alt}
                            width={2560}
                            height={1127}
                            priority
                            quality={100}
                            placeholder="blur"
                            blurDataURL={data.experience.houseofcb.img.blurData}
                        />
                    </div>
                    <div>
                        <p className="text-2xl">House of CB</p>
                        <p className="text-base text-lightPrimary">Desarrollador Front End, may. 2024 — Actualidad</p>
                    </div>
                    <p className="text-base">
                        <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/houseofcb/"} aria-label={"Instagram"} className="underline-offset-2 underline decoration-[#707070] font-semibold">House of CB</Link> es una marca británica líder en ropa de mujer, aclamada internacionalmente por sus piezas de diseñador. Con más de 40 tiendas alrededor del mundo y una fuerte presencia en redes sociales.   Actualmente trabajo como desarrollador Front End en su <Link target="_blank" rel="noopener noreferrer" href={"https://www.houseofcb.com/"} aria-label={"https://www.houseofcb.com/"} className="underline-offset-2 underline decoration-[#707070] font-semibold">ecommerce</Link>.
                    </p>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-5">
                    <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-start select-none pointer-events-none">
                        <Image
                            src={data.experience.strongwood.img.src}
                            alt={data.experience.strongwood.img.alt}
                            width={4016}
                            height={2259}
                            priority
                            quality={100}
                            placeholder="blur"
                            blurDataURL={data.experience.strongwood.img.blurData}
                        />
                    </div>
                    <div>
                        <p className="text-2xl">Strongwood</p>
                        <p className="text-base text-lightPrimary">Desarrollador Front End, abr. 2023 — sep. 2023</p>
                    </div>
                    <p className="text-base">
                        <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/strongwood_ar/"} aria-label={"https://www.instagram.com/strongwood_ar/"} className="underline-offset-2 underline decoration-[#707070] font-semibold">Strongwood</Link> es una empresa dedicada a la fabricación y venta de muebles. Querían construir un portfolio de sus proyectos realizados para dar más credibilidad a la marca.
                    </p>
                    <p className="text-base">
                        Desarrollé el <Link target="_blank" rel="noopener noreferrer" href={"https://www.strongwood.com.ar/"} aria-label={"https://www.strongwood.com.ar/"} className="underline-offset-2 underline decoration-[#707070] font-semibold">sitio web</Link> utilizando Next.js, React.js, TypeScript y Sass. Me encargué de cada aspecto de la página, desde el diseño hasta la experiencia de usuario. Realicé reuniones con el cliente para llevar a cabo el desarrollo y mostrar avances, asegurando cumplir con sus expectativas y funcionalidades.
                    </p>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-5">
                    <div className="max-h-64 overflow-hidden rounded-otherCustom flex justify-center items-center select-none pointer-events-none">
                        <Image
                            src={data.experience.watts.img.src}
                            alt={data.experience.watts.img.alt}
                            width={1200}
                            height={675}
                            priority
                            quality={100}
                            placeholder="blur"
                            blurDataURL={data.experience.watts.img.blurData}
                        />
                    </div>
                    <div>
                        <p className="text-2xl">25Watts</p>
                        <p className="text-base text-lightPrimary">Desarrollador Front End, oct. 2022 — abr. 2024</p>
                    </div>
                    <p>
                        Me uní al equipo de <Link target="_blank" rel="noopener noreferrer" href={"https://25watts.com.ar/"} aria-label={"https://25watts.com.ar/"} className="underline-offset-2 underline decoration-[#707070] font-semibold">25Watts</Link> donde trabaje en la creación de páginas web, portfolios, ecommerce, blogs y landing pages.
                    </p>
                    <ul className="text-base">
                        <li>
                            Desarrollos en WordPress con Elementor y WooCommerce.
                        </li>
                        <li>
                            Desarrollos en Next.js con React.js, TypeScript, Node.js y Sass. Experiencia consumiendo datos de una API REST para procesar información dinámica en el sitio.
                        </li>
                        <li>
                            Implementación de envío de emails con Nodemailer. Validaciones de formularios con reCaptcha v2 y v3. Integraciones de mapas con la API de Google Maps.
                        </li>
                        <li>
                            Desarrollo de componentes bajo patrones de diseño, enfocado en la calidad y el rendimiento. Experiencia en la implementación de buenas prácticas.
                        </li>
                    </ul>
                    <p>
                        Aprendí la aplicación de metodologías ágiles - SRUM. Manejo de herramientas como Jira, Figma, Docker y el flujo de trabajo con Git.
                    </p>
                </div>
            </div>
        </section>
    )
}