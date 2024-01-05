import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Heatmap } from '@ant-design/plots';

const GeneHeatmap = () => {
  const { geneData } = useAppSelector((state) => state.omicsVisualization);
  const graphData = geneData.flatMap((gene) => {
    return gene.expressionValues.map((expressionValue) => {
      return { gene: gene.name, sample: expressionValue.sampleName, expressionVal: expressionValue.value };
    });
  });

  const config = {
    height: 300,
    autoFit: false,
    data: graphData,
    xField: 'sample',
    yField: 'gene',
    colorField: 'expressionVal',
    legend: {},
    mark: 'cell',
    style: { inset: 0.5 },
    tooltip: {
      title: 'expressionVal',
      valueFormatter: '~s',
    },
  };

  return (
    <>
      <h2>Heatmap </h2>
      <Heatmap {...config} />
    </>
  );
};

export default GeneHeatmap;
