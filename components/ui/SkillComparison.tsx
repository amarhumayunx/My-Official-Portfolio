"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Skill {
  name: string
  level: number
  category: string
}

interface SkillComparisonProps {
  skills: Skill[]
  maxCompare?: number
}

export function SkillComparison({ skills, maxCompare = 3 }: SkillComparisonProps) {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skillName)) {
        return prev.filter((s) => s !== skillName)
      }
      if (prev.length < maxCompare) {
        return [...prev, skillName]
      }
      return prev
    })
  }

  const comparedSkills = skills.filter((skill) => selectedSkills.includes(skill.name))

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Compare Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.name}
              variant={selectedSkills.includes(skill.name) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleSkill(skill.name)}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      {comparedSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Comparison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparedSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSkill(skill.name)}
                        className="h-6 w-6"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
