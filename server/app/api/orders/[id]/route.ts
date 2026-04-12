import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models";
import { getAuthUser, handleApiError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { ORDER_STATUSES, PAYMENT_STATUSES } from "@/constants";

export const GET = async (request: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    await connectDB();

    const authUser = getAuthUser(request);

    const order = await OrderModel.findById(id).populate("user", "name email").populate("items.food", "name price image");

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (authUser.role !== "admin" && order.user.toString() !== authUser.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

export const PUT = async (request: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    await connectDB();

    const authUser = getAuthUser(request);

    if (authUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { status, paymentStatus } = await request.json();

    if (status && !ORDER_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Valid values: ${ORDER_STATUSES.join(", ")}` }, { status: 400 });
    }

    if (paymentStatus && !PAYMENT_STATUSES.includes(paymentStatus)) {
      return NextResponse.json({ error: `Invalid paymentStatus. Valid values: ${PAYMENT_STATUSES.join(", ")}` }, { status: 400 });
    }

    const order = await OrderModel.findById(id);

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (status) order.status = status;

    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    const populated = await order.populate([
      { path: "user", select: "name email" },
      { path: "items.food", select: "name price image" },
    ]);

    return NextResponse.json({ message: "Order updated", order: populated });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    await connectDB();

    const authUser = getAuthUser(request);

    const order = await OrderModel.findById(id);

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (authUser.role === "admin") {
      await order.deleteOne();
      return NextResponse.json({ message: "Order deleted" });
    }

    if (order.user.toString() !== authUser.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!["pending", "confirmed"].includes(order.status)) {
      return NextResponse.json({ error: "Order cannot be cancelled once it is being prepared or delivered" }, { status: 400 });
    }

    order.status = "cancelled";
    await order.save();

    return NextResponse.json({ message: "Order cancelled", order });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
