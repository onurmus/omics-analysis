import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Scatter } from '@ant-design/plots';

const GeneExpressionChart = () => {
  const { selectedGene } = useAppSelector((state) => state.omicsVisualization);

  const plotConfig = {
    height: 300,
    data: selectedGene?.expressionValues,
    xField: 'sampleName',
    yField: 'value',
    title: selectedGene?.name,
  };

  return <Scatter {...plotConfig} />;
};

export default GeneExpressionChart;
