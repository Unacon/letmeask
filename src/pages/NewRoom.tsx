import React from 'react';
import illustration from '../assets/img/illustration.svg';
import logo from '../assets/img/logo.svg';
import { Button } from '../components/Button';

import  '../assets/css/NewRoom.scss'
import { Link } from 'react-router-dom';


export function NewRoom(){
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
        <h2>Crie uma nova sala</h2>
        <form>
          <input type='text' placeholder='Nome da sala'/>
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

