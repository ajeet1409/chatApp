import conversationModel from "../model/conversationModel.js"
import messageModel from "../model/messageModel.js"
import { getReceiverSocketId,io } from "../Socket/server.js"


export const sendMessage = async (req,res)=>{

    // console.log("send message to all of them",req.params.id,req.body.message);
    try {
        const { message}= req.body
        const  {id:receiverId}=req.params  // receiverId
        const senderId=req.user._id  // currently login user


        // ! agar conversation pahle se hoga toh sender and receiver ki id provide kar dege
  let conversation =  await conversationModel.findOne({
          participants:{$all:[senderId,receiverId]}
  })
  console.log(conversation)

  if(!conversation){
   conversation= await conversationModel.create({
        participants:[senderId,receiverId],
       
    })
    
  }

  let newMessage= new messageModel({
    senderId,
    receiverId,
    message
  })

  // ! agar new essage aayegaa toh use message  mein save karna hai and then conversation mein push karna hai and then conversation mein save karna hai
  if(newMessage){
    // await newMessage.save()
    conversation.message.push(newMessage._id)
    // await conversation.save()

  }
  // ! parallel dono ek sath save hojayegaa aue eksath collection mein save ho jayegaa


  await Promise.all([newMessage.save(),conversation.save()])

  // !socket to send the 

  const receiversocketid = getReceiverSocketId(receiverId)
  if(receiverId){
    io.to(receiversocketid).emit('newMessage',newMessage)
  }

  res.status(201).json({message:"message send successfully",newMessage})
        
    } catch (error) {
        console.log("error in sending message",error);
        res.status(500).json({message:"internal server error"})
        
        
    }

}

//! get message between the login user and send tomessage which  user


export const getMessage = async (req,res)=>{

  try {
     const  {id:chatUser}=req.params  // receiverId
        const senderId=req.user._id

   let   conversation=await  conversationModel.findOne({
        participants:{$all:[senderId,chatUser]}
      }).populate('message')  

      if(!conversation){
       return res.status(201).json([])
      }
    let message = conversation.message

    

    console.log(message);
//    
   return res.status(200).json(message)

    
  } catch (error) {
    console.log("Error in geeting message",error);
    res.status(501).json({message:"Internal server error"})
    
    
  }

}