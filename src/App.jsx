// src/App.jsx
import React, { useState, useEffect } from 'react';
import GuidedTour from './components/GuidedTour.jsx';
import { supabase } from './supabaseClient.js'; // 1. IMPORTAMOS NOSSO CLIENTE SUPABASE
import './App.css';

function App() {
  const [runOnboarding, setRunOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Estado para guardar o perfil do usuário

  useEffect(() => {
    // Função para buscar os dados do usuário e verificar o status do onboarding
    const fetchUserProfile = async () => {
      // --- SIMULAÇÃO DE LOGIN ---
      // Em um app real, você obteria o ID do usuário da sessão do Supabase.
      // Por agora, vamos usar um ID fixo para testar.
      // Use o seu ID de usuário da tabela 'profiles' para que o teste funcione.
      // O seu ID de usuário (marcosmx8@gmail.com) é: 5a0fcdc3-04c9-4db4-9ab8-43b0e280296d
      const TEST_USER_ID = '5a0fcdc3-04c9-4db4-9ab8-43b0e280296d';

      // DEPOIS (COM A CORREÇÃO)
const { data, error } = await supabase
  .from('profiles')
  .select('id, onboarding_concluido') // Seleciona as colunas que precisamos
  .eq('id', TEST_USER_ID) // <<< AQUI ESTÁ A CORREÇÃO: procurando na coluna 'id'
  .single(); // Não precisamos mais do .limit(1) aqui, pois 'id' é único.

      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        return;
      }

      if (data) {
        setUserProfile(data);
        // 3. VERIFICA SE O ONBOARDING DEVE RODAR
        if (data.onboarding_concluido === false) {
          setRunOnboarding(true); // Inicia o tour se a coluna for 'false'
        }
      }
    };

    fetchUserProfile();
  }, []); // O array vazio [] garante que isso rode apenas uma vez, quando o componente montar

  // Função para ser chamada quando o tour terminar
  const handleTourComplete = async () => {
    setRunOnboarding(false); // Esconde o tour da tela imediatamente

    if (!userProfile) return; // Não faz nada se não tivermos um perfil de usuário

    // 4. ATUALIZA O BANCO DE DADOS
    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_concluido: true }) // Define a coluna como 'true'
      .eq('id', userProfile.id); // <<< CORREÇÃO: usando o 'id' do perfil para atualizar

    if (error) {
      console.error('Erro ao atualizar o status do onboarding:', error);
    } else {
      console.log('Onboarding marcado como concluído no Supabase!');
    }
  };

  // O resto do seu JSX continua o mesmo...
  return (
    <div className="App">
      {runOnboarding && <GuidedTour onTourComplete={handleTourComplete} />}

      <header className="app-header">
        <h1>Controlei</h1>
        <div className="header-actions">
          <div className="notification-bell">🔔</div>
          <div className="user-profile">👤</div>
          <button className="botao-nova-transacao">Nova Transação</button>
        </div>
      </header>

      <main className="app-content">
        <nav className="sidebar-menu">
          <h3>Menu</h3>
          <ul>
            <li id="tour-dashboard">Dashboard</li>
            <li id="tour-transacoes">Transações</li>
            <li id="tour-cartao">Cartão de Crédito</li>
            <li id="tour-investimentos">Investimentos</li>
            <li id="tour-categorias">Categorias</li>
            <li id="tour-contas">Contas e Cartões</li>
            <li id="tour-metas">Metas</li>
            <li id="tour-relatorios">Relatórios</li>
          </ul>
        </nav>

        <section className="dashboard-cards">
          <div className="card">
            <h2>Entrou</h2>
            <span>R$ 0,00</span>
          </div>
          <div className="card">
            <h2>Saiu</h2>
            <span>R$ 0,00</span>
          </div>
          <div className="card">
            <h2>Patrimônio</h2>
            <span>R$ 0,00</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
