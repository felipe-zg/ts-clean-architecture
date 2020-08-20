module.exports = {
  roots: ["<tootDir>/src"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameWrapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
