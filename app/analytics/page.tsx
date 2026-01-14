import { ABTestDashboard } from "@/components/analytics/ABTestDashboard"
import GitHubCharts from "@/components/analytics/GitHubCharts"
import { ProjectAnalytics } from "@/components/ui/ProjectAnalytics"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            A/B Testing Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitor your A/B test performance with real-time analytics, conversion tracking, and statistical
            significance analysis.
          </p>
        </div>
        <ABTestDashboard />
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-4">GitHub Insights</h2>
          <GitHubCharts />
        </div>
        <div className="mt-12 mb-12">
          <ProjectAnalytics />
        </div>
      </div>
    </div>
  )
}
