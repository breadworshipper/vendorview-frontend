import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
const Loading = ({ size }: { size: string }) => {
  return <LoaderCircle className={cn("animate-spin", size)} />;
};

export default Loading;
