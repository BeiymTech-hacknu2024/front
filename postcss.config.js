let path = require("path");
let fs = require("fs/promises");

module.exports = {
  plugins: [
    require("postcss-modules")({
      generateScopedName: "w_[hash:base64:5]",
      getJSON: async (_, json, outputFilename) => {
        await fs.mkdir(path.dirname(outputFilename), { recursive: true });
        await fs.writeFile(`${outputFilename.replace(/\.css$/, ".json")}`, JSON.stringify(json));
      },
    }),
    require("autoprefixer"),
    require("cssnano"),
  ],
};
