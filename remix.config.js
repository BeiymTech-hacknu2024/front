/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  ignoredRouteFiles: ["**/.*"],
  serverBuildPath: "build/index.js",
  serverPlatform: "node",
  serverModuleFormat: "cjs",
  publicPath: "/build/",
  postcss: false,
};
