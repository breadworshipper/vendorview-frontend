"use client";

import { ReactNode, useState } from "react";
import { TooltipProvider } from "./ui/tooltip";
import SideNav from "@/section/navigation/side-nav/SideNav";
import Header from "@/section/header/header";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const router = usePathname();
  const isAuthRoute = router.startsWith("/auth");

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <main className='size-full'>
      <TooltipProvider delayDuration={0}>
        <div className='size-full flex flex-row bg-muted/40'>
          {!isAuthRoute && (
            <SideNav
              links={[]}
              isCollapsed={isCollapsed}
              toggleMenu={toggleMenu}
            />
          )}
          <div className='flex flex-col sm:gap-4 sm:py-4 size-full overflow-auto'>
            {!isAuthRoute && <Header />}
            <div className='flex-grow overflow-auto'>{children}</div>
          </div>
        </div>
      </TooltipProvider>
    </main>
  );
}
