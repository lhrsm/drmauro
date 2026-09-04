import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/bg.png';

export const Hero = () => {
  return (
    <section 
      id="inicio"
      className="relative bg-[#0E1620] text-white py-28 sm:py-36 lg:py-44 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Imagem de Fundo (bg.png) com Gradiente Atmosférico */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="" 
          className="w-full h-full object-cover object-center opacity-60 scale-105 transition-transform duration-1000"
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#0E1620] via-[#0E1620]/95 via-45% via-[#0E1620]/75 to-[#0E1620]/30"
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#0E1620] via-transparent to-[#0E1620]/60"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          
          <div className="space-y-6">
            <h1 
              id="hero-title"
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-sm"
            >
              Clareza jurídica <br />
              para proteger <br />
              o que você construiu.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-sans max-w-2xl font-normal drop-shadow-sm">
              O escritório de <strong>Mauro Souza</strong> atua com dedicação técnica e rigor ético em causas trabalhistas e previdenciárias, avaliando cada aspecto do seu caso para orientar decisões seguras e conscientes.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/contato"
                className="btn-copper shadow-lg"
              >
                <span>Solicitar análise do seu caso</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
