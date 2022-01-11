import {projecturl} from "./projecturl"
import tag from "./tag"
interface project{
  Media:Partial<{video:String,photo:String}>,
  Title:String,
  Desc:String,
  Article:String,
  Tag_ids:Array<tag>,
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