import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmount)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='flex flex-col h-full w-full max-w-full md:min-w-[450px]'>
      {!selectedConversation ? <NoChatSelected /> :
        <>
          {/* header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className='label-text text-white'>To:</span>
            <span className="text-white font-bold">{selectedConversation.fullName}</span>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>
          <div className='px-4 py-2'>
            <MessageInput />
          </div>
        </>
      }
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center overflow-auto justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl" />
      </div>
    </div>
  );
}
