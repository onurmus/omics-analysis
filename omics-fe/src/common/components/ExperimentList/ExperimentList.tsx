import React, { useEffect } from 'react';
import { Select } from 'antd';
import { getAllExperiments, reset, setSelectedExperiment } from '../../../store/omics-visualization-slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const ExperimentList = () => {
  const dispatch = useAppDispatch();
  const { experiments, loading } = useAppSelector((state) => state.omicsVisualization);

  useEffect(() => {
    dispatch(getAllExperiments());
  }, [dispatch]);

  const handleExperimentChange = (experiment: any) => {
    dispatch(setSelectedExperiment(experiment));
  };

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder='Select an experiment'
      optionFilterProp='children'
      loading={loading}
      onChange={handleExperimentChange}
      filterOption={(input, option) => !!option?.children?.toString().toLowerCase().includes(input.toLowerCase())}
    >
      {experiments?.map((experiment: any) => (
        <Select.Option key={`${experiment.id}`} value={experiment.id}>
          {experiment.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ExperimentList;
