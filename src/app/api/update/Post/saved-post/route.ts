import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest, response : NextResponse) {
    await dbConnect();

    try {
        
    } catch (error) {
        
    }
}