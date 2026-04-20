import express from 'express';
import { CreateAddress, DeleteAddress, GetAddressById, GetAddressesByUserId, UpdateAddress } from '../controllers/address.js';

const AddressRouter = express.Router();

// Get all Addresss By userId
AddressRouter.get('/user/:userId', GetAddressesByUserId);

// Create a new Address for user
AddressRouter.post('/user/:userId', CreateAddress);

// Update an Address by ID
AddressRouter.put('/:addressId/user/:userId', UpdateAddress);

// Delete an Address by ID
AddressRouter.delete('/:addressId/user/:userId', DeleteAddress);

export default AddressRouter;
