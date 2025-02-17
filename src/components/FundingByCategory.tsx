import { useEffect, useState } from 'react';
import { Bar, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { processCsv } from '../processCsv/startupsCsv';

const FundingByCategory = () => {
  interface ChartData {
    category_code: string;
    funding_total_usd: number;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await processCsv('/startup data.csv') as { category_code: string; funding_total_usd: string }[];
      const categoryFunding = data.reduce((acc: Record<string, number>, row: { category_code: string; funding_total_usd: string }) => {
        const category = row.category_code;
        const funding = parseFloat(row.funding_total_usd) || 0;
        if (category) {
          acc[category] = (acc[category] || 0) + funding;
        }
        return acc;
      }, {});
      const chartData = Object.keys(categoryFunding).map(category => ({
        category_code: category,
        funding_total_usd: categoryFunding[category],
      }));
      setChartData(chartData);
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className="text-xl font-semibold mb-4">Distribuição do Total de Financiamento por Categoria</h2>
      <ComposedChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="category_code" stroke="#e4e4e7" />
        <YAxis stroke="#e4e4e7" tickFormatter={(value) => parseFloat(value) / 1000000000 + " billion"} />
        <Tooltip contentStyle={{ backgroundColor: '#2a2a3d', borderColor: '#444' }} />
        <Legend />
        <Bar dataKey="funding_total_usd" fill="#8884d8" />
      </ComposedChart>
    </div>
  );
};

export default FundingByCategory;