import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <p className="text-3xl font-medium text-sky-700">
        This is a unprotected page ? Home page
      </p>
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
}
