import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import schemas from "./src/sanity/schemas";

const config = defineConfig({
  projectId: "e9z14x99", // Configure with env vars
  dataset: "production", // Configure with env vars
  title: "Jan Lewandoski - Photo Blog",
  basePath: "/admin",
  apiVersion: "v2021-10-21",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
});

export default config;
