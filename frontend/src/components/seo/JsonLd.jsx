import React from 'react';

export const LegalServiceJsonLd = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Mauro Souza Advocacia e Consultoria",
    "url": "https://maurocezar.adv.br",
    "logo": "https://maurocezar.adv.br/favicon.svg",
    "image": "https://maurocezar.adv.br/assets/dr-mauro-cezar.jpg",
    "description": "Escritório de advocacia especializado em Direito do Trabalho e Direito Previdenciário. Atendimento presencial e telepresencial em todo o Brasil.",
    "telephone": "+55-11-96159-5557",
    "email": "mauroceza@adv.oabsp.org.br",
    "founder": {
      "@type": "Person",
      "name": "Mauro Souza",
      "jobTitle": "Advogado Titular",
      "identifier": "OAB/SP: 379.224",
      "worksFor": {
        "@type": "LegalService",
        "name": "Mauro Souza Advocacia"
      }
    },
    "knowsAbout": [
      "Direito do Trabalho",
      "Direito Previdenciário",
      "Aposentadoria por Idade",
      "Aposentadoria Especial",
      "BPC/LOAS",
      "Rescisão Indireta",
      "Acidentes de Trabalho",
      "Horas Extras"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/mauroceza01",
      "https://www.instagram.com/adv.maurosouzaoficial"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export const FaqJsonLd = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export const ArticleJsonLd = ({ article }) => {
  if (!article) return null;

  const keywordsString = Array.isArray(article.keywords)
    ? article.keywords.filter(Boolean).join(", ")
    : (article.category || "Direito Trabalhista, Direito Previdenciário");

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.h1 || article.title,
    "description": article.metaDescription || "",
    "url": `https://www.msadvocaciaonline.adv.br/central-de-conhecimento/${article.slug}`,
    "datePublished": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": (article.author && article.author.name) || "Mauro Cezar de Souza",
      "jobTitle": (article.author && article.author.role) || "Advogado"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mauro Souza Advocacia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.msadvocaciaonline.adv.br/favicon.svg"
      }
    },
    "keywords": keywordsString
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
