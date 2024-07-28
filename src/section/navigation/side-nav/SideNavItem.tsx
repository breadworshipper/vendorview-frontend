"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ReactElement } from "react";
import { NavRouteItem } from "../interface";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function SideNavItem({
  data,
  isCollapsed,
}: {
  data: NavRouteItem;
  isCollapsed: Boolean;
}) {
  const { link, title, startIcon, endIcon } = data;
  const path = usePathname();
  const active = link == path;
  if (!isCollapsed) {
    return (
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "default", size: "sm" }),
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
          "justify-start"
        )}
      >
        <data.startIcon className="mr-2 h-4 w-4" />
        {title}
        {data.endIcon && (
          <span className={cn("ml-auto", "text-background dark:text-white")}>
            <data.endIcon className="" />
          </span>
        )}
      </Link>
    );
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={link}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
            active
              ? "shrink-0 gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base hover:scale-110 hover:text-primary-foreground"
              : ""
          }`}
        >
          <data.startIcon />
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
}
