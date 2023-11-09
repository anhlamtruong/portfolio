import bcrypt from "bcrypt";

import prismaMongoDb from "@/lib/service/prisma_mongodb";
import { NextResponse } from "next/server";
import { UserStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, username } = body;

    if (!email || !username || !password) {
      return new NextResponse("Missing information", {
        status: 404,
        statusText: "Missing information from user",
      } as ResponseInit);
    }
    const SALTED_ROUNDS = 12;

    const hashedPassword = await bcrypt.hash(password, SALTED_ROUNDS);
    const user = await prismaMongoDb.user.create({
      data: {
        email,
        username,
        hashedPassword,
        status: UserStatus.ACTIVE,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
