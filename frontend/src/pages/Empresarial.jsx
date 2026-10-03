import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Empresarial = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const areas = [
    {
      icon: "fa-building",
      title: "Direito Societário e Reestruturação",
      desc: "Elaboração e alteração de contratos sociais, acordos de sócios, governança corporativa, dissolução parcial de sociedades e apuração técnica de haveres."
    },
    {
      icon: "fa-file-contract",
      title: "Contratos Comerciais e B2B Estratégicos",
      desc: "Negociação, redação e auditoria de contratos de fornecimento, prestação de serviços, representação comercial, franquias, parcerias e acordos de confidencialidade (NDA)."
    },
    {
      icon: "fa-scale-balanced",
      title: "Contencioso e Disputas Empresariais",
      desc: "Defesa e propositura de ações judiciais e procedimentos arbitrais em litígios societários, descumprimentos contratuais, cobranças executivas e responsabilidade civil."
    },
    {
      icon: "fa-money-bill-transfer",
      title: "Recuperação de Créditos e Cobrança Contratual",
      desc: "Gestão jurídica estratégica para recuperação de ativos inadimplidos, execuções de títulos de crédito, protestos e medidas cautelares patrimoniais."
    },
    {
      icon: "fa-shield-halved",
      title: "Compliance Corporativo e Proteção de Dados (LGPD)",
      desc: "Implementação de programas de conformidade normativa, mitigação de riscos regulatórios, adequação à LGPD e elaboração de códigos de conduta empresarial."
    },
    {
      icon: "fa-users-gear",
      title: "Consultoria Trabalhista Preventiva para Empresas",
      desc: "Auditoria de rotinas trabalhistas, adequação à CLT e às decisões dos tribunais superiores, visando à redução drástica do passivo e de contingências judiciais."
    }
  ];

  const faqs = [
    {
      question: "Qual é a importância de um acordo de sócios para a sustentabilidade da empresa?",
      answer: "O acordo de sócios estabelece regras claras sobre direito de voto, critérios de entrada e saída de sócios, direito de preferência, distribuição de lucros e métodos de resolução de conflitos, evitando paralisações operacionais e disputas judiciais desgastantes."
    },
    {
      question: "Como a assessoria jurídica preventiva reduz custos para a empresa?",
      answer: "A prevenção jurídica antecipa vulnerabilidades em contratos e relações de trabalho antes que se convertam em ações judiciais e autuações administrativas. O investimento em prevenção é comprovadamente inferior às despesas com condenações judiciais, juros e perícias."
    },
    {
      question: "Como funciona a apuração de haveres na saída ou exclusão de um sócio?",
      answer: "A apuração de haveres calcula a quota patrimonial devida ao sócio dissidente ou excluído com base na situação patrimonial real da empresa na data da resolução, conforme o art. 1.031 do Código Civil, garantindo justiça na liquidação dos valores."
    },
    {
      question: "Quais mecanismos são mais rápidos para recuperar créditos de clientes inadimplentes?",
      answer: "A atuação combina notificação extrajudicial fundamentada, protesto de títulos e, caso necessário, ajuizamento célere de ação de execução ou ação monitória munida de prova documental robusta, resguardando o fluxo de caixa do negócio."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito Empresarial | Mauro Souza Advocacia"
        description="Consultoria e contencioso em Direito Empresarial: societário, contratos mercantis B2B, recuperação de crédito, compliance e defesa corporativa."
        keywords={["advogado empresarial", "direito empresarial", "direito societario", "acordo de socios", "contratos empresariais", "recuperacao de credito", "mauro souza advocacia"]}
        canonicalPath="/direito-empresarial"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#BB734D]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#BB734D] font-medium" aria-current="page">Direito Empresarial</li>
          </ol>
        </nav>

        {/* Header da Página */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Área de Atuação
          </span>
          <h1 className="section-title">
            Direito Empresarial com foco em segurança jurídica, eficiência e crescimento sustentável.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Assessoramos empresários, sócios e gestores na estruturação de negócios sólidos, blindagem contratual, solução ágil de controvérsias e mitigação de passivos trabalhistas e operacionais.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {areas.map((item, idx) => (
            <div key={idx} className="content-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 text-[#BB734D] text-xl flex items-center mb-5">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                </div>
                <h2 className="font-sans text-lg font-bold text-[#163758] mb-3">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#536773] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ da Área */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-12">
            <span className="eyebrow">Dúvidas Frequentes</span>
            <h2 className="section-title">Perguntas sobre Direito Empresarial</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-[#CCD4DA] rounded bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center text-sm font-bold text-[#163758] hover:text-[#BB734D] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="text-base text-[#BB734D] ml-4">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#536773] leading-relaxed border-t border-[#CCD4DA]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Institucional */}
        <div className="bg-[#F3F5F7] border border-[#CCD4DA] rounded-lg p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758] mb-4">
            Sua empresa necessita de assessoria jurídica especializada?
          </h2>
          <p className="text-sm text-[#536773] mb-6 max-w-xl mx-auto leading-relaxed">
            Agende uma consulta com a equipe técnica para avaliar as necessidades da sua sociedade empresária.
          </p>
          <Link to="/contato" className="btn-copper inline-flex">
            <span>Consultar equipe técnica</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Empresarial;
