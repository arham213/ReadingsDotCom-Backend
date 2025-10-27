import {
  createPublisher,
  deletePublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
} from "../services/publisher.js";
import { successResponse } from "../utils/response.js";

export const GetAllPublishers = async (req, res, next) => {
  try {
    const publishers = await getAllPublishers();
    return successResponse(res, "Publishers fetched successfully", { publishers }, 200);
  } catch (error) {
    next(error);
  }
};

export const GetPublisherById = async (req, res, next) => {
  try {
    const publisher = await getPublisherById(req.params.publisherId);
    return successResponse(res, "Publisher fetched successfully", { publisher }, 200);
  } catch (error) {
    next(error);
  }
};

export const CreatePublisher = async (req, res, next) => {
  try {
    const publisher = await createPublisher(req.body);
    return successResponse(res, "Publisher created successfully", { publisher }, 201);
  } catch (error) {
    next(error);
  }
};

export const UpdatePublisher = async (req, res, next) => {
  try {
    const publisher = await updatePublisher(
      req.params.publisherId,
      req.body
    );
    return successResponse(res, "Publisher updated successfully", { publisher }, 200);
  } catch (error) {
    next(error);
  }
};

export const DeletePublisher = async (req, res, next) => {
  try {
    const publisher = await deletePublisher(req.params.publisherId);
    return successResponse(res, "Publisher deleted successfully", { publisher }, 200);
  } catch (error) {
    next(error);
  }
};