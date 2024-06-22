import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {loading, messages} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    },100)
  },[messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
    {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx} />)}
    {!loading  && messages.length === 0 && ( 
        <p className="text-center text-gray-100">Send a message to start the conversation</p>
       )}

    {!loading && messages.map((message)=>
      <div key={message._id} ref={lastMessageRef}>
      <Message  message = {message} />
      </div>
       
    )}

    </div>
  )
}

export default Messages






// Code snippet
// import React from 'react'
// import Message from './Message'
// import useGetMessages from '../../hooks/useGetMessages'

// const Messages = () => {
//   const {loading, messages} = useGetMessages();
//   console.log(messages);
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//     <Message />
//     <Message />
//     <Message />
//     <Message />
//     <Message />
//     <Message />
//     <Message />
//     </div>
//   )
// }

// export default Messages
