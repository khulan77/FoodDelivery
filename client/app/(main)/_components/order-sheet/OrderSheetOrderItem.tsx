import { Badge } from "@/components/ui/badge";
import { AllFoodOrders } from "@/types";
import { formatMoney } from "@/lib";
import { Map, Soup, Timer } from "lucide-react";
import { format } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
  pending: "border-yellow-400 text-yellow-600",
  confirmed: "border-blue-400 text-blue-600",
  preparing: "border-orange-400 text-orange-600",
  out_for_delivery: "border-purple-400 text-purple-600",
  delivered: "border-green-500 text-green-600",
  cancelled: "border-gray-400 text-gray-500",
};

export const OrderSheetOrderItem = ({ order }: { order: AllFoodOrders }) => {
  const borderColor = STATUS_COLORS[order.status] ?? "border-gray-300";
  const firstFood = order.items[0];
  const extraCount = order.items.length - 1;

  return (
    <div className="space-y-3 border-b border-border pb-3 last:border-0">
      <div className="flex items-center justify-between">
        <h4 className="font-bold">{formatMoney(order.totalAmount)}₮</h4>
        <Badge variant="outline" className={`rounded-full ${borderColor}`}>
          {order.status.replace(/_/g, " ")}
        </Badge>
      </div>

      {firstFood && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Soup strokeWidth={1} size={16} />
            <p className="text-muted-foreground text-xs">
              {firstFood.food.name}
              {extraCount > 0 && ` +${extraCount} more`}
            </p>
          </div>
          <p className="text-muted-foreground text-xs">x {firstFood.quantity}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Timer strokeWidth={1} size={16} />
        <p className="text-muted-foreground text-xs">{format(new Date(order.createdAt), "yyyy/MM/dd")}</p>
      </div>

      <div className="flex items-center gap-2">
        <Map strokeWidth={1} size={16} />
        <p className="text-muted-foreground text-xs truncate w-11/12">{order.deliveryAddress}</p>
      </div>
    </div>
  );
};
