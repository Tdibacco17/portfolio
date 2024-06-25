import { LocaleType } from "@/utils/dictionaries";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const newLang: LocaleType = await request.json();

        cookies().set({
            name: 'lang',
            value: newLang,
            maxAge: 24 * 60 * 60, // One day
            sameSite: 'strict',
            path: '/',
        })
        return NextResponse.json({ status: 201, msg: 'Cookie set successfully' });
    } catch (error) {
        return NextResponse.json({ status: 500, msg: "Error: " + error });
    }
}