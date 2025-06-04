import { Request, Response, NextFunction } from 'express';
import Property from '../models/Property';
import { AuthRequest } from '../types';

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
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Remove any id field from req.body to avoid conflicts
    const { id, _id, ...rest } = req.body;
    
    const propertyData = {
      ...rest,
      tags: Array.isArray(rest.tags) ? rest.tags : [rest.tags].filter(Boolean),
      featured: rest.featured === 'true',
      isRental: rest.isRental === 'true',
      beds: rest.beds ? parseInt(rest.beds) : undefined,
      baths: rest.baths ? parseInt(rest.baths) : undefined,
      sqft: rest.sqft ? parseInt(rest.sqft) : 0
    };
    
    const property = new Property(propertyData);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
export const updateProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const propertyData = {
      ...req.body,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags].filter(Boolean),
      featured: req.body.featured === 'true',
      isRental: req.body.isRental === 'true',
      beds: req.body.beds ? parseInt(req.body.beds) : undefined,
      baths: req.body.baths ? parseInt(req.body.baths) : undefined,
      sqft: req.body.sqft ? parseInt(req.body.sqft) : 0
    };
    
    const property = await Property.findByIdAndUpdate(
      req.params.id, 
      propertyData, 
      { new: true }
    );
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};