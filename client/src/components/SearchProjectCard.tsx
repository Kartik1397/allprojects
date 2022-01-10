import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const card = (
  <React.Fragment>
    <CardContent>
      {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography> */}
      <Typography variant="h5" component="div">
        Project Title goes here...
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Tag List Goes here
      </Typography>
      <Typography variant="body2">
        13/01/2022
    
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Link</Button>
    </CardActions>
  </React.Fragment>
);

export default function SearchProjectCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}