import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
    const {setAuthUser} =  useAuthContext();
    const [laoding, setLoading] = useState(false);

    const userlogout = async()=>{
        setLoading(true)
        try {
            const res = await fetch("/api/auth/logout",{
                method:"POST",
                headers:{"Content-Type":"application/json"}
            });
            const data = await res.json();
            
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.removeItem("userInfo");
            setAuthUser(null);
            toast.success("User logout successful");
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {userlogout, laoding};

}

export default useLogout
