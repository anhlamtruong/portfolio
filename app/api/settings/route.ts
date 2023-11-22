import prismaMongoDb from "@/lib/service/prisma_mongodb";
import { NextResponse } from "next/server";
import { UserStatus } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image, username, email } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prismaMongoDb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
        email: email,
        username: username,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "SAVE USER SETTING ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
