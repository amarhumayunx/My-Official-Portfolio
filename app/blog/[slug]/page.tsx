import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog-utils"
import BlogPostPageClient from "./BlogPostPageClient"

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Metadata for the dynamic page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
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
  return <BlogPostPageClient params={params} />
}
