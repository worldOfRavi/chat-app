import React from "react";
import useConversation from "../../zustand/useConversation";
import { authSocketContext } from "../../context/SocketContext";

const Convsersation = ({convsersation, emoji, lastidx}) => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === convsersation._id;
  const {onlineUsers} = authSocketContext();
  const isOnline = onlineUsers.includes(convsersation._id);
  return (
    <>
        <div
      className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""}`}
      onClick={()=>setSelectedConversation(convsersation)}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className=" w-12 rounded-full ">
          <img
            src={convsersation.profilePic}
            alt="user avatar"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-sm text-gray-200">{convsersation.fullName}</p>
          <span className="text-lg md:text-xl">{emoji}</span>
        </div>
      </div>
    </div>
    {!lastidx ? <div className=" divider my-0 py-0 h-1 " /> : ""}
    
    </>
  );
};

export default Convsersation;


// STARTER CODE SNIPPET
// const Convsersation = () => {
//     return (
//       <>
//           <div
//         className="flex gap-2 items-center hover:bg-sky-500 
//       rounded p-2 py-1 cursor-pointer "
//       >
//         <div className="avatar online">
//           <div className=" w-12 rounded-full ">
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//               alt="user avatar"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col flex-1">
//           <div className="flex gap-3 justify-between">
//             <p className="font-bold text-gray-200">Rajendra Tharu</p>
//             <span className="text-xl">😡</span>
//           </div>
//         </div>
//       </div>
//       <div className=" divider my-0 py-0 h-1 " />
//       </>
//     );
//   };