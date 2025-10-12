import express from 'express';

const AddressRouter = express.Router();

// Get all Addresss By userId
AddressRouter.get('/user/:userId', (req, res) => {});

// Get a single Address by ID
AddressRouter.get('/:addressId', (req, res) => {});

// Create a new Address for user
AddressRouter.post('/user/:userId', (req, res) => {});

// Update an Address by ID
AddressRouter.put('/:addressId', (req, res) => {});

// Delete an Address by ID
AddressRouter.delete('/:addressId', (req, res) => {});

export default AddressRouter;
