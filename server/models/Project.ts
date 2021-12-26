import {Schema,model} from "mongoose"
import {project} from "../Interfaces/Project"

const ProjectSchema = new Schema<Partial<project>>(
  {
    Media:{
      type:Object,
      required:false
    },
		Title:{
       type:String,
       required:true
    },
		Desc:{
       type:String,
       required:true
    },
		Article:{
       type:String,
       required:true
    },
		Tag_ids:{
      type:Array
    },
		Members:{
      type:Array
    },
		Urls: {
		    type:Object
    },
		Likes:{
      type:Array
    },
		StartDate:{
      type:Date
    },
		EndDate:{
      type:Date
    },
    present:{
      type:Boolean
    },
		Created_at:{
      type:Date,
      required:false
    }
  }
);

module.exports = model("projects", ProjectSchema);