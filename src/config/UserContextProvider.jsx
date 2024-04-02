import React, { Component, createContext } from 'react'
import { db, auth } from './Config'

export const UserContext = createContext();

export default class UserContextProvider extends Component {
    state={
        user: {}
    }

    componentDidMount(){
        auth.onAuthStateChanged(user=>{
            if(user){
            db.collection('SignedUpUserData').doc(user.uid).get()
            .then(snapshot=>{
                this.setState({
                    user:{
                        email: snapshot.data()?.Email,
                        name: snapshot.data()?.Name,
                        userRole: snapshot.data()?.userRole

                    }
                })
            })
        }else{
            this.setState({user: null})
        }})

    }
  render() {
    return (
        <UserContext.Provider value ={{user: this.state.user}}>
            {this.props.children}
        </UserContext.Provider>
    )
  }
}
