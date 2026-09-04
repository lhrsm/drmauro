import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../data/articlesData';
import { MetaTags } from '../components/seo/MetaTags';

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [allArticles, setAllArticles] = useState(getAllArticles());

  useEffect(() => {
    const refresh = () => setAllArticles(getAllArticles());
    window.addEventListener('mc_articles_updated', refresh);
    return () => window.removeEventListener('mc_articles_updated', refresh);
  }, []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      const matchCategory =
        selectedCategory === 'todos' || art.categorySlug === selectedCategory;

      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        art.title.toLowerCase().includes(q) ||
        art.h1.toLowerCase().includes(q) ||
        art.metaDescription.toLowerCase().includes(q) ||
        art.keywords.some((k) => k.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [allArticles, searchTerm, selectedCategory]);

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Central de Conhecimento | Artigos de Mauro Souza"
        description="Guias e orientações técnicas sobre Direito Trabalhista e Previdenciário produzidos por Mauro Souza."
        keywords={["artigos direito do trabalho", "artigos previdenciario", "noticias inss", "direitos clt", "mauro souza blog"]}
        canonicalPath="/central-de-conhecimento"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#BB734D]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#BB734D] font-medium" aria-current="page">Central de Conhecimento</li>
          </ol>
        </nav>

        {/* Header da Central */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow">
            Central de Conhecimento
          </span>
          <h1 className="section-title">
            Orientações técnicas sobre Direito Trabalhista e Previdenciário.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Consulte nosso acervo com 40 guias especializados, elaborados com responsabilidade técnica e fundamentação jurídica sólida.
          </p>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="bg-[#F3F5F7] border border-[#CCD4DA] rounded p-6 mb-12 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          
          {/* Categorias */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === 'todos'
                  ? 'bg-[#163758] text-white'
                  : 'bg-white text-[#163758] border border-[#CCD4DA] hover:bg-slate-50'
              }`}
            >
              Todos os Guias ({articlesData.length})
            </button>
            <button
              onClick={() => setSelectedCategory('direito-do-trabalho')}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === 'direito-do-trabalho'
                  ? 'bg-[#163758] text-white'
                  : 'bg-white text-[#163758] border border-[#CCD4DA] hover:bg-slate-50'
              }`}
            >
              Direito do Trabalho (20)
            </button>
            <button
              onClick={() => setSelectedCategory('direito-previdenciario')}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === 'direito-previdenciario'
                  ? 'bg-[#163758] text-white'
                  : 'bg-white text-[#163758] border border-[#CCD4DA] hover:bg-slate-50'
              }`}
            >
              Direito Previdenciário (20)
            </button>
          </div>

          {/* Campo de Pesquisa */}
          <div className="relative w-full md:w-80">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por assunto ou palavra..."
              aria-label="Pesquisar por assunto ou palavra-chave"
              className="w-full pl-9 pr-4 py-2 rounded bg-white border border-[#CCD4DA] text-xs text-[#163758] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:border-[#964F2D]"
            />
            <i className="fa-solid fa-magnifying-glass text-slate-500 text-xs absolute left-3 top-3" aria-hidden="true"></i>
          </div>

        </div>

        {/* Contador */}
        <p className="text-xs text-[#536773] mb-6 font-sans">
          Exibindo {filteredArticles.length} de {articlesData.length} publicações disponíveis
        </p>

        {/* Grid de Artigos */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center my-12 bg-[#F3F5F7] rounded border border-[#CCD4DA]" role="status">
            <p className="text-base font-bold text-[#163758] mb-1">Nenhum resultado encontrado</p>
            <p className="text-xs text-[#536773]">Tente refinar sua busca utilizando outros termos como "aposentadoria", "rescisão" ou "insalubridade".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="bg-white border border-[#CCD4DA] rounded p-6 flex flex-col justify-between hover:border-[#964F2D] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5B6B76] mb-3 pb-3 border-b border-[#CCD4DA]/40">
                    <span className="font-semibold text-[#964F2D]">
                      {art.category}
                    </span>
                    <span>{art.readingTime}</span>
                  </div>

                  <h2 className="font-sans text-base font-bold text-[#163758] hover:text-[#964F2D] transition-colors mb-3 line-clamp-2">
                    <Link to={`/central-de-conhecimento/${art.slug}`}>
                      {art.h1}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#536773] line-clamp-3 leading-relaxed mb-6 font-sans">
                    {art.metaDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#CCD4DA]/40">
                  <Link
                    to={`/central-de-conhecimento/${art.slug}`}
                    className="text-xs font-semibold text-[#163758] hover:text-[#964F2D] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Acessar conteúdo</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};
