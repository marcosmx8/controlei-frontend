// src/App.jsx
import React, { useState, useEffect } from 'react';
import GuidedTour from './components/GuidedTour.jsx';
import { supabase } from './supabaseClient.js';
import './App.css';

function App() {
  const [runOnboarding, setRunOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      // 1. PEGA A SESSÃO DO USUÁRIO LOGADO
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Erro ao buscar sessão:', sessionError);
        return;
      }

      // Se não houver sessão (ninguém logado), não faz nada.
      if (!session) {
        console.log('Nenhum usuário logado.');
        return;
      }

      const user = session.user;
      console.log('Usuário logado encontrado:', user);

      // 2. BUSCA O PERFIL USANDO O ID DO USUÁRIO DA SESSÃO
      // A coluna 'user_id' na sua tabela 'profiles' deve corresponder ao 'id' da tabela 'auth.users'
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, user_id, onboarding_concluido')
        .eq('user_id', user.id) // Usando o ID dinâmico do usuário logado
        .single();

      if (profileError) {
        console.error('Erro ao buscar perfil do usuário:', profileError);
        return;
      }

      if (profileData) {
        setUserProfile(profileData);
        console.log('Perfil encontrado:', profileData);
        // 3. VERIFICA SE O ONBOARDING DEVE RODAR
        if (profileData.onboarding_concluido === false) {
          console.log('Onboarding não concluído. Iniciando o tour...');
          setRunOnboarding(true);
        } else {
          console.log('Onboarding já concluído para este usuário.');
        }
      }
    };

    fetchUserAndProfile();
  }, []);

  // Função para ser chamada quando o tour terminar
  const handleTourComplete = async () => {
    setRunOnboarding(false);

    if (!userProfile) return;

    // 4. ATUALIZA O BANCO DE DADOS USANDO O ID DO PERFIL
    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_concluido: true })
      .eq('id', userProfile.id); // Atualiza usando o ID da tabela 'profiles'

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
      {/* ... seu header, main, etc. ... */}
    </div>
  );
}

export default App;
