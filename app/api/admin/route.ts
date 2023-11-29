import getCurrentUser from "@/actions/getCurrentUser";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
    return new NextResponse("There is no store for this user", { status: 101 });
  }
}
