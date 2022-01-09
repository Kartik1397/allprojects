import {Schema,model, Model} from "mongoose"

import {IUser} from '../Interfaces/user'



const UserSchema = new Schema(

  {
     uname:{
       type:String,
       required:true,
     },
     image:{
        type:String,
        required:true,
     },
     email:{
       type:String,
       required:true,
       unique:true
     },
     firstname:{
       type:String,
       required:false,
     },
     lastname:{
       type:String,
       required:false
     },
     find_me:{
        type:Object,
        required:false
     },
     project_Ids:{
       type:Array
     },
     follow_Set:{
        type:Array
     },
     created_At:{
       type:Number,
       default:Date.now()
     }

  }
);

export = model<IUser>("users", UserSchema);