
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
  type Props = {
    data?: Array<{}>
  }
const SearchList =  <PROPS extends Props, >({ data, ...rest }: PROPS): JSX.Element  => {

    console.log(data?.length,"size");
    return (
        <Grid container>
            <Grid item lg={12}>
                <Item><div>Search Results:<b>Found:</b> {data?.length}</div></Item>
               {  data?.map((item:any,idx:any)=>{
                   return <SearchProjectCard key={idx} data={item}/>
               })}
            </Grid>
        </Grid>
    );
}

export default SearchList;