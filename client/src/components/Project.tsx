import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import { reducer, SearchResultContext } from '../pages/Home';
import API from '../api/util';
import { toast, ToastContainer } from 'react-toastify';
import "./card.css";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProjectCard({ data }: any) {
  const [expanded, setExpanded] = React.useState(false);
  const {dispatch}:any = React.useContext(SearchResultContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    Article,
    Created_at,
    _id,
    Desc,
    Title,
    Tags
  } = data;
  const tagClick = async (search:String) =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
    try{
      await API.post("/project/search", { searchText:search }).then((res) => {
        console.log(res,"in tag");
        dispatch({type: 'UPDATE', payload: res?.data?.projects})
        if (res.status === 200) {
            if (res?.data?.projects?.length >= 1) {
              
            }
        }

      })
    }catch(e){
      console.log(e);
    }
}

  return (
    <Card sx={{  minWidth: 250, margin:"1rem 1rem" ,fontSize: '1.25rem' }}>
      <Link to={"/project/" + _id}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }

          title={Title}
          subheader={new Date(Created_at).toString()}
        />
      </Link>
      <CardMedia
        component="img"
        height="200"
        image={"https://source.unsplash.com/random/900×700/?"+(Tags && (Tags.length>=1?Tags[Math.floor((Math.random() * (Tags.length-1)) + 1)]  :"computer"))}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {Tags && Tags?.map((item:any)=>{
            return <Button onClick={()=>{tagClick(item)}} color="secondary">{`#`+item}</Button>
          })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Describe:</Typography>
          <Typography paragraph>
            {<div dangerouslySetInnerHTML={{ __html: Article }}></div>}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}