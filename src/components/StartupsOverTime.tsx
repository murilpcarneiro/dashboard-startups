import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { processCsv } from '../processCsv/startupsCsv';

const StartupsOverTime: React.FC = () => {
  const [foundedData, setFoundedData] = useState<{ year: number; count: number }[]>([]);
  const [closedData, setClosedData] = useState<{ year: number; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await processCsv('/startup data.csv') as { founded_at: string; closed_at: string }[];
      const foundedCounts: Record<number, number> = data.reduce((acc: Record<number, number>, row: { founded_at: string; closed_at: string }) => {
        const year = new Date(row.founded_at).getFullYear();
        if (year) {
          acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
      }, {});
      const closedCounts: Record<number, number> = data.reduce((acc: Record<number, number>, row: { founded_at: string; closed_at: string }) => {
        const year = new Date(row.closed_at).getFullYear();
        if (year) {
          acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
      }, {});
      const foundedData = Object.keys(foundedCounts).map(year => ({
        year: parseInt(year),
        count: foundedCounts[parseInt(year)],
      }));
      const closedData = Object.keys(closedCounts).map(year => ({
        year: parseInt(year),
        count: closedCounts[parseInt(year)],
      }));
      setFoundedData(foundedData);
      setClosedData(closedData);
    };
    fetchData();
  }, []);

  return (
    <div className='flex'>
      <div className='mr-8'>
        <h2 className="text-xl font-semibold mb-4">Número de Startups Fundadas ao Longo do Tempo</h2>
        <BarChart width={400} height={300} data={foundedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="year" stroke="#e4e4e7" />
          <YAxis stroke="#e4e4e7" />
          <Tooltip contentStyle={{ backgroundColor: '#2a2a3d', borderColor: '#444' }} />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
      <div className='ml-8'>
        <h2 className="text-xl font-semibold mb-4">Número de Startups Fechadas ao Longo do Tempo</h2>
        <BarChart width={400} height={300} data={closedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="year" stroke="#e4e4e7" />
          <YAxis stroke="#e4e4e7" />
          <Tooltip contentStyle={{ backgroundColor: '#2a2a3d', borderColor: '#444' }} />
          <Legend />
          <Bar dataKey="count" fill="#ff7300" />
        </BarChart>
      </div>
    </div>
  );
};

export default StartupsOverTime;