// Servico Central do Backoffice e Acervo de Conteudo
// Mauro Souza Advocacia & Consultoria
import { supabase } from '../lib/supabase';

const STORAGE_KEYS = {
  ARTICLES: 'mc_custom_articles',
  USERS: 'mc_users',
  METRICS: 'mc_metrics',
  CONTACTS: 'mc_contacts',
};

export const getAdminToken = () => {
  try {
    const sessionStr = sessionStorage.getItem('mc_admin_session');
    if (sessionStr) {
      return JSON.parse(sessionStr).token;
    }
  } catch (e) {}
  return null;
};

// Usuario padrao do sistema
const DEFAULT_USERS = [
  {
    id: 'user-admin',
    nome: 'Mauro Cezar de Souza',
    email: import.meta.env.VITE_ADMIN_USER || 'mauroceza@adv.oabsp.org.br',
    perfil: 'Advogado Titular',
    oab: 'OAB/SP 379.224',
    status: 'Ativo',
    dataCadastro: new Date().toLocaleDateString('pt-BR')
  }
];

// Metricas iniciais
const DEFAULT_METRICS = {
  emailsRecebidos: 0,
  whatsappRecebidos: 0,
  artigosPublicados: 40,
  casosEmAndamento: 0
};

const DEFAULT_CONTACTS = [];

// --- GESTAO DE USUARIOS (COM SUPABASE) ---
export const getUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
};

export const fetchSupabaseUsers = async () => {
  if (!supabase) return getUsers();

  try {
    const token = getAdminToken();
    if (token) {
      const { data, error } = await supabase.rpc('obter_usuarios_admin', { p_token: token });
      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((u) => ({
          id: u.id,
          nome: u.nome,
          email: u.email,
          perfil: u.perfil,
          oab: u.oab || '',
          status: u.status || 'Ativo',
          dataCadastro: u.created_at
            ? new Date(u.created_at).toLocaleDateString('pt-BR')
            : new Date().toLocaleDateString('pt-BR')
        }));
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mapped));
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Fallback para usuarios locais:', err);
  }

  return getUsers();
};

export const saveUser = async (user) => {
  const users = getUsers();
  const token = getAdminToken();

  let assignedId = user.id;

  if (supabase && token) {
    try {
      const { data, error } = await supabase.rpc('salvar_usuario_admin', {
        p_token: token,
        p_usuario: {
          nome: user.nome,
          email: user.email,
          senha: user.senha,
          perfil: user.perfil || 'Advogado Associado',
          oab: user.oab || '',
          status: user.status || 'Ativo'
        }
      });
      if (!error && data && data.id) {
        assignedId = data.id;
      }
    } catch (e) {
      console.warn('Erro ao salvar usuario no Supabase:', e);
    }
  }

  const newUser = {
    ...user,
    id: assignedId || `user-${Date.now()}`,
    dataCadastro: new Date().toLocaleDateString('pt-BR'),
    status: user.status || 'Ativo'
  };
  const updated = [newUser, ...users.filter((u) => u.email !== user.email && u.id !== assignedId)];
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
  return updated;
};

export const deleteUser = async (userId) => {
  const token = getAdminToken();
  if (supabase && token) {
    try {
      await supabase.rpc('excluir_usuario_admin', {
        p_token: token,
        p_usuario_id: userId
      });
    } catch (e) {
      console.warn('Erro ao excluir usuario no Supabase:', e);
    }
  }

  const users = getUsers();
  const filtered = users.filter((u) => u.id !== userId);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
  return filtered;
};

// --- GESTAO DE METRICAS & CONTATOS (COM SUPABASE) ---
export const getContacts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    if (!data) return DEFAULT_CONTACTS;
    const parsed = JSON.parse(data);
    const cleaned = parsed.filter(
      (c) => c.id !== 'ct-1' && c.id !== 'ct-2' && c.id !== 'ct-3' && c.id !== 'ct-4' && c.id !== 'ct-5'
    );
    return cleaned;
  } catch (e) {
    return DEFAULT_CONTACTS;
  }
};

export const fetchSupabaseContacts = async () => {
  if (!supabase) return getContacts();

  try {
    const sessionToken = getAdminToken();
    let data = null;
    let error = null;

    // Se possui token de sessao ativa, requisita via RPC autenticada no banco
    if (sessionToken) {
      const rpcRes = await supabase.rpc('obter_contatos_admin', { p_token: sessionToken });
      data = rpcRes.data;
      error = rpcRes.error;
    } else {
      const queryRes = await supabase.from('contatos').select('*').order('created_at', { ascending: false });
      data = queryRes.data;
      error = queryRes.error;
    }

    if (!error && Array.isArray(data)) {
      const mapped = data.map((item) => ({
        id: item.id,
        tipo: item.tipo,
        nome: item.nome,
        contato: item.contato,
        origem: item.origem,
        data: new Date(item.created_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
        status: item.status || 'Novo',
        mensagem: item.mensagem || ''
      }));

      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(mapped));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('mc_contacts_updated'));
      }
      return mapped;
    }
  } catch (err) {
    console.warn('Fallback para contatos locais:', err);
  }

  return getContacts();
};

export const getMetrics = () => {
  try {
    const contacts = getContacts();
    const emailsCount = contacts.filter((c) => c.tipo === 'email').length;
    const whatsCount = contacts.filter((c) => c.tipo === 'whatsapp').length;
    const customCount = getCustomArticles().length;

    return {
      emailsRecebidos: emailsCount,
      whatsappRecebidos: whatsCount,
      artigosPublicados: DEFAULT_METRICS.artigosPublicados + customCount,
      casosEmAndamento: 0
    };
  } catch (e) {
    return DEFAULT_METRICS;
  }
};

