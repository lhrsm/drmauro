import React from 'react';

export const LegalServiceJsonLd = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Mauro Souza Sociedade Individual de Advocacia",
    "url": "https://www.msadvocaciaonline.adv.br",
    "logo": "https://www.msadvocaciaonline.adv.br/favicon.svg",
    "image": "https://www.msadvocaciaonline.adv.br/assets/dr-mauro-cezar.jpg",
    "description": "Assessoria jurídica técnica e individualizada nas áreas Trabalhista, Previdenciária, Empresarial, Família, Sucessões e Contratual.",
    "telephone": "+55-11-96159-5557",
    "email": "mauroceza@adv.oabsp.org.br",
    "taxID": "48.442.576/0001-35",
    "founder": {
      "@type": "Person",
      "name": "Mauro Céza de Souza",
      "jobTitle": "Advogado Titular",
      "identifier": "OAB/SP: 379.224",
      "worksFor": {
        "@type": "LegalService",
        "name": "Mauro Souza Sociedade Individual de Advocacia"
      }
    },
    "knowsAbout": [
      "Direito do Trabalho",
      "Direito Previdenciário",
      "Direito Empresarial",
      "Direito de Família",
      "Direito das Sucessões",
      "Direito Contratual",
      "Aposentadoria por Idade",
      "Aposentadoria Especial",
      "BPC/LOAS",
      "Rescisão Indireta",
      "Acidentes de Trabalho",
      "Horas Extras",
      "Contratos Empresariais",
      "Direito Societário"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/dr-mauro-souza-3a769b22a",
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
      "name": (article.author && article.author.name) || "Mauro Céza de Souza",
      "jobTitle": (article.author && article.author.role) || "Advogado Titular",
      "identifier": "OAB/SP: 379.224"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mauro Souza Sociedade Individual de Advocacia",
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
