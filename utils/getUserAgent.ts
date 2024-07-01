export interface ParseResponseInterface {
    status: number,
    isMobile: boolean,
    msg: string
}

export const getUserAgent = async (headerList: string | null): Promise<{ isMobile: boolean }> => {
    const response = await fetch(`${process.env.BASE_PATH}/api/userAgent`, {
        method: 'POST',
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json",
            'User-Agent': `${headerList}`
        },
    });
    const rawResponse: ParseResponseInterface = await response.json()

    if (rawResponse.status !== 201) {
        console.log(rawResponse.msg)
        return { isMobile: rawResponse.isMobile }
    }
    return { isMobile: rawResponse.isMobile }
}