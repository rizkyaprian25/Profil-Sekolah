/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mengizinkan akses HMR Next.js dari jaringan lokal (HP/Device lain)
  allowedDevOrigins: ['192.168.0.87', '192.168.1.33', '192.168.2.3']
};

export default nextConfig;
