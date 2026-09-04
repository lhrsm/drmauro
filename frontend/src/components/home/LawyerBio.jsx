import React from 'react';
import { Link } from 'react-router-dom';

export const LawyerBio = () => {
  return (
    <section className="py-24 bg-[#07090D] text-white border-b border-[#262E3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Foto e Card Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#C5A059]/30 to-transparent blur-lg opacity-40"></div>
              
              <div className="relative rounded-2xl bg-[#131722] border border-[#262E3D] p-4 shadow-2xl">
                <img 
                  src="/assets/dr-mauro-cezar.jpg" 
                  alt="Mauro Souza - Advogado Especialista" 
                  className="w-full h-96 object-cover object-top rounded-xl border border-[#262E3D]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-96 rounded-xl bg-[#181E2E] border border-[#262E3D] hidden items-center justify-center text-[#C5A059] text-6xl"
                  aria-hidden="true"
                >
                  <i className="fa-solid fa-user-tie"></i>
                </div>

                <div className="mt-4 p-3 bg-[#0B0D12] rounded-lg border border-[#262E3D] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Mauro Souza</p>
                    <p className="text-xs text-[#964F2D] font-semibold">OAB/SP: 379.224</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Atendimento</span>
                    <span className="text-xs font-semibold text-emerald-400">Presencial & Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biografia e Filosofia de Trabalho */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131722] border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold uppercase tracking-wider">
              <i className="fa-solid fa-gavel" aria-hidden="true"></i>
              <span>Autoridade & Experiência Técnica</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Advocacia Pautada na Técnica, na Transparência e no Rigor Ético.
            </h2>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                O escritório liderado por <strong>Mauro Souza</strong> atua com foco exclusivo na defesa qualificada dos direitos de trabalhadores, segurados e beneficiários da Previdência Social.
              </p>
              <p>
                A complexidade das relações de trabalho e as sucessivas reformas previdenciárias exigem do advogado não apenas conhecimento das normas, mas profunda capacidade analítica de cálculos, perícias e jurisprudência dos Tribunais Regionais e Superiores.
              </p>
              <p>
                Cada caso é tratado de maneira individualizada, fornecendo ao cliente uma avaliação lúcida e realista de suas possibilidades jurídicas, pautada nos mais estritos deveres de lealdade, sigilo e transparência exigidos pela Ordem dos Advogados do Brasil.
              </p>
            </div>

            {/* Grid de Diferenciais de Conduta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#131722] border border-[#262E3D]">
                <i className="fa-solid fa-file-shield text-[#C5A059] text-base mt-0.5" aria-hidden="true"></i>
                <div>
                  <h3 className="text-xs font-bold text-white">Análise Prévia Factual</h3>
                  <p className="text-[11px] text-slate-400">Estudo de viabilidade antes de qualquer medida judicial.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#131722] border border-[#262E3D]">
                <i className="fa-solid fa-comments text-[#C5A059] text-base mt-0.5" aria-hidden="true"></i>
                <div>
                  <h3 className="text-xs font-bold text-white">Comunicação Acessível</h3>
                  <p className="text-[11px] text-slate-400">Linguagem clara, sem jargões desnecessários.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/o-escritorio"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] hover:text-[#DFB76C] uppercase tracking-wider"
              >
                <span>Conhecer a trajetória institucional completa</span>
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
