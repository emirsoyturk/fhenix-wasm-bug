// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      config.externals.push("pino-pretty", "lokijs", "encoding");
      config.experiments = { asyncWebAssembly: true, layers: true };
      config.module.rules.push({
        test: /\.wasm$/,
        type: "webassembly/async",
      });
      return config;
    },
  };
  
  module.exports = nextConfig;
  