"use client"

import { motion } from "framer-motion"
import { Calendar, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import Image from "next/image"
import { getBlogPosts } from "@/lib/blog-utils" // Import from blog-utils

const blogPosts = getBlogPosts() // Get blog posts from the utility function

export default function Blog() {
  return (
    <section id="blog" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Blog Posts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dive into my thoughts on mobile development, technology trends, and coding best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ParallaxSection key={post.slug} offset={15}>
              <FluidTransition delay={index * 0.1} duration={0.8}>
                <motion.div
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm leading-relaxed">{post.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <a
                          href={`/blog/${post.slug}`} // Link to the dynamic route
                          className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
                        >
                          Read More <BookOpen className="w-4 h-4" />
                        </a>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </FluidTransition>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  )
}
