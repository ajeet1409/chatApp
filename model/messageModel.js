import mongoose from "mongoose";


const messageSchema=mongoose.Schema({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true,

    },
    receiverId:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true,

    },
    message:{ 
        type:String,
        required:true,
        maxlength:100,
        validate:[
            {
                validator:(value)=>value.length>0,
                message:'message can not be empty'
            }
        ]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }


},
{
    timestamps:true //created and update when
}


)

 const messageModel= mongoose.model('message',messageSchema)

 export default messageModel