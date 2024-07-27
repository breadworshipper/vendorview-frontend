"use client";

import { ReactNode, useState } from "react";
import { TooltipProvider } from "./ui/tooltip";
import SideNav from "@/section/navigation/side-nav/SideNav";
import Header from "@/section/header/header";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const router = usePathname();
  const loginRoute = router.startsWith("/login");
  const registerRoute = router.startsWith("/register");

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <main className="size-full">
      <TooltipProvider delayDuration={0}>
        <div className="size-full relative bg-muted/40">
          {!loginRoute && !registerRoute && (
            <div className="absolute z-50 w-full top-5">
              <SideNav
                links={[]}
                isCollapsed={isCollapsed}
                toggleMenu={toggleMenu}
              />
              <div className="absolute z-50 top-0 right-0">
                <Header />
              </div>
            </div>
          )}
          <div className="relative size-full z-10 flex-grow overflow-auto">
            {children}
          </div>
        </div>
      </TooltipProvider>
    </main>
  );
}
