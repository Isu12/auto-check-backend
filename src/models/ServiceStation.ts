import mongoose, { Schema, Document } from 'mongoose';

interface IBranch {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  contactDetails: string;
  servicesOffered: string[];
  createdAt: Date;
}

interface IBusiness extends Document {
  name: string;
  type: string; // e.g., "Insurance Company", "Eco Test Center", etc.
  registrationNumber: string;
  email: string;
  contactDetails: string;
  website: string;
  branches: IBranch[]; // Array of branches
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const businessSchema: Schema<IBusiness> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Insurance Company', 'Eco Test Center', 'Service Center'], 
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contactDetails: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
    },
    branches: [
      {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        city:{
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        contactDetails: {
          type: String,
          required: true,
        },
        servicesOffered: [
          {
            type: String,
            required: true,
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IBusiness>('Business', businessSchema);
