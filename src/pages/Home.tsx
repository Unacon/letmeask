import React from 'react';
import illustration from '../assets/img/illustration.svg';
import logo from '../assets/img/logo.svg';
import googleIcon from '../assets/img/google-icon.svg';
import { Button } from '../components/Button';

import  '../assets/css/home.scss'
import { useHistory } from 'react-router-dom';
import { auth, firebase } from '../services/firebase';


export function Home(){
  const history = useHistory();

  function handleCreateRoom(){
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result =>{
      console.log(result);
      history.push('/rooms/new');
    });
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

