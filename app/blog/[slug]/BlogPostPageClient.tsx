"use client"

import { notFound } from "next/navigation" // Keep notFound for potential client-side issues, though less likely now
import type { BlogPost } from "@/lib/blog-utils" // Import the type for BlogPost
import { Calendar, Tag, Github, ExternalLink, ArrowLeft, Printer, Timer } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FluidTransition } from "@/components/ui/FluidTransition"
import Link from "next/link"
import { DisqusComments } from "@/components/ui/DisqusComments"
import { SocialShareButtons } from "@/components/ui/SocialShareButtons"

// Update props to receive the full post object
interface BlogPostPageClientProps {
  post: BlogPost
}

export default function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  // Remove the console.log for params.slug and getBlogPostBySlug call
  // console.log("Requested slug:", params.slug)
  // const post = getBlogPostBySlug(params.slug)
  // console.log("Found post:", post ? post.title : "Not found")

  // The 'post' object is now guaranteed to be present because the Server Component
  // already handled the notFound() logic. However, keeping a check here is harmless.
  if (!post) {
    notFound()
  }

  // Construct the full URL for sharing
  const fullUrl = `https://amarhumayun.vercel.app/blog/${post.slug}` // Replace with your actual domain

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen section-bg pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <FluidTransition className="mb-8 flex justify-between items-center no-print">
          <Link
            href="/#blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="Back to blog posts"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back to Blog
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex items-center gap-2 bg-transparent"
            aria-label="Print this blog post"
          >
            <Printer className="w-4 h-4" aria-hidden="true" /> Print
          </Button>
        </FluidTransition>

        <FluidTransition delay={0.1}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center text-muted-foreground text-sm mb-8 gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Published on</span>
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Timer className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Read time</span>
              <span>{post.readTimeMinutes} min read</span>
            </div>
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
              <Tag className="w-4 h-4" aria-hidden="true" />
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
              <Github className="w-4 h-4" aria-hidden="true" />
              Project Repository
            </h3>
            <Button variant="outline" size="sm" asChild>
              <a
                href={post.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                aria-label={`View ${post.title} project on GitHub`}
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                View on GitHub
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {post.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1" aria-hidden="true">
                    •
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </FluidTransition>

        {/* Social Share Buttons */}
        <FluidTransition delay={0.5} className="mb-12 no-print">
          <SocialShareButtons url={fullUrl} title={post.title} />
        </FluidTransition>

        {/* Disqus Comments Section */}
        <FluidTransition delay={0.6} className="no-print">
          <DisqusComments slug={post.slug} title={post.title} />
        </FluidTransition>

        <FluidTransition delay={0.7} className="text-center mt-12 no-print">
          <Link
            href="/#blog"
            className="inline-flex items-center text-primary hover:underline font-medium"
            aria-label="Back to all blog posts"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back to all posts
          </Link>
        </FluidTransition>
      </div>
    </div>
  )
}
