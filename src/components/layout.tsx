"use client";

import { ReactNode, useEffect, useState } from "react";
import { TooltipProvider } from "./ui/tooltip";
import SideNav from "@/section/navigation/side-nav/SideNav";
import Header from "@/section/header/header";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "./jotai/user";
import { useRouter } from "next/navigation";
import useAxios from "./api/use-axios";

export default function Layout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const loginRoute = path.startsWith("/login");
  const registerRoute = path.startsWith("/register");

  const showMap = !loginRoute && !registerRoute;

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [user, setUser] = useAtom(userAtom);

  const router = useRouter();
  useEffect(() => {
    if (user?.is_street_vendor) {
      router.push("/vendor-dashboard");
    }
    // else if (localStorage.getItem("accessToken") == null) {
    //   router.push("/login");
    // }
  }, []);

  useAxios<any>({
    method: "get",
    url: "/auth/get-current-user",
    fetchOnRender: true,
    isAuthorized: true,
    callback: {
      onSuccess(data) {
        setUser(data);
      },
      onError(error) {
        setUser(null);
      },
    },
  });

  return (
    <main className="size-full">
      <TooltipProvider delayDuration={0}>
        {showMap && (
          <div className="size-full relative bg-muted/40">
            <div className="fixed z-50 bottom-5 w-full px-5 md:px-0 md:left-5 md:w-max md:top-5 h-max">
              <SideNav />
            </div>
            <div className="fixed z-50 top-5 right-0">
              <Header />
            </div>
            <div className="relative size-full z-10 flex-grow overflow-auto">
              {children}
            </div>
          </div>
        )}
        {!showMap && <div className="size-full bg-muted/40">{children}</div>}
      </TooltipProvider>
    </main>
  );
}
