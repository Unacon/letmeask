import React from 'react'
import { auth, firebase } from '../services/firebase';


type AuthContextProps ={
  children : React.ReactNode;
}

type UserType = {
  displayName: string,
  photoURL : string,
  uid: string,
};

type AuthorContextType = {
  user : UserType | undefined,
  signInWithPopup: () => Promise<void>
};

export const AuthorContext = React.createContext({} as AuthorContextType);

export function AuthContext (props:AuthContextProps){
  const [user, setUser] = React.useState<UserType>();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName, photoURL, uid} = user
        
        if(!displayName || !photoURL){
          throw new Error("Missing information from Google Account.");
        };
        
        setUser({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL,
        });
      }
    })

    return () =>{
      unsubscribe();
    }
  },[]);

  async function signInWithPopup(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    
    if(result.user){
      const {displayName, photoURL, uid} = result.user

      if(!displayName || !photoURL){
        throw new Error("Missing information from Google Account.");
      };

      setUser({
        uid: uid,
        displayName: displayName,
        photoURL: photoURL,
      });
    }   
  }
  return (
    <AuthorContext.Provider value={{user, signInWithPopup}}>
      {props.children}
    </AuthorContext.Provider>
  );
}