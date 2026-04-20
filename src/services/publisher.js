import { Publisher } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const getAllPublishers = async () => {
    const publishers = await Publisher.find();

    return publishers;
}

export const getPublisherById = async (publisherId) => {
    const publisher = await Publisher.findById(publisherId);

    if (!publisher) throw new AppError("Publisher not found", 404);

    return publisher;
}

export const createPublisher = async (publisherData) => {
    const publisher = await Publisher.findOne({ name: publisherData.name });
    
    if (publisher) throw new AppError("Publisher already exists", 409);

    const newPublisher = await Publisher.create(publisherData);

    return newPublisher;
}

export const updatePublisher = async (publisherId, publisherData) => {
    if (publisherData.name) {
        const publisherBeingEdited = await Publisher.findById(publisherId);

        if (!publisherBeingEdited) throw new AppError("Publisher not found", 404);

        const publisher = await Publisher.findOne({ name: publisherData.name });

        if ((publisherBeingEdited.name !== publisherData.name) && publisher) throw new AppError("Publisher with this name already exists.", 409);
    }

    const updatedPublisher = await Publisher.findByIdAndUpdate(
        publisherId,
        publisherData,
        { new: true, runValidators: true }
    )

    if (!updatedPublisher) throw new AppError("Publisher not found", 404);

    return updatedPublisher;
}

export const deletePublisher = async (publisherId) => {
    const deletedPublisher = await Publisher.findByIdAndDelete(publisherId);

    if (!deletedPublisher) throw new AppError("Publisher not found", 404);

    return deletedPublisher;
}