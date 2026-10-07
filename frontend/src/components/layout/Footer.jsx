import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

export const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/backoffice' || location.pathname === '/admin') {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E1620] text-slate-300 pt-16 pb-12 border-t border-white/10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Rodapé Institucional</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Coluna 1 & 2: Identidade */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group focus:outline-none" aria-label="Mauro Souza Sociedade Individual de Advocacia — Página Inicial">
              <img 
                src={logoImg} 
                alt="Mauro Souza Sociedade Individual de Advocacia" 
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] rounded mb-1" 
              />
            </Link>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Atuação jurídica técnica e individualizada em Direito do Trabalho, Previdenciário, Empresarial, Família, Sucessões e Contratual.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p>Mauro Céza de Souza • OAB/SP: 379.224</p>
              <p>São Paulo • Atendimento Online em Todo o Brasil</p>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-2">
              <a
                href="https://www.linkedin.com/in/dr-mauro-souza-3a769b22a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-[#0A66C2] border border-white/10 hover:border-[#0A66C2] px-3 py-1.5 rounded transition-all duration-200 group"
                aria-label="LinkedIn oficial de Mauro Souza"
              >
                <i className="fa-brands fa-linkedin text-sm text-[#0A66C2] group-hover:text-white transition-colors" aria-hidden="true"></i>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.facebook.com/mauroceza01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-[#1877F2] border border-white/10 hover:border-[#1877F2] px-3 py-1.5 rounded transition-all duration-200 group"
                aria-label="Facebook oficial de Mauro Souza"
              >
                <i className="fa-brands fa-facebook-f text-sm text-[#1877F2] group-hover:text-white transition-colors" aria-hidden="true"></i>
                <span>Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/adv.maurosouzaoficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] border border-white/10 hover:border-transparent px-3 py-1.5 rounded transition-all duration-200 group"
                aria-label="Instagram oficial de Mauro Souza (@adv.maurosouzaoficial)"
              >
                <i className="fa-brands fa-instagram text-sm text-[#E1306C] group-hover:text-white transition-colors" aria-hidden="true"></i>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Coluna 3: Especialidades */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
              Especialidades
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/direito-do-trabalho" className="hover:text-white transition-colors">
                  Direito Trabalhista
                </Link>
              </li>
              <li>
                <Link to="/direito-previdenciario" className="hover:text-white transition-colors">
                  Direito Previdenciário
                </Link>
              </li>
              <li>
                <Link to="/direito-empresarial" className="hover:text-white transition-colors">
                  Direito Empresarial
                </Link>
              </li>
              <li>
                <Link to="/direito-de-familia" className="hover:text-white transition-colors">
                  Direito de Família
                </Link>
              </li>
              <li>
                <Link to="/direito-das-sucessoes" className="hover:text-white transition-colors">
                  Direito das Sucessões
                </Link>
              </li>
              <li>
                <Link to="/direito-contratual" className="hover:text-white transition-colors">
                  Direito Contratual
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Institucional */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/o-escritorio" className="hover:text-white transition-colors">
                  Perfil e Trajetória
                </Link>
              </li>
              <li>
                <Link to="/central-de-conhecimento" className="hover:text-white transition-colors">
                  Central de Artigos
                </Link>
              </li>
              <li>
                <Link to="/parcerias" className="hover:text-white transition-colors">
                  Programa de Parcerias
                </Link>
              </li>
              <li>
                <Link to="/estagios" className="hover:text-white transition-colors">
                  Oportunidades de Estágio
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">
                  Privacidade (LGPD)
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="hover:text-white transition-colors">
                  Compliance OAB
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 5: Contato */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
              Atendimento
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#BB734D] font-bold block">WhatsApp</span>
                <a href="https://wa.me/5511961595557" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors font-mono">
                  (11) 96159-5557
                </a>
                <a href="https://wa.me/5511952870828" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors font-mono">
                  (11) 95287-0828
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Telefone Fixo</span>
                <a href="tel:+551123595323" className="block hover:text-white transition-colors font-mono">
                  (11) 2359-5323
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">E-mail Institucional</span>
                <a href="mailto:mauroceza@adv.oabsp.org.br" className="block hover:text-white transition-colors">
                  mauroceza@adv.oabsp.org.br
                </a>
              </div>
              <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                Atendimento presencial mediante agendamento e consultoria telepresencial em todo o território nacional.
              </p>
            </div>
          </div>

        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="text-slate-300 font-medium">Mauro Souza Sociedade Individual de Advocacia • CNPJ 48.442.576/0001-35 • OAB/SP 379.224</span>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <Link to="/politica-de-privacidade" className="text-slate-300 hover:text-white underline transition-colors">
              Privacidade
            </Link>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <Link to="/termos-de-uso" className="text-slate-300 hover:text-white underline transition-colors">
              Aviso Legal OAB
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white rounded p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:ring-offset-2 focus:ring-offset-[#0E1620]"
            aria-label="Retornar ao topo da página"
          >
            <span>Retornar ao topo</span>
            <i className="fa-solid fa-arrow-up text-[10px]" aria-hidden="true"></i>
          </button>
        </div>

      </div>
    </footer>
  );
};
