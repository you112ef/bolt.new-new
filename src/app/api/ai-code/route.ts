import { GenAICode } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { prompt } = await req.json();
    try{
        const result = await GenAICode.sendMessage(prompt)
        const res= await result.response.text();
         return NextResponse.json(JSON.parse(res));
        
    }catch(err:any){
        console.error("Error processing request:", err);
        return NextResponse.json({
            error: err.message || "Internal Server Error"
        });
    }
}