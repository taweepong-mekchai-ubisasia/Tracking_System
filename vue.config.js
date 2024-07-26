const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: process.env.NODE_ENV === "production" ? "/UAT/" : "/UAT/",
  pwa: {
    // workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc: "./src/service-worker.js",
      //     }
      // workboxOptions: {
      exclude: [".htaccess"],
    },
    name: "UBIS Asia",
  },
  configureWebpack: {
    mode: "development",
    devtool: false,
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 15000,
        maxSize: 250000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks"); // no vendor chunks
    config.plugins.delete("prefetch"); // no prefetch chunks
    config.plugins.delete("preload"); // no preload chunks
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      });
      return definitions;
    });
  },
});
