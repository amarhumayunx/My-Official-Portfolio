import { notFound } from "next/navigation"
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog-utils"
import { Calendar, Tag, Github, ExternalLink, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FluidTransition } from "@/components/ui/FluidTransition"
import Link from "next/link"
import { DisqusComments } from "@/components/ui/DisqusComments"
import { SocialShareButtons } from "@/components/ui/SocialShareButtons" // New import

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
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound() // Render 404 page if post not found
  }

  // Construct the full URL for sharing
  const fullUrl = `https://amarhumayun.vercel.app/blog/${post.slug}` // Replace with your actual domain

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <FluidTransition className="mb-8">
          <Link
            href="/#blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </FluidTransition>

        <FluidTransition delay={0.1}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center text-muted-foreground text-sm mb-8">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
          </div>
        </FluidTransition>

        <FluidTransition
          delay={0.2}
          className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden mb-12 shadow-lg"
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            priority // Prioritize loading for the main image
          />
        </FluidTransition>

        <FluidTransition
          delay={0.3}
          className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-12"
        >
          <p>{post.longDescription}</p>
          {/* You can add more detailed content here, perhaps from markdown files or a CMS */}
        </FluidTransition>

        <FluidTransition delay={0.4} className="space-y-6 mb-12">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Github className="w-4 h-4" />
              Project Repository
            </h3>
            <Button variant="outline" size="sm" asChild>
              <a href={post.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {post.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </FluidTransition>

        {/* Social Share Buttons */}
        <FluidTransition delay={0.5} className="mb-12">
          <SocialShareButtons url={fullUrl} title={post.title} />
        </FluidTransition>

        {/* Disqus Comments Section */}
        <FluidTransition delay={0.6}>
          <DisqusComments slug={post.slug} title={post.title} />
        </FluidTransition>

        <FluidTransition delay={0.7} className="text-center mt-12">
          <Link href="/#blog" className="inline-flex items-center text-primary hover:underline font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all posts
          </Link>
        </FluidTransition>
      </div>
    </div>
  )
}
