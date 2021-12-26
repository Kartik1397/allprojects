import {media} from "../Interfaces/media"
interface user{
  uname:String,
  firstname:String,
  lastname:String,
  find_me:Partial<media>,
  project_Ids:Array<String>,
  follow_Set:Array<String>,
  created_At:Date,
  Linked_account: Partial<media>,
  Last_logged_in: Date,

}
export {user}