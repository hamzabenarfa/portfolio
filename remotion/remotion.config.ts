import { Config } from "@remotion/cli/config";

// Resolve staticFile() against the Next app's public/ dir so the composition can
// reuse the real D-Talk screenshots already committed there, and so renders land
// straight into public/ for the site to serve.
Config.setPublicDir("../public");
Config.setVideoImageFormat("jpeg");
Config.overrideWebpackConfig((config) => config);
