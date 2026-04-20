import {
  placeOrder,
  deleteOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrder,
} from "../services/order.js";
import { successResponse } from "../utils/response.js";

export const GetAllOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    return successResponse(res, "Orders fetched successfully", { orders }, 200);
  } catch (error) {
    next(error);
  }
};

export const GetOrdersByUser = async (req, res, next) => {
  try {
    const orders = await getOrdersByUser(req.user.id);
    return successResponse(res, "Orders fetched successfully", { orders }, 200);
  } catch (error) {
    next(error);
  }
};

export const PlaceOrder = async (req, res, next) => {
  try {
    const orderNo = await placeOrder(req.user.id, req.body);
    return successResponse(res, "Order placed successfully", { orderNo }, 201);
  } catch (error) {
    next(error);
  }
};

export const UpdateOrder = async (req, res, next) => {
  try {
    const order = await updateOrder(req.body);
    return successResponse(res, "Order updated successfully", { order }, 200);
  } catch (error) {
    next(error);
  }
};

export const DeleteOrder = async (req, res, next) => {
  try {
    const order = await deleteOrder(req.params.orderId);
    return successResponse(res, "Order deleted successfully", { order }, 200);
  } catch (error) {
    next(error);
  }
};