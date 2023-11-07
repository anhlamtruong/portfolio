import { PrismaClient as PrismaClientMongoDb } from "@prisma-client-mongo";

declare global {
  var prismaMongoDb: PrismaClientMongoDb | undefined;
}

const prismaMongoDb =
  global.prismaMongoDb ||
  new PrismaClientMongoDb({
    log: ["query", "error", "warn"],
  });

prismaMongoDb.$on("error" as never, (e) => {
  console.error("Prisma MongoDB Client Error:", e);
});

if (process.env.NODE_ENV !== "production") global.prismaMongoDb = prismaMongoDb;

export default prismaMongoDb;
