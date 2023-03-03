/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server
    MAPBOX_GL_ACCESS_TOKEN: process.env.MAPBOX_GL_ACCESS_TOKEN,
    X_RAPID_API_KEY: process.env.X_RAPID_API_KEY,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

module.exports = nextConfig
