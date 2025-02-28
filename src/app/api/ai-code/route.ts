import { GenAICode } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { prompt } = await req.json();
    try {
        console.log("Sending request to GenAICode with prompt:");
        const result = await GenAICode.sendMessage(prompt);
        console.log("Received result:");

        const res = await result.response.text();
        return NextResponse.json(JSON.parse(res));
    } catch (err: any) {
        console.error("Error processing request:", err);
        return NextResponse.json({
            error: "Internal Server Error"
        });
    }
}
