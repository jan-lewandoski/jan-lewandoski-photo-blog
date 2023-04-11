import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import schemas from "./src/sanity/schemas";

const config = defineConfig({
  projectId: "e9z14x99", // Configure with env vars
  dataset: "production", // Configure with env vars
  title: "My personal website",
  basePath: "/admin",
  apiVersion: "v1",
  plugins: [deskTool()],
  schema: { types: schemas },
});

export default config;
