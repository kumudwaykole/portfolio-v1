import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let `.mdx` files be treated as first-class modules/routes.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Single canonical host: send www to the apex domain with a 308.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ikumud.com" }],
        destination: "https://ikumud.com/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
