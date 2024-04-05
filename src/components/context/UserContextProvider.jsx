
import React, {  createContext, useState, useEffect } from 'react'
import { auth, db, signOut } from '../../config/Config'

export const UserContext = createContext();

const UserContextProvider = ({children}) => {

const [user, setUser]=useState(null);

useEffect(()=>{
    if(user===null){
    auth.onAuthStateChanged(user=>{
            if(user){
                console.log(user, 'be')
                db.collection('users').doc(user.uid).get()
                .then(snapshot=>{
                    setUser({
                        email: snapshot.data()?.email,
                        name: snapshot.data()?.name,
                        userRole: snapshot.data()?.userRole,
                        id: snapshot.data()?.id,
                        cart: snapshot.data()?.cart
                        })
                })
            }else{
                setUser(null)
            }})
    }else{
        return;
    }

},[])

  return (
    <UserContext.Provider value ={{user}}>
        {children}
    </UserContext.Provider>
  )

}
export default UserContextProvider;
