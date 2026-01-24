import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://amarhumayun.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/test-email/",
          "/analytics/",
          "/_next/",
          "/admin/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/test-email/",
          "/analytics/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
