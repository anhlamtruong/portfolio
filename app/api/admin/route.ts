import getCurrentUser from "@/actions/getCurrentUser";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.redirect(new URL("/sign-in"));
    }

    const store = await prismaMySQL.store.findFirst({
      where: { userId: user.id },
    });

    if (store) {
      return NextResponse.json(store);
    } else {
      return NextResponse.redirect(new URL("http://localhost:3000/admin"));
    }
  } catch (error) {
    console.log(error, "ADMIN ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
