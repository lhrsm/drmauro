import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Fechar dropdowns ao clicar fora ou pressionar Escape (WCAG 2.1)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const solutionLinks = [
    { name: 'DIREITO CIVIL', path: '/direito-civil' },
    { name: 'DIREITO TRABALHISTA', path: '/direito-do-trabalho' },
    { name: 'DIREITO PREVIDENCIÁRIO', path: '/direito-previdenciario' },
    { name: 'DIREITO DE FAMÍLIA', path: '/direito-de-familia' },
    { name: 'DIREITO DAS SUCESSÕES', path: '/direito-das-sucessoes' },
    { name: 'DIREITO DE PROPRIEDADE', path: '/direito-de-propriedade' },
    { name: 'DIREITO CONTRATUAL', path: '/direito-contratual' },
  ];

  const opportunityLinks = [
    { name: 'PARCERIAS', path: '/parcerias' },
    { name: 'ESTÁGIOS', path: '/estagios' },
  ];

  const isSolucoesActive = solutionLinks.some(
    (link) => location.pathname === link.path || location.pathname.startsWith(link.path)
  );

  const isOportunidadesActive = opportunityLinks.some(
    (link) => location.pathname === link.path || location.pathname.startsWith(link.path)
  );

  // Não renderizar a Navbar pública dentro do Backoffice
  if (location.pathname === '/backoffice' || location.pathname === '/admin') {
    return null;
  }

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 bg-[#0E1620] border-b ${
        scrolled ? 'border-white/10 shadow-lg' : 'border-white/5'
      }`}
    >
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-[#BB734D] focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Pular para o conteúdo
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Oficial */}
          <Link 
            to="/" 
            className="flex items-center group focus:outline-none py-1"
            aria-label="Mauro Souza Advocacia & Consultoria — Página Inicial"
          >
            <img 
              src={logoImg} 
              alt="Mauro Souza Advocacia & Consultoria" 
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] rounded" 
            />
          </Link>

          {/* Navegação Desktop com Dropdowns Soluções & Oportunidades */}
          <nav ref={navRef} className="hidden md:flex items-center gap-7 h-full" aria-label="Navegação principal">
            
            {/* Dropdown 1: Soluções */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('solucoes')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'solucoes' ? null : 'solucoes')}
                className={`flex items-center gap-1.5 text-xs tracking-wider uppercase font-bold transition-all focus:outline-none py-2 border-b-2 ${
                  isSolucoesActive || activeDropdown === 'solucoes'
                    ? 'text-white border-[#BB734D]'
                    : 'text-slate-200 hover:text-white border-transparent'
                }`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'solucoes'}
              >
                <span>SOLUÇÕES</span>
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${activeDropdown === 'solucoes' ? 'rotate-180' : ''}`} aria-hidden="true"></i>
              </button>

              {activeDropdown === 'solucoes' && (
                <div 
                  className="absolute left-0 top-[calc(100%-8px)] w-72 bg-white rounded-md shadow-2xl border border-slate-200/80 divide-y divide-slate-100 z-50 animate-in fade-in slide-in-from-top-1 duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {solutionLinks.map((link) => {
                    const active = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                        className={`block px-5 py-3 text-xs font-bold tracking-wider transition-colors ${
                          active
                            ? 'text-[#BB734D] bg-slate-50 font-extrabold'
                            : 'text-[#163758] hover:text-[#BB734D] hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 2: Oportunidades */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('oportunidades')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'oportunidades' ? null : 'oportunidades')}
                className={`flex items-center gap-1.5 text-xs tracking-wider uppercase font-bold transition-all focus:outline-none py-2 border-b-2 ${
                  isOportunidadesActive || activeDropdown === 'oportunidades'
                    ? 'text-white border-[#BB734D]'
                    : 'text-slate-200 hover:text-white border-transparent'
                }`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'oportunidades'}
              >
                <span>OPORTUNIDADES</span>
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${activeDropdown === 'oportunidades' ? 'rotate-180' : ''}`} aria-hidden="true"></i>
              </button>

              {activeDropdown === 'oportunidades' && (
                <div 
                  className="absolute left-0 top-[calc(100%-8px)] w-56 bg-white rounded-sm shadow-2xl border border-slate-100 divide-y divide-slate-100 z-50 animate-in fade-in slide-in-from-top-1 duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {opportunityLinks.map((link) => {
                    const active = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                        className={`block px-6 py-4 text-xs font-bold tracking-wider transition-colors ${
                          active
                            ? 'text-[#BB734D] bg-slate-50 font-extrabold'
                            : 'text-[#163758] hover:text-[#BB734D] hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

          </nav>

          {/* Botão de Login Outline */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-[#BB734D] text-white hover:bg-[#BB734D] hover:text-white text-sm font-semibold px-5 py-2.5 rounded transition-all"
            >
              <span>Login</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:ring-offset-2 focus:ring-offset-[#0E1620]"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} aria-hidden="true"></i>
            </button>
          </div>

        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#121C28] border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#D49A78] px-3 pb-1 border-b border-white/10">
              Soluções
            </div>
            <div className="space-y-1 pl-2 pt-1">
              {solutionLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded text-sm font-medium ${
                    location.pathname === link.path 
                      ? 'text-[#D49A78] bg-[#0E1620] font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#D49A78] px-3 pb-1 border-b border-white/10">
              Oportunidades
            </div>
            <div className="space-y-1 pl-2 pt-1">
              {opportunityLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded text-sm font-medium ${
                    location.pathname === link.path 
                      ? 'text-[#D49A78] bg-[#0E1620] font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex justify-center items-center gap-2 border border-[#BB734D] text-white hover:bg-[#BB734D] text-sm font-semibold py-3 rounded transition-all"
            >
              <span>Login</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
