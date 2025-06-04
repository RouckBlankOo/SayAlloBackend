import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
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
  dateAdded: Date;
  featured: boolean;
  description: string;
  tags: string[];
  isRental?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    beds: { type: Number },
    baths: { type: Number },
    sqft: { type: Number, required: true },
    image: { type: String },
    planImage: { type: String },
    dateAdded: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    description: { type: String, default: '' },
    tags: { type: [String], default: [] },
    isRental: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IProperty>('Property', PropertySchema);