import React, { useEffect } from 'react';
import GeneSearch from '../../common/components/GeneSearch/GeneSearch';
import { Button, Col, Row } from 'antd';
import ExperimentList from '../../common/components/ExperimentList/ExperimentList';
import './OmicsVisualization.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getGeneData, reset } from '../../store/omics-visualization-slice';
import GeneTable from '../../common/components/GeneTable/GeneTable';

const OmicsVisualization = () => {
  const dispatch = useAppDispatch();
  const { selectedGenes, selectedExperiment, loading } = useAppSelector((state) => state.omicsVisualization);

  useEffect(() => {
    console.log('changed experimend');
    console.log(selectedExperiment);
    if (selectedExperiment) {
      //dispatch(reset());
    }
  }, [dispatch, selectedExperiment]);

  const handleButtonClick = () => {
    dispatch(getGeneData({ selectedGenes }));
  };

  return (
    <>
      <Row className='custom-row'>
        <Col span={8}>
          <ExperimentList />
        </Col>
      </Row>

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
