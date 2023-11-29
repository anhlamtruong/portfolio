import prismaMySQL from "@/lib/service/prisma_mysql";
import prismaMongoDb from "@/lib/service/prisma_mongodb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { name } = body;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name of the Store is required", { status: 400 });
    }
    const duplicateStore = await prismaMySQL.store.findFirst({
      where: {
        name: name,
        userId: user.id,
      },
    });
    if (duplicateStore) {
      return new NextResponse(" Store Already Created ", {
        status: 406,
      });
    }
    const store = await prismaMySQL.store.create({
      data: {
        name: name,
        userId: user.id,
      },
    });
    if (!store) {
      return new NextResponse("Could not create store", {
        status: 403,
      });
    }

    const userMongo = await prismaMongoDb.user.findUnique({
      where: {
        email: user?.email as string,
        id: user?.id,
      },
    });
    if (!userMongo) {
      return new NextResponse("Could not find user to assign store", {
        status: 402,
      });
    } else {
      userMongo.storeIds.push(store.id);
    }

    const updatedUserMongo = await prismaMongoDb.user.update({
      where: {
        email: user?.email as string,
      },
      data: {
        storeIds: {
          push: store.id, // Using the push operation to add the new store ID
        },
      },
    });

    if (!updatedUserMongo) {
      return new NextResponse("Could not update store id to user", {
        status: 405,
      });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
