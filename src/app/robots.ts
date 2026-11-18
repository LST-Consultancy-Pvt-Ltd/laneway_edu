import type { MetadataRoute } from "next";

/** Private client demo — disallow all crawlers. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
