import { useState, useEffect } from "react";
import ProjectCard from "./Project";
import API from "../api/util";
import { toast } from "react-toastify";
import style from './ProjectList.module.css';

const ProjectList = ({isProfilePage}: any) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = isProfilePage ? "/project/posts/me" : "/project/posts";
      await API.post(endpoint).then((res) => {
        if (res.status === 200) {
          setProjects(res?.data);
        }
      }).catch(() => {
        toast.info('Hey please login to see all the projects');
      })
    }
    fetchData();
  }, [])

  return (
    <div className={style.ProjectList}>
        {
          projects.map((item: any) => {
            return <ProjectCard data={item} />
          })
        }
    </div>
  );
}

export default ProjectList;