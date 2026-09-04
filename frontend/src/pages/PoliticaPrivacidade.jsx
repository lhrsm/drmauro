import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const PoliticaPrivacidade = () => {
  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Política de Privacidade | Mauro Souza Advocacia"
        description="Termos de privacidade e tratamento de dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD)."
        keywords={["politica de privacidade", "lgpd advocacia", "protecao de dados"]}
        canonicalPath="/politica-de-privacidade"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#BB734D]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#BB734D] font-medium" aria-current="page">Política de Privacidade</li>
          </ol>
        </nav>

        <article className="space-y-6 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
          <span className="eyebrow">Institucional</span>
          <h1 className="section-title">
            Política de Privacidade e Proteção de Dados
          </h1>

          <p className="text-xs text-slate-500 border-b border-[#CCD4DA] pb-4">
            Em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">1. Finalidade do Tratamento de Dados</h2>
            <p>
              O escritório <strong>Mauro Souza Advocacia</strong> coleta e utiliza informações fornecidas voluntariamente nos formulários de contato e canais de WhatsApp estritamente para viabilizar o retorno e o atendimento jurídico preliminar solicitado pelo usuário.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">2. Sigilo Profissional da Advocacia</h2>
            <p>
              Todas as informações transmitidas gozam da proteção e do dever ético de sigilo profissional estabelecido pelo Estatuto da Advocacia e pela OAB (art. 7º, XIX da Lei nº 8.906/1994).
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">3. Direitos do Titular</h2>
            <p>
              O titular dos dados poderá, a qualquer momento, solicitar a confirmação, correção ou exclusão de suas informações através do e-mail <strong>mauroceza@adv.oabsp.org.br</strong>.
            </p>
          </section>
        </article>

      </div>
    </main>
  );
};
