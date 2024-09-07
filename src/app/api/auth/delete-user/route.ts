import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function DELETE () {
    dbConnect();

    try {
        //  delelte all users from database
        const users = await UserModel.deleteMany({});
        return new Response(JSON.stringify({ success: true, data: users }));
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Something went wrong" }));
    }
}