import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function ProfilePages() {
  const user = await getCurrentUser();
  return <Button> {user?.name} </Button>;
}
