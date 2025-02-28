import { GenAICode } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { prompt } = await req.json();
        console.log("Sending request to GenAICode with prompt:", prompt);

        // Directly call the API without redundant awaits
        const result = await GenAICode.sendMessage(prompt);
        const res = result.response;

        if (!res.ok) {
            throw new Error(`API responded with status: ${res.status}`);
        }

        const data = await res.json(); // Use `.json()` instead of `.text()` + `JSON.parse()`
        console.log("Received result successfully.");
        
        return NextResponse.json(data);
    } catch (err: any) {
        console.error("Error processing request:", err.message || err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
