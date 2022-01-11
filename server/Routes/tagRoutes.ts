import express from 'express';
import User from "../models/User";
import Project from "../models/Project";
import Tag from "../models/tag";
import Auth from '../MiddleWare/Auth-MiddleWare';
const router: express.Router = express.Router();

// /**
//  * Get all tags used by user for specific project
//  */
// router.post('/tagsbyproject', async (req: express.Request, res: express.Response) => {
//   try {
//     const { userId, projectId } = req.body;
//     const userWithSpecificProject = await User.findOne({ _id: userId, project_Ids: { $all: [projectId] } });
//     !userWithSpecificProject && res.status(404).json({ msg: "could not find any projects with this user" });
//     const tagIdsFromProject = await Project.findOne({ _id: projectId });
//     res.status(200).json({ msg: "success", tags: tagIdsFromProject?.Tag_ids });
//   } catch (e) {
//     res.status(400).json({ error: e });
//   }
// })
// /**
//  * Add Custom Tag for Project
//  * dev: Check for SESSION
//  */
// router.post('/addtagforproject', Auth, async (req: express.Request, res: express.Response) => {
//   console.log(req.session.user);
//   //requirement :ProjectId,tagName ,Color and Session of User 
//   const { projectId, tagName, color } = req?.body;

//   //find if tagName already exists
//   const tag = await Tag.findOne({ tagName: tagName.toLowerCase() });
//   if (tag !== null) {
//     const tagWithProject = Tag.findOne({ tagName: tagName.toLowerCase(), projects: [projectId] });
//     if (tagWithProject !== null) {
//       res.status(200).json({ message: "already Exists", status: 1 });
//     } else {
//       let projectsForTag = tag.Projects;
//       await projectsForTag?.push();
//       const updatedTag = Tag.findOneAndUpdate({ tagName: tagName.toLowerCase(), Projects: projectsForTag });
//       res.status(200).json({ tag: updatedTag, message: "updated" });
//     }
//   } else {
//     try {
//       const newTag = new Tag({
//         tagName: tagName.toLowerCase(),
//         color: color,
//         Projects: [projectId]
//       });
//       await Tag.create(newTag);
//       res.status(200).json({ tag: newTag, message: "success" });
//     } catch (e) {
//       res.status(400).json({ error: "something went wrong !! try again" });
//     }
//   }
// })

//Get all tags
router.get('/all', async (req: express.Request, res: express.Response) => {
  //get All tags available 
  try {
    //Mongodb Projection :Return only specific fields
    const allTags = await Tag.find({}, { projection: { _id: 1, tagName: 1, color: 1 } });
    res.status(200).json({ msg: "success", allTags: allTags });
  } catch (e) {
    res.status(400).json({ error: e })
  }
})

//Mongo DB aggregation :Get Insight from Tag (Count of Projects)
router.get('/tagwithprojectcounts', async (req: express.Request, res: express.Response) => {
  try {
    //Use for Analytics
    await Tag.aggregate([
      {
        $project: {
          item: 1,
          projectCounts: { $cond: { if: { $isArray: "$Projects" }, then: { $size: "$Projects" }, else: "NA" } }
        }
      }
    ]);
    const tags = await Tag.find({}, { projection: { Projects: 0 } });
    res.status(200).json({ msg: "successfully aggregated with counts", tags: tags });
  } catch (e) {
    res.status(400).json({ error: e })
  }
})

export default router;