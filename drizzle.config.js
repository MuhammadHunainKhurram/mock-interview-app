/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://mock-interview_owner:MVxpjEqvf4Q0@ep-super-shape-a5bmqlsj.us-east-2.aws.neon.tech/mock-interview?sslmode=require',
    }
  };
  