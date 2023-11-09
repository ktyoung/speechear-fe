const { CracoAliasPlugin } = require("react-app-alias");

module.exports = {
  eslint: {
    enable: false,
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
