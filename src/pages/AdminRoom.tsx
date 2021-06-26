import React from 'react'
import logoImg from '../assets/img/logo.svg'
import deleteImg from '../assets/img/delete.svg'
import checkImg from '../assets/img/check.svg'
import answerImg from '../assets/img/answer.svg'
import { Button } from '../components/Button'

import '../assets/css/room.scss'
import { Question }  from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useParams , useHistory} from 'react-router-dom'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id
  const history = useHistory();
  
  const {questions, title} = useRoom(roomId);

  async function handleDeleteRoom(){
    if(window.confirm("Tem certeza que você deseja excluir essa sala?")){
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })
    }

    history.push('/');
  }

  async function handleDeleteQuestion(questionId : string){
    if(window.confirm("Tem certeza que você deseja excluir essa pergunta?")){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId : string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered : true
    });
  }

  async function handleHighLighQuestion(questionId : string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted : true
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={params.id} />
            <Button 
            isOutlined
            onClick={handleDeleteRoom}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}          
        </div>
        <div className="question-list">
          {
            questions.map(question =>{
              return(
                <Question 
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered = {question.isAnswered}
                isHighLighted = {question.isHighLighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida"/>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighLighQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Destacar pergunta"/>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Deletar pergunta"/>
                  </button>
                </Question>
                );
              })
            }
        </div>
      </main>
    </div>
  )
}
