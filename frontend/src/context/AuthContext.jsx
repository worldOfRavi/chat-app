import { createContext, useContext, useState } from "react";


// create context
export const AuthContext = createContext();


//create context provider
export const AuthContextProvider = ({children})  =>{
    const[authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("userInfo")) ||null);              

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
}


// create context consumer
export const useAuthContext = () =>{
    return useContext(AuthContext);
     
}