import getCurrentUser from "@/actions/getCurrentUser";
import getFirstStore from "@/actions/getFirstStore";
import { ModalProvider } from "@/providers/modal_provider";
import { redirect } from "next/navigation";
import prismaMySQL from "@/lib/service/prisma_mysql";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/sign-in");
  }
  const store = await prismaMySQL.store.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (store) {
    redirect(`/admin/${store.id}`);
  }
  return <>{children}</>;
};

export default AdminLayout;
