import mongoose from "mongoose";

interface IManufacturer extends mongoose.Document {
  name: string;
}

const maufacturerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

const Manufacturer =
  mongoose.models.Manufacturer ||
  mongoose.model<IManufacturer>("Manufacturer", maufacturerSchema);

export default Manufacturer;
