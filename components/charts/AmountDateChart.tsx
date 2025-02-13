import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface AmountDateChartProps {
  data: { date: string; creditAmount: number; debitAmount: number }[]
}

const AmountDateChart: React.FC<AmountDateChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" style={{ fontSize: '12px' }} />
        <YAxis style={{ fontSize: '12px' }} />
        <Tooltip
          wrapperStyle={{ fontSize: '12px', backgroundColor: 'black' }}
          contentStyle={{
            backgroundColor: '#222',
            border: 'none',

            padding: '10px',
            color: 'white',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Line
          type="monotone"
          dataKey="creditAmount"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="debitAmount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AmountDateChart
