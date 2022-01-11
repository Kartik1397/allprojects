import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/util';
import Header from "../../components/Header";

const ProjectLink:FC = () => {
    const {id} = useParams();
    console.log(id);
    useEffect(()=>{
           const fetchData = async  () => {
              await API.post("/project/id",{id:id}).then((res)=>{
                  console.log(res);
              })

           }
           fetchData()
    },[])
    return (
        <>
        {id && 
        <>
          <Header />
             <div>{id}</div>
        
        </>}
           
        </>
        
    );
}

export default ProjectLink;