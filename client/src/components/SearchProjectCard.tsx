import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

type Props = {
  data?: any
}
const SearchProjectCard = <PROPS extends Partial<Props>,>({ data, ...rest }: PROPS): JSX.Element => {
  console.log("inside pcard", data);

  return (
    <Box sx={{ minWidth: 275, marginTop: "1rem", borderRadius: "14px" }}>
      <Card variant="outlined"><React.Fragment>
        <CardContent>
          <Typography variant="h4" component="div" style={{ color: "#1C4E80" }}>
            {data?.Title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data?.Tags.join(', ')}
          </Typography>
          <Typography variant="body2">
            {new Date(data?.Created_at).toString()}

          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/project/" + data?._id}>visit the project</Link>
        </CardActions>
      </React.Fragment></Card>
    </Box>)

}
export default SearchProjectCard;