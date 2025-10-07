import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import FeatureOverview from './components/FeatureOverview';
import FeatureSelection from './components/FeatureSelection';
import FeatureProcessing from './components/FeatureProcessing';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<FeatureOverview />} />
          <Route path="/select" element={<FeatureSelection />} />
          <Route path="/process/:feature" element={<FeatureProcessing />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
