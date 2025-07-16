"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { useEffect, useState } from "react"

export const description = "A radial chart showing storage usage"

interface StorageStats {
  total_size_gb: number
  total_size_bytes: number
  max_size_gb: number
  usage_percent: number
  file_count: number
}

const chartConfig = {
  usage: {
    label: "Storage Usage",
  },
  storage: {
    label: "Storage",
    color: "#e3ad5e",
  },
} satisfies ChartConfig

export default function ChartRadialShape() {
  const [storageStats, setStorageStats] = useState<StorageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStorageStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/storage-stats')
        if (!response.ok) {
          throw new Error('Failed to fetch storage stats')
        }
        const data: StorageStats = await response.json()
        setStorageStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStorageStats()
    
    // Optionally, set up polling to update stats periodically
    const interval = setInterval(fetchStorageStats, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card id="SizeChart" className="translate-y-[59vh] w-[50vw] h-[40vh] bg-ablack border-0 flex flex-col">
        <CardHeader className="items-center pb-0 text-left w-full">
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 items-center justify-center">
          <div className="text-center">Loading storage stats...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card id="SizeChart" className="translate-y-[59vh] w-[50vw] h-[40vh] bg-ablack border-0 flex flex-col">
        <CardHeader className="items-center pb-0 text-left w-full">
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 items-center justify-center">
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  if (!storageStats) {
    return null
  }

  const chartData = [
    { 
      storage: "used", 
      usage: storageStats.usage_percent, 
      fill: "#e3ad5e" 
    }
  ]

  return (
    <Card id="SizeChart" className="translate-y-[59vh] w-[50vw] h-[40vh] bg-ablack border-0 flex flex-col">
      <CardHeader className="items-center pb-0 text-left w-full">
        <CardTitle>Storage Usage</CardTitle>
        <CardDescription>
          {storageStats.file_count} files • {storageStats.total_size_gb.toFixed(4)} GB of {storageStats.max_size_gb} GB used
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[320px] aspect-square justify-self-center translate-y-[-4vh]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={((storageStats.total_size_gb)*36)+90}
            innerRadius={125}
            outerRadius={195}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="#000"
              polarRadius={[120]}
              strokeWidth={10}
              className="first:fill-[#470e0e] last:fill-background"
            />
            <RadialBar dataKey="usage" fill="#9333ea" background />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-[#ff4121] text-6xl font-['Formula1-Bold']"
                          id="#usage"
                        >
                          {storageStats.total_size_gb.toFixed(3)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          dy="1em"
                          className="fill-[#ff4121] text-sm font-['Formula1']"
                        >
                          GB Used
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm translate-y-[-7.5vh] pb-[3.5vh]">
        <div className="flex text-left gap-2 leading-none font-medium">
          {storageStats.usage_percent.toFixed(1)}% of storage used <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {storageStats.file_count} files stored • {(storageStats.max_size_gb - storageStats.total_size_gb).toFixed(2)} GB remaining
        </div>
      </CardFooter>
    </Card>
  )
}