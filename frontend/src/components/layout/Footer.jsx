import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white block leading-none">
                MAURO SOUZA
              </span>
              <span className="font-sans text-[11px] tracking-widest text-[#D49A78] uppercase font-semibold mt-1 block">
                Advocacia & Consultoria
              </span>
            </Link>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Defesa qualificada e assessoria consultiva em Direito do Trabalho e Direito Previdenciário, com compromisso ético e rigor processual.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p>Mauro Souza • OAB/SP: 379.224</p>
              <p>Sede em São Paulo • Atendimento Digital Nacional</p>
            </div>

            <div className="pt-2">
              <a
                href="https://www.facebook.com/mauroceza01?mibextid=wwXIfr&rdid=smufJZxwGCMuDMR2&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EUrdWxcYS%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-[#1877F2] border border-white/10 hover:border-[#1877F2] px-3 py-1.5 rounded transition-all duration-200 group"
                aria-label="Facebook oficial de Mauro Souza"
              >
                <i className="fa-brands fa-facebook-f text-sm text-[#1877F2] group-hover:text-white transition-colors" aria-hidden="true"></i>
                <span>Siga no Facebook</span>
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
                <Link to="/direito-civil" className="hover:text-white transition-colors">
                  Direito Civil
                </Link>
              </li>
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
                <Link to="/direito-de-propriedade" className="hover:text-white transition-colors">
                  Direito de Propriedade
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
              <a href="tel:+5511961595557" className="block hover:text-white transition-colors">
                (11) 96159-5557
              </a>
              <a href="mailto:mauroceza@adv.oabsp.org.br" className="block hover:text-white transition-colors">
                mauroceza@adv.oabsp.org.br
              </a>
              <p className="text-xs text-slate-500 pt-1">
                Atendimento presencial mediante agendamento e consultoria telepresencial em todo o território nacional.
              </p>
            </div>
          </div>

        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-300 font-medium">MAURO SOUZA ADVOCACIA © {new Date().getFullYear()}</span>
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
