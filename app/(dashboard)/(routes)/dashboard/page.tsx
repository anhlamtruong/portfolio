import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div>
      <p className="text-3xl font-medium text-sky-700">
        This is a protected dashboard page ?
      </p>
      <UserButton afterSignOutUrl="/dashboard"></UserButton>
    </div>
  );
}
