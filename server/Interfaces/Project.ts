import {projecturl} from "./projecturl"
interface project{
  Media:Partial<{video:String,photo:String}>,
  Title:String,
  Desc:String,
  Article:String,
  Tag_ids:Array<String>,
  Members:Array<String>,
  Urls:Partial<projecturl>,
  Likes:Array<String>,
  StartDate:Date,
  EndDate:Date,
  present:Boolean,
  Created_at:Date,
  Creator:String
}
export default project