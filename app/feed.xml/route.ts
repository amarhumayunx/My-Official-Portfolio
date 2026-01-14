import { getBlogPosts } from "@/lib/blog-utils"

export async function GET() {
  const baseUrl = "https://amarhumayun.com"
  const blogPosts = getBlogPosts()

  const rssItems = blogPosts
    .slice(0, 20) // Limit to latest 20 posts
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString()
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>amarhumayun@outlook.com (Muhammad Humayun Amar)</author>
      <category><![CDATA[${post.technologies.join(", ")}]]></category>
    </item>`
    })
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Muhammad Humayun Amar - Blog</title>
    <link>${baseUrl}</link>
    <description>Mobile App Developer Blog - Flutter, Android, and Cross-platform Development</description>
    <language>en-us</language>
    <managingEditor>amarhumayun@outlook.com (Muhammad Humayun Amar)</managingEditor>
    <webMaster>amarhumayun@outlook.com (Muhammad Humayun Amar)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  })
}
