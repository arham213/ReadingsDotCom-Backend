import { Order } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const getAllOrders = async () => {
    const orders = await Order.find()
    .populate("deliveryAddressId")
    .populate("billingAddressId")
    .populate("orderItems.bookId")

    return orders;
}

export const getOrdersByUser = async (userId) => {
    const order = await Order.find({ userId })
    .populate("deliveryAddressId")
    .populate("billingAddressId")
    .populate("orderItems.bookId")

    if (!order) throw new AppError("Orders not found", 404);

    return order;
}

export const placeOrder = async (userId, orderData) => {
    const orderNo = (await Order.find()).length + 1;
    const newOrder = await Order.create({ orderNo, userId, ...orderData });

    const populatedOrder = await Order.findById(newOrder._id)
    .populate("deliveryAddressId")
    .populate("billingAddressId")
    .populate("orderItems.bookId")

    return populatedOrder;
}

export const updateOrder = async (orderData) => {
    console.log('orderData:', orderData);
    const updatedOrder = await Order.findByIdAndUpdate(
        orderData.orderId,
        orderData,
        { new: true, runValidators: true }
    )
    .populate("deliveryAddressId")
    .populate("billingAddressId")
    .populate("orderItems.bookId")

    if (!updatedOrder) throw new AppError("Order not found", 404);

    return updatedOrder;
}

export const deleteOrder = async (orderId) => {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) throw new AppError("Order not found", 404);

    return deletedOrder;
}