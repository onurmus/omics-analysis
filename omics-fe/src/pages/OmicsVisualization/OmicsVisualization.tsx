import React, { useState } from 'react';
import GeneSearch from '../../common/components/GeneSearch/GeneSearch';
import { Button, Col, InputNumber, Row } from 'antd';
import ExperimentList from '../../common/components/ExperimentList/ExperimentList';
import './OmicsVisualization.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getGeneData, getOutliers } from '../../store/omics-visualization-slice';
import GeneTable from '../../common/components/GeneTable/GeneTable';
import OutlierTable from '../../common/components/OutlierTable/OutlierTable';

const OmicsVisualization = () => {
  const dispatch = useAppDispatch();
  const { selectedGenes, selectedExperiment, loading } = useAppSelector((state) => state.omicsVisualization);

  const [zThreshold, setZThreshold] = useState<number>(2);

  const handleButtonClick = () => {
    dispatch(getGeneData({ selectedGenes }));
  };

  const handleOutlierButtonClick = () => {
    dispatch(getOutliers({ experimentId: selectedExperiment, zThreshold }));
  };

  const onZThresholdChange = (value: any) => {
    if (value) {
      setZThreshold(value);
    }
  };

  return (
    <>
      <Row className='custom-row'>
        <Col span={8}>
          <ExperimentList />
        </Col>
        <Col span={8}>
          <InputNumber value={zThreshold} onChange={onZThresholdChange} disabled={!selectedExperiment || loading} min={1} max={6} />
          <Button onClick={handleOutlierButtonClick} disabled={!selectedExperiment || loading} type='primary' style={{ marginLeft: 5 }}>
            Get Outliers
          </Button>
        </Col>
      </Row>
      <div className='custom-row'>
        <OutlierTable></OutlierTable>
      </div>

      <Row className='custom-row'>
        <Col span={8}>
          <GeneSearch />
        </Col>
        <Col span={8}>
          <Button
            onClick={handleButtonClick}
            disabled={!selectedExperiment || loading || !selectedGenes.length}
            type='primary'
            style={{ marginLeft: 5 }}
          >
            Get Gene Data
          </Button>
        </Col>
      </Row>
      <div className='custom-row'>
        <GeneTable></GeneTable>
      </div>
    </>
  );
};

export default OmicsVisualization;
