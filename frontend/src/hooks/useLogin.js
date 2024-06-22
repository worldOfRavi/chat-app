import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { set } from "mongoose";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const userLogin = async({username, password}) =>{
    const success = handleInputError({username, password});
    if(!success) return
      setLoading(true)
    try {
        const res = await fetch("/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username, password})
        })
        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem("userInfo", JSON.stringify(data));
        setAuthUser(data);
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }

  }
  return {loading, userLogin}
};

export default useLogin;


function handleInputError({username, password}){
    if(!username || !password){
        toast.error("Please fill all the fields");
        return false;
    }
    
    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false
    }
    return true;
}