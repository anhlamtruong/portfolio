/** @tsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useStyles } from "@/hooks/useStyles";
import { HoverAnimationWrapper } from "@/components/animation/animation";
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const styles = useStyles();

  const isActive =
    (pathname === "/" && href === "/") ||
    (pathname === "/dashboard" && href === "/dashboard") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onCLick = () => {
    router.push(href);
  };
  return (
    <div
      style={styles.borderPrimaryColor}
      className={cn(isActive && "border-r-2")}
    >
      <HoverAnimationWrapper
        defaultStyle={isActive ? styles.sidebarItemActive : styles.sidebarItem}
        hoverStyle={
          isActive ? styles.sidebarItemActiveHover : styles.sidebarItemHover
        }
      >
        <button
          onClick={onCLick}
          type="button"
          className={cn(
            "flex items-center justify-center gap-x-2  text-sm font-[500] pl-6 transition-all "
          )}
        >
          <div className=" flex items-center gap-x-2 py-4">
            <Icon size={22}></Icon>
            <div>{label}</div>
          </div>
        </button>
      </HoverAnimationWrapper>
    </div>
  );
};

export default SidebarItem;
