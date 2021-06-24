import React from 'react';
import illustration from '../assets/img/illustration.svg';
import logo from '../assets/img/logo.svg';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import  '../assets/css/NewRoom.scss'


import { AuthorContext } from '../components/AuthContext';
import { database } from '../services/firebase';

export function NewRoom(){
  const {user} = React.useContext(AuthorContext);
  const [nameRoom, setNameRoom] = React.useState('');
  const history = useHistory();

  async function handleCreateRoom(event: React.FormEvent){
    event.preventDefault(); //Evitar recarregamento de pagina

    if(nameRoom.trim() === ''){
      return; // poderia adicionar um modal
    }

    const newRoom = database.ref('rooms');

    const firebase = await newRoom.push({
      title: nameRoom,
      autherId: user?.id,
    });
  
    history.push(`/rooms/${firebase.key}`);
  }

  return(
    <div id='path'>
      <aside id='illustration'>
          <img src={illustration} alt="illustração do letmeask"/>
        <strong>Toda pergunta tem uma resposta</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div id='conta'>
          <img src={logo} alt="Logo letmeask"/>
          <h2>{user?.displayName}</h2>
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type='text' 
              placeholder='Nome da sala'
              onChange={event => setNameRoom(event.target.value)}
              value={nameRoom}
              />
            <Button type='submit'>
            Criar sala
            </Button>
            <p>
              Quer entrar em uma sala já existente? 
              <Link to="/" >Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

