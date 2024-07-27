import UserProfile from "./profile/UserProfile";
import { PanelLeft } from "lucide-react";
import MobileSideNav from "../navigation/mobile-side-nav/MobileSideNav";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle-theme";

export default function Header() {
  const CurrentDate = () => {
    const date = new Date().toDateString();
    return (
      <span className="hidden ml-auto sm:flex items-center">{`${date}`}</span>
    );
  };
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileSideNav links={[]} isOpen={true}>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </MobileSideNav>

      <CurrentDate />

      <ModeToggle />
      <UserProfile />
      {/* <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div> */}
    </header>
  );
}
