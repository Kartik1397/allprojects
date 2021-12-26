import {Schema,model} from "mongoose"


//Interface for User
interface user{
  name:String
}
const UserSchema = new Schema<user>(
  {
     name:{
       type:String,
       required:true,
     }
  }
);

module.exports = model("users", UserSchema);