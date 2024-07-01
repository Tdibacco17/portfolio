import { userAgent } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { os, cpu, isBot, ua, browser, device, engine } = userAgent(request)

        return Response.json({
            status: 201,
            // data: { os, cpu, isBot, ua, browser, device, engine },
            isMobile: (device.type === 'mobile' || device.type === 'tablet') ? true : false,
            msg: "Okey"
        })
    } catch (error) {
        return Response.json({
            status: 500,
            isMobile: false,
            msg: "Error: ", error
        })
    }
}