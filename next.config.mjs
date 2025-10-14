/** @type {import('next').NextConfig} */
const nextConfig = {
  // for local dev
  reactStrictMode: false,
  env: {
    UAT_ENV: "false",
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // 301 redirect (permanent)
      },
    ];
  },
};

export default nextConfig;