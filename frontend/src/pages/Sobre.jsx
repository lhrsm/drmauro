import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import drMauroJpg from '../assets/dr-mauro-cezar.jpg';

export const Sobre = () => {
  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="O Escritório | Mauro Souza Advocacia"
        description="Conheça a história, a filosofia de trabalho e a prática especializada de Mauro Souza em Direito Trabalhista e Previdenciário."
        keywords={["mauro souza", "escritorio de advocacia mauro cezar", "advocacia etica oab", "sobre o advogado"]}
        canonicalPath="/o-escritorio"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#BB734D]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#BB734D] font-medium" aria-current="page">O Escritório</li>
          </ol>
        </nav>

        {/* Header da Página */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Perfil Institucional
          </span>
          <h1 className="section-title">
            Assessoria técnica orientada pela verdade dos fatos e pela segurança jurídica.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Uma atuação jurídica focada em compreender a realidade de cada cliente, analisando riscos e construindo defesas sólidas nas relações de emprego e na seguridade social.
          </p>
        </div>

        {/* Bloco 1: Split Media / Mauro Souza */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 pb-16 border-b border-[#CCD4DA]/60">
          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden shadow-lg bg-[#F3F5F7] border border-[#CCD4DA]">
              <img 
                src={drMauroJpg} 
                alt="Mauro Souza - Advogado Fundador" 
                className="w-full h-[460px] object-cover object-top"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-[#CCD4DA] text-center">
                <strong className="text-[#163758] block text-sm font-sans">Mauro Souza</strong>
                <span className="text-xs text-[#536773]">OAB/SP: 379.224</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
              Fundamentação e prática profissional
            </h2>
            <p>
              Ao longo de sua trajetória, o <strong>Mauro Souza</strong> estruturou um escritório voltado para a excelência técnico-jurídica, dedicando-se exclusivamente a questões que envolvem o Direito do Trabalho e o Direito Previdenciário.
            </p>
            <p>
              Em decorrência das profundas transformações normativas ocorridas no ordenamento jurídico brasileiro, a condução de demandas exige análise minuciosa de documentos, auditoria contábil de haveres trabalhistas e cálculo preciso de regras de transição previdenciárias.
            </p>
            <p>
              O escritório repudia a padronização em massa. Cada causa é tratada com estudo aprofundado da jurisprudência dominante, assegurando que o cliente receba diagnósticos francos e representação combativa perante órgãos administrativos e judiciais.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F3F5F7] rounded border border-[#CCD4DA]">
                <strong className="block text-sm text-[#163758] font-sans">Relações Trabalhistas</strong>
                <span className="text-xs text-[#63717C] mt-1 block">Defesa de direitos decorrentes de vínculo de emprego e rescisões.</span>
              </div>
              <div className="p-4 bg-[#F3F5F7] rounded border border-[#CCD4DA]">
                <strong className="block text-sm text-[#163758] font-sans">Seguridade Social</strong>
                <span className="text-xs text-[#63717C] mt-1 block">Concessão, revisão e planejamento de benefícios junto ao INSS.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco 2: Diretrizes Éticas */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow">Diretrizes éticas</span>
            <h2 className="section-title">Valores que regem nossa atuação</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#F3F5F7] rounded border border-[#CCD4DA]">
              <h3 className="font-sans text-base font-bold text-[#163758] mb-2">Clareza e objetividade</h3>
              <p className="text-xs sm:text-sm text-[#63717C] leading-relaxed">
                Apresentamos explicações diretas sobre o andamento e o significado de cada medida processual adotada.
              </p>
            </div>

            <div className="p-6 bg-[#F3F5F7] rounded border border-[#CCD4DA]">
              <h3 className="font-sans text-base font-bold text-[#163758] mb-2">Transparência nas probabilidades</h3>
              <p className="text-xs sm:text-sm text-[#63717C] leading-relaxed">
                Demonstramos os pontos fortes e os pontos vulneráveis de cada pleito, sem promessas ilusórias de ganho fácil.
              </p>
            </div>

            <div className="p-6 bg-[#F3F5F7] rounded border border-[#CCD4DA]">
              <h3 className="font-sans text-base font-bold text-[#163758] mb-2">Alcance em todo o Brasil</h3>
              <p className="text-xs sm:text-sm text-[#63717C] leading-relaxed">
                Atendimento presencial em sede física e estrutura eletrônica segura com assinatura digital em âmbito nacional.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 bg-[#163758] text-white rounded text-center max-w-4xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Deseja avaliar o seu caso com nossa equipe?
          </h3>
          <p className="text-sm text-[#C6D1DA] max-w-xl mx-auto mb-6">
            Entre em contato para agendar uma consulta preliminar e obter direcionamento jurídico fundamentado.
          </p>
          <Link
            to="/contato"
            className="btn-copper"
          >
            <span>Agendar atendimento</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};
