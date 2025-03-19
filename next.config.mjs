/** @type {import('next').NextConfig} */
const nextConfig = {
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