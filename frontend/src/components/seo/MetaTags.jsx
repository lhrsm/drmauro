import { useEffect } from 'react';

export const MetaTags = ({ title, description, keywords, canonicalPath = '' }) => {
  useEffect(() => {
    // Update Title
    const fullTitle = title 
      ? (title.includes('Mauro Souza') ? title : `${title} | Mauro Souza Sociedade Individual de Advocacia`) 
      : 'Mauro Souza Sociedade Individual de Advocacia | Zona Leste de SP e Online';
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
    const fullUrl = `https://www.msadvocaciaonline.adv.br${canonicalPath}`;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Update Open Graph URL & Title
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullUrl);
    }
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description);
    }

  }, [title, description, keywords, canonicalPath]);

  return null;
};
