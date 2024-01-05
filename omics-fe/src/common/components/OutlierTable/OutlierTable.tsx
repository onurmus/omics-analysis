import React, { useMemo } from 'react';
import { Col, Divider, Row, Table } from 'antd';
import { useAppSelector } from '../../../store/hooks';
import { SampleExpressionValues } from '../../interfaces/gene';

const OutlierTable = () => {
  const { outliers } = useAppSelector((state) => state.omicsVisualization);

  const columns = useMemo(() => {
    if (!outliers.length) return [];
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      ...outliers[0]?.expressionValues?.map((expressionValue) => ({
        title: expressionValue.sampleName,
        dataIndex: 'expressionValues',
        key: expressionValue.sampleName,
        render: (expressionValues: any) =>
          expressionValues.find((val: SampleExpressionValues) => val.sampleName === expressionValue.sampleName).value,
      })),
      {
        title: 'Outliers',
        key: 'Outliers',
        render: (record: any) => record.outliers.map((t: any) => t.sampleName),
      },
    ];
  }, [outliers]);

  return (
    <>
      <Row className='custom-row'>
        <Col>{!!outliers.length && <Table rowKey='id' columns={columns} dataSource={outliers} />}</Col>
      </Row>
      <Divider />
    </>
  );
};

export default OutlierTable;
