import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import {getReceiverSocketId, io} from "../socket/socket.js";
// logic for sending message
export const sendMessage = async(req, res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        // await conversation.save(); this way takes more time instead use follwoing mechanism
        // await newMessage.save();
        
        // this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()]);
        
        //socket io functionality will go here
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in send message controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

// logic for getting conversations
export const getMessages = async (req, res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, userToChatId]}
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in get message controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}