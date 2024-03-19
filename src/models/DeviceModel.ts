import mongoose from "mongoose";

interface ISupply {
  supplyType: string;
  supplyName: string;
  dataProvided: string[];
}

interface IDeviceModel extends mongoose.Document {
  deviceModel: string;
  deviceManufacturer: string;
  deviceType: string;
  supplies: ISupply[];
}

const supplySchema = new mongoose.Schema(
  {
    supplyType: { type: String, required: true },
    supplyName: { type: String, required: true },
    dataProvided: { type: [String], required: true },
  },
  { _id: false }
);

const deviceModelSchema = new mongoose.Schema(
  {
    deviceModel: { type: String, required: true, unique: true },
    deviceManufacturer: { type: String, required: true },
    deviceType: { type: String, required: true },
    supplies: { type: [supplySchema], required: true },
  },
  { versionKey: false }
);

const DeviceModel =
  mongoose.models.DeviceModel ||
  mongoose.model<IDeviceModel>("DeviceModel", deviceModelSchema);

export default DeviceModel;
