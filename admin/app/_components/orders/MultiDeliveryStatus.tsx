"use client";

import { X } from "lucide-react";
import { getBorderColor } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FoodOrderStatusEnum } from "@/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { updateMultipleOrder } from "@/services/update-multiple-order";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type MultiDeliveryStatusProps = {
  selectedColumnIds: string[];
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
  setFoodOrders: Dispatch<SetStateAction<AllFoodOrders[] | undefined>>;
};

const statusOptions = Object.values(FoodOrderStatusEnum);

const formatStatus = (status: string) => status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const MultiDeliveryStatus = ({ selectedColumnIds, setRowSelection, setFoodOrders }: MultiDeliveryStatusProps) => {
  const [statusState, setStatusState] = useState<FoodOrderStatusEnum>(FoodOrderStatusEnum.PENDING);

  const handleChangeStatus = (status: FoodOrderStatusEnum) => () => {
    setStatusState(status);
  };

  const handleSaveStatus = async () => {
    await updateMultipleOrder(selectedColumnIds, { status: statusState });
    setFoodOrders((prev) => prev?.map((order) => (selectedColumnIds.includes(order._id) ? { ...order, status: statusState } : order)));
    setRowSelection({});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" disabled={!selectedColumnIds.length}>
          Change delivery state
          {selectedColumnIds.length > 0 && (
            <Badge className="ml-1 rounded-full" variant="secondary">
              {selectedColumnIds.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-105 gap-6">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="mt-1 text-sm font-medium">Change delivery state</DialogTitle>
          <DialogClose asChild>
            <Button type="button" className="px-2 py-2 -mt-2 rounded-full bg-muted w-7 h-7" variant="secondary">
              <X size={12} strokeWidth={1.5} />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Button
              onClick={handleChangeStatus(option)}
              variant="outline"
              className="h-8 text-xs font-medium rounded-full px-3"
              key={option}
              style={
                statusState === option
                  ? {
                      backgroundColor: getBorderColor(option),
                      color: "#fff",
                      borderColor: getBorderColor(option),
                    }
                  : { borderColor: getBorderColor(option), color: getBorderColor(option) }
              }
            >
              {formatStatus(option)}
            </Button>
          ))}
        </div>

        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button className="w-full h-9 rounded-full" onClick={handleSaveStatus}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultiDeliveryStatus;
