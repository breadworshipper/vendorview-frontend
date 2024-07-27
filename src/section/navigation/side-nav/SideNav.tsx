"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import SideNavItem from "./SideNavItem";
import { LayoutDashboard, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavProps } from "../interface";
import { cn } from "@/lib/utils";
import MerchantCard from "@/components/MerchantCard";

export default function SideNav({ links, isCollapsed, toggleMenu }: NavProps) {
  const sideNavContent = links.map((item, index) => {
    return (
      <SideNavItem
        data={item}
        isCollapsed={isCollapsed}
        key={`${index}-sidenav-item`}
      />
    );
  });
  return (
    <>
      <div
        data-collapsed={isCollapsed}
        className={cn(
          "inset-y-0 left-0 w-14 flex-col bg-transparent flex",
          !isCollapsed && "w-96"
        )}
      >
        <nav
          className={cn(
            "flex flex-col items-center gap-4 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2",
            isCollapsed ? "" : "w-96"
          )}
        >
          <Link
            href="#"
            className={cn(
              "flex h-9 items-center justify-start rounded-lg text-foreground transition-colors",
              isCollapsed ? "w-full" : "w-full"
            )}
          >
            <Button
              size="icon"
              variant={"secondary"}
              onClick={() => {
                toggleMenu();
              }}
              className={cn(
                "w-full bg-white dark:bg-black dark:text-white shadow-md",
                isCollapsed ? "" : ""
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </Link>
          <div className={cn(isCollapsed ? "" : "w-full")}>
            <MerchantCard isCollapsed={isCollapsed} />
          </div>
          {sideNavContent}
        </nav>
      </div>
    </>
  );
}
