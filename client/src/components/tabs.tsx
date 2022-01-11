import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProjectList from './ProjectList';
import Profile from './Profile';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import API from '../api/util';
import { AuthContext } from '../App';

import JoditEditor from "jodit-react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchList from './SearchProjectCardList';


//for tags


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props:any) {
  console.log(props?.searchResults,"props tab");
  const [value, setValue] = React.useState(0);
  const {state}:any = React.useContext(AuthContext);

  const [project,setProject] = React.useState({
    Title:'',
    Desc:'',
    Creator:state?.user?._id,
   github:"",
   other:"",
    Article:"",
    Members:[]
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleNewProject = async (event: React.SyntheticEvent) =>{
    console.log("new project Request");
    setOpen(true);
  }

  const [open, setOpen] = React.useState(false);

  const editor = React.useRef(null);
  const [content, setContent] = React.useState("Start writing");
  const config = {
    readonly: false,
    height: 400
  };
  const handleUpdate = (event:any) => {
    const editorContent = event.target.innerHTML;
    console.log(editorContent);
    setContent(editorContent);
  };

  const handleClose = () => {
    setOpen(false);
    setProject({  
      Title:'',
    Desc:'',
    Creator:state?.user?._id,
    github:"",
    other:"",
    Article:"",Members:[]});
  };
  const [projects,setProjects] = React.useState([]);
  console.log(projects);
  React.useEffect(()=>{
    const fetchData = async   () =>{
         
         await  API.post("/project/posts").then((res)=>{
             console.log(res);
             if(res.status===200){
              console.log("success",res?.data);
              setProjects(res?.data);
              toast.success('Hey we got awesome collection of projects for you');
              
             }
             else{
              toast.info('Hey please login to see all the projects');
             }
          }).catch((e)=>{
            toast.info('Hey please login to see all the projects');
          })
    }
    fetchData();
  },[])
  const handleChangeForm = (event:any) =>{
    // console.log(editorState,"editor state");
    console.log(content.toString());
    console.log("changes");
    console.log(event.target.value);
    console.log("project",project);
    setProject({...project,[event.target.name]:event.target.value});
  }
  const handleSubmitProject = async (e: React.SyntheticEvent) =>{
        await  e.preventDefault();
          //handle Validations here in the future
        
          toast.info('Hey your post is being processed in the background');
          setOpen(false);
          if(project?.Title.length<3 || project?.Desc.length<10){
                    toast.info("Please use atleast 3 characters to  create the project Title...Project Desc requires atleast 10 characters")
                   
          }
          else{
            await API.post("/project/add",{
              Title:project?.Title,
              Desc:project?.Desc,
              Article:project?.Article,
              Urls:{
                github:project?.github,
                other:project?.other
              },
              Creator:state?.user?._id,
              Members:[state?.user?._id]
           }).then((res)=>{
           console.log(res);
           // toast(res.data.msg);
           toast.info(res.data.msg);
           })
          }
       
      

       
  }

  //for Tags 

  return (
    <Box sx={{ width: '100%' ,backgroundColor:'#F1F1F1',minHeight:"100vh"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Projects" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
          <Tab label="Analysis" {...a11yProps(2)} />
        </Tabs>
      </Box>
        <ToastContainer
        position="top-right"
        theme='dark'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      
      <TabPanel value={value} index={0}>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          {props && props?.searchResults &&  <SearchList data={props?.searchResults}/>}
        </Grid>
        {state.isAuthenticated && <Grid item lg={9}>
        <Box sx={{ borderBottom: 1}}>
      <Button variant="contained" style={{backgroundColor:"#1C4E80",color:"white"}} onClick={handleNewProject}>
              Add Project
         </Button> 
         <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Project Content</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Experience the platform to make your projects shared to the globe !!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Title"
            label="Project Title"
            type="text"
            name="Title"
            fullWidth
            variant="standard"
            value={project.Title}
            onChange={handleChangeForm}
            required
          />
           <TextField
            autoFocus
            margin="dense"
            id="Desc"
            label="Article"
            type="text"
            name="Article"
            fullWidth
            variant="standard"
            value={project.Article}
            onChange={handleChangeForm}
            required
           
          />
           <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
        onChange={(newContent) => {

          console.log(newContent,"content");
        }}
      />
           <TextField
            autoFocus
            margin="dense"
            id="Desc"
            label="Project Desc"
            type="text"
            name="Desc"
            fullWidth
            variant="standard"
            value={project.Desc}
            onChange={handleChangeForm}
            required
           
          />
           
          <div>Urls</div>
          <TextField
            autoFocus
            margin="dense"
            id="github"
            label="Github Source"
            type="text"
            name="github"
            fullWidth
            variant="standard"
            value={project.github}
            onChange={handleChangeForm}
            
           
          />
           <TextField
            autoFocus
            margin="dense"
            id="other-source"
            label="Other Source"
            type="text"
            name="other"
            fullWidth
            variant="standard"
            value={project.other}
            onChange={handleChangeForm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitProject} type='submit'>Done</Button>
        </DialogActions>
      </Dialog>
      {
        projects &&      <ProjectList projects={projects}/>
      }
 
        </Box>
    
        </Grid>}
       
      </Grid>

      {!state.isAuthenticated &&
            <Grid item lg={9}>
              <h1>Welcome to Allprojects</h1>
              <div>Signin and connect with us to explore projects and create the projects and make it shareable across the globe </div>
            </Grid>
    }
        
     
      
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Profile/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        ALl the Site Analytics goes here
      </TabPanel>
    </Box>
  );
}