// src/components/GuidedTour.jsx

import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const GuidedTour = ({ onTourComplete }) => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      onDestroyStarted: () => {
        onTourComplete();
        driverObj.destroy();
      },
      // Tradução dos botões
      nextBtnText: 'Próximo',
      prevBtnText: 'Voltar',
      doneBtnText: 'Finalizar',
      // Sequência completa de passos
      steps: [
        // Parte 1: Interface
        {
          element: '.sidebar-menu',
          popover: {
            title: 'Sua Central de Comando 🧭',
            description: 'Bem-vindo ao Controlei! Use este menu lateral para navegar por todas as áreas da sua vida financeira. Vamos explorar as principais seções.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '.notification-bell',
          popover: {
            title: 'Fique Sempre Informado 🔔',
            description: 'Este é o sino de notificações. Avisaremos você sobre contas próximas do vencimento, atualizações importantes e dicas para sua saúde financeira.',
            side: 'bottom',
            align: 'end',
          },
        },
        {
          element: '.user-profile',
          popover: {
            title: 'Seu Perfil 👤',
            description: 'Aqui você pode gerenciar os detalhes da sua conta, configurações de segurança e preferências da plataforma.',
            side: 'bottom',
            align: 'end',
          },
        },
        // Parte 2: Funcionalidades
        {
          element: '#tour-dashboard',
          popover: {
            title: 'Seu Raio-X Financeiro 📊',
            description: 'Este é o seu Dashboard, o ponto de partida. Tenha uma visão clara e rápida do seu patrimônio, receitas e despesas do mês. Tudo o que importa, em um só lugar.',
            side: 'right',
          },
        },
        {
          element: '#tour-transacoes',
          popover: {
            title: 'O Coração da sua Organização ❤️',
            description: 'Aqui é onde a mágica acontece. Lance suas receitas e despesas do dia a dia e veja seu saldo bancário sempre atualizado em tempo real.',
            side: 'right',
          },
        },
        {
          element: '#tour-cartao',
          popover: {
            title: 'Faturas sob Controle Total 💳',
            description: 'Gerencie seus cartões e faturas de forma inteligente. Lance suas compras e nunca mais seja pego de surpresa no fim do mês.',
            side: 'right',
          },
        },
        {
          element: '#tour-investimentos',
          popover: {
            title: 'Veja seu Patrimônio Crescer 📈',
            description: 'Acompanhe todos os seus ativos de forma automatizada e intuitiva. Conecte suas contas e veja sua carteira de investimentos evoluir.',
            side: 'right',
          },
        },
        {
          element: '#tour-categorias',
          popover: {
            title: 'Entenda Para Onde Vai seu Dinheiro 🏷️',
            description: "Crie categorias e subcategorias (como 'Moradia' ou 'Lazer') para classificar seus gastos. É o segredo para saber exatamente como você gasta.",
            side: 'right',
          },
        },
        {
          element: '#tour-contas',
          popover: {
            title: 'Configure suas Contas 🏦',
            description: 'Cadastre aqui suas contas bancárias e cartões. É o primeiro passo para que o Controlei possa organizar tudo para você automaticamente.',
            side: 'right',
          },
        },
        {
          element: '#tour-metas',
          popover: {
            title: 'Transforme Sonhos em Realidade 🎯',
            description: 'Defina suas metas financeiras, seja uma viagem, um carro novo ou sua aposentadoria. Nós te ajudaremos a acompanhar o progresso para alcançá-las.',
            side: 'right',
          },
        },
        {
          element: '#tour-relatorios',
          popover: {
            title: 'Decisões com Base em Dados 💡',
            description: 'Explore relatórios detalhados para entender seus hábitos, ver sua evolução patrimonial e tomar as melhores decisões para o seu futuro financeiro.',
            side: 'right',
          },
        },
        // Passo Final
        {
          element: '.botao-nova-transacao',
          popover: {
            title: 'Vamos Começar? ✨',
            description: 'Tour concluído! Que tal começar agora? Clique aqui para lançar sua primeira despesa ou receita. É rápido e fácil!',
            side: 'bottom',
            align: 'end',
          },
        },
      ],
    });

    driverObj.drive();
  }, [onTourComplete]);

  return null;
};

export default GuidedTour;
