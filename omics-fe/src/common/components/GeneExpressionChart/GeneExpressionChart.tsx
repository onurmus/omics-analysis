import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Scatter } from '@ant-design/plots';

const GeneExpressionChart = () => {
  const { selectedGene } = useAppSelector((state) => state.omicsVisualization);

  const plotConfig = {
    title: selectedGene?.name,
    data: selectedGene?.expressionValues,
    xField: 'sampleName',
    yField: 'value',
    meta: {
      value: {
        min: 0,
      },
    },
    theme: 'academy',
  };

  return <Scatter {...plotConfig} />;
};

export default GeneExpressionChart;
