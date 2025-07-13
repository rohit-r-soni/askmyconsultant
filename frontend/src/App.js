import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ConsultantProfile from './pages/ConsultantProfile';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consultant/:id" element={<ConsultantProfile />} />
            <Route path={process.env.REACT_APP_ADMIN_URL_PATH || "/admin-panel-2025-secure-access"} element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 