export const addContact = async (contact) => {
  const newContact = {
    ...contact,
    id: `ct-${Date.now()}`,
    data: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
  };

  // 1. Grava no banco de dados Supabase
  if (supabase) {
    try {
      await supabase.from('contatos').insert([{
        tipo: contact.tipo,
        nome: contact.nome || 'Interessado',
        contato: contact.contato || 'Sem contato',
        origem: contact.origem || 'Site Oficial',
        status: contact.status || 'Novo',
        mensagem: contact.mensagem || null
      }]);
    } catch (err) {
      console.warn('Erro ao inserir no Supabase:', err);
    }
  }

  // 2. Grava no cache local para resposta imediata da interface
  const contacts = getContacts();
  const updated = [newContact, ...contacts];
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(updated));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_contacts_updated'));
  }

  return updated;
};

// --- GESTAO DO ACERVO DE ORIENTACOES (COM SUPABASE) ---
export const getCustomArticles = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const fetchSupabaseArticles = async () => {
  if (!supabase) return getCustomArticles();

  try {
    const { data, error } = await supabase
      .from('artigos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      const mapped = data.map((item, idx) => ({
        id: item.id,
        number: 40 + idx + 1,
        title: item.title,
        h1: item.h1 || item.title,
        slug: item.slug,
        category: item.category,
        categorySlug: item.category_slug,
        metaDescription: item.meta_description,
        readingTime: item.reading_time || item.read_time || '5 min de leitura',
        publishedAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        isCustom: true,
        author: {
          name: item.author || 'Mauro Cezar de Souza',
          role: 'Advogado Titular',
          oab: 'OAB/SP 379.224'
        },
        sections: item.sections || [],
        practicalTip: item.practical_tip || ''
      }));

      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(mapped));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('mc_articles_updated'));
      }
      return mapped;
    }
  } catch (err) {
    console.warn('Fallback para artigos locais:', err);
  }

  return getCustomArticles();
};

export const saveCustomArticle = async (articleData) => {
  const articles = getCustomArticles();
  
  const baseSlug = articleData.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const slug = `artigo-${Date.now().toString().slice(-4)}-${baseSlug}`;

  const newArticle = {
    id: `custom-art-${Date.now()}`,
    number: 40 + articles.length + 1,
    title: articleData.title,
    h1: articleData.title,
    slug: slug,
    category: articleData.category || 'Direito Trabalhista',
    categorySlug: articleData.categorySlug || 'direito-do-trabalho',
    metaDescription: articleData.metaDescription || articleData.summary || 'Orientacao tecnica juridica elaborada por Mauro Cezar de Souza.',
    keywords: articleData.keywords || [articleData.category, 'direitos', 'mauro souza'],
    readingTime: articleData.readingTime || '5 min de leitura',
    publishedAt: new Date().toISOString().split('T')[0],
    isCustom: true,
    author: {
      name: 'Mauro Cezar de Souza',
      role: 'Advogado Titular',
      oab: 'OAB/SP 379.224'
    },
    sections: articleData.sections || [
      {
        subtitle: 'Contexto e Fundamentacao Legal',
        paragraphs: [articleData.content || 'Texto da orientacao juridica.']
      }
    ],
    practicalTip: articleData.practicalTip || 'Antes de tomar decisoes ou assinar documentos, consulte a documentacao com assistencia juridica especializada.'
  };

  // 1. Grava no Supabase via RPC autenticada de seguranca
  if (supabase) {
    try {
      const sessionToken = getAdminToken();
      if (sessionToken) {
        const { data: rpcRes, error: rpcErr } = await supabase.rpc('salvar_artigo_admin', {
          p_token: sessionToken,
          p_artigo: {
            title: newArticle.title,
            slug: newArticle.slug,
            category: newArticle.category,
            categorySlug: newArticle.categorySlug,
            readingTime: newArticle.readingTime,
            metaDescription: newArticle.metaDescription,
            practicalTip: newArticle.practicalTip,
            sections: newArticle.sections
          }
        });
        if (rpcErr) {
          console.warn('Erro ao gravar via RPC Supabase:', rpcErr);
        } else if (rpcRes && rpcRes.id) {
          newArticle.id = rpcRes.id;
        }
      }
    } catch (err) {
      console.warn('Erro ao gravar artigo no Supabase:', err);
    }
  }

  // 2. Grava no cache local para resposta instantanea na interface
  const updated = [newArticle, ...articles.filter(a => a.slug !== newArticle.slug)];
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_articles_updated'));
  }
  
  return newArticle;
};

export const deleteCustomArticle = async (articleIdOrSlug) => {
  if (supabase) {
    try {
      const sessionToken = getAdminToken();
      if (sessionToken) {
        const articles = getCustomArticles();
        const found = articles.find((a) => a.id === articleIdOrSlug || a.slug === articleIdOrSlug);
        const slugToDelete = found ? found.slug : articleIdOrSlug;

        await supabase.rpc('excluir_artigo_admin', {
          p_token: sessionToken,
          p_slug: slugToDelete
        });
      }
    } catch (err) {
      console.warn('Erro ao deletar no Supabase:', err);
    }
  }

  const articles = getCustomArticles();
  const filtered = articles.filter((a) => a.id !== articleIdOrSlug && a.slug !== articleIdOrSlug);
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(filtered));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_articles_updated'));
  }
  return filtered;
};
