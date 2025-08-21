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
      // ==================================================================
      // INÍCIO DA MODIFICAÇÃO: Lendo o ID do usuário da URL
      // ==================================================================

      // Pega os parâmetros da URL (ex: ...?user_id=abc-123)
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromUrl = urlParams.get('user_id');

      // Se nenhum ID foi passado na URL, o processo para aqui.
      if (!userIdFromUrl) {
        console.log("Nenhum ID de usuário foi fornecido na URL. O onboarding não pode iniciar.");
        return;
      }

      console.log("ID de usuário recebido da URL:", userIdFromUrl);

      // 2. BUSCA O PERFIL USANDO O ID RECEBIDO DA URL
      // A coluna 'user_id' na sua tabela 'profiles' deve corresponder ao 'id' da tabela 'auth.users'
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, user_id, onboarding_concluido')
        .eq('user_id', userIdFromUrl) // Usando o ID dinâmico da URL
        .single();

      // ==================================================================
      // FIM DA MODIFICAÇÃO
      // ==================================================================

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
      } else {
        console.log('Nenhum perfil encontrado para o ID fornecido.');
      }
    };

    fetchUserAndProfile();
  }, []);

  // A função handleTourComplete continua a mesma, está correta.
  const handleTourComplete = async () => {
    setRunOnboarding(false);

    if (!userProfile) return;

    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_concluido: true })
      .eq('id', userProfile.id);

    if (error) {
      console.error('Erro ao atualizar o status do onboarding:', error);
    } else {
      console.log('Onboarding marcado como concluído no Supabase!');
      // Opcional: fechar a janela automaticamente após a conclusão
      // window.close();
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
