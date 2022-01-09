import {media} from "../Interfaces/media"
import {Document} from "mongoose";

interface IUser extends Document {
  uname:String,
  email:String,
  image:String,
  firstname:String,
  lastname:String,
  find_me:Partial<media>,
  project_Ids:Array<String>,
  follow_Set:Array<String>,
  created_At:number,
  Linked_account: Partial<media>,
  Last_logged_in: Date,

}

export {IUser};