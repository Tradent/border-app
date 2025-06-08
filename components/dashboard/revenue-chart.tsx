"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample revenue data
const data = [
  {
    name: "Jan",
    total: 2400,
  },
  {
    name: "Feb",
    total: 1398,
  },
  {
    name: "Mar",
    total: 3200,
  },
  {
    name: "Apr",
    total: 2780,
  },
  {
    name: "May",
    total: 4908,
  },
  {
    name: "Jun",
    total: 3800,
  },
]

export default function RevenueChart() {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value}`, "Revenue"]}
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
          }}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
