import React from 'react';
import { AuthorContext } from '../components/AuthContext';

export function useAuthor(){
  const { user, signInWithPopup} = React.useContext(AuthorContext);

  return{
    user,
    signInWithPopup
  }
}