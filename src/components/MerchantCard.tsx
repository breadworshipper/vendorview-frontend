import Image from "next/image";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem } from "./ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { Button } from "./ui/button";

const MerchantCard = ({ isCollapsed }: { isCollapsed: boolean }) => {
  if (isCollapsed) {
    return (
      <Image
        src={"https://picsum.photos/200"}
        width={30}
        height={30}
        alt="vendor image"
        className="rounded-full"
      />
    );
  }
  return (
    <div className="w-full h-max border-2 p-4 border-slate-500 dark:bg-black rounded-md flex flex-col gap-4">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className="font-extrabold">Vendor Name</span>
          <Badge className="w-max">Vendor tag</Badge>
        </div>
        <div>
          <Image
            src={"https://picsum.photos/200"}
            width="50"
            height="50"
            alt="vendor image"
            className="rounded-full"
          />
        </div>
      </div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1" className="flex flex-col gap-4 border-0">
          <AccordionTrigger asChild>
            <Button>show menu</Button>
          </AccordionTrigger>
          <AccordionContent asChild>
            <div className="flex justify-between w-full h-max p-4 gap-2 border border-slate-400 rounded-md">
              <span className="max-w-full text-ellipsis overflow-hidden">
                Menu nameasdfasedfasdfasdfawefwaef
              </span>
              <span>Menu price</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MerchantCard;
