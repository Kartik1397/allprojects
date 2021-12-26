import {Schema,model} from "mongoose"
import { internaluse } from "../Interfaces/internaluse";


const internalSchema = new Schema<Partial<internaluse>>(
  {
    pageViews:{
      type:Object
    },
    week:{
      type:String
    }

  }
);

module.exports = model("internal-datas", internalSchema);