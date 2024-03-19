import mongoose from "mongoose";
import { generateDeviceId } from "@/lib/generateDeviceId";

interface IDeviceInstance extends mongoose.Document {
  deviceModelId: mongoose.Types.ObjectId;
  deviceId: string;
}

const deviceInstanceSchema = new mongoose.Schema(
  {
    deviceModelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DeviceModel",
    },
    deviceId: {
      type: String,
      required: true,
      unique: true,
      default: generateDeviceId,
    },
  },
  { versionKey: false }
);

deviceInstanceSchema.pre("save", async function (next) {
  const instance = this;
  try {
    const foundInstance = await mongoose
      .model("DeviceInstance")
      .findOne({ deviceId: instance.deviceId })
      .exec();
    if (foundInstance) {
      instance.deviceId = generateDeviceId();
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

const DeviceInstance =
  mongoose.models.DeviceInstance ||
  mongoose.model<IDeviceInstance>("DeviceInstance", deviceInstanceSchema);

export default DeviceInstance;
