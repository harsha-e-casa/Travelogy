/** @type {import('next').NextConfig} */
const nextConfig = {
  // for local dev
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/flights',
        permanent: true, // 301 redirect (permanent)
      },
    ];
  },
};

export default nextConfig;