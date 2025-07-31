import mongoose from "mongoose";

import userModel from "./userModel.js";
import messageModel from "./messageModel.js";

const conversationSchema=mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:userModel

        }
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:messageModel,
            default:[]

        }
    ],

})

const conversationModel=mongoose.model('conversation',conversationSchema);
export default conversationModel;
