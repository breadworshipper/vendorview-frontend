"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-4 cursor-pointer">
          <span className="hidden sm:flex items-center font-bold">{`hello, ${"username"}`}</span>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="https://picsum.photos/200"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
              priority={true}
            />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={10}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div
            className="flex gap-3"
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          >
            <span>Dark Mode</span> <Switch checked={theme == "dark"} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
