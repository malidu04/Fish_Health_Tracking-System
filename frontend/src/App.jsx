// File: frontend/src/App.jsx - VERIFIED ✅
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FishProvider } from './contexts/FishContext';
import AppRoutes from './AppRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar'; // ← Missing import added
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <FishProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar /> {/* ← Sidebar added */}
              <main className="flex-1 ml-0 lg:ml-64 pt-16"> {/* ← Responsive margin */}
                <AppRoutes />
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </FishProvider>
    </AuthProvider>
  );
}

export default App;