/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'unsplash.com',
      'cdn.akamai.steamstatic.com',
      'upload.wikimedia.org',
      'cdn.sanity.io',
    ],
  },
};

module.exports = nextConfig;
