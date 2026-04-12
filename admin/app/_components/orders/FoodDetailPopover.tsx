"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type FoodDetailPopoverProps = {
  foodOrderItems: FoodOrderItem[];
};

const isSingleFood = (count: number) => (count === 1 ? `${count} food` : `${count} foods`);

const FoodDetailPopover = ({ foodOrderItems }: FoodDetailPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between w-40 h-full px-4 border-none shadow-none bg-inherit hover:bg-accent/50 p-0">
          <span>{isSingleFood(foodOrderItems.length)}</span>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="flex flex-col gap-3" alignOffset={-16}>
        {foodOrderItems.map(({ food, quantity }, index) => (
          <div key={index} className="flex gap-2.5 items-center text-sm">
            <div className="relative w-8 h-8 shrink-0">
              {food.image ? (
                <Image src={food.image} fill className="rounded-sm object-cover" alt={food.name} />
              ) : (
                <div className="w-8 h-8 rounded-sm bg-accent" />
              )}
            </div>
            <span className="flex-1 truncate">{food.name}</span>
            <span className="text-muted-foreground">{`×${quantity}`}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default FoodDetailPopover;
