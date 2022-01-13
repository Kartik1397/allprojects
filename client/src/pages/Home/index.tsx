import { Button, DialogTitle, Dialog, DialogContentText, DialogContent, TextField, DialogActions, Grid } from '@mui/material';
import { FC, useRef, useState, useContext, createContext, useReducer } from 'react';
import Header from "../../components/Header";
import ProjectList from '../../components/ProjectList';
import JoditEditor from 'jodit-react';
import API from '../../api/util';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatableSelect from 'react-select/creatable';
import { AuthContext } from '../../App';
import SearchResult from '../../components/SearchResult';
import SearchList from '../../components/SearchProjectCardList';

const tags = [
    {
        "label": "cpp",
        "value": "cpp",
        "color": "teal"
    },
    {
        "label": "c++",
        "value": "c++",
        "color": "#ff99ff"
    },
    {
        "label": "Java",
        "value": "Java",
        "color": "#595959"
    },
    {

        "label": "MERN-STACK",
        "value": "MERN-STACK",
        "color": "#ff9933"
    },
    {

        "label": "Node js",
        "value": "Node js",
        "color": "#ff9933"
    },
    {
        "label": "Typescript/TS",
        "value": "Typescript/TS",
        "color": "#666699"
    },
    {
        "label": "Electronics/Electrical",
        "value": "Electronics/Electrical",
        "color": "#00b36b"
    },
    {
        "label": "Mechanical",
        "value": "Mechanical",
        "color": "#333300"

    },
    {
        "label": "Mechanical",
        "value": "Mechanical",
        "color": "#333300"
    },
    {
        "label": "SpringBoot-API-JPA",

        "value": "SpringBoot-API-JPA",
        "color": "#002db3"
    },
    {
        "label": "Github",
        "value": "Github",
        "color": "#666699"
    },
    {
        "label": "IT-industry",
        "value": "IT-industry",
        "color": "#0d3300"
    },
    {
        "label": "Mongodb",
        "value": "Mongodb",
        "color": "teal"
    },
    {
        "label": "Mongodb-hackathon",
        "value": "Mongodb-hackathon",
        "color": "#3399ff"
    },
    {
        "label": "Javascript",
        "value": "Javascript",
        "color": "#333300"
    },
    {

        "label": "Mongodb-atlas",
        "value": "Mongodb-atlas",
        "color": "#666699"
    }
];

export const SearchResultContext = createContext({});

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "UPDATE":
            return [...action.payload];
        default:
            return [];
    }
};


const Home: FC = () => {
    const [searchResults, dispatch] = useReducer(reducer, []);
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const { state }: any = useContext(AuthContext);
    const [selectedTags, setSelectedTags] = useState([]);
    const config = {
        readonly: false,
        height: 400,
        uploader: {
            insertImageAsBase64URI: true
        },
    };

    const editor = useRef(null);
    const [content, setContent] = useState("Start writing");

    const handleSubmit = async () => {
        const project = {
            Title: (document.querySelector('#Title') as HTMLInputElement).value,
            Desc: (document.querySelector('#Desc') as HTMLInputElement).value,
            // Creator: state?.user?._id,
            github: (document.querySelector('#github') as HTMLInputElement).value,
            other: (document.querySelector('#other-source') as HTMLInputElement).value,
            Article: content,
            Tags: selectedTags.map((tag: any) => tag?.value),
            Members: []
        };
        if(project?.Title.length<=3 || project.Article.length<=4){
            toast.info("We suggest :Atleast add 4 charaters in title and article");
        }else{
            toast.info("your post is being processed in background");
        await API.post("/project/add", {
            Title: project?.Title,
            Desc: project?.Desc,
            Article: content,
            Urls: {
                github: project?.github,
                other: project?.other
            },
            Tags: project?.Tags,
            Creator: state?.user?._id,
            Members: [state?.user?._id]
        }).then((res: any) => {
            if(res.status===200){
                toast.info(res.data.msg);
                toast.info("your post has been created successfully");
            }
           
        })
     }
        setShowNewProjectModal(false);
    }

    return (
        <>
            <SearchResultContext.Provider value={{ searchResults, dispatch }}>
                <Header />
                <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
                {state.isAuthenticated && <div style={{maxWidth: "60ch", fontSize: "1.25rem", margin: "10px auto", padding: "0 20px"}}>
                <Button variant="contained" style={{ backgroundColor: "#1C4E80", color: "white" }} onClick={() => setShowNewProjectModal(true)}>
                    Add Project
                </Button>
                </div>
                }
                {
                    showNewProjectModal && (
                        <Dialog open={showNewProjectModal} onClose={() => setShowNewProjectModal(false)}>
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
                                    // onChange={handleChangeForm('Title')}
                                    required
                                />
                                {"Tags"}
                                <CreatableSelect
                                    isMulti
                                    onChange={(newValue: any) => setSelectedTags(newValue)}
                                    options={tags}
                                />
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    onBlur={(newContent) => setContent(newContent)}
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
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setShowNewProjectModal(false)}>Cancel</Button>
                                <Button onClick={handleSubmit} type='submit'>Done</Button>
                            </DialogActions>
                        </Dialog>
                    )
                }
                <SearchResult />
              
                 
                <ProjectList />
         
               
            </SearchResultContext.Provider>
        </>
    );
}

export default Home;
