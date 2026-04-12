import { Column } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import MultiDeliveryStatus from "./MultiDeliveryStatus";
import { TableRangeSelector } from "./TableRangeSelector";

type TableCustomHeaderProps<TData> = {
  setFoodOrders: Dispatch<SetStateAction<AllFoodOrders[] | undefined>>;
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
  totalOrders: number;
  tableColumn: Column<TData, unknown> | undefined;
  selectedColumnIds: string[];
};

const TableCustomHeader = <TData,>({ setFoodOrders, totalOrders, setRowSelection, selectedColumnIds, tableColumn }: TableCustomHeaderProps<TData>) => {
  return (
    <div className="p-4 h-19 flex justify-between w-full">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-foreground">Orders</h1>
        <p className="text-xs text-muted-foreground">{totalOrders} items</p>
      </div>
      <div className="flex gap-3">
        <TableRangeSelector tableColumn={tableColumn} />
        <MultiDeliveryStatus setRowSelection={setRowSelection} selectedColumnIds={selectedColumnIds} setFoodOrders={setFoodOrders} />
      </div>
    </div>
  );
};

export default TableCustomHeader;
