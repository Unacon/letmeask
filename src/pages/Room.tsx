import React, { FormEvent } from 'react'
import logoImg from '../assets/img/logo.svg'
import { Button } from '../components/Button'

import '../assets/css/room.scss'
import { RoomCode } from '../components/RoomCode'
import { useParams } from 'react-router-dom'
import { AuthorContext } from '../components/AuthContext'
import { database } from '../services/firebase'
import { useEffect } from 'react'

type FirebaseQuestionsType = Record<string,{
  author:{
    name: string,
    avatar: string;
  }
  content : string;
  isHighLighted: string;
  isAnswered: string;
}>

type questionType = {
  id: string,
  author:{
    name: string,
    avatar: string;
  }
  content : string;
  isHighLighted: string;
  isAnswered: string;
}

type RoomParams = {
  id: string;
}

export function Room() {
  const {user} = React.useContext(AuthorContext);
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [questions, setQuestions] = React.useState<questionType[]>([])

  const roomId = params.id

  useEffect(()=>{
    const roomRef = database.ref(`rooms/${roomId}`);

    //Tentar utilizar children_change inver do value
    roomRef.on('value', room =>{
      console.log(room.val());
      const dataBaseRoom = room.val();
      const fireBaseQuestion : FirebaseQuestionsType = dataBaseRoom.questions ?? {};

      const parseQuestions = Object.entries(fireBaseQuestion).map(([key,value])=>{
        return{
          id:key,
          content:value.content,
          author:value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(dataBaseRoom.title);
      setQuestions(parseQuestions);
    })

  },[roomId])

  async function handleSenQuestion(event: FormEvent){
    event.preventDefault(); 

    if(newQuestion.trim() === ''){
      return;
    }

    if(!user){
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author:{
        name:user.name,
        avatar:user.avatar,
      },
      isHighLighted: false, //Marcada para responder
      isAnswered: false // Respondida
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}          
        </div>

        <form onSubmit={handleSenQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event=>setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {
              user ? (
              <div className="usar-info">
                <img src={user.avatar} alt={useParams.name}/>
                <span>{user.name}</span>
              </div>
              ):(
              <span>Para enviar uma pergunta,<button>faça o login</button></span>
            )}
            <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  )
}