import express from 'express';
import User from "../models/User";
import Project from "../models/Project";
import Auth from '../MiddleWare/Auth-MiddleWare';
// import Tag from "../models/tag";
// import Auth from '../MiddleWare/Auth-MiddleWare';
const router: express.Router = express.Router();

/**
 * Get all tags used by user for specific project
 */
router.post('/add', Auth,async (req: express.Request, res: express.Response) => {
  try {
    console.debug("adding new Project");
    console.log("project body",req.body);
    const prepare = await new Project(req.body);
    const project = await Project.create(prepare);
    console.log("res",prepare,project);
    await User.findOneAndUpdate({_id:req.body.Creator},{ $push: {project_Ids : project.id} });
    res.json({msg:"Yeah Your Post has been Processed Successfully Now you can add Tags for your Project and can add Members too"});
  } catch (e) {
    res.status(400).json({ error: e ,msg:e});
  }
})
router.get('/all',async (req: express.Request, res: express.Response) => {
    const projects = await Project.find({});
    res.status(200).send(JSON.stringify(projects));
})

router.post('/search',async (req: express.Request, res: express.Response) => {
     
     try{
           const { searchText } = req.body;
           const Projects =await Project.find({$text: {$search:searchText}})
       .skip(0)
       .limit(10);
           res.status(200).json({msg:"Successfully browsed posts",projects:Projects});
     }
     catch(e){
       res.status(400).json({msg:"No Posts matching your search query"});
     }
})

router.post('/posts',async (req: express.Request, res: express.Response) => {
  try{
    const projects = await Project.find({}).limit(50);
    console.log(projects);
    res.status(200);
    res.status(200).send(JSON.stringify(projects));
  }catch(e){
    res.status(400);
    res.json({msg:"something went wrong",error:e});
  }
})

router.post('/posts/me',Auth,async (req: express.Request, res: express.Response) => {
  try{
    const projects = await Project.find({Members: {$in: [req.user._id]}}).limit(50);
    console.log(projects);
    res.status(200);
    res.status(200).send(JSON.stringify(projects));
  }catch(e){
    res.status(400);
    res.json({msg:"something went wrong",error:e});
  }
})

router.post('/id',async (req: express.Request, res: express.Response) => {
      try{
            console.log(req.body.id);
            
            const project = await Project.findOne({_id:req.body.id});
           
            res.status(200).send(JSON.stringify(project));
      }catch(e){
        res.status(400);
        res.json({msg:"something went wrong",error:e});
      }
  
})

export default router;