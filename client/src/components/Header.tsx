import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../App';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

import { blue } from '@mui/material/colors';
import GoogleLogin from 'react-google-login';
import API from '../api/util';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';



export interface SimpleDialogProps {
  open: boolean;
 
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {

  const navigate = useNavigate();
  // const location = useLocation();
  
  const { onClose, open } = props;

  const handleClose = () => {
    // onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  const responseGoogle =async (response:any) => {
    console.log(response);
    
    await API.post("/auth/api/google",{credential:response?.tokenId}).then((res)=>{
      console.log(res);
      window.location.reload();
       toast("You are logged in");
    });

  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>JOIN US</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <GoogleLogin
    clientId="496941184973-m0q8g3uns4uo9lgll6r9mq4jfh703a6j.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}

    cookiePolicy={'single_host_origin'}
  />
          
        </ListItem>
      </List>
    </Dialog>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(props:any) {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [refresh,setRefresh] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    // setSelectedValue(value);
  };
  const {state}:any = React.useContext(AuthContext);
  console.log(state,"state in header");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearchChange = (event: React.MouseEvent<HTMLElement>) =>{
      console.log(event.currentTarget);
  }
  
  React.useEffect(()=>{

  },[open]);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () =>{
    API.delete("/auth/api/v1/logout").then((res)=>{
      console.log("Logout",res);
      window.location.reload(); 
    })
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{state?.user?.uname}</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt="Cindy Baker" src={state?.user?.image} />
          
        </IconButton>
        <p>{state?.user?.uname}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>LogOut</p>
      </MenuItem>
    </Menu>
  );
  const handleChangeSearch = async (event:any) =>{
    await props?.setSearchInput(event.target.value);
    console.log("SEARCH INPUT",props?.searchInput);
    if(props?.searchInput?.length===0){
                
      props?.setSearchResults([]);
   }
  }
  const handleKeyDown =async (event:any) =>{
          if(event.key==='Enter'  || event.keyCode===9){
            console.log(event.target.value);
         
            console.log(event,"key");
            if(props?.searchInput?.length>=3){
              try{
                await API.post("/project/search",{searchText:props?.searchInput}).then((res)=>{
                  console.log(res,"responses");
                  props?.setSearchResults(res?.data?.projects);
                  if(res.status===200){
                    if(res?.data?.projects?.length>=1){
                      toast("Found "+res?.data?.projects?.length+" results for your search");
                    }
                  }
                 })
              }catch(e){
                    toast("something went wrong with server...please try again");
              }
          
           }
           else if(props?.searchInput?.length===0){
                
               props?.setSearchResults([]);
           }
           
          }
          else if(props?.searchInput?.length===0){
                
            props?.setSearchResults([]);
         }
  }

  return (
    <Box sx={{ flexGrow: 1,backgroundColor:' #1C4E80' }}>
      <AppBar position="static" style={{backgroundColor:' #1C4E80'}}>
        <Toolbar>
       
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
           AllProjects
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleChangeSearch}
              placeholder="Search…"
              onKeyDown={handleKeyDown}
              value={props?.searchInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {state.isAuthenticated ? <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
              <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="user" src={state?.user?.image} />
            </IconButton>
          </Box>:(<div> <div>
      <Button variant={"contained"} onClick={handleClickOpen}>
       SignIn
      </Button>
      <SimpleDialog
        // selectedValue={selectedValue}
       
        open={open}
        onClose={handleClose}
      />
    </div></div>)}
          {state.isAuthenticated && <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Avatar alt="user" src={state?.user?.image} />
            </IconButton>
          </Box> }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
