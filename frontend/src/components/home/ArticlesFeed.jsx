import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, getCustomArticles } from '../../data/articlesData';
import { fetchSupabaseArticles } from '../../services/backofficeService';

export const ArticlesFeed = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const loadArticles = () => {
      const all = getAllArticles();
      const custom = getCustomArticles();
      const defaultFeatured = [
        all.find(a => a.id === 'direito-trabalhista-1') || all[20],
        all.find(a => a.id === 'direito-previdenciario-1') || all[0],
        all.find(a => a.id === 'direito-trabalhista-16') || all[35],
        all.find(a => a.id === 'direito-previdenciario-10') || all[9],
        all.find(a => a.id === 'direito-trabalhista-5') || all[24],
        all.find(a => a.id === 'direito-previdenciario-3') || all[2]
      ].filter(Boolean);

      const merged = [
        ...custom,
        ...defaultFeatured.filter(df => !custom.some(c => c.id === df.id))
      ].slice(0, 6);
      
      setFeatured(merged);
    };

    loadArticles();
    fetchSupabaseArticles().then(loadArticles);
    window.addEventListener('mc_articles_updated', loadArticles);
    return () => window.removeEventListener('mc_articles_updated', loadArticles);
  }, []);

  return (
    <section id="conteudos" className="py-20 sm:py-28 bg-[#F3F5F7] text-[#163758] border-b border-[#CCD4DA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-14">
          <span className="eyebrow">
            Acervo de orientações
          </span>
          <h2 className="section-title">
            Conteúdo técnico para esclarecer direitos trabalhistas e previdenciários.
          </h2>
          <p className="text-base sm:text-lg text-[#5B6B76] mt-4 leading-relaxed font-sans">
            Guias explicativos e artigos fundamentados na legislação e nos tribunais para auxiliar trabalhadores e segurados em suas decisões cotidianas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((post) => (
            <article 
              key={post.id}
              className="bg-white border border-[#CCD4DA] rounded p-6 flex flex-col justify-between hover:border-[#964F2D] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#5B6B76] mb-3 pb-3 border-b border-[#CCD4DA]/40">
                  <span className="font-semibold text-[#964F2D]">
                    {post.category}
                  </span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="font-sans text-base font-bold text-[#163758] hover:text-[#964F2D] transition-colors leading-snug mb-3">
                  <Link to={`/central-de-conhecimento/${post.slug}`}>
                    {post.h1}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#63717C] line-clamp-3 leading-relaxed mb-6 font-sans">
                  {post.metaDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-[#CCD4DA]/40">
                <Link
                  to={`/central-de-conhecimento/${post.slug}`}
                  className="text-xs font-semibold text-[#163758] hover:text-[#964F2D] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Ler guia completo</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/central-de-conhecimento"
            className="btn-navy"
          >
            <span>Explorar artigos</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
