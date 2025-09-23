"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type BaseLineChartProps = {
  data: Record<string, string | number>[];
  colors?: string[];
  keys: string[];
};

export default function BaseLineChart({ data, colors = [], keys }: BaseLineChartProps) {
  if (!data || data.length === 0) return <p>데이터가 없습니다</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="yearMonth" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key, idx) => (
          <Line key={key} type="monotone" dataKey={key} name={key === "emissions" ? "배출량" : key} stroke={colors[idx % colors.length] || `hsl(${idx * 60}, 70%, 50%)`} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
