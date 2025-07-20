export const dynamicParams = false // Keep this to ensure strict static generation

import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog-utils"
import BlogPostPageClient from "./BlogPostPageClient"
import { notFound } from "next/navigation" // Import notFound

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = getBlogPosts()
  console.log(
    "Generated slugs for blog posts (from generateStaticParams):",
    posts.map((post) => post.slug),
  )
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Metadata for the dynamic page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  console.log("Generating metadata for blog slug:", params.slug)
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    console.log("Blog post not found for metadata:", params.slug)
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

// Main page component (Server Component)
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log("Rendering BlogPostPage (Server Component) for slug:", params.slug)
  const post = getBlogPostBySlug(params.slug) // Fetch data here in the Server Component

  if (!post) {
    console.log("Blog post not found during Server Component render:", params.slug)
    notFound() // Trigger 404 if post is not found
  }

  // Pass the fetched post data directly to the Client Component
  return <BlogPostPageClient post={post} />
}
