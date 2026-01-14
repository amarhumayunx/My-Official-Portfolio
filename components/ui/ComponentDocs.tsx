"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Code, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ComponentDoc {
  name: string
  description: string
  import: string
  usage: string
  props?: Array<{ name: string; type: string; description: string; default?: string }>
}

const components: ComponentDoc[] = [
  {
    name: "EnhancedButton",
    description: "Button component with ripple effects, loading states, and gradient variants",
    import: 'import { EnhancedButton } from "@/components/ui/EnhancedButton"',
    usage: `<EnhancedButton 
  loading={isLoading}
  ripple={true}
  gradient={true}
>
  Click me
</EnhancedButton>`,
    props: [
      { name: "loading", type: "boolean", description: "Show loading spinner", default: "false" },
      { name: "ripple", type: "boolean", description: "Enable ripple effect", default: "true" },
      { name: "gradient", type: "boolean", description: "Use gradient background", default: "false" },
    ],
  },
  {
    name: "Tooltip",
    description: "Tooltip component with hover delay and positioning",
    import: 'import { Tooltip } from "@/components/ui/Tooltip"',
    usage: `<Tooltip content="Helpful information" side="top">
  <Button>Hover me</Button>
</Tooltip>`,
    props: [
      { name: "content", type: "string", description: "Tooltip text" },
      { name: "side", type: "'top' | 'bottom' | 'left' | 'right'", description: "Tooltip position", default: "top" },
      { name: "delay", type: "number", description: "Hover delay in ms", default: "200" },
    ],
  },
  {
    name: "StaggerContainer",
    description: "Container for stagger animations",
    import: 'import { StaggerContainer } from "@/components/ui/AnimationUtils"',
    usage: `<StaggerContainer>
  {items.map(item => (
    <motion.div key={item.id}>{item.content}</motion.div>
  ))}
</StaggerContainer>`,
  },
]

export function ComponentDocs() {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Component Library</h2>
        <p className="text-muted-foreground">
          Documentation and examples for all UI components
        </p>
      </div>

      {components.map((component, index) => (
        <Card key={component.name}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{component.name}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(component.import, index * 2)}
                  className="h-8 w-8"
                >
                  {copiedIndex === index * 2 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{component.description}</p>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Import</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(component.import, index * 2 + 1)}
                  className="h-6 w-6"
                >
                  {copiedIndex === index * 2 + 1 ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
              <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                <code>{component.import}</code>
              </pre>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Usage</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(component.usage, index * 2 + 2)}
                  className="h-6 w-6"
                >
                  {copiedIndex === index * 2 + 2 ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
              <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                <code>{component.usage}</code>
              </pre>
            </div>

            {component.props && (
              <div>
                <span className="text-sm font-medium mb-2 block">Props</span>
                <div className="space-y-2">
                  {component.props.map((prop) => (
                    <div key={prop.name} className="flex items-start gap-2 text-sm">
                      <code className="bg-muted px-2 py-1 rounded font-mono">
                        {prop.name}
                      </code>
                      <span className="text-muted-foreground">:</span>
                      <code className="text-primary">{prop.type}</code>
                      {prop.default && (
                        <>
                          <span className="text-muted-foreground">=</span>
                          <code className="text-muted-foreground">{prop.default}</code>
                        </>
                      )}
                      <span className="text-muted-foreground ml-2">- {prop.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
