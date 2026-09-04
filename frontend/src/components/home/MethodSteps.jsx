import React from 'react';

export const MethodSteps = () => {
  const steps = [
    {
      num: "01",
      title: "Diagnóstico inicial e levantamento de fatos",
      description: "Ouvimos com atenção o seu relato e examinamos os documentos disponíveis (carteira de trabalho, extratos de pagamento ou comunicados do INSS) para compreender a fundo o cenário."
    },
    {
      num: "02",
      title: "Estudo de viabilidade e fundamentação legal",
      description: "Confrontamos a situação fática com a legislação em vigor e os precedentes dos Tribunais, apresentando um panorama transparente de chances reais, riscos e prazos aplicáveis."
    },
    {
      num: "03",
      title: "Definição formal da estratégia jurídica",
      description: "Estruturamos em conjunto o plano de ação — seja na via consultiva, em requerimentos administrativos ou em ações judiciais —, alinhando expectativas e etapas de execução."
    },
    {
      num: "04",
      title: "Acompanhamento próximo e relatórios periódicos",
      description: "Informamos cada movimentação relevante da sua causa, orientando sobre providências necessárias e adaptando a estratégia caso surjam novos fatos durante o processo."
    }
  ];

  return (
    <section id="metodo" className="py-20 sm:py-28 bg-[#163758] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Lado Esquerdo: Título da Seção */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="eyebrow eyebrow-dark">
              Metodologia de atuação
            </span>
            <h2 className="section-title section-title-dark">
              Como conduzimos a sua assessoria jurídica
            </h2>
            <p className="text-sm sm:text-base text-[#C6D1DA] mt-4 leading-relaxed font-sans">
              Um fluxo estruturado em etapas bem delineadas, garantindo que você tenha previsibilidade, sigilo e acompanhamento próximo em cada fase.
            </p>
          </div>

          {/* Lado Direito: 4 Etapas Numeradas com Estilo e Tipografia Exatas */}
          <div className="lg:col-span-7 divide-y divide-white/15">
            {steps.map((step, idx) => (
              <article key={idx} className="step-item">
                <span className="step-number">{step.num}</span>
                <div className="space-y-1.5">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C6D1DA] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
