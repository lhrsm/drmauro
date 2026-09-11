import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturou erro:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-white">
          <div className="max-w-md w-full p-6 bg-[#F3F5F7] rounded border border-[#CCD4DA] text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#BB734D]/10 text-[#BB734D] flex items-center justify-center text-xl">
              <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
            </div>
            <h2 className="font-display text-xl font-bold text-[#163758]">
              Não foi possível exibir este conteúdo no momento
            </h2>
            <p className="text-xs sm:text-sm text-[#536773] leading-relaxed">
              Ocorreu uma instabilidade pontual ao processar estas informações. Por favor, tente recarregar ou voltar para a página inicial.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-[#BB734D] hover:bg-[#964F2D] text-white text-xs font-semibold rounded transition-colors"
              >
                Recarregar Página
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-white hover:bg-slate-50 text-[#163758] border border-[#CCD4DA] text-xs font-semibold rounded transition-colors"
              >
                Página Inicial
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
