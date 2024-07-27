import UserProfile from "./profile/UserProfile";
import { PanelLeft } from "lucide-react";
import MobileSideNav from "../navigation/mobile-side-nav/MobileSideNav";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle-theme";

export default function Header() {
  return (
    <header
      className=" flex h-14 items-center justify-end gap-4 px-4 bg-transparent py-6"
      onResize={() => {}}
    >
      <div className="flex gap-4 bg-background rounded-full w-max px-3 py-1 shadow-md">
        <UserProfile />
      </div>
    </header>
  );
}
