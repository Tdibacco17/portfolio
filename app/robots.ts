import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: "https://tomas-di-bacco.vercel.app/sitemap.xml"
    }
}