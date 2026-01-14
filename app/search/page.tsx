import { Metadata } from "next"
import { Suspense } from "react"
import SearchResults from "./SearchResults"

export const metadata: Metadata = {
  title: "Search",
  description: "Search through projects, blog posts, and content",
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="min-h-screen pt-24 pb-16 section-padding">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Search Results</h1>
        <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}
