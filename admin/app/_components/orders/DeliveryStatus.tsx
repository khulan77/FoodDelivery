"use client";
import { getBorderColor } from "@/lib";
import { ChevronsUpDown } from "lucide-react";
import { FoodOrderStatusEnum } from "@/constants";
import { updateOrder } from "@/services/update-order";
import { Dispatch, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DeliveryStatusProps = {
  status: FoodOrderStatusEnum;
  orderId: string;
  setFoodOrders: Dispatch<SetStateAction<AllFoodOrders[]>>;
};

const statusOptions = Object.values(FoodOrderStatusEnum);

const formatStatus = (status: string) => status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const DeliveryStatus = ({ status, orderId, setFoodOrders }: DeliveryStatusProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSaveStatus = (option: FoodOrderStatusEnum) => async () => {
    if (status === option) return;
    setPopoverOpen(false);
    await updateOrder(orderId, { status: option });
    setFoodOrders((prev) => prev.map((order) => (order._id === orderId ? { ...order, status: option } : order)));
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <div className="border rounded-full px-2.5 flex items-center h-8 text-xs font-semibold gap-2" style={{ borderColor: getBorderColor(status) }}>
          <span style={{ color: getBorderColor(status) }}>{formatStatus(status)}</span>
          <ChevronsUpDown size={14} style={{ color: getBorderColor(status) }} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-1 w-41.25" align="start">
        {statusOptions.map((option) => (
          <div className="flex items-center px-2 py-1.5 rounded-sm cursor-pointer hover:bg-accent" key={option} onClick={handleSaveStatus(option)}>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full w-full"
              style={
                option === status
                  ? {
                      backgroundColor: getBorderColor(option),
                      color: "#fff",
                    }
                  : { color: getBorderColor(option) }
              }
            >
              {formatStatus(option)}
            </span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default DeliveryStatus;
