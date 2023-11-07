import { PrismaClient as PrismaClientMySQL } from "@prisma-client-mysql";

declare global {
  var prismaMySQL: PrismaClientMySQL | undefined;
}

const prismaMySQL =
  global.prismaMySQL ||
  new PrismaClientMySQL({
    log: ["query", "error", "warn"],
  });

prismaMySQL.$on("error" as never, (e) => {
  console.error("Prisma MySQL Client Error:", e);
});

if (process.env.NODE_ENV !== "production") global.prismaMySQL = prismaMySQL;

export default prismaMySQL;
