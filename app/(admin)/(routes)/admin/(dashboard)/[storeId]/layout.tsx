"use client";

import getCurrentUser from "@/actions/getCurrentUser";
import getFirstStore from "@/actions/getFirstStore";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // const user = await getCurrentUser();

  // const store = await getFirstStore(user?.id as string, params.storeId);

  return (
    <>
      <div>This is nav bar</div>
      {children}
    </>
  );
}
