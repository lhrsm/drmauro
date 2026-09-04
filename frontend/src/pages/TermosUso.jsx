import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const TermosUso = () => {
  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Termos de Uso e Compliance OAB | Mauro Souza"
        description="Termos de uso do portal institucional Mauro Souza Advocacia em conformidade com o Provimento nº 205/2021 do CFOAB."
        keywords={["termos de uso", "compliance oab", "aviso legal"]}
        canonicalPath="/termos-de-uso"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#BB734D]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#BB734D] font-medium" aria-current="page">Termos de Uso</li>
          </ol>
        </nav>

        <article className="space-y-6 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
          <span className="eyebrow">Institucional</span>
          <h1 className="section-title">
            Termos de Uso e Aviso de Conformidade Ética
          </h1>

          <p className="text-xs text-slate-500 border-b border-[#CCD4DA] pb-4">
            Em estrita consonância com o Provimento nº 205/2021 do Conselho Federal da OAB e o Código de Ética e Disciplina da Advocacia.
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">1. Finalidade Exclusivamente Informativa</h2>
            <p>
              As publicações, guias e artigos disponibilizados neste site possuem finalidade estritamente educativa e de utilidade pública, não configurando consulta jurídica formal nem substituindo a análise individualizada de um advogado.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">2. Não Vinculação de Resultados</h2>
            <p>
              A atividade advocatícia é de meio e não de resultado. O escritório não faz promessas de ganho de causa ou de valores específicos em ações judiciais ou requerimentos perante o INSS.
            </p>
          </section>
        </article>

      </div>
    </main>
  );
};
