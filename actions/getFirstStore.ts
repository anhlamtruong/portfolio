import prismaMySQL from "@/lib/service/prisma_mysql";

const getFirstStore = async (userId: string, storeId: string) => {
  try {
    const firstStore = await prismaMySQL.store.findFirst({
      where: {
        userId: userId,
        id: storeId,
      },
    });

    if (!firstStore) {
      return null;
    }

    return firstStore;
  } catch (error: any) {
    return null;
  }
};

export default getFirstStore;
