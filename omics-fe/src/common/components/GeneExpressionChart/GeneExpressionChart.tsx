import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Chart as ChartJS, LinearScale, PointElement, CategoryScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, CategoryScale, BarElement);

const GeneExpressionChart = () => {
  const { selectedGene } = useAppSelector((state) => state.omicsVisualization);

  const options = {
    plugins: {
      title: {
        display: true,
        text: selectedGene?.name,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Gene Expression Values',
        data: selectedGene?.expressionValues.map((value) => ({ x: value.sampleName, y: value.value })),
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default GeneExpressionChart;
