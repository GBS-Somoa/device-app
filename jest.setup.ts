jest.mock("@/lib/verifyAccessToken", () => ({
  verifyAccessToken: jest.fn().mockImplementation(() => true), // 모든 테스트에서 verifyJwt가 항상 true를 반환하도록 설정
}));

jest.mock("@/lib/generateDeviceId", () => ({
  generateDeviceId: jest.fn().mockImplementation(() => "test3"), // 모든 테스트에서 generateDeviceId가 항상 "test2"를 반환하도록 설정
}));

require("dotenv").config({ path: ".env.local" });
