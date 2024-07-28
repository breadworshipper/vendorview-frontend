"use client";

import { ReactElement } from "react";
import { NavRouteItem } from "../interface";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Package2 } from "lucide-react";

export default function MobileSideNav({
  links,
  isOpen,
  children,
}: {
  links: NavRouteItem[];
  isOpen: boolean;
  children: ReactElement;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="sm:max-w-sx">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {links.map((item, index) => {
            return (
              <Link
                key={`${index}-sheet-nav-item`}
                href={item.link}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.startIcon className="h-5 w-5" />
                <span className="">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
