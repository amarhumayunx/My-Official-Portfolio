export const dynamicParams = false // Keep this to ensure strict static generation

import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog-utils"
import BlogPostPageClient from "./BlogPostPageClient"
import { notFound } from "next/navigation"

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Metadata for the dynamic page (Next 15+: params is a Promise)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Blog Post Not Found" }
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
      creator: "@amarhumayunx",
      images: [post.image],
    },
  }
}

// Main page component (Server Component) — Next 15+: params is a Promise
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostPageClient post={post} />
}
