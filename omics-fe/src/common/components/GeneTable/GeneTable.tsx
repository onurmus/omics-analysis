import React, { useState, useMemo } from 'react';
import { Col, Row, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { calculateGeneStats, setSelectedGene } from '../../../store/omics-visualization-slice';
import { Gene, SampleExpressionValues } from '../../interfaces/gene';
import { AreaChartOutlined } from '@ant-design/icons';
import { StatsModal } from '../StatsModal/StatsModal';
import GeneExpressionChart from '../GeneExpressionChart/GeneExpressionChart';

const GeneTable = () => {
  const dispatch = useAppDispatch();
  const { geneData } = useAppSelector((state) => state.omicsVisualization);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(false);

  const columns = useMemo(() => {
    if (!geneData.length) return [];
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      ...geneData[0]?.expressionValues?.map((expressionValue) => ({
        title: expressionValue.sampleName,
        dataIndex: 'expressionValues',
        key: expressionValue.sampleName,
        render: (expressionValues: any) =>
          expressionValues.find((val: SampleExpressionValues) => val.sampleName === expressionValue.sampleName).value,
      })),
      {
        title: 'Analysis',
        key: 'analysis',
        render: (text: string, record: Gene) => <AreaChartOutlined onClick={() => onChartOpen(record)} style={{ fontSize: '28px', color: '#08c' }} />,
      },
    ];
  }, [geneData]);

  const onChartOpen = (geneData: Gene) => {
    setShowChart(true);
    dispatch(setSelectedGene(geneData));
    dispatch(calculateGeneStats({ geneId: geneData.id })).then(() => {
      setShowStatsModal(true);
    });
  };

  return (
    <>
      <Row className='custom-row'>{!!geneData.length && <Table rowKey='id' columns={columns} dataSource={geneData} />}</Row>
      <Row className='custom-row'>{showChart && <GeneExpressionChart></GeneExpressionChart>} </Row>
      <Row>{showStatsModal && <StatsModal show={showStatsModal} handleClose={() => setShowStatsModal(false)}></StatsModal>}</Row>
    </>
  );
};

export default GeneTable;
