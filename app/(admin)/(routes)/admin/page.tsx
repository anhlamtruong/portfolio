"use client";

import UserButton from "@/app/(auth)/_components/auth_account_button";
import { useStoreModal } from "@/hooks/useStoreModal";

import React, { useEffect } from "react";

const AdminPage: React.FC = ({}) => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);

  return (
    <div>
      <div className="text-3xl font-medium p-4">
        <UserButton initialData={null}></UserButton>
      </div>
    </div>
  );
};
export default AdminPage;
