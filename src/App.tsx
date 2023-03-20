import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PermissionTable from './components/PermissionTable';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PermissionTable />} />
      </Routes>
    </Router>
  );
}


export default App
