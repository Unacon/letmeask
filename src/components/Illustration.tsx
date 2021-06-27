import React from 'react';
import '../assets/css/illustration.scss'

import illustration from '../assets/img/illustration.svg'

export function Illustration(){
  return(
    <aside id='illustration'>
          <img src={illustration} alt="illustração do letmeask"/>
        <strong>Toda pergunta tem uma resposta</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
    </aside>
  )
}