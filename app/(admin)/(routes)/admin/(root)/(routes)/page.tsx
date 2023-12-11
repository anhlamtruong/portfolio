"use client";

import UserButton from "@/app/(auth)/_components/auth_account_button";
import LoadingCarrot from "@/components/ui/loading/loading-carrot";
import useAsyncDataFetcher from "@/hooks/useAsyncDataFetcher";
import { useStoreModal } from "@/hooks/useStoreModal";
import { ModalProvider } from "@/providers/modal_provider";
import { Store } from "@prisma-client-mysql";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const AdminPage: React.FC = ({}) => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const onClose = useStoreModal((state) => state.onClose);
  const isOpen = useStoreModal((state) => state.isOpen);
  const router = useRouter();

  const { data, isLoading, error } = useAsyncDataFetcher<Store>("api/admin");

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
    if (data?.id) {
      onClose();
      router.push(`/admin/${data.id}`);
      // window.location.assign(`/admin/${data.id}`);
    }
  }, [onOpen, isOpen, data, onClose, router]);
  if (isLoading) {
    return <LoadingCarrot text={"Store is Loading"}></LoadingCarrot>;
  }

  return (
    <div>
      <ModalProvider />
      <div className="text-3xl font-medium p-4">admin page</div>
    </div>
  );
};
export default AdminPage;
