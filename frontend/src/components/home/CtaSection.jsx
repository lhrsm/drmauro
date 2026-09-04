import React from 'react';
import { Link } from 'react-router-dom';

export const CtaSection = () => {
  return (
    <section id="contato" className="py-20 sm:py-28 bg-[#F3F5F7] text-[#163758] border-t border-[#CCD4DA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Cabeçalho da Seção */}
          <div className="lg:col-span-6 space-y-4">
            <span className="eyebrow">
              Atendimento institucional
            </span>
            <h2 className="section-title">
              Receba uma avaliação preliminar da sua situação jurídica.
            </h2>
          </div>

          {/* Lado Direito: Descrição e CTA Único */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans">
              Apresente os pontos principais do seu caso para que possamos analisar a documentação e orientar sobre os procedimentos mais adequados. O envio de dados segue rigorosamente o Código de Ética da OAB e as diretrizes da LGPD.
            </p>
            
            <div>
              <Link
                to="/contato"
                className="btn-copper inline-flex"
              >
                <span>Solicitar avaliação do caso</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
