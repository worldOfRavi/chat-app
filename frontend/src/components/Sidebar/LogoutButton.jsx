import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { userlogout, loading } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className=" w-6 h-6 text-white cursor-pointer "
          onClick={userlogout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
