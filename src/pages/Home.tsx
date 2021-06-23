import React from 'react';
import illustration from '../assets/img/illustration.svg';
import logo from '../assets/img/logo.svg';
import googleIcon from '../assets/img/google-icon.svg';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { AuthorContext } from '../components/AuthContext';

import  '../assets/css/home.scss'

export function Home(){
  const history = useHistory();
  const { user, signInWithPopup} = React.useContext(AuthorContext);


  async function handleCreateRoom(){
    if(!user){
      await signInWithPopup();
    }
 
    history.push('/rooms/new');
  }

  return(
    <div id='path-home'>
      <aside id='illustration'>
          <img src={illustration} alt="illustração do letmeask"/>
        <strong>Toda pergunta tem uma resposta</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div id='conta'>
        <img src={logo} alt="Logo letmeask"/>
        <button id='buttonGoogle' onClick={handleCreateRoom}>
          <img src={googleIcon} alt="Logo da google"/>
          <span>
          Crie sua sala com a Google
          </span>
        </button>
        <div id='line'>ou entre em uma sala</div>
        <form>
          <input type='text' placeholder='Digite o código da sala'/>
          <Button type='submit'>
          Entrar na sala
          </Button>
        </form>
        </div>
      </main>
    </div>
  );
};

