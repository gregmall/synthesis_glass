
import React, {  createContext, useState, useEffect } from 'react'
import { auth, db } from '../config/Config'

export const UserContext = createContext();

const UserContextProvider = ({children}) => {

const [user, setUser]=useState({});


useEffect(()=>{

  
    auth.onAuthStateChanged(user=>{
            if(user){
        
                db.collection('users').doc(user.uid).get()
                .then(snapshot=>{
                    setUser({
                        email: snapshot.data()?.email,
                        name: snapshot.data()?.name,
                        userRole: snapshot.data()?.userRole,
                        id: snapshot.data()?.id,
                        cart: snapshot.data()?.cart,
                        history: snapshot.data()?.history
                        })
                        localStorage.setItem('user', JSON.stringify(user))
                })
            }else{
                setUser(null)
            }})

    }

,[])

  return (
    <UserContext.Provider value ={{user}}>
        {children}
    </UserContext.Provider>
  )

}
export default UserContextProvider;
