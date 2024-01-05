import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";

import { omicsVisualizationSlice } from "./omics-visualization-slice";

export const defaultReducers = {
  omicsVisualization: omicsVisualizationSlice.reducer,
};
const rootReducer = combineReducers(defaultReducers);

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    preloadedState,
    reducer: rootReducer,
  });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const createParameterSelector = <T, R>(selector: (params: T) => R) => {
  return (_: any, params: T) => selector(params);
};

export default store;
