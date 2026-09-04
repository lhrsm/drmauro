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
        title="Mauro Souza | Advocacia Trabalhista e Previdenciária"
        description="O escritório de Mauro Souza orienta pessoas e trabalhadores em questões trabalhistas e previdenciárias com clareza, técnica e presença."
        keywords={["advogado trabalhista", "advogado previdenciario", "direito do trabalho", "direito previdenciario inss", "mauro souza advocacia"]}
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
