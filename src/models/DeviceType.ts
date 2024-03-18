import mongoose from "mongoose";

interface IDeviceType extends mongoose.Document {
  name: string;
}

const deviceTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

const DeviceType =
  mongoose.models.DeviceType ||
  mongoose.model<IDeviceType>("DeviceType", deviceTypeSchema);

export default DeviceType;
