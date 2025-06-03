import mongoose, { Schema } from 'mongoose';

const AgencyInfoSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  hours: { type: String, required: true },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },
}, { timestamps: true });

export default mongoose.model('AgencyInfo', AgencyInfoSchema);