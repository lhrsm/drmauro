import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import logoImg from '../assets/LOGO.png';
import { supabase } from '../lib/supabase';
import { 
  getMetrics, 
  getContacts, 
  getUsers, 
  fetchSupabaseUsers,
  saveUser, 
  deleteUser, 
  getCustomArticles, 
  saveCustomArticle, 
  deleteCustomArticle,
  fetchSupabaseContacts,
  fetchSupabaseArticles
} from '../services/backofficeService';
import { 
  getAnalytics, 
  getCurrentMonthVisits, 
  getYearTotalVisits 
} from '../services/analyticsService';

export const Backoffice = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('metricas'); // 'metricas' | 'acervo' | 'usuarios'

  // Estados de Métricas, Contatos e Analytics
  const [metrics, setMetrics] = useState(getMetrics());
  const [contacts, setContacts] = useState(getContacts());
  const [analytics, setAnalytics] = useState(getAnalytics());

  useEffect(() => {
    // Sincronização inicial do Supabase
    fetchSupabaseContacts().then((data) => {
      if (data) {
        setContacts(data);
        setMetrics(getMetrics());
      }
    });

    fetchSupabaseArticles().then((data) => {
      if (data) {
        setCustomArticles(data);
        setMetrics(getMetrics());
      }
    });

    fetchSupabaseUsers().then((data) => {
      if (data) {
        setUsers(data);
      }
    });

    const handleContacts = () => {
      setContacts(getContacts());
      setMetrics(getMetrics());
    };
    const handleArticles = () => {
      setCustomArticles(getCustomArticles());
      setMetrics(getMetrics());
    };
    const handleAnalytics = () => setAnalytics(getAnalytics());

    window.addEventListener('mc_contacts_updated', handleContacts);
    window.addEventListener('mc_articles_updated', handleArticles);
    window.addEventListener('mc_analytics_updated', handleAnalytics);

    return () => {
      window.removeEventListener('mc_contacts_updated', handleContacts);
      window.removeEventListener('mc_articles_updated', handleArticles);
      window.removeEventListener('mc_analytics_updated', handleAnalytics);
    };
  }, []);

  // Estados de Usuários
  const [users, setUsers] = useState(getUsers());
  const [newUser, setNewUser] = useState({
    nome: '',
    email: '',
    senha: '',
    perfil: 'Advogado Associado',
    oab: ''
  });
  const [userSuccessMsg, setUserSuccessMsg] = useState(null);

  // Estados do Criador de Acervo / Artigo
  const [customArticles, setCustomArticles] = useState(getCustomArticles());
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Direito Trabalhista',
    categorySlug: 'direito-do-trabalho',
    readingTime: '5 min de leitura',
    metaDescription: '',
    practicalTip: '',
    sections: [
      {
        subtitle: '1. Fundamentação e Contexto Jurídico',
        content: '',
        legalBasis: 'Art. 483 da Consolidação das Leis do Trabalho (CLT)'
      },
      {
        subtitle: '2. Requisitos e Procedimento Prático',
        content: '',
        legalBasis: 'Súmulas e jurisprudência pacificada dos Tribunais'
      }
    ]
  });
  const [articleSuccess, setArticleSuccess] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const refreshData = () => {
      setMetrics(getMetrics());
      setContacts(getContacts());
      setUsers(getUsers());
      setCustomArticles(getCustomArticles());
    };
    refreshData();
    window.addEventListener('mc_articles_updated', refreshData);
    return () => window.removeEventListener('mc_articles_updated', refreshData);
  }, []);

  // Manipuladores de Usuários
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.nome || !newUser.email || !newUser.senha) return;
    try {
      const updated = await saveUser(newUser);
      setUsers(updated);
      setUserSuccessMsg(`Usuário ${newUser.nome} cadastrado com sucesso!`);
      setNewUser({
        nome: '',
        email: '',
        senha: '',
        perfil: 'Advogado Associado',
        oab: ''
      });
      setTimeout(() => setUserSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Erro ao salvar usuário:', err);
      alert('Não foi possível salvar o usuário no sistema.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja remover este usuário do sistema?')) {
      try {
        const updated = await deleteUser(userId);
        setUsers(updated);
      } catch (err) {
        console.error('Erro ao excluir usuário:', err);
      }
    }
  };

  // Manipuladores de Tópicos do Artigo
  const handleAddSection = () => {
    const nextNum = articleForm.sections.length + 1;
    setArticleForm({
      ...articleForm,
      sections: [
        ...articleForm.sections,
        {
          subtitle: `${nextNum}. Novo Tópico Explicativo`,
          content: '',
          legalBasis: ''
        }
      ]
    });
  };

  const handleRemoveSection = (index) => {
    if (articleForm.sections.length <= 1) return;
    const updated = articleForm.sections.filter((_, i) => i !== index);
    setArticleForm({ ...articleForm, sections: updated });
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...articleForm.sections];
    updated[index][field] = value;
    setArticleForm({ ...articleForm, sections: updated });
  };

  // Publicar Artigo no Site
  const handlePublishArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      alert('Por favor, informe o título principal da orientação.');
      return;
    }

    const payload = {
      title: articleForm.title,
      category: articleForm.category,
      categorySlug: articleForm.categorySlug,
      readingTime: articleForm.readingTime,
      metaDescription: articleForm.metaDescription || `Guia técnico e orientações sobre ${articleForm.title}, elaborado por Mauro Cezar de Souza.`,
      practicalTip: articleForm.practicalTip,
      sections: articleForm.sections.map(s => ({
        subtitle: s.subtitle,
        paragraphs: s.content ? s.content.split('\n').filter(p => p.trim()) : ['Conteúdo técnico em análise pela equipe jurídica.']
      }))
    };

    try {
      const created = await saveCustomArticle(payload);
      setCustomArticles(getCustomArticles());
      setMetrics(getMetrics());
      setArticleSuccess(created);

      // Resetar formulário
      setArticleForm({
        title: '',
        category: 'Direito Trabalhista',
        categorySlug: 'direito-do-trabalho',
        readingTime: '5 min de leitura',
        metaDescription: '',
        practicalTip: '',
        sections: [
          {
            subtitle: '1. Fundamentação e Contexto Jurídico',
            content: '',
            legalBasis: 'Legislação e Súmulas Aplicáveis'
          }
        ]
      });
    } catch (err) {
      console.error('Erro ao publicar artigo:', err);
      alert('Ocorreu um erro ao salvar o artigo. Verifique a conexão.');
    }
  };

  const handleDeleteArticle = async (artId) => {
    if (window.confirm('Deseja excluir esta orientação do acervo do site?')) {
      try {
        const updated = await deleteCustomArticle(artId);
        setCustomArticles(updated);
        setMetrics(getMetrics());
      } catch (err) {
        console.error('Erro ao excluir artigo:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#163758] flex flex-col font-sans">
      <MetaTags
        title="Backoffice & Gestão Jurídica | Mauro Souza Advocacia"
        description="Painel administrativo de atendimento, métricas e publicação de acervo técnico."
        canonicalPath="/backoffice"
      />

      {/* Topo do Backoffice */}
      <header className="bg-[#0E1620] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Ir para a Home">
              <img src={logoImg} alt="Mauro Souza Advocacia" className="h-11 sm:h-12 w-auto object-contain rounded" />
            </Link>
            <span className="hidden sm:inline-block h-6 w-px bg-white/20"></span>
            <div className="hidden sm:block">
              <span className="text-xs uppercase tracking-wider font-bold text-[#D49A78] block">
                Backoffice Jurídico
              </span>
              <span className="text-[11px] text-slate-400">
                Mauro Souza • Painel Administrativo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                const sessionStr = sessionStorage.getItem('mc_admin_session');
                if (sessionStr && supabase) {
                  try {
                    const token = JSON.parse(sessionStr).token;
                    if (token) await supabase.rpc('revogar_sessao_admin', { p_token: token });
                  } catch (e) {}
                }
                sessionStorage.removeItem('mc_admin_session');
                navigate('/login');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-[#964F2D] text-xs font-semibold text-white transition-colors"
            >
              <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Navegação Estilo Pasta de Ficheiros (Folder Tabs) */}
          <div>
            <nav aria-label="Pastas do Escritório" className="flex flex-wrap items-end gap-1.5 border-b-2 border-[#CCD4DA] px-2 sm:px-4 pt-3 bg-[#EAEFF4]/80 rounded-t-xl">
              <button
                type="button"
                onClick={() => setActiveTab('metricas')}
                className={`relative inline-flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x ${
                  activeTab === 'metricas'
                    ? 'bg-white text-[#163758] border-t-[#964F2D] border-x-[#CCD4DA] -mb-[2px] z-10 shadow-sm'
                    : 'bg-[#DCE4EC] text-[#536773] border-transparent hover:bg-white/70 hover:text-[#163758]'
                }`}
              >
                <i className={`fa-solid fa-inbox text-sm ${activeTab === 'metricas' ? 'text-[#964F2D]' : 'text-slate-400'}`} aria-hidden="true"></i>
                <span>Painel de E-mails & WhatsApp</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'metricas' ? 'bg-[#964F2D]/10 text-[#964F2D]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {contacts.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('acervo')}
                className={`relative inline-flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x ${
                  activeTab === 'acervo'
                    ? 'bg-white text-[#163758] border-t-[#964F2D] border-x-[#CCD4DA] -mb-[2px] z-10 shadow-sm'
                    : 'bg-[#DCE4EC] text-[#536773] border-transparent hover:bg-white/70 hover:text-[#163758]'
                }`}
              >
                <i className={`fa-solid fa-folder-open text-sm ${activeTab === 'acervo' ? 'text-[#964F2D]' : 'text-slate-400'}`} aria-hidden="true"></i>
                <span>Acervo de Orientações & Publicações</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'acervo' ? 'bg-[#964F2D]/10 text-[#964F2D]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {metrics.artigosPublicados}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('usuarios')}
                className={`relative inline-flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x ${
                  activeTab === 'usuarios'
                    ? 'bg-white text-[#163758] border-t-[#964F2D] border-x-[#CCD4DA] -mb-[2px] z-10 shadow-sm'
                    : 'bg-[#DCE4EC] text-[#536773] border-transparent hover:bg-white/70 hover:text-[#163758]'
                }`}
              >
                <i className={`fa-solid fa-user-shield text-sm ${activeTab === 'usuarios' ? 'text-[#964F2D]' : 'text-slate-400'}`} aria-hidden="true"></i>
                <span>Registrar Usuários & Senhas</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'usuarios' ? 'bg-[#964F2D]/10 text-[#964F2D]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {users.length}
                </span>
              </button>
            </nav>

            {/* Componente Informativo de Topo do Fichário */}
            <div className="bg-white border-x border-b border-[#CCD4DA] rounded-b-xl p-6 sm:p-7 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
                    {activeTab === 'metricas' && 'Painel de E-mails & WhatsApp'}
                    {activeTab === 'acervo' && 'Acervo de Orientações & Publicações'}
                    {activeTab === 'usuarios' && 'Registrar Usuários & Senhas'}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#536773]">
                    {activeTab === 'metricas' && 'Acompanhe contatos recebidos em tempo real, mensagens pelo WhatsApp e métricas consolidadas de visitas.'}
                    {activeTab === 'acervo' && 'Gerencie o catálogo de orientações jurídicas e produza novos artigos com caráter estritamente educativo.'}
                    {activeTab === 'usuarios' && 'Cadastre operadores e credenciais com acesso restrito ao ambiente administrativo do escritório.'}
                  </p>
                </div>

                {/* Botão de Criação EXCLUSIVO da aba de Acervo de Orientações */}
                {activeTab === 'acervo' && (
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const formEl = document.getElementById('form-novo-artigo');
                        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-copper text-xs py-2.5 px-5 inline-flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:ring-offset-2"
                    >
                      <i className="fa-solid fa-circle-plus text-sm" aria-hidden="true"></i>
                      <span>Criar Nova Orientação</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ABA 1: MÉTRICAS E CONTATOS (E-MAILS E WHATSAPP RECEBIDOS) */}
          {/* ========================================================================= */}
          {activeTab === 'metricas' && (
            <div className="space-y-6">
              {/* 4 Cards de Métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">E-mails Recebidos</span>
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#163758]">
                      {metrics.emailsRecebidos}
                    </span>
                    <span className="text-[11px] text-[#536773] font-medium">pelo formulário</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">Mensagens enviadas no site</p>
                </div>

                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">WhatsApp Recebidos</span>
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-emerald-700">
                      {metrics.whatsappRecebidos}
                    </span>
                    <span className="text-[11px] text-[#536773] font-medium">iniciados</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">Cliques no WhatsApp oficial</p>
                </div>

                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">Orientações Publicadas</span>
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-[#BB734D] flex items-center justify-center">
                      <i className="fa-solid fa-book-bookmark" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#163758]">
                      {metrics.artigosPublicados}
                    </span>
                    <span className="text-[11px] text-[#BB734D] font-semibold">{customArticles.length} criadas</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">Acervo disponível no site</p>
                </div>

                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">Visitas ao Site (Mês)</span>
                    <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                      <i className="fa-solid fa-chart-line text-base" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#163758]">
                      {getCurrentMonthVisits(analytics).toLocaleString('pt-BR')}
                    </span>
                    <span className="text-[11px] text-purple-700 font-semibold">acessos</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">
                    {getYearTotalVisits(analytics).toLocaleString('pt-BR')} visitas em {analytics.year}
                  </p>
                </div>

              </div>

              {/* Gráfico de Visitas ao Site no Mês e no Ano */}
              <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#CCD4DA]/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-lg font-bold text-[#163758]">
                        Visitas e Tráfego do Site Oficial ({analytics.year})
                      </h2>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Rastreamento Ativo
                      </span>
                    </div>
                    <p className="text-xs text-[#536773] mt-0.5">
                      Visualizações de páginas rastreadas mensalmente e consolidadas no ano de {analytics.year}.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded bg-slate-50 border border-[#CCD4DA] text-xs">
                      <span className="text-[#536773]">Total em {analytics.year}: </span>
                      <strong className="text-[#163758]">{getYearTotalVisits(analytics).toLocaleString('pt-BR')} visitas</strong>
                    </div>
                  </div>
                </div>

                {/* Grid com Gráfico de Barras e Estatísticas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Gráfico de Barras Mensal */}
                  <div className="lg:col-span-2 bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#536773] mb-4">
                      <span>Evolução Mensal de Acessos (Jan - Dez)</span>
                      <span className="text-[#BB734D] flex items-center gap-1.5 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#BB734D] inline-block"></span>
                        Setembro = Mês Atual
                      </span>
                    </div>

                    <div className="h-52 flex items-end justify-between gap-1.5 sm:gap-2.5 pt-6 border-b border-[#CCD4DA]">
                      {analytics.months.map((m, idx) => {
                        const max = Math.max(...analytics.months.map(item => item.visits), 1);
                        const heightPct = m.visits > 0 ? Math.max((m.visits / max) * 100, 10) : 4;
                        const isCurrent = idx === new Date().getMonth();

                        return (
                          <div key={m.month} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                            {/* Tooltip ao passar o mouse */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#0E1620] text-white text-[10px] font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 shadow">
                              {m.visits.toLocaleString('pt-BR')} visitas
                            </div>

                            {/* Valor acima da barra */}
                            {m.visits > 0 && (
                              <span className="text-[10px] font-bold text-[#536773] mb-1 hidden sm:block">
                                {m.visits > 999 ? `${(m.visits / 1000).toFixed(1)}k` : m.visits}
                              </span>
                            )}

                            {/* Coluna da barra */}
                            <div
                              style={{ height: `${heightPct}%` }}
                              className={`w-full rounded-t transition-all duration-300 ${
                                isCurrent
                                  ? 'bg-[#BB734D] shadow-md ring-2 ring-[#BB734D]/30'
                                  : m.visits > 0
                                  ? 'bg-[#163758]/70 hover:bg-[#163758]'
                                  : 'bg-slate-200'
                              }`}
                            ></div>

                            {/* Rótulo do Mês */}
                            <span className={`text-[11px] mt-2 font-semibold ${
                              isCurrent ? 'text-[#BB734D] font-bold' : 'text-[#536773]'
                            }`}>
                              {m.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detalhes de Acessos e Dispositivos */}
                  <div className="space-y-4">
                    {/* Páginas Mais Acessadas */}
                    <div className="bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-4">
                      <h3 className="text-xs font-bold text-[#163758] uppercase tracking-wider mb-3">
                        Páginas Mais Acessadas
                      </h3>
                      <div className="space-y-2.5">
                        {analytics.topPages.map((page) => (
                          <div key={page.name}>
                            <div className="flex justify-between text-xs text-[#163758] mb-1">
                              <span className="truncate pr-2 font-medium">{page.name}</span>
                              <span className="font-bold text-[#BB734D]">{page.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#163758] h-full rounded-full"
                                style={{ width: `${page.percent}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dispositivos */}
                    <div className="bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-4">
                      <h3 className="text-xs font-bold text-[#163758] uppercase tracking-wider mb-2">
                        Acessos por Dispositivo
                      </h3>
                      <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                        <div className="p-2.5 rounded bg-white border border-[#CCD4DA]">
                          <i className="fa-solid fa-mobile-screen text-[#964F2D] text-lg mb-1 block"></i>
                          <span className="font-bold text-sm text-[#163758]">{analytics.devices.mobilePercent ?? analytics.devices.mobile ?? 0}%</span>
                          <span className="text-[10px] text-[#536773] block">Celulares</span>
                        </div>
                        <div className="p-2.5 rounded bg-white border border-[#CCD4DA]">
                          <i className="fa-solid fa-desktop text-[#163758] text-lg mb-1 block"></i>
                          <span className="font-bold text-sm text-[#163758]">{analytics.devices.desktopPercent ?? analytics.devices.desktop ?? 0}%</span>
                          <span className="text-[10px] text-[#536773] block">Computadores</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Contatos Recentes */}
              <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#CCD4DA]/60">
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#163758]">
                      Contatos e Mensagens Recebidas em Tempo Real
                    </h2>
                    <p className="text-xs text-[#536773]">
                      Registros de interessados que solicitaram avaliação jurídica pelos canais oficiais do site.
                    </p>
                  </div>
                </div>

                {contacts.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-[#CCD4DA] rounded bg-[#F8FAFC]">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#536773] mx-auto mb-3">
                      <i className="fa-regular fa-envelope-open text-xl" aria-hidden="true"></i>
                    </div>
                    <h3 className="font-bold text-sm text-[#163758]">Nenhum contato registrado ainda</h3>
                    <p className="text-xs text-[#536773] max-w-md mx-auto mt-1 leading-relaxed">
                      As solicitações de avaliação enviadas pelo formulário de contato do site e as mensagens de WhatsApp aparecerão em tempo real aqui.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#CCD4DA] text-[#163758] font-bold uppercase tracking-wider text-[11px]">
                          <th className="py-3 px-4">Canal</th>
                          <th className="py-3 px-4">Interessado</th>
                          <th className="py-3 px-4">Contato</th>
                          <th className="py-3 px-4">Origem / Assunto</th>
                          <th className="py-3 px-4">Data/Hora</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CCD4DA]/60">
                        {contacts.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              {c.tipo === 'whatsapp' ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                                  WhatsApp
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                                  E-mail
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#163758]">{c.nome}</td>
                            <td className="py-3 px-4 font-mono text-[#536773]">{c.contato}</td>
                            <td className="py-3 px-4 text-[#536773] max-w-xs truncate">{c.origem}</td>
                            <td className="py-3 px-4 text-[#536773] whitespace-nowrap">{c.data}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                c.status === 'Novo'
                                  ? 'bg-amber-100 text-amber-800'
                                  : c.status === 'Em Atendimento'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <a
                                href="https://wa.me/5511952870828"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#BB734D] hover:underline font-bold text-xs"
                              >
                                Atender →
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 2: ACERVO DE ORIENTAÇÕES (CRIADOR DE CONTEÚDO TÉCNICO COM EXCELENTE UX) */}
          {/* ========================================================================= */}
          {activeTab === 'acervo' && (
            <div className="space-y-8">
              
              {/* Notificação de Sucesso */}
              {articleSuccess && (
                <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-in fade-in">
                  <div>
                    <span className="font-bold text-sm block">✓ Orientação publicada com sucesso no site oficial!</span>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      O conteúdo já está visível na página inicial e na Central de Conhecimento.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/central-de-conhecimento/${articleSuccess.slug}`}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded shadow transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Ver no Site Oficial</span>
                      <span>→</span>
                    </Link>
                    <button
                      onClick={() => setArticleSuccess(null)}
                      className="text-emerald-800 hover:text-emerald-950 text-xs font-semibold"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}

              {/* Card do Formulário com UX Instrutivo */}
              <div id="form-novo-artigo" className="bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm scroll-mt-24">
                
                <div className="border-b border-[#CCD4DA]/60 pb-5 mb-6">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#964F2D] tracking-wider">
                    <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
                    <span>Assistente de Criação • Acervo de Orientações</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758] mt-1">
                    Novo Artigo / Orientação Técnica
                  </h2>
                  <p className="text-xs sm:text-sm text-[#536773] mt-1">
                    Produza artigos explicativos fundamentados na legislação e decisões judiciais. O conteúdo segue as diretrizes éticas da OAB (caráter exclusivamente informativo e pedagógico).
                  </p>
                </div>

                <form onSubmit={handlePublishArticle} className="space-y-6">
                  
                  {/* Passo 1: Título e Área */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                        1. Título da Orientação (H1) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        placeholder="Ex: Como funciona a rescisão indireta quando o empregador atrasa salários?"
                        className="w-full px-4 py-3 text-sm font-semibold border border-[#CCD4DA] rounded focus:outline-none focus:border-[#BB734D] focus:ring-1 focus:ring-[#BB734D]"
                      />
                      <span className="text-[11px] text-[#536773] mt-1 block">
                        💡 <strong>Dica de UX:</strong> Títulos em formato de pergunta ou que iniciam com "Como funciona..." ou "Quem tem direito..." obtêm maior clareza e alcance.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                        Área do Direito
                      </label>
                      <select
                        value={articleForm.category}
                        onChange={(e) => {
                          const cat = e.target.value;
                          const slugMap = {
                            'Direito Trabalhista': 'direito-do-trabalho',
                            'Direito Previdenciário': 'direito-previdenciario',
                            'Direito Civil': 'direito-civil',
                            'Direito de Família': 'direito-de-familia',
                            'Direito das Sucessões': 'direito-das-sucessoes',
                            'Direito de Propriedade': 'direito-de-propriedade',
                            'Direito Contratual': 'direito-contratual',
                          };
                          setArticleForm({
                            ...articleForm,
                            category: cat,
                            categorySlug: slugMap[cat] || 'direito-do-trabalho'
                          });
                        }}
                        className="w-full px-3.5 py-3 text-xs font-semibold border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#BB734D]"
                      >
                        <option value="Direito Trabalhista">Direito Trabalhista</option>
                        <option value="Direito Previdenciário">Direito Previdenciário</option>
                        <option value="Direito Civil">Direito Civil</option>
                        <option value="Direito de Família">Direito de Família</option>
                        <option value="Direito das Sucessões">Direito das Sucessões</option>
                        <option value="Direito de Propriedade">Direito de Propriedade</option>
                        <option value="Direito Contratual">Direito Contratual</option>
                      </select>
                    </div>
                  </div>

                  {/* Passo 2: Resumo para o Card da Vitrine */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                      2. Resumo da Vitrine (Meta Description / Subtítulo)
                    </label>
                    <textarea
                      rows="2"
                      value={articleForm.metaDescription}
                      onChange={(e) => setArticleForm({ ...articleForm, metaDescription: e.target.value })}
                      placeholder="Resuma em 2 a 3 linhas os principais pontos que o leitor aprenderá neste artigo..."
                      className="w-full px-3.5 py-2.5 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#BB734D]"
                    ></textarea>
                    <span className="text-[11px] text-[#536773] mt-1 block">
                      Este texto aparece na lista de artigos da página inicial e nos resultados do Google.
                    </span>
                  </div>

                  {/* Passo 3: Tópicos e Seções com UX Guiado */}
                  <div className="pt-4 border-t border-[#CCD4DA]/60">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                          3. Tópicos Estruturados do Conteúdo ({articleForm.sections.length} seções)
                        </label>
                        <p className="text-[11px] text-[#536773]">
                          Divida a explicação em tópicos claros (ex: requisitos, prazos, documentos e decisões judiciais).
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="px-3 py-1.5 rounded border border-[#BB734D] text-[#BB734D] hover:bg-[#BB734D] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-plus text-[10px]" aria-hidden="true"></i>
                        <span>Adicionar Tópico</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {articleForm.sections.map((section, idx) => (
                        <div key={idx} className="p-4 sm:p-5 rounded-lg border border-[#CCD4DA] bg-[#F8FAFC] relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-[#BB734D] uppercase">
                              Tópico {idx + 1}
                            </span>
                            {articleForm.sections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSection(idx)}
                                className="text-red-600 hover:text-red-800 text-xs font-semibold"
                                title="Remover este tópico"
                              >
                                <i className="fa-solid fa-trash-can mr-1" aria-hidden="true"></i>
                                Remover
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div>
                              <input
                                type="text"
                                value={section.subtitle}
                                onChange={(e) => handleSectionChange(idx, 'subtitle', e.target.value)}
                                placeholder="Título do tópico (ex: Requisitos legais e documentação comprobatória)"
                                className="w-full px-3 py-2 text-xs font-bold border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#BB734D]"
                              />
                            </div>

                            <div>
                              <textarea
                                rows="4"
                                value={section.content}
                                onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                                placeholder="Escreva a explicação jurídica de forma clara, didática e acessível..."
                                className="w-full px-3 py-2 text-xs border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#BB734D] leading-relaxed"
                              ></textarea>
                            </div>

                            <div>
                              <input
                                type="text"
                                value={section.legalBasis}
                                onChange={(e) => handleSectionChange(idx, 'legalBasis', e.target.value)}
                                placeholder="Fundamentação Legal (ex: Art. 483 da CLT / Súmula do TST)"
                                className="w-full px-3 py-1.5 text-[11px] border border-[#CCD4DA] rounded bg-white text-[#536773] focus:outline-none focus:border-[#BB734D]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Passo 4: Dica Prática do Advogado */}
                  <div className="pt-4 border-t border-[#CCD4DA]/60">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                      4. Orientação Prática Final (Recomendação de Mauro Souza)
                    </label>
                    <textarea
                      rows="2"
                      value={articleForm.practicalTip}
                      onChange={(e) => setArticleForm({ ...articleForm, practicalTip: e.target.value })}
                      placeholder="Ex: Não assine recibos em branco ou termos rescisórios sem antes conferir os holerites e extratos bancários..."
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#BB734D]"
                    ></textarea>
                  </div>

                  {/* Botões de Ação */}
                  <div className="pt-4 border-t border-[#CCD4DA]/60 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="px-4 py-2.5 rounded border border-[#163758] text-[#163758] hover:bg-[#163758] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                    >
                      <i className="fa-solid fa-eye" aria-hidden="true"></i>
                      <span>{previewMode ? 'Ocultar Pré-visualização' : 'Pré-visualizar Como Fica no Site'}</span>
                    </button>

                    <button
                      type="submit"
                      className="btn-copper text-xs py-3 px-6 shadow-md inline-flex items-center gap-2 font-bold uppercase tracking-wider"
                    >
                      <i className="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i>
                      <span>Publicar no Site Oficial</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>

                </form>

                {/* Pré-visualização ao Vivo */}
                {previewMode && (
                  <div className="mt-8 p-6 sm:p-8 rounded-lg border-2 border-dashed border-[#BB734D]/50 bg-slate-50">
                    <div className="flex items-center justify-between pb-4 border-b border-[#CCD4DA] mb-6">
                      <span className="text-xs uppercase font-bold text-[#BB734D] tracking-wider">
                        Pré-visualização ao Vivo no Site Oficial
                      </span>
                      <span className="text-xs text-[#536773]">
                        {articleForm.category} • {articleForm.readingTime}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#163758] mb-3">
                      {articleForm.title || 'Título da sua orientação jurídica aparecerá aqui'}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#536773] italic mb-6">
                      {articleForm.metaDescription || 'Resumo do artigo para a vitrine...'}
                    </p>

                    <div className="space-y-4">
                      {articleForm.sections.map((sec, i) => (
                        <div key={i} className="space-y-1">
                          <h4 className="text-sm font-bold text-[#163758]">{sec.subtitle}</h4>
                          <p className="text-xs text-[#536773] leading-relaxed whitespace-pre-line">
                            {sec.content || 'Texto da seção ainda não preenchido...'}
                          </p>
                          {sec.legalBasis && (
                            <span className="inline-block text-[11px] font-mono text-[#BB734D] bg-[#BB734D]/10 px-2 py-0.5 rounded">
                              {sec.legalBasis}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Lista de Orientações Criadas pelo Backoffice */}
              {customArticles.length > 0 && (
                <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 shadow-sm">
                  <h2 className="font-display text-lg font-bold text-[#163758] mb-4 pb-3 border-b border-[#CCD4DA]/60">
                    Orientações Criadas no Backoffice ({customArticles.length})
                  </h2>

                  <div className="divide-y divide-[#CCD4DA]/60">
                    {customArticles.map((art) => (
                      <div key={art.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase font-bold text-[#BB734D] bg-[#BB734D]/10 px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                            <span className="text-[11px] text-[#536773]">
                              Publicado em {art.publishedAt}
                            </span>
                          </div>
                          <h3 className="font-sans text-sm font-bold text-[#163758]">
                            {art.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <Link
                            to={`/central-de-conhecimento/${art.slug}`}
                            className="text-xs font-bold text-[#BB734D] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Ver no Site</span>
                            <span>→</span>
                          </Link>

                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold"
                            title="Excluir artigo do site"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 3: GESTÃO DE USUÁRIOS E SENHAS */}
          {/* ========================================================================= */}
          {activeTab === 'usuarios' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Formulário de Cadastro */}
              <div className="lg:col-span-5 bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm h-fit">
                <div className="border-b border-[#CCD4DA]/60 pb-4 mb-5">
                  <span className="text-xs uppercase font-bold text-[#BB734D] tracking-wider">
                    Controle de Acessos
                  </span>
                  <h2 className="font-display text-xl font-bold text-[#163758] mt-1">
                    Registrar Novo Usuário
                  </h2>
                  <p className="text-xs text-[#536773] mt-1">
                    Cadastre advogados, assistentes jurídicos ou clientes para acesso restrito.
                  </p>
                </div>

                {userSuccessMsg && (
                  <div className="mb-4 p-3 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold">
                    {userSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newUser.nome}
                      onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
                      placeholder="Ex: Dr. Lucas Nogueira"
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#BB734D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      E-mail / Usuário de Acesso <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="lucas@maurocezar.adv.br"
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#BB734D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      Senha Provisória ou Definitiva <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={newUser.senha}
                      onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#BB734D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      Perfil de Acesso
                    </label>
                    <select
                      value={newUser.perfil}
                      onChange={(e) => setNewUser({ ...newUser, perfil: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#BB734D]"
                    >
                      <option value="Advogado Titular">Advogado Titular</option>
                      <option value="Advogado Associado">Advogado Associado</option>
                      <option value="Assistente Jurídico">Assistente Jurídico</option>
                      <option value="Secretaria & Atendimento">Secretaria & Atendimento</option>
                      <option value="Cliente com Acesso Processual">Cliente com Acesso Processual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      Inscrição OAB (opcional)
                    </label>
                    <input
                      type="text"
                      value={newUser.oab}
                      onChange={(e) => setNewUser({ ...newUser, oab: e.target.value })}
                      placeholder="Ex: OAB 99999999"
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#BB734D]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-copper text-xs py-2.5 px-4 w-full shadow mt-2 font-bold uppercase tracking-wider"
                  >
                    <span>Salvar Usuário & Liberar Acesso</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              </div>

              {/* Lista de Usuários Cadastrados */}
              <div className="lg:col-span-7 bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm">
                <div className="border-b border-[#CCD4DA]/60 pb-4 mb-5">
                  <h2 className="font-display text-xl font-bold text-[#163758]">
                    Usuários Cadastrados ({users.length})
                  </h2>
                  <p className="text-xs text-[#536773] mt-1">
                    Equipe com permissão para operar o backoffice e consultar processos.
                  </p>
                </div>

                <div className="divide-y divide-[#CCD4DA]/60">
                  {users.map((u) => (
                    <div key={u.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0E1620] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {u.nome.charAt(0)}
                        </div>
                        <div>
                          <strong className="text-xs sm:text-sm font-bold text-[#163758] block">
                            {u.nome}
                          </strong>
                          <span className="text-[11px] text-[#536773]">
                            {u.email} • <span className="font-semibold text-[#BB734D]">{u.perfil}</span> {u.oab && `(${u.oab})`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                          {u.status}
                        </span>

                        {u.id !== 'user-1' && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold"
                            title="Excluir este usuário"
                          >
                            Excluir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};
export default Backoffice;
