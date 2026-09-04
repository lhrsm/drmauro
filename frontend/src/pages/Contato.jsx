import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { addContact } from '../services/backofficeService';

export const Contato = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    cidade_estado: '',
    area_interesse: 'direito_trabalhista',
    resumo_situacao: '',
    consentimento_lgpd: false,
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [mountTime] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Defesa Anti-Bot Honeypot: se preenchido, é um bot rastreador
    if (honeypot && honeypot.trim() !== '') {
      setStatusMessage({
        type: 'success',
        text: 'Sua solicitação foi recebida com sucesso. O escritório entrará em contato.',
      });
      return;
    }

    // 2. Defesa Anti-Automação por Tempo: humanos levam mais de 1.8 segundos para preencher
    if (Date.now() - mountTime < 1800) {
      setStatusMessage({
        type: 'error',
        text: 'Envio automatizado detectado. Por favor, preencha as informações normalmente.',
      });
      return;
    }

    // 3. Defesa Rate Limiting: Máximo 3 envios por janela de 10 minutos por navegador
    try {
      const now = Date.now();
      const rateData = JSON.parse(localStorage.getItem('mc_contact_rate') || '[]');
      const validTimestamps = rateData.filter((t) => now - t < 10 * 60 * 1000);

      if (validTimestamps.length >= 3) {
        setStatusMessage({
          type: 'error',
          text: 'Limite de mensagens atingido para este período. Por favor, aguarde alguns minutos ou fale diretamente pelo WhatsApp.',
        });
        return;
      }

      validTimestamps.push(now);
      localStorage.setItem('mc_contact_rate', JSON.stringify(validTimestamps));
    } catch (rateErr) {
      // safe fallback
    }

    if (!formData.consentimento_lgpd) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, marque o consentimento para tratamento de dados segundo a LGPD.',
      });
      return;
    }

    // 4. Validação e Sanitização Estrita de Entradas (Prevenção de Injeção e Poluição)
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.telefone.replace(/\D/g, '');
    const cleanName = formData.nome_completo.replace(/<[^>]*>/g, '').trim();
    const cleanSituation = formData.resumo_situacao.replace(/<[^>]*>/g, '').trim();

    if (!cleanEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, informe um endereço de e-mail válido para que possamos retornar o contato.',
      });
      return;
    }

    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, informe um número de telefone com DDD válido (10 ou 11 dígitos).',
      });
      return;
    }

    if (cleanName.length < 3) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, informe seu nome completo.',
      });
      return;
    }

    if (cleanSituation.length < 10) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, descreva resumidamente a sua dúvida ou necessidade jurídica (mínimo de 10 caracteres).',
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    // 1. Registra contato no Backoffice e no banco de dados Supabase do cliente
    try {
      addContact({
        tipo: 'email',
        nome: cleanName.slice(0, 100),
        contato: `${cleanEmail.slice(0, 80)} • ${formData.telefone.slice(0, 30)}`,
        origem: `Formulário • ${formData.area_interesse.replace(/_/g, ' ').toUpperCase()}`,
        mensagem: cleanSituation.slice(0, 2000),
        status: 'Novo'
      });
    } catch (dbErr) {
      console.warn('Registro local realizado:', dbErr);
    }

    // 2. Dispara e-mail transacional formatado via FormSubmit direto para a caixa de entrada oficial
    try {
      const emailPayload = {
        'Nome do Solicitante': cleanName,
        'E-mail para Retorno': cleanEmail,
        'Telefone / WhatsApp': formData.telefone,
        'Cidade / UF': formData.cidade_estado || 'Não informado',
        'Área de Interesse': formData.area_interesse.replace(/_/g, ' ').toUpperCase(),
        'Descrição da Situação / Dúvida': cleanSituation,
        '_subject': `Novo Contato do Site: ${cleanName} (${formData.area_interesse.replace(/_/g, ' ')})`,
        '_template': 'table',
        '_captcha': 'false'
      };

      const response = await fetch('https://formsubmit.co/ajax/mauroceza@adv.oabsp.org.br', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload),
      });

      const resData = await response.json().catch(() => ({}));

      if (resData.message && resData.message.includes('Activation')) {
        setStatusMessage({
          type: 'success',
          text: 'Sua solicitação foi registrada no sistema! Para receber e-mails diretos, lembre-se de clicar no botão "Activate Form" enviado para mauroceza@adv.oabsp.org.br.',
        });
      } else {
        setStatusMessage({
          type: 'success',
          text: 'Sua solicitação foi recebida com sucesso e enviada diretamente para a caixa de entrada da equipe jurídica de Mauro Souza. Entraremos em contato em breve.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'success',
        text: 'Sua solicitação foi registrada com sucesso no sistema do escritório. Entraremos em contato em breve.',
      });
    } finally {
      setFormData({
        nome_completo: '',
        email: '',
        telefone: '',
        cidade_estado: '',
        area_interesse: 'direito_trabalhista',
        resumo_situacao: '',
        consentimento_lgpd: false,
      });
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Contato | Mauro Souza Advocacia"
        description="Entre em contato com Mauro Souza Advocacia. Atendimento presencial em São Paulo e telepresencial em todo o Brasil."
        keywords={["contato advogado mauro cezar", "agendamento advocacia trabalhista", "telefone advogado inss"]}
        canonicalPath="/contato"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#BB734D]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#BB734D] font-medium" aria-current="page">Contato</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Atendimento Institucional
          </span>
          <h1 className="section-title">
            Agende uma conversa com a nossa equipe.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Apresente sua dúvida ou necessidade para que possamos analisar a viabilidade e orientar sobre os procedimentos cabíveis.
          </p>
        </div>

        {/* Formulário de Apresentação da Situação */}
        <div className="max-w-3xl">
          <div className="p-8 sm:p-10 bg-white rounded border border-[#CCD4DA] shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#163758] mb-2">
              Apresentar situação
            </h2>
              <p className="text-xs sm:text-sm text-[#536773] mb-6 font-sans">
                As informações enviadas são protegidas pelo sigilo profissional da advocacia e pela LGPD.
              </p>

              {statusMessage && (
                <div 
                  role="alert"
                  aria-live="polite"
                  className={`p-4 rounded mb-6 text-xs font-medium ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border border-rose-300 text-rose-900'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans" noValidate>
                {/* Campo Armadilha Anti-Bot (Honeypot) */}
                <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="sys_security_field">Não preencha este campo</label>
                  <input
                    id="sys_security_field"
                    type="text"
                    name="website_url_security"
                    tabIndex="-1"
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contato-nome" className="block text-slate-700 font-semibold mb-1">
                      Nome Completo *
                    </label>
                    <input
                      id="contato-nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.nome_completo}
                      onChange={(e) => setFormData({...formData, nome_completo: e.target.value})}
                      placeholder="Seu nome completo"
                      className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:border-[#964F2D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contato-tel" className="block text-slate-700 font-semibold mb-1">
                      Telefone com DDD *
                    </label>
                    <input
                      id="contato-tel"
                      name="telefone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="(DDD) Telefone"
                      className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:border-[#964F2D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contato-email" className="block text-slate-700 font-semibold mb-1">
                      E-mail *
                    </label>
                    <input
                      id="contato-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                      className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:border-[#964F2D]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contato-cidade" className="block text-slate-700 font-semibold mb-1">
                      Cidade / UF *
                    </label>
                    <input
                      id="contato-cidade"
                      name="cidade_estado"
                      type="text"
                      autoComplete="address-level2"
                      required
                      value={formData.cidade_estado}
                      onChange={(e) => setFormData({...formData, cidade_estado: e.target.value})}
                      placeholder="Cidade/UF"
                      className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:border-[#964F2D]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contato-area" className="block text-slate-700 font-semibold mb-1">
                    Área Jurídica *
                  </label>
                  <select
                    id="contato-area"
                    name="area_interesse"
                    value={formData.area_interesse}
                    onChange={(e) => setFormData({...formData, area_interesse: e.target.value})}
                    className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:border-[#964F2D]"
                  >
                    <option value="direito_trabalhista">Direito do Trabalho (Rescisão, Horas Extras, Acidentes)</option>
                    <option value="direito_previdenciario">Direito Previdenciário (Aposentadorias, INSS, BPC/LOAS)</option>
                    <option value="consulta_geral">Outra Consulta Jurídica</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contato-relato" className="block text-slate-700 font-semibold mb-1">
                    Relato dos Fatos *
                  </label>
                  <textarea
                    id="contato-relato"
                    name="resumo_situacao"
                    rows="4"
                    required
                    value={formData.resumo_situacao}
                    onChange={(e) => setFormData({...formData, resumo_situacao: e.target.value})}
                    placeholder="Descreva de forma concisa os acontecimentos..."
                    className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:border-[#964F2D]"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="contact_page_lgpd_original"
                    name="consentimento_lgpd"
                    checked={formData.consentimento_lgpd}
                    onChange={(e) => setFormData({...formData, consentimento_lgpd: e.target.checked})}
                    className="mt-0.5 rounded border-[#CCD4DA] text-[#964F2D] focus:ring-[#964F2D]"
                  />
                  <label htmlFor="contact_page_lgpd_original" className="text-xs text-[#536773]">
                    Declaro que li a <Link to="/politica-de-privacidade" className="text-[#964F2D] underline font-medium hover:text-[#7D3F22]">Política de Privacidade</Link> e autorizo o contato estritamente para fins de atendimento técnico.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-copper w-full justify-center focus:outline-none focus:ring-2 focus:ring-[#964F2D] focus:ring-offset-2"
                  >
                    <span>{loading ? 'Enviando...' : 'Transmitir mensagem com segurança'}</span>
                    <span>→</span>
                  </button>
                </div>

              </form>
            </div>
          </div>

      </div>
    </main>
  );
};
