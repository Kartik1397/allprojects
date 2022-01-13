import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/util';
import Header from "../../components/Header";
import ProjectCard from '../../components/Project';

const ProjectLink: FC = () => {
    const { id } = useParams();
    const [project, setProject] = useState({});
    console.log(id);
    useEffect(() => {
        const fetchData = async () => {
            await API.post("/project/id", { id: id }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setProject(res?.data);
                }
            })
        }
        fetchData()
    }, [])
    return (
        <>
            {id &&
                <>
                    <Header />
                    {project && <Grid container spacing={2}>
                        <Grid lg={3}>

                        </Grid>
                        <Grid lg={9} style={{ marginTop: "1rem" }} >
                            <ProjectCard data={project} />
                        </Grid>
                    </Grid>
                    }
                </>}
        </>
    );
}

export default ProjectLink;