"use client";

import getCurrentUser from "@/actions/getCurrentUser";
import getFirstStore from "@/actions/getFirstStore";
import NavigationBar from "@/app/(admin)/_components/admin_navigation_bar";
import UserButton from "@/app/(auth)/_components/auth_account_button";
import LoadingCarrot from "@/components/ui/loading/loading-carrot";
import { Skeleton } from "@/components/ui/skeleton";
import useAsyncDataFetcher from "@/hooks/useAsyncDataFetcher";
import { useStoreModal } from "@/hooks/useStoreModal";
import { ModalProvider } from "@/providers/modal_provider";
import { Store } from "@prisma-client-mysql";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const router = useRouter();
  const { data, isLoading, error } = useAsyncDataFetcher<Store>("/api/admin");

  useEffect(() => {
    if (!data?.id || error) {
      router.push(`/admin`);
    }
  }, [data, error, router]);
  if (isLoading) {
    return <LoadingCarrot text={"Loading Dashboard"}></LoadingCarrot>;
  }
  if (!data?.id) {
    return <Skeleton></Skeleton>;
  }

  return error ? (
    <div>{error.massage}</div>
  ) : (
    <>
      <NavigationBar></NavigationBar>
      <div>This is nav bar</div>
      {children}
    </>
  );
}
