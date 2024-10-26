/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://car-marketplace_owner:ZKWyn7M6qcbL@ep-delicate-unit-a1pkhyxz.ap-southeast-1.aws.neon.tech/car-marketplace?sslmode=require",
  },
};
