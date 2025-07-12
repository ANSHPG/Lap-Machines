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

export const description = "A radial chart with a custom shape"

const chartData = [
  { browser: "safari", visitors: 75, fill: "#e3ad5e" } // Purple
]

const chartConfig = {
  visitors: {
    label: "visitors",
  },
  safari: {
    label: "Safari",
    color: "#e3ad5e",
  },
} satisfies ChartConfig

export default function ChartRadialShape() {
  return (
    <Card id="SizeChart" className="translate-y-[59vh] w-[50vw] h-[40vh] bg-ablack border-0 flex flex-col ">
      <CardHeader className="items-center pb-0 text-left w-full ">
        <CardTitle>Memory Avaliable</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[320px] aspect-square justify-self-center translate-y-[-4vh]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={190}
            innerRadius={110}
            outerRadius={190}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="#000"
              polarRadius={[110]}
              strokeWidth={10}
              className="first:fill-[#470e0e] last:fill-background"
            />
            <RadialBar dataKey="visitors" fill="#9333ea" background />

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
                          id="#visitors"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          dy="1em"
                          className="fill-[#ff4121] text-sm font-['Formula1']  "
                        >
                          GBs Used
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

      <CardFooter className="flex-col items-start  gap-2 text-sm  translate-y-[-7.5vh] pb-[3.5vh]">
        <div className="flex text-left gap-2 leading-none font-medium">
          Increased up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total memory avaliable for now onwards
        </div>
      </CardFooter>
    </Card>
  )
}
