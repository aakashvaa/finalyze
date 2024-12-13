"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Swapped colors
const COLORS = ["hsl(var(--chart-2))", "hsl(var(--chart-1))"];

export default function InvestmentCard({
  invest,
  nonInvest,
}: {
  invest: number;
  nonInvest: number;
}) {
  const data = [
    { name: "Investment", value: invest },
    { name: "Non-Investment", value: nonInvest },
  ];
  return (
    <div className="w-fit  ">
      <CardContent>
        <ChartContainer
          config={{
            investment: {
              label: "Investment",
              color: "hsl(var(--chart-2))", // Updated to match swapped order
            },
            nonInvestment: {
              label: "Non-Investment",
              color: "hsl(var(--chart-1))", // Updated to match swapped order
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
