import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import { deepOrange } from '@mui/material/colors'
// import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProjectList from './ProjectList';
import { AuthContext } from '../App';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Profile() {
  const {state}:any = React.useContext(AuthContext);
    const [value, setValue] = React.useState('one');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} paddingLeft={'3rem'}>
        <Grid container item xs={12} md={12}>
           <Grid item xs={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
           <Item>
           <CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={state?.user?.image}>
           
          </Avatar>
  }
  title={state?.user?.uname}
/>
           </Item>
           </Grid>
           {/* <Grid item xs={8}>
           <Item>lower</Item>
           </Grid> */}
        </Grid>
        <Grid item xs={12}>
          <Item>
          <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Projects"/>
        <Tab value="two" label="Connections" />
        <Tab value="three" label="Analytics" />
        <Tab value="fourth" label="EDIT" />
      </Tabs>
    </Box>

          </Item>
        </Grid>
      
      </Grid>
    </Box>
  );
}