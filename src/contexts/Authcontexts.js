import React,{createContext, useState,useEffect,useContext} from 'react'
import {auth} from '../firebase'

//Global Functions and variables
//All files can access 
const AuthContext=createContext()
export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }
    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password)
    }
    function resetpassword(email){
        return auth.sendPasswordResetEmail(email)
    }
    function updateEmail(email){
        return currentUser.updateEmail(email)
    }
    function updatePassword(password){
        return currentUser.updatePassword(password)
    }
    const [currentUser,setCurrentUser] =useState()
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
       const unsubscribe= auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    const [username,setUsername]=useState()

    //functions are passed as reference in this object
    const value={
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        updatePassword,
        updateEmail,
        username,
        setUsername
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
