import React from 'react';
import { Hero } from '../components/home/Hero';
import { ScenarioCards } from '../components/home/ScenarioCards';
import { MethodSteps } from '../components/home/MethodSteps';
import { AboutSplit } from '../components/home/AboutSplit';
import { ArticlesFeed } from '../components/home/ArticlesFeed';
import { CtaSection } from '../components/home/CtaSection';
import { LegalServiceJsonLd } from '../components/seo/JsonLd';
import { MetaTags } from '../components/seo/MetaTags';

export const Home = () => {
  return (
    <main id="main-content">
      <MetaTags
        title="Mauro Souza Sociedade Individual de Advocacia | Zona Leste de SP e Online"
        description="Assessoria jurídica em Direito do Trabalho, Previdenciário, Empresarial, Família, Sucessões e Contratual. Atendimento presencial e online em todo o Brasil."
        keywords={["advogado trabalhista sp", "advogado previdenciario", "advogado empresarial", "direito de familia", "direito das sucessoes", "direito contratual", "mauro souza advocacia"]}
        canonicalPath="/"
      />
      <LegalServiceJsonLd />
      
      <Hero />
      <ScenarioCards />
      <MethodSteps />
      <AboutSplit />
      <ArticlesFeed />
      <CtaSection />
    </main>
  );
};
