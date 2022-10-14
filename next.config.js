/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    ROOT:
      process.env.NODE_ENV === "production"
        ? "https://lcl-restful-api.herokuapp.com"
        : "http://localhost:3000",
  },
};

module.exports = nextConfig;
