import React from 'react';
import illustration from '../assets/img/illustration.svg';
import logo from '../assets/img/logo.svg';
import { Button } from '../components/Button';

import  '../assets/css/NewRoom.scss'


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
        <p>Crie uma nova sala</p>
        <form>
          <input type='text' placeholder='Nome da sala'/>
          <Button type='submit'>
          Criar sala
          </Button>
          <p>
            Quer entrar em uma sala já existente? 
            <a href="http://www.google.com">Clique aqui</a>
          </p>
        </form>
        </div>
      </main>
    </div>
  );
};

