import { GenAICode } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

async function fetchAIResponse(prompt: string, retries = 3, timeout = 8000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Attempt ${i + 1}: Sending request to GenAICode`);
            
            // Timeout wrapper
            const result = await Promise.race([
                GenAICode.sendMessage(prompt),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("AI API Timeout")), timeout)
                ),
            ]);

            if (!result || !result.response) throw new Error("Invalid API response");
            
            const resText = await result.response.text();
            console.log("Received result:", resText);
            
            return JSON.parse(resText);
        } catch (err) {
            console.warn(`Error in attempt ${i + 1}:`, err);
            if (i === retries - 1) throw err; // Throw error after retries
        }
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { prompt } = await req.json();
        const response = await fetchAIResponse(prompt);
        return NextResponse.json(response);
    } catch (err: any) {
        console.error("Final error processing request:", err);
        return NextResponse.json({ error: err.message || "Internal Server Error" });
    }
}
