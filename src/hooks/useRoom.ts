import React from 'react'
import { database } from '../services/firebase';
import { useAuthor } from './useAuthor';

type questionType = {
  id: string,
  author:{
    name: string,
    avatar: string;
  }
  content : string;
  isAnswered?: boolean,
  isHighLighted?: boolean,
  likeCount: number,
  likeId: string | undefined;
}

type FirebaseQuestionsType = Record<string,{
  author:{
    name: string,
    avatar: string;
  }
  content : string;
  isHighLighted?: boolean;
  isAnswered?: boolean;
  like: Record<string,{
    authorId: string;
  }>
}>

export function useRoom( roomId: string){
  const { user } = useAuthor();
  const [title, setTitle] = React.useState('');
  const [questions, setQuestions] = React.useState<questionType[]>([]);

  React.useEffect(()=>{
    const roomRef = database.ref(`rooms/${roomId}`);

    //Tentar utilizar children_change inver do value
    roomRef.on('value', room =>{
      const dataBaseRoom = room.val();
      const fireBaseQuestion : FirebaseQuestionsType = dataBaseRoom.questions ?? {};


      const parseQuestions = Object.entries(fireBaseQuestion).map(([key,value])=>{
        return{
          id:key,
          content:value.content,
          author:value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.like ?? {}).length,
          likeId: Object.entries(value.like ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0]
        }
      });

      setTitle(dataBaseRoom.title);
      setQuestions(parseQuestions);
    })

    return () =>{
      roomRef.off('value');
    }

  },[roomId, user?.id])

  return {
    questions, 
    title
  }
}