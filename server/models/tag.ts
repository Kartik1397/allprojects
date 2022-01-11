import {Schema,model} from "mongoose"
import tag from "../Interfaces/tag";

const TagSchema = new Schema<Partial<tag>>(
  {
    tagName:{
      type:String
    },
    color:{
      type:String
    },
  }
);

export default model("tags", TagSchema);