// controlei-frontend/src/components/OnboardingTour.jsx
import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

// Componente que define e controla o tour guiado
const OnboardingTour = ({ onTourComplete }) => {
  // Define os passos do nosso tour
  const steps = [
    {
      target: '.dashboard-cards', // Seletor CSS do elemento a ser destacado
      content: 'Bem-vindo ao seu Dashboard! Aqui você tem uma visão geral da sua saúde financeira.',
      title: 'Seu Painel Principal',
      placement: 'bottom',
    },
    {
      target: '.sidebar-menu',
      content: 'Use este menu para navegar entre as seções, como Transações, Categorias e Relatórios.',
      title: 'Navegação',
      placement: 'right',
    },
    {
      target: '.botao-nova-transacao',
      content: 'Clique aqui para cadastrar sua primeira despesa ou receita. Vamos começar!',
      title: 'Adicionar Primeira Transação',
      placement: 'left',
    },
  ];

  // Função para lidar com o fim do tour (quando é concluído ou pulado)
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      // Chama a função que recebemos via props para avisar que o tour acabou
      onTourComplete();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={true} // Inicia o tour assim que o componente é renderizado
      continuous={true} // Permite avançar com a tecla "Enter"
      showProgress={true} // Mostra o progresso (ex: 2 de 3)
      showSkipButton={true} // Mostra o botão para pular o tour
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: '#fff',
          backgroundColor: '#fff',
          primaryColor: '#6a1b9a', // Cor principal (botões)
          textColor: '#333',
          zIndex: 1000,
        },
      }}
      locale={{
        back: 'Voltar',
        close: 'Fechar',
        last: 'Finalizar',
        next: 'Próximo',
        skip: 'Pular',
      }}
    />
  );
};

export default OnboardingTour;
