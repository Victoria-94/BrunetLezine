import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { useAppStore } from './store';

function App() {
  const { isAuthenticated } = useAppStore();
  
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;