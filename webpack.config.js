import { resolve } from "path";

export const mode = "development";
export const entry = "";
export const output = {
  filename: "bundle.js",
  path: resolve(__dirname, "dist"),
};

// After defining entry path perform CLI command to generate bundle.js file in dist folder ~ ./node_modules/.bin/webpacl
// * MIGHT have tp change syntax back to Common JS *
