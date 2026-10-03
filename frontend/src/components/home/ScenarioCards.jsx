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
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="M7 21h10" />
          <path d="M12 3v18" />
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
      ),
      title: "Indeferimento ou planejamento de aposentadoria no INSS?",
      description: "Auditoria minuciosa do CNIS, simulação das regras de transição vigentes, concessão do melhor benefício e recursos administrativos.",
      link: "/direito-previdenciario"
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      title: "Desafios societários, contratos e riscos na sua empresa?",
      description: "Estruturação societária, acordos de sócios, contratos mercantis B2B, recuperação estratégica de créditos e assessoria trabalhista preventiva.",
      link: "/direito-empresarial"
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Questões de divórcio, partilha de bens, guarda ou pensão?",
      description: "Condução técnica e humanizada de divórcios judiciais e em cartório, fixação de pensão alimentícia e regulamentação de convivência familiar.",
      link: "/direito-de-familia"
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Inventário, partilha de herança ou planejamento sucessório?",
      description: "Abertura e condução de inventários extrajudiciais e judiciais, redação de testamentos e organização patrimonial para evitar conflitos.",
      link: "/direito-das-sucessoes"
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
      title: "Elaboração, auditoria ou descumprimento de contratos?",
      description: "Redação de instrumentos personalizados com garantias sólidas, revisão de cláusulas abusivas e ajuizamento de ações rescisórias ou revisionais.",
      link: "/direito-contratual"
    }
  ];

  return (
    <section id="caminhos" className="py-20 sm:py-28 bg-white text-[#163758] border-b border-[#CCD4DA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Áreas de Atuação Especializada
          </span>
          <h2 className="section-title">
            Identifique o suporte adequado para o seu momento
          </h2>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Seja para prevenir prejuízos antes de uma assinatura ou para buscar a reparação de direitos, nossa equipe examina a viabilidade da sua demanda com rigor e transparência nas 6 áreas principais do escritório.
          </p>
        </div>

        {/* Bloco Unificado com Cards em 3 Colunas */}
        <div className="border border-[#CCD4DA] rounded-lg overflow-hidden bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className={`group flex flex-col justify-between p-7 sm:p-8 bg-white hover:bg-[#FAF8F5] transition-colors duration-200 text-left ${
                idx > 0 ? 'border-t border-[#CCD4DA] md:border-t-0' : ''
              } ${
                idx % 2 === 1 ? 'md:border-l md:border-[#CCD4DA]' : ''
              } ${
                idx >= 2 ? 'md:border-t md:border-[#CCD4DA]' : ''
              } ${
                idx % 3 !== 0 ? 'lg:border-l lg:border-[#CCD4DA]' : 'lg:border-l-0'
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
