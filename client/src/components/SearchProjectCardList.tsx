import { FC } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SearchProjectCard from "./SearchProjectCard";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
const SearchList:FC = () => {


    return (
        <Grid container>
            <Grid item lg={12} style={{borderRight:"1px solid orange"}}>
                <Item><div>Results</div></Item>
               <SearchProjectCard/>
            </Grid>
        </Grid>
    );
}

export default SearchList;