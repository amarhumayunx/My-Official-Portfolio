"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ContributionData {
  date: string
  count: number
}

interface GitHubContributionGraphProps {
  username?: string
  className?: string
}

export function GitHubContributionGraph({
  username = "amarhumayunx",
  className,
}: GitHubContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalContributions, setTotalContributions] = useState(0)

  useEffect(() => {
    // Fetch contribution data (using GitHub API or a proxy)
    const fetchContributions = async () => {
      try {
        // Note: GitHub doesn't provide a public API for contribution graph
        // This is a placeholder - you can use a service like GitHub Stats API
        // or implement a server-side solution
        
        // For now, generate mock data for demonstration
        const mockData: ContributionData[] = []
        const today = new Date()
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          mockData.push({
            date: date.toISOString().split("T")[0],
            count: Math.floor(Math.random() * 10), // Mock contribution count
          })
        }
        
        setContributions(mockData)
        setTotalContributions(mockData.reduce((sum, day) => sum + day.count, 0))
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch contributions:", error)
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-muted"
    if (count <= 2) return "bg-green-200 dark:bg-green-900"
    if (count <= 4) return "bg-green-400 dark:bg-green-700"
    if (count <= 6) return "bg-green-600 dark:bg-green-600"
    return "bg-green-800 dark:bg-green-500"
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            GitHub Contributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  // Group contributions by week (7 days)
  const weeks: ContributionData[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            GitHub Contributions
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last year</span>
          </div>
        </div>
        <div className="text-2xl font-bold mt-2">
          {totalContributions.toLocaleString()} contributions
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${day.date}-${dayIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                  className={`w-3 h-3 rounded-sm ${getIntensity(day.count)} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                  title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
            <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
            <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-600" />
            <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-500" />
          </div>
          <span>More</span>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Note: This is a demo visualization. For real data, integrate with GitHub API or use a service like{" "}
          <a
            href="https://github.com/anuraghazra/github-readme-stats"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub Stats API
          </a>
        </p>
      </CardContent>
    </Card>
  )
}
