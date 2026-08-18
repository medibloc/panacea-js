const integrationTestPaths = [
  "/src/__tests__/group-signing-panacea-client.spec.ts",
  "/src/__tests__/panacea-client.test.ts",
  "/src/__tests__/signing-panacea-client.test.ts",
];

const integrationEnabled = process.env.PANACEAD_ENABLED === "true";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    ...(integrationEnabled ? [] : integrationTestPaths),
  ],
};
