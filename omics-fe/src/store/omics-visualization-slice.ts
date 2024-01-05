import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Notification } from '../common/utils/notification';
import axios from 'axios';
import { IOmicsVisualizationState } from '../common/interfaces/gene';

const initialState: IOmicsVisualizationState = {
  loading: false,
  updating: false,
  errors: null,
  experiments: [],
  filteredGenes: [],
  selectedExperiment: undefined,
  selectedGenes: [],
  geneData: [],
  selectedGene: undefined,
  selectedGeneStats: undefined,
};

export const getAllExperiments = createAsyncThunk('omicsVisualization/getAllExperiments', async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/experiment`);
    return response.data;
  } catch (error) {
    Notification.error(error);
  }
});

export const searchGenes = createAsyncThunk('omicsVisualization/searchGenes', async (payload: any) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/gene/search/${payload.experimentId}/${payload.searchText}`);
    return response.data;
  } catch (error) {
    Notification.error(error);
  }
});

export const getGeneData = createAsyncThunk('omicsVisualization/getGeneData', async (payload: any) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/gene/by-id?ids=${payload.selectedGenes.join(',')}`);
    return response.data;
  } catch (error) {
    Notification.error(error);
  }
});

export const calculateGeneStats = createAsyncThunk('omicsVisualization/calculateGeneStats', async (payload: any) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/gene/stats/${payload.geneId}`);
    return response.data;
  } catch (error) {
    Notification.error(error);
  }
});

export const omicsVisualizationSlice = createSlice({
  initialState,
  name: 'omicsVisualization',
  reducers: {
    reset: () => initialState,
    setSelectedExperiment: (state, { payload }) => {
      state.selectedExperiment = payload;
    },
    setSelectedGenes: (state, { payload }) => {
      state.selectedGenes = payload;
    },
    setSelectedGene: (state, { payload }) => {
      state.selectedGene = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllExperiments.pending, (state) => {
      state.loading = true;
      state.errors = null;
    });

    builder.addCase(getAllExperiments.rejected, (state, { error }: any) => {
      state.loading = false;
      state.errors = error;
      Notification.error(
        {
          title: 'Getting Experiments Error',
          message: error,
        },
        '',
      );
    });

    builder.addCase(getAllExperiments.fulfilled, (state, action: PayloadAction<any>) => {
      state.experiments = action.payload;
      state.loading = false;
    });

    builder.addCase(searchGenes.pending, (state) => {
      state.loading = true;
      state.errors = null;
    });

    builder.addCase(searchGenes.rejected, (state, { error }: any) => {
      state.loading = false;
      state.errors = error;
      Notification.error(
        {
          title: 'Searcing Gene Error',
          message: error,
        },
        '',
      );
    });

    builder.addCase(searchGenes.fulfilled, (state, action: PayloadAction<any>) => {
      state.filteredGenes = action.payload;
      state.loading = false;
    });

    builder.addCase(getGeneData.pending, (state) => {
      state.loading = true;
      state.errors = null;
    });

    builder.addCase(getGeneData.rejected, (state, { error }: any) => {
      state.loading = false;
      state.errors = error;
      Notification.error(
        {
          title: 'Getting Gene Data Error',
          message: error,
        },
        '',
      );
    });

    builder.addCase(getGeneData.fulfilled, (state, action: PayloadAction<any>) => {
      state.geneData = action.payload;
      state.loading = false;
    });

    builder.addCase(calculateGeneStats.pending, (state) => {
      state.loading = true;
      state.errors = null;
    });

    builder.addCase(calculateGeneStats.rejected, (state, { error }: any) => {
      state.loading = false;
      state.errors = error;
      Notification.error(
        {
          title: 'Getting Gene Data Error',
          message: error,
        },
        '',
      );
    });

    builder.addCase(calculateGeneStats.fulfilled, (state, action: PayloadAction<any>) => {
      state.selectedGeneStats = action.payload;
      state.loading = false;
    });
  },
});

export const { reset, setSelectedExperiment, setSelectedGenes, setSelectedGene } = omicsVisualizationSlice.actions;

export default omicsVisualizationSlice.reducer;
