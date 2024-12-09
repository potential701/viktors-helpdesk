import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/:path*' : 'http://0.0.0.0:8000/api/',
      }
    ]
  }
};

export default nextConfig;
