import React from 'react';
import { Link } from 'react-router-dom';
import drMauroJpg from '../../assets/dr-mauro-cezar.jpg';

export const AboutSplit = () => {
  return (
    <section id="escritorio" className="py-20 sm:py-28 bg-white text-[#163758] border-b border-[#CCD4DA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Foto de Mauro Souza (dr-mauro-cezar.jpg) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-[#F3F5F7] border border-[#CCD4DA]">
              <img 
                src={drMauroJpg} 
                alt="Mauro Souza - Advogado Titular"
                className="w-full h-[450px] sm:h-[490px] object-cover object-top"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-[#CCD4DA] text-center">
                <span className="font-sans text-sm font-bold text-[#163758] block">Mauro Céza de Souza</span>
                <span className="text-xs text-[#536773]">OAB/SP: 379.224</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Editorial ao lado da foto */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="eyebrow">
                Sobre o Titular
              </span>
              <h2 className="section-title">
                Atuação técnica, ética e dedicada à segurança jurídica.
              </h2>
              <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
                Mauro Céza de Souza é advogado inscrito na OAB/SP sob o nº 379.224, com mais de 10 anos de advocacia. É pós-graduado em Direito do Trabalho e Processo do Trabalho e em Direito Contratual e Responsabilidade Civil.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#CCD4DA]/50">
              <div className="space-y-1.5">
                <h3 className="font-sans text-base font-bold text-[#163758]">
                  Atendimento direto e individualizado
                </h3>
                <p className="text-xs sm:text-sm text-[#536773] leading-relaxed">
                  Cada caso é analisado de forma singular, com diagnóstico fundamentado na legislação e na jurisprudência aplicável.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-sans text-base font-bold text-[#163758]">
                  Transparência e rigor técnico
                </h3>
                <p className="text-xs sm:text-sm text-[#536773] leading-relaxed">
                  Conferência documental e cálculo detalhado, orientando decisões conscientes sem promessas ilusórias.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/o-escritorio"
                className="btn-navy"
              >
                <span>Conheça a trajetória institucional</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
