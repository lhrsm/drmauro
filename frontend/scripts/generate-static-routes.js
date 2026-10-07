import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articlesData } from '../src/data/articlesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');
const distDir = path.join(frontendDir, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html does not exist! Please run "vite build" first.');
  process.exit(1);
}

const rawTemplate = fs.readFileSync(indexPath, 'utf-8');
const baseTemplate = rawTemplate.replace(/<div\s+id=["']root["']>[\s\S]*?<\/div>/i, '<div id="root"></div>');
const domain = 'https://www.msadvocaciaonline.adv.br';

// Helper to escape HTML characters in text
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper to inject custom SEO tags and pre-rendered semantic HTML
function renderPageHtml({ title, description, canonicalUrl, preRenderedHtml }) {
  let html = baseTemplate;

  // 1. Update <title>
  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapeHtml(title)}</title>`);
  }

  // 2. Update <meta name="description" ...>
  if (description) {
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      () => `<meta name="description" content="${escapeHtml(description)}" />`
    );
  }

  // 3. Update canonical URL
  if (canonicalUrl) {
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      () => `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );
  }

  // 4. Update Open Graph tags
  if (title) {
    html = html.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      () => `<meta property="og:title" content="${escapeHtml(title)}" />`
    );
  }
  if (description) {
    html = html.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      () => `<meta property="og:description" content="${escapeHtml(description)}" />`
    );
  }
  if (canonicalUrl) {
    html = html.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      () => `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
    );
  }

  // 5. Inject Pre-rendered semantic HTML into <div id="root">
  if (preRenderedHtml) {
    html = html.replace('<div id="root"></div>', () => `<div id="root">\n${preRenderedHtml}\n</div>`);
  }

  return html;
}

// Static institutional pages metadata and semantic content
const institutionalPages = {
  '': {
    title: 'Mauro Souza Sociedade Individual de Advocacia | Zona Leste de SP e Online',
    description: 'Assessoria jurídica em Direito do Trabalho, Previdenciário, Empresarial, Família, Sucessões e Contratual. Atendimento presencial e online em todo o Brasil.',
    canonicalUrl: `${domain}/`,
    content: `
      <main class="institutional-page">
        <header class="py-12 bg-[#163758] text-white px-6">
          <div class="max-w-5xl mx-auto">
            <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Mauro Souza Sociedade Individual de Advocacia • OAB/SP 379.224 • CNPJ 48.442.576/0001-35</span>
            <h1 class="text-3xl md:text-5xl font-bold mt-2">Advocacia na Zona Leste de São Paulo, com atendimento online em todo o Brasil</h1>
            <p class="text-lg text-slate-200 mt-4 max-w-3xl">Atuação jurídica técnica e individualizada nas áreas Trabalhista, Previdenciária, Empresarial, Família, Sucessões e Contratual.</p>
          </div>
        </header>

        <section class="max-w-5xl mx-auto px-6 py-12">
          <h2 class="text-2xl font-bold text-[#163758] mb-6">Nossas 6 Áreas de Atuação</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-do-trabalho">Direito do Trabalho</a></h3>
              <p class="text-slate-600 mt-2">Atuação em rescisões contratuais, verbas rescisórias, horas extras, acidentes de trabalho, assédio moral e equiparação salarial.</p>
            </article>
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-previdenciario">Direito Previdenciário (INSS)</a></h3>
              <p class="text-slate-600 mt-2">Planejamento previdenciário, aposentadorias por tempo, idade, especial, BPC/LOAS, pensão por morte e recursos administrativos.</p>
            </article>
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-empresarial">Direito Empresarial</a></h3>
              <p class="text-slate-600 mt-2">Assessoria jurídica consultiva e contenciosa: contratos mercantis B2B, governança societária, recuperação de créditos e compliance.</p>
            </article>
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-de-familia">Direito de Família</a></h3>
              <p class="text-slate-600 mt-2">Atendimento humanizado em divórcio consensual ou litigioso, partilha de bens, guarda compartilhada, pensão alimentícia e união estável.</p>
            </article>
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-das-sucessoes">Direito das Sucessões</a></h3>
              <p class="text-slate-600 mt-2">Inventário judicial e extrajudicial em cartório, planejamento sucessório patrimonial, doações, testamentos e partilha de herança.</p>
            </article>
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-contratual">Direito Contratual</a></h3>
              <p class="text-slate-600 mt-2">Elaboração, auditoria e revisão de contratos civis e empresariais com foco na prevenção de riscos contratuais.</p>
            </article>
          </div>
        </section>

        <section class="bg-slate-50 py-12 px-6">
          <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-[#163758] mb-4">Sobre o Titular — Mauro Céza de Souza</h2>
            <p class="text-slate-700 leading-relaxed font-sans text-base">
              Mauro Céza de Souza é advogado inscrito na OAB/SP sob o nº 379.224, com mais de 10 anos de advocacia. É pós-graduado em Direito do Trabalho e Processo do Trabalho e em Direito Contratual e Responsabilidade Civil.
            </p>
            <div class="mt-6 flex flex-wrap gap-4">
              <a href="/o-escritorio" class="text-[#BB734D] font-semibold underline">Conheça a trajetória do escritório &rarr;</a>
              <a href="/central-de-conhecimento" class="text-[#BB734D] font-semibold underline">Central de Conhecimento &rarr;</a>
              <a href="/contato" class="text-[#BB734D] font-semibold underline">Fale com o escritório &rarr;</a>
            </div>
          </div>
        </section>

        <footer class="bg-[#0E1620] text-slate-300 py-8 px-6 text-center text-sm">
          <p class="font-medium">Mauro Souza Sociedade Individual de Advocacia • CNPJ 48.442.576/0001-35 • OAB/SP 379.224</p>
          <div class="mt-4 flex flex-wrap justify-center gap-6 text-xs">
            <a href="https://www.linkedin.com/in/dr-mauro-souza-3a769b22a" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">LinkedIn</a>
            <a href="https://www.instagram.com/adv.maurosouzaoficial" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">Instagram: @adv.maurosouzaoficial</a>
            <a href="https://www.facebook.com/mauroceza01" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">Facebook</a>
            <a href="/politica-de-privacidade" class="hover:text-white underline">Política de Privacidade</a>
            <a href="/termos-de-uso" class="hover:text-white underline">Termos de Uso</a>
          </div>
        </footer>
      </main>
    `
  },
  'o-escritorio': {
    title: 'O Escritório | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Conheça Mauro Céza de Souza, titular de Mauro Souza Sociedade Individual de Advocacia. Atuação em SP e atendimento online em todo o Brasil.',
    canonicalUrl: `${domain}/o-escritorio`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">OAB/SP 379.224 • CNPJ 48.442.576/0001-35</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">O Escritório Mauro Souza</h1>
        <p class="text-lg text-slate-700 mb-6 leading-relaxed font-sans">
          Mauro Céza de Souza é advogado inscrito na OAB/SP sob o nº 379.224, com mais de 10 anos de advocacia. É pós-graduado em Direito do Trabalho e Processo do Trabalho e em Direito Contratual e Responsabilidade Civil.
        </p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Filosofia de Atuação</h2>
        <p class="text-slate-700 mb-4 leading-relaxed font-sans">
          O escritório Mauro Souza Sociedade Individual de Advocacia atua com base no estudo individualizado e técnico dos fatos e da legislação. A condução de cada demanda envolve exame minucioso de documentos e orientação franca sobre as probabilidades de cada medida.
        </p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Estrutura e Atendimento</h2>
        <p class="text-slate-700 mb-4 leading-relaxed font-sans">
          Atendimento presencial na Zona Leste de São Paulo (mediante agendamento) e atendimento por videoconferência a clientes em qualquer localidade do país ou no exterior, respeitando integralmente as diretrizes do Provimento nº 205/2021 do CFOAB e da LGPD.
        </p>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com o escritório &rarr;</a>
        </div>
      </main>
    `
  },
  'direito-do-trabalho': {
    title: 'Direito do Trabalho | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Atuação em Direito do Trabalho: rescisão contratual, verbas rescisórias, horas extras, acidente de trabalho, assédio moral e equiparação salarial.',
    canonicalUrl: `${domain}/direito-do-trabalho`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito do Trabalho</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Atuação técnica e fundamentada nas relações de trabalho. Análise criteriosa de contratos, jornadas laborais, salários e condições de saúde ocupacional.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Rescisão Contratual e Verbas Rescisórias:</strong> Cálculo e conferência de saldo salarial, aviso prévio, férias proporcionais, 13º salário e multa do FGTS.</li>
          <li><strong>Horas Extras e Intervalos Intrajornada:</strong> Apuração de horas excedentes, plantões, sobreaviso e intervalos de descanso.</li>
          <li><strong>Acidentes de Trabalho e Doenças Ocupacionais:</strong> Reparação de danos, estabilidade provisória e direitos previdenciários correlatos.</li>
          <li><strong>Assédio Moral e Rescisão Indireta:</strong> Orientação e atuação em casos de descumprimento de obrigações contratuais pelo empregador.</li>
          <li><strong>Equiparação Salarial e Desvio de Função:</strong> Reivindicação de diferenças salariais por trabalho de igual valor.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com o escritório &rarr;</a>
        </div>
      </main>
    `
  },
  'direito-previdenciario': {
    title: 'Direito Previdenciário (INSS) | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Planejamento previdenciário, aposentadoria por tempo, idade, especial, BPC/LOAS, auxílio por incapacidade e recursos no INSS.',
    canonicalUrl: `${domain}/direito-previdenciario`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito Previdenciário (INSS)</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Atuação perante o INSS e a Justiça Federal com diagnóstico previdenciário e conferência de vínculos contributivos.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Planejamento Previdenciário:</strong> Análise do CNIS e simulação das regras de transição da EC 103/2019.</li>
          <li><strong>Aposentadorias do Regime Geral (RGPS):</strong> Aposentadoria por idade, tempo de contribuição, aposentadoria do professor e da pessoa com deficiência.</li>
          <li><strong>Aposentadoria Especial:</strong> Análise de PPP e LTCAT para atividades com exposição a agentes nocivos.</li>
          <li><strong>Benefícios por Incapacidade:</strong> Auxílio por incapacidade temporária e aposentadoria por incapacidade permanente.</li>
          <li><strong>BPC / LOAS:</strong> Benefício assistencial para idosos com 65 anos ou mais e pessoas com deficiência em situação de vulnerabilidade.</li>
          <li><strong>Pensão por Morte:</strong> Concessão e defesa de dependentes de segurados.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com o escritório &rarr;</a>
        </div>
      </main>
    `
  },
  'direito-empresarial': {
    title: 'Direito Empresarial | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Assessoria jurídica para empresas: societário, contratos mercantis, governança, recuperação de créditos e compliance.',
    canonicalUrl: `${domain}/direito-empresarial`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito Empresarial</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Assessoria jurídica consultiva e contenciosa para empresas. Operações mercantis, governança societária, relações trabalhistas e recuperação de créditos.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Frentes de Atuação Empresarial</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">1. Contratos Empresariais e Mercantis</h3>
            <p class="text-slate-600 mt-2">Elaboração, negociação e auditoria de contratos B2B, fornecimento, prestação de serviços e parcerias comerciais.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">2. Estruturação Societária e M&amp;A</h3>
            <p class="text-slate-600 mt-2">Constituição de sociedades, acordos de sócios, reorganizações societárias e resolução de controvérsias.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">3. Gestão de Passivos e Recuperação de Créditos</h3>
            <p class="text-slate-600 mt-2">Cobrança extrajudicial e judicial de títulos de crédito, execuções e recuperação de recebíveis.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">4. Governança Corporativa e Compliance</h3>
            <p class="text-slate-600 mt-2">Programas de conformidade ética, adequação à LGPD, códigos de conduta e auditoria preventiva.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">5. Relações Trabalhistas Estratégicas</h3>
            <p class="text-slate-600 mt-2">Consultoria trabalhista preventiva para redução de passivos e defesa contenciosa patronal.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">6. Planejamento Sucessório Empresarial</h3>
            <p class="text-slate-600 mt-2">Transição geracional, estruturação de holdings patrimoniais e continuidade da empresa.</p>
          </div>
        </div>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com o escritório &rarr;</a>
        </div>
      </main>
    `
  },
  'empresarial': {
    title: 'Direito Empresarial | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Assessoria jurídica para empresas: societário, contratos mercantis, governança, recuperação de créditos e compliance.',
    canonicalUrl: `${domain}/direito-empresarial`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito Empresarial</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa em <a href="/direito-empresarial" class="text-[#BB734D] underline font-bold">Direito Empresarial</a>.</p>
      </main>
    `
  },
  'direito-de-familia': {
    title: 'Direito de Família | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Assessoria jurídica em divórcio, partilha de bens, guarda compartilhada, pensão alimentícia, união estável e paternidade.',
    canonicalUrl: `${domain}/direito-de-familia`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito de Família</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Atendimento ético e resolutivo nas demandas familiares, priorizando a mediação e a defesa dos interesses dos envolvidos.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Divórcio Consensual e Litigioso:</strong> Divórcios extrajudiciais em cartório e judiciais com partilha patrimonial.</li>
          <li><strong>Guarda e Convivência:</strong> Definição de guarda compartilhada ou unilateral e plano de convivência familiar.</li>
          <li><strong>Pensão Alimentícia:</strong> Fixação, revisão, exoneração e cobrança de alimentos.</li>
          <li><strong>União Estável:</strong> Reconhecimento, dissolução formal e pactos patrimoniais.</li>
          <li><strong>Reconhecimento de Paternidade:</strong> Ações de investigação de paternidade e registro civil.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com o escritório &rarr;</a>
        </div>
      </main>
    `
  },
  'familia': {
    title: 'Direito de Família | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Assessoria jurídica em divórcio, partilha de bens, guarda compartilhada, pensão alimentícia, união estável e paternidade.',
    canonicalUrl: `${domain}/direito-de-familia`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito de Família</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa em <a href="/direito-de-familia" class="text-[#BB734D] underline font-bold">Direito de Família</a>.</p>
      </main>
    `
  },
  'direito-das-sucessoes': {
    title: 'Direito das Sucessões | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Inventário judicial e extrajudicial em cartório, partilha de herança, testamentos, doações e planejamento sucessório patrimonial.',
    canonicalUrl: `${domain}/direito-das-sucessoes`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito das Sucessões</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Condução técnica de inventários e partilhas com foco na segurança jurídica e na redução do impacto tributário (ITCMD).</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Inventário Extrajudicial em Cartório:</strong> Procedimento célere para herdeiros maiores e capazes em consenso.</li>
          <li><strong>Inventário Judicial:</strong> Condução de inventários nas Varas de Família e Sucessões.</li>
          <li><strong>Planejamento Sucessório:</strong> Organização prévia da partilha e doações com reserva de usufruto.</li>
          <li><strong>Testamentos:</strong> Elaboração, registro e validação de testamentos públicos e particulares.</li>
          <li><strong>Sobrepartilha e Alvarás Judiciais:</strong> Regularização de bens e liberação de valores do espólio.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com o escritório &rarr;</a>
        </div>
      </main>
    `
  },
  'sucessoes': {
    title: 'Direito das Sucessões | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Inventário judicial e extrajudicial em cartório, partilha de herança, testamentos, doações e planejamento sucessório patrimonial.',
    canonicalUrl: `${domain}/direito-das-sucessoes`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito das Sucessões</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa em <a href="/direito-das-sucessoes" class="text-[#BB734D] underline font-bold">Direito das Sucessões</a>.</p>
      </main>
    `
  },
  'direito-contratual': {
    title: 'Direito Contratual | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Elaboração, revisão e rescisão de contratos civis e comerciais com mitigação de riscos e segurança jurídica.',
    canonicalUrl: `${domain}/direito-contratual`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito Contratual</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Elaboração, auditoria e revisão de instrumentos contratuais civis e comerciais com foco na prevenção de riscos contratuais.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Elaboração de Contratos:</strong> Minutas personalizadas para contratos civis, comerciais e de prestação de serviços.</li>
          <li><strong>Auditoria de Riscos:</strong> Análise preventiva de cláusulas antes da assinatura do instrumento.</li>
          <li><strong>Rescisão Contratual:</strong> Notificações extrajudiciais, cálculo de penalidades e resolução de controvérsias.</li>
          <li><strong>Contratos Imobiliários:</strong> Compra e venda, locação comercial e residencial, permuta e cessão de direitos.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com o escritório &rarr;</a>
        </div>
      </main>
    `
  },
  'contratual': {
    title: 'Direito Contratual | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Elaboração, revisão e rescisão de contratos civis e comerciais com mitigação de riscos e segurança jurídica.',
    canonicalUrl: `${domain}/direito-contratual`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito Contratual</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa em <a href="/direito-contratual" class="text-[#BB734D] underline font-bold">Direito Contratual</a>.</p>
      </main>
    `
  },
  'central-de-conhecimento': {
    title: 'Central de Conhecimento Jurídico | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Guias práticos e artigos técnicos sobre Direito do Trabalho, Previdenciário, Empresarial, Família, Sucessões e Contratos.',
    canonicalUrl: `${domain}/central-de-conhecimento`,
    content: `
      <main class="blog-directory-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Conteúdo Informativo</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Central de Conhecimento Jurídico</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Artigos técnicos e orientações jurídicas sobre direitos nas relações trabalhistas, previdenciárias, empresariais, de família e contratuais.</p>
        <div class="space-y-6">
          ${articlesData.map(a => `
            <article class="p-6 border rounded-lg hover:border-[#BB734D] transition">
              <span class="text-xs uppercase tracking-wider font-semibold text-[#BB734D]">${escapeHtml(a.category)}</span>
              <h2 class="text-xl font-bold text-[#163758] mt-1">
                <a href="/central-de-conhecimento/${escapeHtml(a.slug)}" class="hover:underline">${escapeHtml(a.title)}</a>
              </h2>
              <p class="text-slate-600 mt-2">${escapeHtml(a.metaDescription)}</p>
              <div class="mt-3 text-xs text-slate-500">
                <span>${escapeHtml(a.readingTime)} min de leitura</span> • <span>Publicado em ${escapeHtml(a.publishedAt)}</span>
              </div>
            </article>
          `).join('\n')}
        </div>
      </main>
    `
  },
  'contato': {
    title: 'Contato | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Canais de atendimento: WhatsApp (11) 96159-5557 / (11) 95287-0828, Fixo (11) 2359-5323 e e-mail mauroceza@adv.oabsp.org.br. Atendimento em SP e online em todo o Brasil.',
    canonicalUrl: `${domain}/contato`,
    content: `
      <main class="contact-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Atendimento Institucional</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Fale com o escritório Mauro Souza</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Apresente sua dúvida ou necessidade para orientação técnica. Atendimento presencial na Zona Leste de São Paulo (com agendamento) e videoconferência em todo o Brasil.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div class="p-6 bg-slate-50 rounded-lg">
            <h2 class="text-xl font-bold text-[#163758] mb-4">Canais Diretos de Atendimento</h2>
            <p class="text-slate-700 mb-2"><strong>WhatsApp:</strong> (11) 96159-5557 / (11) 95287-0828</p>
            <p class="text-slate-700 mb-2"><strong>Telefone Fixo:</strong> (11) 2359-5323</p>
            <p class="text-slate-700 mb-2"><strong>E-mail Institucional:</strong> mauroceza@adv.oabsp.org.br</p>
            <p class="text-slate-700 mb-2"><strong>Horário:</strong> Segunda a Sexta, das 09h às 18h</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-lg">
            <h2 class="text-xl font-bold text-[#163758] mb-4">Registro Institucional</h2>
            <p class="text-slate-700 mb-2"><strong>Razão Social:</strong> Mauro Souza Sociedade Individual de Advocacia</p>
            <p class="text-slate-700 mb-2"><strong>CNPJ:</strong> 48.442.576/0001-35</p>
            <p class="text-slate-700 mb-2"><strong>Titular:</strong> Mauro Céza de Souza</p>
            <p class="text-slate-700 mb-2"><strong>Registro OAB:</strong> OAB/SP 379.224</p>
          </div>
        </div>
      </main>
    `
  },
  'parcerias': {
    title: 'Parcerias Jurídicas & Correspondência | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Programa de correspondência jurídica e cooperação técnica para advogados e escritórios de todo o Brasil.',
    canonicalUrl: `${domain}/parcerias`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Parcerias e Correspondência Jurídica</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Canal de cooperação com advogados e escritórios em todo o Brasil para atuação conjunta ou correspondência jurídica especializada nas comarcas do Estado de São Paulo.</p>
      </main>
    `
  },
  'estagios': {
    title: 'Programa de Estágio em Direito | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Oportunidades de estágio para estudantes de Direito comprometidos com a prática jurídica e a ética.',
    canonicalUrl: `${domain}/estagios`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Programa de Estágio</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Formação ética e desenvolvimento prático de futuros profissionais do Direito.</p>
      </main>
    `
  },
  'politica-de-privacidade': {
    title: 'Política de Privacidade | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Diretrizes de privacidade e proteção de dados pessoais em conformidade com a LGPD (Lei 13.709/2018).',
    canonicalUrl: `${domain}/politica-de-privacidade`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Política de Privacidade</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Mauro Souza Sociedade Individual de Advocacia zela pela privacidade e proteção de dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018).</p>
      </main>
    `
  },
  'termos-de-uso': {
    title: 'Termos de Uso e Aviso Legal | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Termos de uso do portal institucional, conformidade com o Provimento 205/2021 do CFOAB e diretrizes éticas.',
    canonicalUrl: `${domain}/termos-de-uso`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Termos de Uso e Aviso Legal</h1>
        <p class="text-lg text-slate-700 leading-relaxed">As informações contidas neste portal possuem caráter meramente informativo e pedagógico, em conformidade com o Provimento nº 205/2021 do Conselho Federal da OAB, não constituindo consulta jurídica formal.</p>
      </main>
    `
  },
  'login': {
    title: 'Acesso ao Sistema | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Acesso restrito ao sistema de gestão jurídica e backoffice de Mauro Souza Sociedade Individual de Advocacia.',
    canonicalUrl: `${domain}/login`,
    content: `
      <main class="login-page max-w-md mx-auto px-6 py-16 text-center">
        <h1 class="text-2xl font-bold text-[#163758] mb-2">Acesso ao Sistema</h1>
        <p class="text-sm text-slate-600 mb-6">Ambiente restrito aos operadores e advogados autorizados.</p>
        <p class="text-xs text-slate-500">Conexão protegida por SSL/TLS.</p>
      </main>
    `
  },
  'backoffice': {
    title: 'Painel Administrativo | Mauro Souza Sociedade Individual de Advocacia',
    description: 'Gestão jurídica, métricas de contatos e acervo de orientações de Mauro Souza Sociedade Individual de Advocacia.',
    canonicalUrl: `${domain}/backoffice`,
    content: `
      <main class="backoffice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-2xl font-bold text-[#163758] mb-4">Painel Administrativo</h1>
        <p class="text-sm text-slate-600">Ambiente de gestão jurídica. Autenticação obrigatória.</p>
      </main>
    `
  }
};

