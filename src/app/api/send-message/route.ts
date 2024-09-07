import dbConnect from "@/lib/dbConnect";
import MessageModel from "@/model/Message";
import { NextRequest, NextResponse } from "next/server";
import { ws } from "@/app/socket";

export async function POST(request: NextRequest, response: NextResponse) {
    await dbConnect();

    try {
        const {message} = await request.json();

        if(!message) return NextResponse.json({success: false, message: "Message not found"});

        console.log(message)

        const newMessage = await new MessageModel({
            message : message
        });

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            ws.send(message);
        }

        ws.onclose = () => {
            console.log("Disconnected from WebSocket server");
        }

        await newMessage.save();

        return NextResponse.json({success: true, message: "Message sent"});
    } catch (error) {
        console.log( "error while sending message",error);
        
        NextResponse.json({
            success : false,
            message : "something went wrong to send message"
        })
    }
}