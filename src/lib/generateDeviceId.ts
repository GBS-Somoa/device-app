import crypto from "crypto";

export function generateDeviceId() {
  return crypto.randomBytes(8).toString("hex");
}
