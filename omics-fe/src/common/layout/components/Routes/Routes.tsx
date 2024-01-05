import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import OmicsVisualization from '../../../../pages/OmicsVisualization/OmicsVisualization';
import CreateExperiment from '../../../../pages/Experiment/CreateExperiment';

export const CustomRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OmicsVisualization />} />
        <Route path='/experiment' element={<CreateExperiment />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};
