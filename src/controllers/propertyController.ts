import { Request, Response } from 'express';
import Property from '../models/Property';
import { Property as PropertyType } from '../types';

export const getProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const propertyId = parseInt(req.params.id);
    if (isNaN(propertyId)) {
      res.status(400).json({ message: 'Invalid property ID' });
      return;
    }
    
    const property = await Property.findOne({ id: propertyId });
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const lastProperty = await Property.findOne().sort({ id: -1 });
    const newId = lastProperty ? lastProperty.id + 1 : 1;
    
    const propertyData: PropertyType = {
      ...req.body,
      id: newId,
      dateAdded: new Date().toISOString().split('T')[0],
      isRental: req.body.status === 'À Louer',
      beds: req.body.beds ? parseInt(req.body.beds.toString()) : undefined,
      baths: req.body.baths ? parseInt(req.body.baths.toString()) : undefined,
      sqft: parseInt(req.body.sqft.toString()),
      featured: req.body.featured || false,
      description: req.body.description || '',
      tags: req.body.tags || [],
    };

    const property = new Property(propertyData);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error creating property', error });
  }
};

export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const propertyId = parseInt(req.params.id);
    if (isNaN(propertyId)) {
      res.status(400).json({ message: 'Invalid property ID' });
      return;
    }

    const propertyData: Partial<PropertyType> = {
      ...req.body,
      isRental: req.body.status === 'À Louer',
      beds: req.body.beds ? parseInt(req.body.beds.toString()) : undefined,
      baths: req.body.baths ? parseInt(req.body.baths.toString()) : undefined,
      sqft: req.body.sqft ? parseInt(req.body.sqft.toString()) : undefined,
    };

    const property = await Property.findOneAndUpdate(
      { id: propertyId },
      propertyData,
      { new: true }
    );

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error updating property', error });
  }
};

export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const propertyId = parseInt(req.params.id);
    if (isNaN(propertyId)) {
      res.status(400).json({ message: 'Invalid property ID' });
      return;
    }

    const property = await Property.findOneAndDelete({ id: propertyId });
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};