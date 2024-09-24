import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export interface IrecommendedUser {
    _id: string;
    profileImage: string;
    userName: string;
    fullName: string;
} 

export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        const cookieString = request.headers.get("cookie");
        const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
        const tokenUser = decodeToken(accessToken as string);

        if (!accessToken) {
            return NextResponse.json({
                success: false,
                message: "accessToken not found"
            }, {
                status: 404
            });
        }

        if (!tokenUser) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, {
                status: 404
            });
        }

        const user = await UserModel.findById(tokenUser.userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, {
                status: 404
            });
        }

        // Get followers and following
        const followers = await UserModel.find({ _id: { $in: user.followers } });
        const following = await UserModel.find({ _id: { $in: user.following } });

        // Create a set to hold unique user IDs for recommendations
        const recommendedUserIds = new Set();

        // Get recommendations based on following users' following
        for (const followedUser of following) {
            const followedUserDetails = await UserModel.findById(followedUser._id);
            if (followedUserDetails && followedUserDetails.following) {
                followedUserDetails.following.forEach((followedId : string) => {
                    if (followedId.toString() !== user._id.toString()) {
                        recommendedUserIds.add(followedId);
                    }
                });
            }
        }

        // Fetch unique user data for recommendations
        const recommendations = await UserModel.find({
            _id: { $in: Array.from(recommendedUserIds) }
        }).select('userName profileImage fullName ');

        return NextResponse.json({
            success: true,
            data : recommendations as IrecommendedUser[],
        }, {
            status: 200
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "An error occurred"
        }, {
            status: 500
        });
    }
}
