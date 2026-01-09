"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"

// Placeholder blog data - replace with real data from CMS
const blogPosts = [
  {
    id: 1,
    title: "Building Cross-Platform Apps with Flutter",
    slug: "flutter-cross-platform",
    excerpt: "Learn how to build efficient cross-platform applications using Flutter and best practices.",
    author: "Muhammad Humayun",
    date: "2024-01-15",
    readTime: 5,
    category: "Flutter",
    tags: ["Flutter", "Mobile", "Development"],
  },
  {
    id: 2,
    title: "Firebase Integration Guide",
    slug: "firebase-integration",
    excerpt: "Complete guide to integrating Firebase in your mobile applications with authentication and database.",
    author: "Muhammad Humayun",
    date: "2024-01-10",
    readTime: 8,
    category: "Backend",
    tags: ["Firebase", "Backend", "Database"],
  },
  {
    id: 3,
    title: "Mobile App Performance Optimization",
    slug: "performance-optimization",
    excerpt: "Tips and tricks to optimize your mobile app performance and improve user experience.",
    author: "Muhammad Humayun",
    date: "2024-01-05",
    readTime: 6,
    category: "Performance",
    tags: ["Performance", "Optimization", "Best Practices"],
  },
]

export default function BlogList() {
  return (
    <section id="blog" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and tutorials about mobile development and software engineering
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full gap-2 group" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
