import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    fullName: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default Address;
