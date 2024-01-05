import React from 'react';
import { Modal } from 'antd';
import { useAppSelector } from '../../../store/hooks';

export const StatsModal = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
  const { selectedGeneStats } = useAppSelector((state) => state.omicsVisualization);
  return (
    <Modal title={`Gene Statistics for ${selectedGeneStats?.name}`} open={show} onOk={() => handleClose()} onCancel={() => handleClose()}>
      <p> Mean: {selectedGeneStats?.mean} </p>
      <p> Median: {selectedGeneStats?.median} </p>
      <p> Variance: {selectedGeneStats?.variance} </p>
    </Modal>
  );
};
