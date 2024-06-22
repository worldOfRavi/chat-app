import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {loading, signUp} = useSignup();
// handle gender checkbox
const handleCheckBoxChange = (gender)=>{
    setInputs({
        ...inputs,gender
    })
}

//   function to handle the submission
const handleSubmit = async(e)=>{
    e.preventDefault();
    // function for signup functionality
    await signUp(inputs);
    
}


  return (
    <div className=" flex items-center justify-center min-w-96 mx-auto ">
      <div
        className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter
    backdrop-blur-lg bg-opacity-0  "
      >
        <h1 className="text-3xl font-semibold text-center ">
          SignUp <span className=" text-blue-500 ">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className=" label p-2 ">
              <span className="text-base label-text text-gray-100">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => {
                setInputs({ ...inputs, fullName: e.target.value });
              }}
            />
          </div>
          <div>
            <label className=" label p-2 ">
              <span className="text-base label-text text-gray-100">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
          </div>
          <div>
            <label className=" label p-2 ">
              <span className="text-base label-text text-gray-100">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>
          <div>
            <label className=" label p-2 ">
              <span className="text-base label-text text-gray-100">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
            />
          </div>
          <GenderCheckBox onCheckBoxChange = {handleCheckBoxChange} selectedGender={inputs.gender} />
          <Link
            to="/login"
            className="text-sm text-gray-100 hover:underline hover:text-blue-600 mt-2 inline-block "
          >
            Already have an account?
          </Link>
          <div>
            <button className=" btn btn-block btn-sm mt-6 " disabled = {loading}>
             {loading? <span className="loading loading-spinner"></span>: "signUp" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// STARTER CODE FOR SIGNUP

// const Signup = () => {
//     return (
//       <div className=' flex items-center justify-center min-w-96 mx-auto '>
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter
//       backdrop-blur-lg bg-opacity-0  ">
//       <h1 className="text-3xl font-semibold text-center ">
//           SignUp <span className=' text-blue-500 '>ChatApp</span>
//       </h1>
//       <form>
//           <div>
//               <label className=' label p-2 '>
//                   <span className="text-base label-text text-gray-100">Full Name</span>
//               </label>
//               <input type="text" placeholder='Enter Full Name' className='w-full input input-bordered h-10' />
//           </div>
//           <div>
//               <label className=' label p-2 '>
//                   <span className="text-base label-text text-gray-100">Username</span>
//               </label>
//               <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10' />
//           </div>
//           <div>
//               <label className=' label p-2 '>
//                   <span className="text-base label-text text-gray-100">Password</span>
//               </label>
//               <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' />
//           </div>
//           <div>
//               <label className=' label p-2 '>
//                   <span className="text-base label-text text-gray-100">Confirm Password</span>
//               </label>
//               <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' />
//           </div>
//           <GenderCheckBox />
//           <a href="#" className="text-sm text-gray-100 hover:underline hover:text-blue-600 mt-2 inline-block ">
//                   Already have an account?
//               </a>
//           <div>
//                   <button className=" btn btn-block btn-sm mt-6 ">
//                       SignUp
//                   </button>
//               </div>

//       </form>
//       </div>
//       </div>
//     )
//   }

//   export default Signup
