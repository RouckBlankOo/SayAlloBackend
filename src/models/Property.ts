import mongoose, { Schema } from 'mongoose';

const PropertySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  beds: { type: Number },
  baths: { type: Number },
  sqft: { type: Number, required: true },
  image: { type: String, required: true },
  planImage: { type: String },
  dateAdded: { type: String, required: true },
  featured: { type: Boolean, default: false },
  description: { type: String },
  tags: [{ type: String }],
  isRental: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Property', PropertySchema);