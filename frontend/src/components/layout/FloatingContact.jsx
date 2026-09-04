import React from 'react';
import { useLocation } from 'react-router-dom';
import { addContact } from '../../services/backofficeService';

export const FloatingContact = () => {
  const location = useLocation();

  if (location.pathname === '/backoffice' || location.pathname === '/admin') {
    return null;
  }
  const handleClick = () => {
    try {
      addContact({
        tipo: 'whatsapp',
        nome: 'Interessado via WhatsApp',
        contato: 'Atendimento Direto',
        origem: 'Botão Flutuante do Site',
        status: 'Novo'
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <a
      href="https://wa.me/5511952870828?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20com%20Mauro%20Souza."
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-[#0A5F44] hover:bg-[#074733] text-white px-4 py-3 rounded-full shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0A5F44] focus:ring-offset-2"
      aria-label="Falar com o escritório pelo WhatsApp"
    >
      <i className="fa-brands fa-whatsapp text-xl text-white" aria-hidden="true"></i>
      <span className="text-xs font-bold tracking-wide hidden sm:inline text-white">WhatsApp</span>
    </a>
  );
};
