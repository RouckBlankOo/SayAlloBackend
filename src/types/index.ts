import { Request } from 'express';

export interface Property {
  _id?: string;          // MongoDB's internal ID
  title: string;
  location: string;
  price: string;
  type: string;
  status: string;
  beds?: number;
  baths?: number;
  sqft: number;
  image?: string;
  planImage?: string;
  dateAdded?: string;
  featured: boolean;
  description: string;
  tags: string[];
  isRental?: boolean;
}

export interface AuthRequest extends Request {
  user?: any;
}