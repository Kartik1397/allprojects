import {Schema,model, Model} from "mongoose"

import {IUser} from '../Interfaces/user'



const UserSchema = new Schema(

  {
     uname:{
       type:String,
       required:true,
     },
     email:{
       type:String,
       required:true
     },
     firstname:{
       type:String,
       required:true,
     },
     lastname:{
       type:String,
       required:true
     },
     find_me:{
        type:Object,
        required:true
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