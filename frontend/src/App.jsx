import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingContact } from './components/layout/FloatingContact';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { recordPageView } from './services/analyticsService';

function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    recordPageView(location.pathname);

    // Envio automático para o Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-353T61FED0', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location.pathname, location.search]);

  return null;
}

// Guarda de segurança de autenticação do Backoffice (VULN-02 remediada)
function ProtectedRoute({ children }) {
  const session = sessionStorage.getItem('mc_admin_session');
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  try {
    const parsed = JSON.parse(session);
    if (!parsed.token || !parsed.expiresAt || parsed.expiresAt < Date.now()) {
      sessionStorage.removeItem('mc_admin_session');
      return <Navigate to="/login" replace />;
    }
  } catch (e) {
    sessionStorage.removeItem('mc_admin_session');
    return <Navigate to="/login" replace />;
  }
  return children;
}

import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Trabalhista } from './pages/Trabalhista';
import { Previdenciario } from './pages/Previdenciario';
import { Civil } from './pages/Civil';
import { Familia } from './pages/Familia';
import { Sucessoes } from './pages/Sucessoes';
import { Propriedade } from './pages/Propriedade';
import { Contratual } from './pages/Contratual';
import { Parcerias } from './pages/Parcerias';
import { Estagios } from './pages/Estagios';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contato } from './pages/Contato';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Backoffice } from './pages/Backoffice';
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade';
import { TermosUso } from './pages/TermosUso';

import { ErrorBoundary } from './components/common/ErrorBoundary';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageViewTracker />
      <div className="flex flex-col min-h-screen bg-white text-[#163758] font-sans antialiased selection:bg-[#BB734D] selection:text-white">
        <Navbar />
        
        <div className="flex-grow">
          <ErrorBoundary>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-escritorio" element={<Sobre />} />
            <Route path="/direito-do-trabalho" element={<Trabalhista />} />
            <Route path="/direito-previdenciario" element={<Previdenciario />} />
            <Route path="/direito-civil" element={<Civil />} />
            <Route path="/direito-de-familia" element={<Familia />} />
            <Route path="/familia" element={<Familia />} />
            <Route path="/direito-das-sucessoes" element={<Sucessoes />} />
            <Route path="/sucessoes" element={<Sucessoes />} />
            <Route path="/direito-de-propriedade" element={<Propriedade />} />
            <Route path="/propriedade" element={<Propriedade />} />
            <Route path="/direito-contratual" element={<Contratual />} />
            <Route path="/contratual" element={<Contratual />} />
            <Route path="/parcerias" element={<Parcerias />} />
            <Route path="/estagios" element={<Estagios />} />
            <Route path="/central-de-conhecimento" element={<Blog />} />
            <Route path="/central-de-conhecimento/:slug" element={<BlogPost />} />
            <Route path="/artigos/:slug" element={<BlogPost />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route 
              path="/backoffice" 
              element={
                <ProtectedRoute>
                  <Backoffice />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Backoffice />
                </ProtectedRoute>
              } 
            />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
          </ErrorBoundary>
        </div>

        <FloatingContact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
