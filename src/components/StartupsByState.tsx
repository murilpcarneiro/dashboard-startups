import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { processCsv } from '../processCsv/startupsCsv';

const StartupsByState: React.FC = () => {
  const [chartData, setChartData] = useState<{ state: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await processCsv('/startup data.csv') as { state_code: string }[];
      const stateCounts = data.reduce((acc: Record<string, number>, row) => {
        const state = row.state_code;
        if (state) {
          acc[state] = (acc[state] || 0) + 1;
        }
        return acc;
      }, {});
      const chartData = Object.keys(stateCounts).map(state => ({
        state,
        count: stateCounts[state],
      }));
      setChartData(chartData);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Distribuição de Startups por Estado</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="state" stroke="#e4e4e7" />
          <YAxis stroke="#e4e4e7" />
          <Tooltip contentStyle={{ backgroundColor: '#2a2a3d', borderColor: '#444' }} />
          <Legend />
          <Bar dataKey="count" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StartupsByState;