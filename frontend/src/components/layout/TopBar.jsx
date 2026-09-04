import React from 'react';

export const TopBar = () => {
  return (
    <div className="bg-[#080A0E] text-slate-400 text-xs border-b border-[#262E3D] py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        
        {/* Registro OAB & Atuação */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-slate-300">
            <i className="fa-solid fa-scale-balanced text-[#C5A059]" aria-hidden="true"></i>
            <strong>Mauro Souza</strong> | Advocacia Especializada
          </span>
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-[#C5A059]" aria-hidden="true"></i>
            Conformidade com Provimento 205/2021 CFOAB
          </span>
        </div>

        {/* Contato Rápido e Horários */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+5511961595557"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-phone text-[#C5A059]" aria-hidden="true"></i>
            <span>(11) 96159-5557</span>
          </a>
          <a
            href="https://wa.me/5511952870828?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20com%20Mauro%20Souza."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-[#C5A059] transition-colors"
            aria-label="Canal de Atendimento no WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-emerald-400" aria-hidden="true"></i>
            <span>(11) 95287-0828</span>
          </a>
          <a
            href="https://www.facebook.com/mauroceza01?mibextid=wwXIfr&rdid=smufJZxwGCMuDMR2&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EUrdWxcYS%2F%3Fmibextid%3DwwXIfr#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            aria-label="Perfil de Mauro Souza no Facebook"
          >
            <i className="fa-brands fa-facebook text-[#1877F2]" aria-hidden="true"></i>
            <span>Facebook</span>
          </a>
        </div>

      </div>
    </div>
  );
};
