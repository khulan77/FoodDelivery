"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { fetchAllOrders } from "@/lib/services/get-all-order";
import { AllFoodOrders } from "@/types";
import { useEffect, useState } from "react";

export const OrderSheetOrders = () => {
  const [orders, setOrders] = useState<AllFoodOrders[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllOrders();
      setOrders(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <Card className="h-[87%] overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle>Order history</CardTitle>
      </CardHeader>

      <CardContent className="p-4 h-full overflow-y-auto pb-10 space-y-4">
        {loading && <p className="text-muted-foreground text-sm">Loading orders…</p>}
        {!loading && orders.length === 0 && <p className="text-muted-foreground text-sm">No orders yet.</p>}
        {orders.map((order) => (
          <OrderSheetOrderItem key={order._id} order={order} />
        ))}
      </CardContent>
    </Card>
  );
};
