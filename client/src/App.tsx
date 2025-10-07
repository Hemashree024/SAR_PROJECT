import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import FeatureOverview from './components/FeatureOverview';
import FeatureSelection from './components/FeatureSelection';
import FeatureProcessing from './components/FeatureProcessing';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<FeatureOverview />} />
      <Route path="/select" element={<FeatureSelection />} />
      <Route path="/process/:feature" element={<FeatureProcessing />} />
    </Routes>
  );
};

export default App;
