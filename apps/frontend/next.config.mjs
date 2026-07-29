/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // pdfjs-dist ships an optional Node.js canvas fallback that isn't used
    // in the browser bundle; without this alias webpack fails trying to
    // resolve the native `canvas` binding.
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
