import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { User } from "@prisma-client-mongo";

export async function GET(request: Request) {
  try {
    const currentUser = (await getCurrentUser()) as User;
    const { hashedPassword, ...user } = currentUser;
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "SAVE USER SETTING ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
