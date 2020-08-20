module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameWrapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
