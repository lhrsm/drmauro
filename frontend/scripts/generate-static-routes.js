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
    title: 'Mauro Souza Advocacia | Trabalhista, Previdenciário, Empresarial, Família, Sucessões e Contratual',
    description: 'Mauro Souza Advocacia: Assessoria jurídica especializada em Direito Trabalhista, Previdenciário, Empresarial, Família, Sucessões e Contratual. Atendimento técnico e personalizado em São Paulo e telepresencial em todo o Brasil.',
    canonicalUrl: `${domain}/`,
    content: `
      <main class="institutional-page">
        <header class="py-12 bg-[#163758] text-white px-6">
          <div class="max-w-5xl mx-auto">
            <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Mauro Souza Advocacia & Consultoria • OAB/SP 379.224</span>
            <h1 class="text-4xl md:text-5xl font-bold mt-2">Advocacia Especializada e Estratégica em São Paulo e Todo o Brasil</h1>
            <p class="text-lg text-slate-200 mt-4 max-w-3xl">Atuação jurídica de excelência técnica e foco em resultados nas áreas Trabalhista, Previdenciária, Empresarial, Família, Sucessões e Contratual. Atendimento presencial na Av. Celso Garcia, São Paulo, e telepresencial em todo o território nacional.</p>
          </div>
        </header>

        <section class="max-w-5xl mx-auto px-6 py-12">
          <h2 class="text-2xl font-bold text-[#163758] mb-6">Nossas 6 Áreas de Atuação</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-do-trabalho">Direito do Trabalho</a></h3>
              <p class="text-slate-600 mt-2">Defesa rigorosa em rescisões contratuais, verbas rescisórias, horas extras, acidentes de trabalho, assédio moral e equiparação salarial.</p>
            </article>
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-previdenciario">Direito Previdenciário (INSS)</a></h3>
              <p class="text-slate-600 mt-2">Planejamento previdenciário minucioso, aposentadorias por tempo, idade, especial, BPC/LOAS, pensão por morte e recursos administrativos.</p>
            </article>
            <article class="p-6 border rounded-lg">
              <h3 class="text-xl font-bold text-[#163758]"><a href="/direito-empresarial">Direito Empresarial</a></h3>
              <p class="text-slate-600 mt-2">Assessoria jurídica consultiva e contenciosa: contratos mercantis B2B, governança, societário, recuperação de créditos e compliance preventivo.</p>
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
              <p class="text-slate-600 mt-2">Elaboração, auditoria e revisão estratégica de contratos civis e empresariais com blindagem preventiva de riscos.</p>
            </article>
          </div>
        </section>

        <section class="bg-slate-50 py-12 px-6">
          <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-[#163758] mb-4">Sobre o Titular — Mauro Cezar de Souza</h2>
            <p class="text-slate-700 leading-relaxed">Advogado inscrito na OAB/SP sob o nº 379.224, Mauro Souza combina rigor dogmático, profundo conhecimento jurisprudencial e atendimento humanizado. O escritório atua em rigorosa conformidade com o Provimento nº 205/2021 do Conselho Federal da OAB e com a Lei Geral de Proteção de Dados (LGPD).</p>
            <div class="mt-6 flex flex-wrap gap-4">
              <a href="/o-escritorio" class="text-[#BB734D] font-semibold underline">Conheça nossa trajetória completa &rarr;</a>
              <a href="/central-de-conhecimento" class="text-[#BB734D] font-semibold underline">Acesse nossos guias jurídicos informativos &rarr;</a>
              <a href="/contato" class="text-[#BB734D] font-semibold underline">Fale com nossa equipe &rarr;</a>
            </div>
          </div>
        </section>

        <footer class="bg-[#0E1620] text-slate-300 py-8 px-6 text-center text-sm">
          <p class="font-medium">© 2026 Mauro Souza Advocacia &amp; Consultoria • OAB/SP 379.224</p>
          <div class="mt-4 flex flex-wrap justify-center gap-6">
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
    title: 'O Escritório | Mauro Souza Advocacia & Consultoria',
    description: 'Conheça a trajetória de Mauro Souza, nossos princípios éticos, excelência técnica e estrutura de atendimento presencial em SP e online em todo o Brasil.',
    canonicalUrl: `${domain}/o-escritorio`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Excelência Técnica • OAB/SP 379.224</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">O Escritório Mauro Souza Advocacia</h1>
        <p class="text-lg text-slate-700 mb-6 leading-relaxed">O escritório Mauro Souza Advocacia & Consultoria foi concebido sob a premissa de que o exercício da advocacia deve aliar o mais rigoroso conhecimento técnico à proximidade e empatia no relacionamento com o cliente.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Nossa Filosofia de Atuação</h2>
        <p class="text-slate-700 mb-4 leading-relaxed">Cada demanda recebida é submetida a um diagnóstico jurídico minucioso. Não trabalhamos com teses padronizadas ou soluções genéricas. Seja na defesa dos direitos de um trabalhador, na estruturação societária de uma sociedade empresária, na concessão de um benefício previdenciário ou no planejamento sucessório familiar, a estratégia é desenhada sob medida.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Estrutura e Conformidade</h2>
        <p class="text-slate-700 mb-4 leading-relaxed">Com sede física estrategicamente localizada na Av. Celso Garcia, Belenzinho, em São Paulo/SP, e plataforma de teleatendimento estruturada com criptografia ponta a ponta, oferecemos suporte técnico a clientes em qualquer localidade do país ou no exterior, respeitando integralmente as diretrizes do Provimento nº 205/2021 do CFOAB e da LGPD.</p>
      </main>
    `
  },
  'direito-do-trabalho': {
    title: 'Direito do Trabalho | Mauro Souza Advocacia',
    description: 'Atuação especializada em Direito do Trabalho: rescisão contratual, verbas rescisórias, horas extras, acidente de trabalho, assédio moral e equiparação salarial.',
    canonicalUrl: `${domain}/direito-do-trabalho`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito do Trabalho</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Defesa estratégica e técnica dos direitos fundamentais do trabalhador e consultoria preventiva nas relações de trabalho. Análise criteriosa de contratos de trabalho, jornadas laborais, salários e condições de saúde ocupacional.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Principais Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Rescisão Contratual e Verbas Rescisórias:</strong> Cálculo e cobrança de saldo salarial, aviso prévio, férias proporcionais, 13º salário e multa de 40% do FGTS.</li>
          <li><strong>Horas Extras e Intervalos Intrajornada:</strong> Apuração de horas excedentes, plantões, sobreaviso, banco de horas irregular e intervalo de descanso suprimido.</li>
          <li><strong>Acidentes de Trabalho e Doenças Ocupacionais:</strong> Indenização por danos morais, materiais, estéticos, pensão vitalícia e estabilidade provisória acidentária.</li>
          <li><strong>Assédio Moral e Rescisão Indireta:</strong> Cobrança de indenização por perseguição, humilhações e aplicação da rescisão indireta (justa causa do empregador).</li>
          <li><strong>Equiparação Salarial e Desvio de Função:</strong> Reivindicação de diferenças salariais por trabalho de igual valor na mesma função.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Agendar Consulta Trabalhista &rarr;</a>
        </div>
      </main>
    `
  },
  'direito-previdenciario': {
    title: 'Direito Previdenciário (INSS) | Mauro Souza Advocacia',
    description: 'Planejamento previdenciário, aposentadoria por tempo, idade, especial, BPC/LOAS, auxílio por incapacidade e recursos administrativos no INSS.',
    canonicalUrl: `${domain}/direito-previdenciario`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito Previdenciário (INSS)</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Atuação técnica perante o INSS e a Justiça Federal para garantir que você receba o melhor benefício previdenciário no menor tempo possível, prevenindo perdas financeiras irreversíveis.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Principais Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Planejamento Previdenciário:</strong> Diagnóstico do CNIS, simulação das regras de transição da EC 103/2019 e projeção do melhor momento para a aposentadoria.</li>
          <li><strong>Aposentadorias do Regime Geral (RGPS):</strong> Aposentadoria por idade urbana e rural, tempo de contribuição, aposentadoria do professor e da pessoa com deficiência.</li>
          <li><strong>Aposentadoria Especial (PPP e LTCAT):</strong> Conversão de tempo exercido sob exposição a agentes nocivos químicos, físicos ou biológicos.</li>
          <li><strong>Benefícios por Incapacidade:</strong> Auxílio por incapacidade temporária (auxílio-doença) e aposentadoria por incapacidade permanente (invalidez).</li>
          <li><strong>BPC / LOAS:</strong> Benefício assistencial de prestação continuada para idosos com 65+ anos ou pessoas com deficiência em situação de vulnerabilidade.</li>
          <li><strong>Pensão por Morte e Auxílio-Reclusão:</strong> Concessão e defesa de dependentes de segurados perante o INSS.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Agendar Análise Previdenciária &rarr;</a>
        </div>
      </main>
    `
  },
  'direito-empresarial': {
    title: 'Direito Empresarial | Mauro Souza Advocacia & Consultoria',
    description: 'Assessoria jurídica para empresas: societário, contratos mercantis, governança, recuperação de créditos, blindagem preventiva e compliance.',
    canonicalUrl: `${domain}/direito-empresarial`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito Empresarial</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Assessoria jurídica consultiva e contenciosa sob medida para empresas de pequeno, médio e grande porte. Blindagem de operações mercantis, governança societária, gestão de riscos trabalhistas e recuperação acelerada de ativos.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Nossas Frentes de Atuação Empresarial</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">1. Contratos Empresariais e Mercantis</h3>
            <p class="text-slate-600 mt-2">Elaboração, negociação e auditoria de contratos B2B, fornecimento, prestação de serviços, parcerias comerciais e termos de confidencialidade (NDA).</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">2. Estruturação Societária e M&amp;A</h3>
            <p class="text-slate-600 mt-2">Constituição de sociedades, acordos de sócios/acionistas, reorganizações societárias, fusões, aquisições e resolução de impasses societários.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">3. Gestão de Passivos e Recuperação de Créditos</h3>
            <p class="text-slate-600 mt-2">Cobrança extrajudicial e judicial estratégica de títulos de crédito, execuções ágeis, recuperação de recebíveis e mitigação de perdas financeiras.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">4. Governança Corporativa e Compliance</h3>
            <p class="text-slate-600 mt-2">Implementação de programas de conformidade ética, adequação rigorosa à LGPD, códigos de conduta e auditoria preventiva contínua.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">5. Relações Trabalhistas Estratégicas</h3>
            <p class="text-slate-600 mt-2">Consultoria preventiva para RH e diretoria, redução de contingências e passivos trabalhistas, auditoria de folha e defesa contenciosa patronal.</p>
          </div>
          <div class="p-5 border rounded">
            <h3 class="text-lg font-bold text-[#163758]">6. Planejamento Sucessório Empresarial</h3>
            <p class="text-slate-600 mt-2">Transição geracional segura, estruturação de holdings patrimoniais e operacionais, preservação de capital e continuidade do negócio.</p>
          </div>
        </div>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Fale com um Especialista Empresarial &rarr;</a>
        </div>
      </main>
    `
  },
  'empresarial': {
    title: 'Direito Empresarial | Mauro Souza Advocacia & Consultoria',
    description: 'Assessoria jurídica para empresas: societário, contratos mercantis, governança, recuperação de créditos, blindagem preventiva e compliance.',
    canonicalUrl: `${domain}/direito-empresarial`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito Empresarial</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa de nossa assessoria empresarial em <a href="/direito-empresarial" class="text-[#BB734D] underline font-bold">Direito Empresarial</a>.</p>
      </main>
    `
  },
  'direito-de-familia': {
    title: 'Direito de Família | Mauro Souza Advocacia',
    description: 'Assessoria jurídica humanizada em divórcio, partilha de bens, guarda compartilhada, pensão alimentícia, união estável e reconhecimento de paternidade.',
    canonicalUrl: `${domain}/direito-de-familia`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito de Família</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Atendimento humanizado, ético e resolutivo nas questões familiares, priorizando a mediação preventiva e a defesa intransigente dos direitos e do bem-estar dos filhos e dos cônjuges.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Principais Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Divórcio Consensual e Litigioso:</strong> Condução ágil de divórcios em cartório (extrajudiciais) e judiciais com partilha patrimonial equilibrada.</li>
          <li><strong>Guarda e Regime de Convivência:</strong> Definição de guarda compartilhada ou unilateral e fixação de plano de convivência focado no superior interesse da criança.</li>
          <li><strong>Pensão Alimentícia:</strong> Fixação, revisão, exoneração e execução coercitiva de alimentos para filhos ou ex-cônjuges.</li>
          <li><strong>União Estável:</strong> Reconhecimento, dissolução formal e pactos de convivência patrimonial.</li>
          <li><strong>Reconhecimento de Paternidade:</strong> Ações de investigação de paternidade e inclusão de nome no registro civil.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Agendar Consulta em Família &rarr;</a>
        </div>
      </main>
    `
  },
  'familia': {
    title: 'Direito de Família | Mauro Souza Advocacia',
    description: 'Assessoria jurídica humanizada em divórcio, partilha de bens, guarda compartilhada, pensão alimentícia, união estável e reconhecimento de paternidade.',
    canonicalUrl: `${domain}/direito-de-familia`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito de Família</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa em <a href="/direito-de-familia" class="text-[#BB734D] underline font-bold">Direito de Família</a>.</p>
      </main>
    `
  },
  'direito-das-sucessoes': {
    title: 'Direito das Sucessões | Mauro Souza Advocacia',
    description: 'Inventário judicial e extrajudicial em cartório, partilha de herança, testamentos, doações e planejamento sucessório patrimonial estratégico.',
    canonicalUrl: `${domain}/direito-das-sucessoes`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito das Sucessões</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Condução técnica de inventários e partilhas com foco na celeridade e na redução do impacto tributário (ITCMD), além de consultoria preventiva em planejamento sucessório patrimonial.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Principais Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Inventário Extrajudicial em Cartório:</strong> Procedimento rápido e menos oneroso para herdeiros maiores e capazes em consenso.</li>
          <li><strong>Inventário Judicial:</strong> Condução firme de inventários complexos ou litigiosos perante as Varas de Família e Sucessões.</li>
          <li><strong>Planejamento Sucessório Patrimonial:</strong> Estruturação prévia da partilha de bens, doações com reserva de usufruto e cláusulas restritivas.</li>
          <li><strong>Testamentos e Disposições de Última Vontade:</strong> Elaboração, registro e validação de testamentos públicos, cerrados ou particulares.</li>
          <li><strong>Sobrepartilha e Alvarás Judiciais:</strong> Regularização e liberação de valores retidos em instituições financeiras.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Agendar Consulta sobre Sucessões &rarr;</a>
        </div>
      </main>
    `
  },
  'sucessoes': {
    title: 'Direito das Sucessões | Mauro Souza Advocacia',
    description: 'Inventário judicial e extrajudicial em cartório, partilha de herança, testamentos, doações e planejamento sucessório patrimonial estratégico.',
    canonicalUrl: `${domain}/direito-das-sucessoes`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito das Sucessões</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa em <a href="/direito-das-sucessoes" class="text-[#BB734D] underline font-bold">Direito das Sucessões</a>.</p>
      </main>
    `
  },
  'direito-contratual': {
    title: 'Direito Contratual | Mauro Souza Advocacia',
    description: 'Elaboração, revisão estratégica e rescisão de contratos civis e comerciais com mitigação de riscos e segurança jurídica.',
    canonicalUrl: `${domain}/direito-contratual`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Área de Atuação</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Direito Contratual</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Elaboração, auditoria e revisão preventiva de instrumentos contratuais para pessoas físicas e empresas, conferindo equilíbrio, clareza e solidez jurídica aos seus negócios.</p>
        <h2 class="text-2xl font-bold text-[#163758] mt-8 mb-4">Principais Frentes de Atuação</h2>
        <ul class="list-disc pl-6 space-y-3 text-slate-700">
          <li><strong>Elaboração e Redação de Contratos:</strong> Minutas personalizadas para contratos civis, comerciais, imobiliários e de prestação de serviços.</li>
          <li><strong>Revisão e Auditoria de Riscos:</strong> Identificação de cláusulas ambíguas, onerosas ou nulas antes da assinatura do instrumento.</li>
          <li><strong>Rescisão Contratual e Reparação de Danos:</strong> Notificações extrajudiciais, apuração de multas contratuais e resolução de controvérsias.</li>
          <li><strong>Contratos Imobiliários:</strong> Compra e venda, locação comercial e residencial, permuta e cessão de direitos.</li>
        </ul>
        <div class="mt-8">
          <a href="/contato" class="inline-block bg-[#163758] text-white px-6 py-3 rounded font-semibold hover:bg-[#BB734D] transition">Agendar Consulta Contratual &rarr;</a>
        </div>
      </main>
    `
  },
  'contratual': {
    title: 'Direito Contratual | Mauro Souza Advocacia',
    description: 'Elaboração, revisão estratégica e rescisão de contratos civis e comerciais com mitigação de riscos e segurança jurídica.',
    canonicalUrl: `${domain}/direito-contratual`,
    content: `
      <main class="practice-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Direito Contratual</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Acesse a página completa em <a href="/direito-contratual" class="text-[#BB734D] underline font-bold">Direito Contratual</a>.</p>
      </main>
    `
  },
  'central-de-conhecimento': {
    title: 'Central de Conhecimento Jurídico | Mauro Souza Advocacia',
    description: 'Guias práticos e artigos técnicos sobre Direito do Trabalho, Previdenciário, Empresarial, Família, Sucessões e Contratos.',
    canonicalUrl: `${domain}/central-de-conhecimento`,
    content: `
      <main class="blog-directory-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Conteúdo Informativo</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Central de Conhecimento Jurídico</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Artigos técnicos, pareceres e orientações jurídicas elaborados para esclarecer os principais direitos e dúvidas práticas dos trabalhadores, aposentados, famílias e empresários.</p>
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
    title: 'Contato & Atendimento | Mauro Souza Advocacia',
    description: 'Fale com a equipe de Mauro Souza Advocacia. Atendimento presencial na Av. Celso Garcia, São Paulo/SP, e telepresencial em todo o território nacional.',
    canonicalUrl: `${domain}/contato`,
    content: `
      <main class="contact-page max-w-5xl mx-auto px-6 py-12">
        <span class="text-xs uppercase tracking-widest text-[#BB734D] font-bold">Atendimento Humanizado</span>
        <h1 class="text-4xl font-bold text-[#163758] mt-2 mb-6">Contato e Localização</h1>
        <p class="text-lg text-slate-700 mb-8 leading-relaxed">Estamos à disposição para prestar orientação jurídica técnica e personalizada. Atendemos com agendamento prévio presencialmente em São Paulo e via videoconferência para todo o Brasil.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div class="p-6 bg-slate-50 rounded-lg">
            <h2 class="text-xl font-bold text-[#163758] mb-4">Canais Diretos de Atendimento</h2>
            <p class="text-slate-700 mb-2"><strong>Telefone &amp; WhatsApp:</strong> (11) 95860-2412</p>
            <p class="text-slate-700 mb-2"><strong>E-mail Institucional:</strong> contato@msadvocaciaonline.adv.br</p>
            <p class="text-slate-700 mb-2"><strong>Horário:</strong> Segunda a Sexta, das 09h às 18h</p>
          </div>
          <div class="p-6 bg-slate-50 rounded-lg">
            <h2 class="text-xl font-bold text-[#163758] mb-4">Endereço Presencial</h2>
            <p class="text-slate-700 mb-2"><strong>Endereço:</strong> Av. Celso Garcia, Belenzinho</p>
            <p class="text-slate-700 mb-2"><strong>Cidade:</strong> São Paulo - SP, Brasil</p>
            <p class="text-slate-700 mb-2"><strong>Registro OAB:</strong> OAB/SP 379.224</p>
          </div>
        </div>
      </main>
    `
  },
  'parcerias': {
    title: 'Parcerias Jurídicas & Correspondência | Mauro Souza Advocacia',
    description: 'Programa de correspondência jurídica e cooperação técnica para advogados e escritórios de todo o Brasil.',
    canonicalUrl: `${domain}/parcerias`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Parcerias e Correspondência Jurídica</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Mantemos canal aberto de cooperação com advogados e escritórios em todo o Brasil para atuação conjunta ou correspondência jurídica especializada nas comarcas do Estado de São Paulo.</p>
      </main>
    `
  },
  'estagios': {
    title: 'Programa de Estágio em Direito | Mauro Souza Advocacia',
    description: 'Oportunidades de estágio para estudantes de Direito comprometidos com a excelência técnica e a prática jurídica humanizada.',
    canonicalUrl: `${domain}/estagios`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Programa de Estágio</h1>
        <p class="text-lg text-slate-700 leading-relaxed">Valorizamos a formação ética e o desenvolvimento prático de futuros profissionais do Direito. Nosso programa de estágio oferece mentoria direta e imersão real na prática jurídica.</p>
      </main>
    `
  },
  'politica-de-privacidade': {
    title: 'Política de Privacidade | Mauro Souza Advocacia',
    description: 'Diretrizes de privacidade e proteção de dados pessoais em conformidade com a LGPD (Lei 13.709/2018).',
    canonicalUrl: `${domain}/politica-de-privacidade`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Política de Privacidade</h1>
        <p class="text-lg text-slate-700 leading-relaxed">O escritório Mauro Souza Advocacia zela pela segurança e transparência no tratamento de dados pessoais em rigorosa conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>
      </main>
    `
  },
  'termos-de-uso': {
    title: 'Termos de Uso e Aviso Legal | Mauro Souza Advocacia',
    description: 'Termos de uso do portal institucional, conformidade com o Provimento 205/2021 do CFOAB e diretrizes de consulta.',
    canonicalUrl: `${domain}/termos-de-uso`,
    content: `
      <main class="institutional-page max-w-5xl mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-[#163758] mb-6">Termos de Uso e Aviso Legal</h1>
        <p class="text-lg text-slate-700 leading-relaxed">As informações contidas neste portal possuem caráter meramente informativo e educacional, em conformidade com o Provimento nº 205/2021 do Conselho Federal da OAB, não constituindo consulta jurídica formal.</p>
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
  const articleTitle = `${art.title} | Mauro Souza Advocacia`;
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
            <span><strong>Autor:</strong> ${escapeHtml(art.author || 'Mauro Souza')} (OAB/SP 379.224)</span>
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
            <h3 class="text-xl font-bold text-[#BB734D] mb-2">Precisa de orientação jurídica personalizada?</h3>
            <p class="text-slate-200 text-sm mb-4">Nossa equipe está à disposição para analisar o seu caso com rigor técnico e discrição.</p>
            <a href="/contato" class="inline-block bg-[#BB734D] text-white font-semibold px-5 py-2.5 rounded hover:bg-[#a5623e] transition">
              Fale Conosco Diretamente &rarr;
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

// 3. Fetch dynamic articles from Supabase (if available) and prerender them
try {
  const supabaseUrl = 'https://qmomnjwulklzybujlkdj.supabase.co';
  const supabaseKey = 'sb_publishable_hJ7YnZQkohwIDFeWNOD_SA__R03_3qg';
  const res = await fetch(`${supabaseUrl}/rest/v1/artigos?select=title,slug,categoria,resumo,conteudo,created_at&status=eq.Publicado`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  if (res.ok) {
    const dbArticles = await res.json();
    for (const art of dbArticles) {
      if (art.slug) {
        const title = `${art.title} | Mauro Souza Advocacia`;
        const desc = art.resumo || '';
        const canonicalUrl = `${domain}/central-de-conhecimento/${art.slug}`;
        const content = `
          <main class="article-page max-w-4xl mx-auto px-6 py-12">
            <article>
              <h1 class="text-4xl font-bold text-[#163758] mb-4">${escapeHtml(art.title)}</h1>
              <p class="text-lg text-slate-700 mb-6 font-medium">${escapeHtml(desc)}</p>
              <div class="prose max-w-none text-slate-800 leading-relaxed">${art.conteudo || ''}</div>
            </article>
          </main>
        `;
        const rendered = renderPageHtml({ title, description: desc, canonicalUrl, preRenderedHtml: content });
        
        const dbDir = path.join(distDir, 'central-de-conhecimento', art.slug);
        fs.mkdirSync(dbDir, { recursive: true });
        fs.writeFileSync(path.join(dbDir, 'index.html'), rendered, 'utf-8');
        fs.writeFileSync(path.join(distDir, 'central-de-conhecimento', `${art.slug}.html`), rendered, 'utf-8');

        const dbAliasDir = path.join(distDir, 'artigos', art.slug);
        fs.mkdirSync(dbAliasDir, { recursive: true });
        fs.writeFileSync(path.join(dbAliasDir, 'index.html'), rendered, 'utf-8');
        fs.writeFileSync(path.join(distDir, 'artigos', `${art.slug}.html`), rendered, 'utf-8');
        
        prerenderCount += 2;
      }
    }
    console.log(`✓ Synchronized ${dbArticles.length} published articles from Supabase database.`);
  }
} catch (err) {
  console.warn('Could not fetch dynamic articles from Supabase (offline or timeout):', err.message);
}

console.log(`✓ Successfully prerendered ${prerenderCount} pages/routes with full semantic HTML and SEO meta tags!`);
