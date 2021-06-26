import React from 'react';
import illustration from '../assets/img/illustration.svg';
import logo from '../assets/img/logo.svg';
import googleIcon from '../assets/img/google-icon.svg';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { database } from '../services/firebase';

import  '../assets/css/home.scss'
import { useAuthor } from '../hooks/useAuthor';

export function Home(){
  const { user, signInWithPopup} = useAuthor();
  const history = useHistory();
  const [codeRoom, setCodeRoom] = React.useState('');


  async function handleCreateRoom(){
    if(!user){
      await signInWithPopup();
    } 
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: React.FormEvent){
    event.preventDefault();

    if(codeRoom === ''){
      return; // modal
    }

    const roomRef = await database.ref(`rooms/${codeRoom}`).get();

    if(!roomRef.exists()){
      alert('Room does not exists.')
      return;
    }

    if(roomRef.val().endedAt){
      alert("Sala ja foi encerrada");
      return;
    }

    history.push(`rooms/${codeRoom}`)

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
        <form onSubmit={handleJoinRoom}>
          <input 
            type='text' 
            placeholder='Digite o código da sala'
            onChange={event => setCodeRoom(event.target.value)}
            value={codeRoom}
            />
          <Button type='submit'>
          Entrar na sala
          </Button>
        </form>
        </div>
      </main>
    </div>
  );
};

