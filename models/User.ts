import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },   // <-- IMPORTANT FIX

    image: String,
    publicId: { type: String, default: null },

    resumeData: { type: Object, default: null },
    resumeTemplate: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: false },

    plan: { type: String, default: "free" },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.index(
  { publicId: 1 },
  { unique: true, partialFilterExpression: { publicId: { $type: "string" } } }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
