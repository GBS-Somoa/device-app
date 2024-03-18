import mongoose from "mongoose";

interface ISupplyType extends mongoose.Document {
  type: string;
  dataProvided: string[];
}

const supplyTypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true },
    dataProvided: { type: [String], required: true },
  },
  { versionKey: false }
);

const SupplyType =
  mongoose.models.SupplyType ||
  mongoose.model<ISupplyType>("SupplyType", supplyTypeSchema);

export default SupplyType;
