import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_HbQY1tKPnaA3@ep-spring-resonance-a1jh97zw-pooler.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
});
