import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';
// create context
export const socketContext = createContext();

// create context Provider
export const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();
    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:5000",{
                query:{
                    userId:authUser._id
                }
            });
            setSocket(socket);
            // console.log(socket);
            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnelineUsers",(users)=>{
                setOnlineUsers(users)
            })
            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])
   return(
    <socketContext.Provider value={{socket, onlineUsers}}>
    {children}
   </socketContext.Provider>
   )
}

// create context consumer
export const authSocketContext = ()=>{
    return useContext(socketContext);
}