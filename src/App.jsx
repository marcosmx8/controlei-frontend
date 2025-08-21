// src/App.jsx

import React, { useState, useEffect } from 'react';
import GuidedTour from './components/GuidedTour.jsx';
import './App.css';

function App() {
  const [runOnboarding, setRunOnboarding] = useState(false);

  useEffect(() => {
    const tourVisto = localStorage.getItem('controlei-tour-visto');
    if (!tourVisto) {
      setRunOnboarding(true);
    }
  }, []);

  const handleTourComplete = () => {
    localStorage.setItem('controlei-tour-visto', 'true');
    setRunOnboarding(false);
    console.log('Tour do Driver.js finalizado!');
  };

  return (
    <div className="App">
      {runOnboarding && <GuidedTour onTourComplete={handleTourComplete} />}

      <header className="app-header">
        <h1>Controlei</h1>
        <div className="header-actions">
          {/* Elementos adicionados para o tour */}
          <div className="notification-bell">🔔</div>
          <div className="user-profile">👤</div>
          <button className="botao-nova-transacao">Nova Transação</button>
        </div>
      </header>

      <main className="app-content">
        <nav className="sidebar-menu">
          <h3>Menu</h3>
          <ul>
            {/* IDs adicionados em cada item para o tour */}
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
