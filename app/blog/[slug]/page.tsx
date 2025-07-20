export const dynamicParams = false // Add this line

import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog-utils"
import BlogPostPageClient from "./BlogPostPageClient"

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = getBlogPosts()
  console.log(
    "Generated slugs for blog posts:",
    posts.map((post) => post.slug),
  ) // IMPORTANT: Check this log in Vercel build output
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Metadata for the dynamic page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  console.log("Generating metadata for blog slug:", params.slug) // Check this log
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    console.log("Blog post not found for metadata:", params.slug) // Check this log
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@amarhumayunx", // Assuming your Twitter handle
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log("Rendering BlogPostPage for slug:", params.slug) // Check this log
  return <BlogPostPageClient params={params} />
}
