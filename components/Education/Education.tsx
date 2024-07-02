import Link from "next/link";
import Section from "../Section/Section";
import { LocaleType, getDictionary } from "@/utils/dictionaries";

export default async function Education({ flag }: { flag: LocaleType }) {
    const dict = await getDictionary(flag);
    return (
        <section className="relative flex flex-col gap-5">
            <Section text={dict.education.section} />
            <div>
                <p className="text-2xl">Henry Bootcamp</p>
                <p className="text-base text-lightPrimary">Desarrollador Full Stack, mar. 2022 — ago. 2024</p>
            </div>
            <p className="text-base">
                Con más de 700 horas de práctica donde aprendí múltiples tecnologías, aplicación real en proyectos, desarrollo de un proyecto grupal con modalidad SCRUM para realizar un ecommerce y un proyecto individual consistente en un SPA.
            </p>
            <ul className="text-base">
                <li>
                    <strong>Proyecto Individual:</strong> Desarrollé una aplicación de tipo SPA, basada en una API externa de perros para poder visualizarlos en un paginado dinámico y manipularlos mediante filtrados y ordenamientos.
                </li>
                <li>
                    <strong>Proyecto Grupal:</strong> Es una aplicación web que ha sido pensada para la compra y venta de productos de computación. Cuenta con Carrito de compras, Custom PC Builder, Wish List, filtrados y paginado de productos. Tambien cuenta con la implementación de mercado pago, registro de usuarios y distintos roles para su navegación.
                </li>
            </ul>
            <p className="text-base"><Link href={"https://certificates.soyhenry.com/cert?id=ab1a5fb5-9b2e-454b-a8fb-5e4d3ae64eb1"} aria-label="https://certificates.soyhenry.com/cert?id=ab1a5fb5-9b2e-454b-a8fb-5e4d3ae64eb1" target="_blank" rel="noopener noreferrer" className="underline-offset-2 underline decoration-[#707070] font-semibold">Certificado</Link>.</p>
        </section>
    )
}