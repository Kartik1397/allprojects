import {Schema,model} from "mongoose"
import project from "../Interfaces/Project"


var random = require('mongoose-simple-random');

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
    Creator:{
      type:String
    },
		Article:{
       type:String,
       required:true
    },
		Tag_ids:{
      type:Array,
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
      default:new Date()
    },
  }
);
ProjectSchema.index({'$**': 'text'});


ProjectSchema.plugin(random);

export default model("projects", ProjectSchema);