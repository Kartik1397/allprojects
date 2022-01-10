import { FC } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProjectCard from "./Project";
import API from "../api/util";
import { toast } from "react-toastify";
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
const ProjectList = (data:any) => {


    return (
        <Grid container spacing={2}>
        <Grid item xs={2}>
         
        </Grid>
        <Grid item xs={8}>
         {data && data?.projects && data?.projects.map((item: any,idx: any) =>{
             return <ProjectCard data={item}/>  
         }

         )}
     
          
        </Grid>
        <Grid item xs={2}>
          
        </Grid>
        
      </Grid>
    );
}

export default ProjectList;