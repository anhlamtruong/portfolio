"use client";

import useAsyncDataFetcher from "@/hooks/useAsyncDataFetcher";
import { Store } from "@prisma-client-mysql";

const DashBoardPage = () => {
  const { data, isLoading, error } = useAsyncDataFetcher<Store>("/api/admin");

  return <div>This is a dash board page {`${data?.name}`}</div>;
};

export default DashBoardPage;
