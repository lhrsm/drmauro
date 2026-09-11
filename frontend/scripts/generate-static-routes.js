import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');
const distDir = path.join(frontendDir, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf-8');

// Copy 404.html
fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf-8');
console.log('✓ Generated dist/404.html');

// Static institutional routes
const staticRoutes = [
  'o-escritorio',
  'direito-do-trabalho',
  'direito-previdenciario',
  'direito-civil',
  'direito-de-familia',
  'familia',
  'direito-das-sucessoes',
  'sucessoes',
  'direito-de-propriedade',
  'propriedade',
  'direito-contratual',
  'contratual',
  'parcerias',
  'estagios',
  'central-de-conhecimento',
  'contato',
  'login',
  'dashboard',
  'backoffice',
  'admin',
  'politica-de-privacidade',
  'termos-de-uso'
];

// 1. Extract article slugs from local articlesData.js
const articlesFile = path.join(frontendDir, 'src', 'data', 'articlesData.js');
if (fs.existsSync(articlesFile)) {
  const content = fs.readFileSync(articlesFile, 'utf-8');
  const slugRegex = /"slug":\s*"([^"]+)"/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1];
    staticRoutes.push('central-de-conhecimento/' + slug);
    staticRoutes.push('artigos/' + slug);
  }
}

// 2. Fetch dynamic published articles directly from Supabase database
try {
  const supabaseUrl = 'https://qmomnjwulklzybujlkdj.supabase.co';
  const supabaseKey = 'sb_publishable_hJ7YnZQkohwIDFeWNOD_SA__R03_3qg';
  const res = await fetch(`${supabaseUrl}/rest/v1/artigos?select=slug&status=eq.Publicado`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  if (res.ok) {
    const dbArticles = await res.json();
    for (const art of dbArticles) {
      if (art.slug) {
        staticRoutes.push('central-de-conhecimento/' + art.slug);
        staticRoutes.push('artigos/' + art.slug);
      }
    }
    console.log(`✓ Loaded ${dbArticles.length} published articles from Supabase database.`);
  }
} catch (err) {
  console.warn('Could not fetch dynamic articles from Supabase (offline or timeout):', err.message);
}

// Deduplicate routes
const uniqueRoutes = [...new Set(staticRoutes)];

let count = 0;
for (const r of uniqueRoutes) {
  const routeDir = path.join(distDir, r);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');

  // Also write direct .html file (e.g. dist/direito-do-trabalho.html)
  const directHtml = path.join(distDir, r + '.html');
  fs.mkdirSync(path.dirname(directHtml), { recursive: true });
  fs.writeFileSync(directHtml, html, 'utf-8');
  count++;
}

console.log(`✓ Successfully prerendered ${count} unique routes with index.html fallback.`);
