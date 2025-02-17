import Papa from 'papaparse';

export const processCsv = async (filePath: string) => {
  const response = await fetch(filePath);
  const csv = await response.text();
  const parsed = Papa.parse(csv, { header: true });
  return parsed.data;
};