import express from 'express';
import { CreateAddress, DeleteAddress, GetAddressesByUserId, UpdateAddress } from '../controllers/address.js';

const AddressRouter = express.Router();

// Get all Addresss By userId
AddressRouter.get('/user/:userId', GetAddressesByUserId);

// Get a single Address by ID
AddressRouter.get('/:addressId', (req, res) => {});

// Create a new Address for user
AddressRouter.post('/user/:userId', CreateAddress);

// Update an Address by ID
AddressRouter.put('/:addressId', UpdateAddress);

// Delete an Address by ID
AddressRouter.delete('/:addressId', DeleteAddress);

export default AddressRouter;
