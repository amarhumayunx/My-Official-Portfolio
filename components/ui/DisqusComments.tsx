"use client"

import { useEffect } from "react"

interface DisqusCommentsProps {
  slug: string
  title: string
}

export function DisqusComments({ slug, title }: DisqusCommentsProps) {
  useEffect(() => {
    // Ensure DISQUS is available and configured
    if (typeof window !== "undefined" && (window as any).DISQUS) {
      // Reset Disqus for new page
      ;(window as any).DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = `${window.location.origin}/blog/${slug}`
          this.page.identifier = slug
          this.page.title = title
        },
      })
    } else {
      // If Disqus script is not loaded, set up config for when it does load
      ;(window as any).disqus_config = function () {
        this.page.url = `${window.location.origin}/blog/${slug}`
        this.page.identifier = slug
        this.page.title = title
      }
    }
  }, [slug, title])

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <div id="disqus_thread" className="bg-card p-6 rounded-lg shadow-lg border border-border">
        {/* This is where Disqus comments will load */}
        <p className="text-muted-foreground text-sm">Comments powered by Disqus. To see comments here, you need to:</p>
        <ol className="list-decimal list-inside text-muted-foreground text-sm mt-2 space-y-1">
          <li>Create a Disqus account and set up a new "site" for your portfolio.</li>
          <li>Find your unique Disqus "shortname" in your Disqus admin panel.</li>
          <li>
            Uncomment and replace `YOUR_DISQUS_SHORTNAME` with your actual shortname in the Disqus script tags in{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              app/layout.tsx
            </code>
            .
          </li>
          <li>Once configured, comments will appear here!</li>
        </ol>
      </div>
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  )
}
