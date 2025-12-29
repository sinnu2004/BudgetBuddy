import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { auth } from '../firebase';

const AuthProvider = ({ children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscibe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscibe;
    },[]);
  return (
    <AuthContext.Provider value={{user, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
