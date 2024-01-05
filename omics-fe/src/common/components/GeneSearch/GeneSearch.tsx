import React, { useState, useCallback } from 'react';
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { searchGenes, setSelectedGenes } from '../../../store/omics-visualization-slice';
import { debounce } from 'lodash';

const GeneSearch = () => {
  const dispatch = useAppDispatch();
  const { filteredGenes, selectedExperiment } = useAppSelector((state) => state.omicsVisualization);
  const [searchValue, setSearchValue] = useState('');

  const fetchGenes = async (searchValue: string) => {
    if (searchValue && selectedExperiment) {
      dispatch(
        searchGenes({
          experimentId: selectedExperiment,
          searchText: searchValue,
        }),
      );
    }
  };

  const debouncedFetchGenes = useCallback(debounce(fetchGenes, 300), [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedFetchGenes(value);
  };

  const handleChange = (selectedGeneIds: any) => {
    dispatch(setSelectedGenes(selectedGeneIds));
  };

  return (
    <Select
      mode='multiple'
      showSearch
      style={{ width: '100%' }}
      placeholder='Search and select genes'
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      disabled={!selectedExperiment}
      allowClear={true}
      notFoundContent={searchValue ? 'No genes found' : null}
    >
      {filteredGenes?.map((gene: any) => (
        <Select.Option key={gene.id} value={gene.id}>
          {gene.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default GeneSearch;
