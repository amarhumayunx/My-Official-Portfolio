"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, TrendingUp } from "lucide-react"
import { FluidTransition } from "@/components/ui/FluidTransition"

interface ContributionData {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubContributionGraphProps {
  username?: string
  className?: string
}

export function GitHubContributionGraph({
  username = "amarhumayunx",
  className = "",
}: GitHubContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalContributions, setTotalContributions] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  useEffect(() => {
    // Generate mock contribution data (in production, fetch from GitHub API)
    const generateMockData = () => {
      const data: ContributionData[] = []
      const today = new Date()
      const daysToShow = 365

      for (let i = daysToShow - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        // Random contribution count (0-10)
        const count = Math.floor(Math.random() * 11)
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4
        
        data.push({
          date: date.toISOString().split("T")[0],
          count,
          level,
        })
      }

      // Calculate stats
      const total = data.reduce((sum, d) => sum + d.count, 0)
      
      // Calculate current streak
      let streak = 0
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].count > 0) {
          streak++
        } else {
          break
        }
      }

      // Calculate longest streak
      let longest = 0
      let current = 0
      for (const day of data) {
        if (day.count > 0) {
          current++
          longest = Math.max(longest, current)
        } else {
          current = 0
        }
      }

      setContributions(data)
      setTotalContributions(total)
      setCurrentStreak(streak)
      setLongestStreak(longest)
      setLoading(false)
    }

    generateMockData()
  }, [username])

  const getColorForLevel = (level: number) => {
    const colors = [
      "bg-muted", // 0
      "bg-green-500/20 dark:bg-green-500/30", // 1
      "bg-green-500/40 dark:bg-green-500/50", // 2
      "bg-green-500/60 dark:bg-green-500/70", // 3
      "bg-green-500 dark:bg-green-500", // 4
    ]
    return colors[level] || colors[0]
  }

  const weeks = []
  for (let i = 0; i < 53; i++) {
    const week = contributions.slice(i * 7, (i + 1) * 7)
    if (week.length > 0) {
      weeks.push(week)
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>GitHub Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" aria-hidden="true" />
            GitHub Contributions
          </CardTitle>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
            aria-label={`View ${username} on GitHub`}
          >
            View Profile
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <FluidTransition>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalContributions}</div>
              <div className="text-xs text-muted-foreground mt-1">Total</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{currentStreak}</div>
              <div className="text-xs text-muted-foreground mt-1">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{longestStreak}</div>
              <div className="text-xs text-muted-foreground mt-1">Longest Streak</div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={`${day.date}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getColorForLevel(day.level)}`}
                      title={`${day.date}: ${day.count} contributions`}
                      whileHover={{ scale: 1.3, zIndex: 10 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted" />
              <div className="w-3 h-3 rounded-sm bg-green-500/20 dark:bg-green-500/30" />
              <div className="w-3 h-3 rounded-sm bg-green-500/40 dark:bg-green-500/50" />
              <div className="w-3 h-3 rounded-sm bg-green-500/60 dark:bg-green-500/70" />
              <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500" />
            </div>
            <span>More</span>
          </div>
        </FluidTransition>
      </CardContent>
    </Card>
  )
}
