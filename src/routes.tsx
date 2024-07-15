import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hub from '@pages/Hub';
import GrapherPage from '@pages/Graph';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/graph" element={<GrapherPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;