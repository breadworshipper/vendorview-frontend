import Image from "next/image";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem } from "./ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { Button } from "./ui/button";
import { currentSelectedVendor, vendor } from "./jotai/vendor";
import { XCircleIcon } from "lucide-react";

const MerchantCard = ({
  currentVendor,
  closeCurrentVendor,
}: {
  currentVendor: currentSelectedVendor;
  closeCurrentVendor: Function;
}) => {
  return (
    <div className="w-full h-max border-2  border-slate-500 dark:bg-black rounded-md relative gap-2">
      <div className="flex flex-col w-full h-max gap-4 p-4">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span className="font-extrabold">{currentVendor.name}</span>
            <Badge className="w-max">{currentVendor.tag}</Badge>
          </div>
          <div className="flex">
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
          <AccordionItem
            value="item-1"
            className="flex flex-col gap-4 border-0"
          >
            <AccordionTrigger asChild>
              <Button>show menu</Button>
            </AccordionTrigger>
            <AccordionContent asChild>
              <div className="flex flex-col justify-start w-full h-max p-4 gap-2 border border-slate-400 rounded-md">
                {currentVendor.menu.map((item, index) => {
                  return (
                    <div className="flex w-full justify-between">
                      <span className="max-w-full text-ellipsis overflow-hidden">
                        {item.name}
                      </span>
                      <span>{item.price}</span>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <XCircleIcon
        className="absolute -top-3 -right-3 w-8 h-8 cursor-pointer bg-background rounded-full"
        onClick={() => {
          closeCurrentVendor();
        }}
      />
    </div>
  );
};

export default MerchantCard;
