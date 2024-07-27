import { LucideIcon } from "lucide-react";
import { ReactElement, ReactNode } from "react";

export interface NavRouteItem {
    title: string,
    link: string,
    startIcon: LucideIcon,
    endIcon: LucideIcon | null,
}

export interface NavProps {
    links: NavRouteItem[]
    isCollapsed: boolean
    toggleMenu: Function
}