import { useEffect } from 'react';

export const MetaTags = ({ title, description, keywords, canonicalPath = '' }) => {
  useEffect(() => {
    // Update Title
    const fullTitle = title ? `${title} | Mauro Souza Advocacia` : 'Mauro Souza | Advocacia Trabalhista e Previdenciária';
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    }

    // Update Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const fullUrl = `https://maurocezar.adv.br${canonicalPath}`;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

  }, [title, description, keywords, canonicalPath]);

  return null;
};