// 1. Pre-render Institutional Pages and Root
let prerenderCount = 0;

for (const [routeKey, page] of Object.entries(institutionalPages)) {
  const renderedHtml = renderPageHtml({
    title: page.title,
    description: page.description,
    canonicalUrl: page.canonicalUrl,
    preRenderedHtml: page.content
  });

  if (routeKey === '') {
    // Root index.html
    fs.writeFileSync(indexPath, renderedHtml, 'utf-8');
    // Also 404.html
    fs.writeFileSync(path.join(distDir, '404.html'), renderedHtml, 'utf-8');
    prerenderCount++;
  } else {
    // Folder index.html (e.g. dist/direito-empresarial/index.html)
    const targetDir = path.join(distDir, routeKey);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), renderedHtml, 'utf-8');

    // Clean URL file (e.g. dist/direito-empresarial.html)
    const directFile = path.join(distDir, `${routeKey}.html`);
    fs.mkdirSync(path.dirname(directFile), { recursive: true });
    fs.writeFileSync(directFile, renderedHtml, 'utf-8');

    prerenderCount++;
  }
}

// 2. Pre-render All Articles from articlesData.js
for (const art of articlesData) {
  const articleTitle = `${art.title} | Mauro Souza Sociedade Individual de Advocacia`;
  const articleDesc = art.metaDescription || '';
  const articleCanonical = `${domain}/central-de-conhecimento/${art.slug}`;

  const articleHtmlContent = `
    <main class="article-page max-w-4xl mx-auto px-6 py-12">
      <nav class="breadcrumb text-sm text-slate-500 mb-6">
        <a href="/" class="hover:underline">Início</a> &raquo;
        <a href="/central-de-conhecimento" class="hover:underline">Central de Conhecimento</a> &raquo;
        <span class="text-slate-800">${escapeHtml(art.category)}</span>
      </nav>
      
      <article>
        <header class="mb-8">
          <span class="inline-block px-3 py-1 bg-[#163758]/10 text-[#163758] rounded text-xs font-semibold uppercase tracking-wider mb-3">
            ${escapeHtml(art.category)}
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-[#163758] leading-tight mb-4">
            ${escapeHtml(art.h1 || art.title)}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 py-3 border-y border-slate-200">
            <span><strong>Autor:</strong> Mauro Céza de Souza (OAB/SP 379.224)</span>
            <span><strong>Publicado em:</strong> ${escapeHtml(art.publishedAt || 'Setembro 2026')}</span>
            <span><strong>Tempo de leitura:</strong> ${escapeHtml(art.readingTime || 5)} min</span>
          </div>
          <p class="text-lg text-slate-700 mt-4 leading-relaxed font-medium bg-slate-50 p-4 border-l-4 border-[#BB734D] rounded-r">
            ${escapeHtml(art.metaDescription)}
          </p>
        </header>

        <div class="article-body space-y-6 text-slate-800 leading-relaxed text-base">
          ${(art.sections || []).map(section => `
            <section class="mt-8">
              <h2 class="text-2xl font-bold text-[#163758] mb-3">${escapeHtml(section.subtitle)}</h2>
              ${(section.paragraphs || []).map(p => `<p class="mb-4">${escapeHtml(p)}</p>`).join('\n')}
            </section>
          `).join('\n')}
        </div>

        <footer class="mt-12 pt-6 border-t border-slate-200">
          <div class="bg-[#163758] text-white p-6 rounded-lg">
            <h3 class="text-xl font-bold text-[#BB734D] mb-2">Orientações jurídicas sobre este tema</h3>
            <p class="text-slate-200 text-sm mb-4">O escritório Mauro Souza está à disposição para analisar a sua situação com rigor técnico e discrição.</p>
            <a href="/contato" class="inline-block bg-[#BB734D] text-white font-semibold px-5 py-2.5 rounded hover:bg-[#a5623e] transition">
              Fale com o escritório &rarr;
            </a>
          </div>
        </footer>
      </article>
    </main>
  `;

  const renderedArticleHtml = renderPageHtml({
    title: articleTitle,
    description: articleDesc,
    canonicalUrl: articleCanonical,
    preRenderedHtml: articleHtmlContent
  });

  // Write under central-de-conhecimento/<slug>
  const postDir = path.join(distDir, 'central-de-conhecimento', art.slug);
  fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, 'index.html'), renderedArticleHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'central-de-conhecimento', `${art.slug}.html`), renderedArticleHtml, 'utf-8');

  // Also write alias under artigos/<slug>
  const aliasDir = path.join(distDir, 'artigos', art.slug);
  fs.mkdirSync(aliasDir, { recursive: true });
  fs.writeFileSync(path.join(aliasDir, 'index.html'), renderedArticleHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'artigos', `${art.slug}.html`), renderedArticleHtml, 'utf-8');

  prerenderCount += 2;
}

console.log(`✓ Successfully prerendered ${prerenderCount} pages/routes with full semantic HTML and updated corporate data!`);
