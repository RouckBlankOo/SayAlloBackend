import { Request } from 'express';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  status: string;
  beds?: number;
  baths?: number;
  sqft: number;
  image: string;
  planImage?: string;
  dateAdded: string;
  featured: boolean;
  description: string;
  tags: string[];
  isRental: boolean;
}

export interface AgencyInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface AuthRequest extends Request {
  user?: any;
}