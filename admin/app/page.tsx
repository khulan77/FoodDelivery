"use client";

import useSWR from "swr";
import { Dispatch, SetStateAction } from "react";
import { columns } from "@/app/_components/orders/columns";
import { DataTable } from "@/app/_components/orders/DataTable";
import TableSkeleton from "@/app/_components/orders/TableSkeleton";
import { fetchAllOrders, OrdersResponse } from "@/services/get-all-order";

export default function AdminOrders() {
  const { data, isLoading, error, mutate } = useSWR<OrdersResponse>("api-orders", fetchAllOrders);

  if (isLoading) return <TableSkeleton />;
  if (error) return <div className="py-6 pl-6 pr-10 text-destructive">Failed to load orders: {error.message}</div>;

  const setFoodOrders: Dispatch<SetStateAction<AllFoodOrders[] | undefined>> = (value) => {
    mutate(
      (current) => {
        if (!current) return current;
        const prev = current.orders;
        const next: AllFoodOrders[] = typeof value === "function" ? (value(prev) ?? []) : (value ?? []);
        return { ...current, orders: next };
      },
      { revalidate: false },
    );
  };

  return (
    <div className="py-6 pl-6 pr-10">
      <DataTable columns={columns} data={data?.orders ?? []} setFoodOrders={setFoodOrders} />
    </div>
  );
}
