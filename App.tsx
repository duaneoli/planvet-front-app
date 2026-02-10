
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Pets from './pages/Pets';
import Contracts from './pages/Contracts';
import Billing from './pages/Billing';
import Profile from './pages/Profile';
import PetSocial from './pages/PetSocial';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache de 5 minutos
      gcTime: 1000 * 60 * 30, // Mantém no lixo por 30 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AuthenticatedLayout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        isCollapsed={isCollapsed} 
        isOpen={isSidebarOpen} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
        onCloseMobile={() => setIsSidebarOpen(false)} 
      />

      <main className="flex-1 overflow-y-auto relative">
        <Header 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          onLogout={onLogout} 
        />

        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:id/social" element={<PetSocial />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <Route path="*" element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />} />
          )}
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
