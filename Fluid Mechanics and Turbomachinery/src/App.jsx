import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AppRoutes />
      </div>
    </BrowserRouter>

  );
}

export default App;
