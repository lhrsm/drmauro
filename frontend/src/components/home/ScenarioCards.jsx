import React from 'react';
import { Link } from 'react-router-dom';

export const ScenarioCards = () => {
  const scenarios = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: "Dúvidas sobre o encerramento do contrato de trabalho?",
      description: "Verificamos a exatidão das verbas rescisórias, horas extraordinárias pendentes, rescisão por justa causa e hipóteses cabíveis de rescisão indireta.",
      link: "/direito-do-trabalho"
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Incapacidade física ou complicações na rotina laboral?",
      description: "Orientação técnica para casos de acidentes de trabalho, doenças ocupacionais, garantia de estabilidade provisória e adicionais de insalubridade ou periculosidade.",
      link: "/direito-do-trabalho"
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="M7 21h10" />
          <path d="M12 3v18" />
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
      ),
      title: "Indeferimento ou corte de benefício pelo INSS?",
      description: "Análise minuciosa do laudo da perícia médica e das razões de indeferimento para interposição de recursos administrativos ou ajuizamento de ação judicial.",
      link: "/direito-previdenciario"
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
      ),
      title: "Busca pela concessão da melhor aposentadoria possível?",
      description: "Auditoria do extrato previdenciário (CNIS) com simulação das regras de transição vigentes para definir o momento ideal e maximizar a renda mensal.",
      link: "/direito-previdenciario"
    }
  ];

  return (
    <section id="caminhos" className="py-20 sm:py-28 bg-white text-[#163758] border-b border-[#CCD4DA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Situações atendidas pelo escritório
          </span>
          <h2 className="section-title">
            Identifique o suporte adequado para o seu momento
          </h2>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Seja para prevenir prejuízos antes de uma assinatura ou para buscar a reparação de direitos já violados, nossa equipe examina a viabilidade da sua demanda com rigor e transparência.
          </p>
        </div>

        {/* Bloco Unificado com Cards Juntos e Clean */}
        <div className="border border-[#CCD4DA] rounded-lg overflow-hidden bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className={`group flex flex-col justify-between p-7 sm:p-8 bg-white hover:bg-[#FAF8F5] transition-colors duration-200 text-left ${
                idx > 0 ? 'border-t border-[#CCD4DA] md:border-t-0' : ''
              } ${
                idx % 2 === 1 ? 'md:border-l md:border-[#CCD4DA]' : ''
              } ${
                idx >= 2 ? 'md:border-t md:border-[#CCD4DA] lg:border-t-0' : ''
              } ${
                idx > 0 ? 'lg:border-l lg:border-[#CCD4DA]' : ''
              }`}
              aria-label={`Saiba mais sobre: ${card.title}`}
            >
              <div>
                {/* Ícone Outline dentro de Círculo */}
                <div className="w-12 h-12 rounded-full border border-[#BB734D]/30 bg-[#BB734D]/5 flex items-center justify-center text-[#BB734D] group-hover:border-[#BB734D] group-hover:bg-[#BB734D] group-hover:text-white transition-all duration-200 mb-6 shrink-0">
                  {card.icon}
                </div>
                
                <h3 className="font-sans text-base font-bold text-[#163758] group-hover:text-[#964F2D] transition-colors leading-snug mb-3">
                  {card.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#536773] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#CCD4DA]/40 flex items-center gap-1.5 text-xs font-semibold text-[#964F2D] group-hover:text-[#7D3F22]">
                <span>Saiba mais</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
