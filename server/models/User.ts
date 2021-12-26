import {Schema,model} from "mongoose"
import {user} from "../Interfaces/user"
const UserSchema = new Schema<Partial<user>>(
  {
     uname:{
       type:String,
       required:true,
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
       type:Date
     }

  }
);

module.exports = model("users", UserSchema);