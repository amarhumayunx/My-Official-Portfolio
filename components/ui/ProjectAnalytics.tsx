"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"
import { getProjectsWithSlugs } from "@/lib/project-utils"
import { TrendingUp, Calendar, Code, CheckCircle } from "lucide-react"

interface ProjectAnalyticsProps {
  className?: string
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function ProjectAnalytics({ className }: ProjectAnalyticsProps) {
  const projects = useMemo(() => getProjectsWithSlugs(), [])

  // Calculate project statistics
  const stats = useMemo(() => {
    const totalProjects = projects.length
    const completedProjects = projects.filter((p) => p.status === "Completed").length
    const inProgressProjects = projects.filter((p) => p.status === "In Development").length
    const totalTechnologies = new Set(projects.flatMap((p) => p.technologies)).size
    const avgTechnologiesPerProject = projects.reduce((sum, p) => sum + p.technologies.length, 0) / totalProjects

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      totalTechnologies,
      avgTechnologiesPerProject: Math.round(avgTechnologiesPerProject * 10) / 10,
      completionRate: Math.round((completedProjects / totalProjects) * 100),
    }
  }, [projects])

  // Technology usage frequency
  const technologyUsage = useMemo(() => {
    const techMap = new Map<string, number>()
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techMap.set(tech, (techMap.get(tech) || 0) + 1)
      })
    })
    return Array.from(techMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }, [projects])

  // Projects by year
  const projectsByYear = useMemo(() => {
    const yearMap = new Map<number, number>()
    projects.forEach((project) => {
      // Extract year from period (e.g., "Jan 2024 - Feb 2025" -> 2024)
      const yearMatch = project.period.match(/\d{4}/)
      if (yearMatch) {
        const year = parseInt(yearMatch[0])
        yearMap.set(year, (yearMap.get(year) || 0) + 1)
      }
    })
    return Array.from(yearMap.entries())
      .map(([year, count]) => ({ year: year.toString(), count }))
      .sort((a, b) => a.year.localeCompare(b.year))
  }, [projects])

  // Status distribution
  const statusDistribution = useMemo(() => {
    const statusMap = new Map<string, number>()
    projects.forEach((project) => {
      statusMap.set(project.status, (statusMap.get(project.status) || 0) + 1)
    })
    return Array.from(statusMap.entries()).map(([name, value]) => ({ name, value }))
  }, [projects])

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          Project <span className="gradient-text">Analytics</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Insights into project performance, technology usage, and development trends
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Code className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <div className="text-xs text-muted-foreground">Total Projects</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{stats.completedProjects}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
              <div className="text-xs text-muted-foreground">Completion Rate</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{stats.totalTechnologies}</div>
              <div className="text-xs text-muted-foreground">Technologies</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Technology Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Top Technologies</CardTitle>
              <CardDescription>Most frequently used technologies across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: { label: "Usage", color: "hsl(var(--chart-1))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={technologyUsage} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
              <CardDescription>Distribution of project completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: { label: "Projects", color: "hsl(var(--chart-2))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="var(--color-value)"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Projects by Year */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="md:col-span-2"
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Projects by Year</CardTitle>
              <CardDescription>Number of projects started each year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: { label: "Projects", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectsByYear}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
