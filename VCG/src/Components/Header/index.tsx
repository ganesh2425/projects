import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import StorageService from "../../services/Storage.service";
import { useNavigate } from "react-router-dom";
import './style.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileDetails } from "../../reducers/userProfileReducer/getUserProfileReducer";
import { fetchGetUserProfileRequest } from "../../actions/userProfile/getUserProfileActions";
import { getUploadImageDetails } from "../../reducers/userProfileReducer/getUploadImageReducer";
import { fetchGetUploadImageRequest } from "../../actions/userProfile/getUploadImageActions";
import { getLogoutDetails } from "../../reducers/usersReducer/logOutReducer";
import { fetchLogoutRequest } from "../../actions/usersActions/logOutActions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = (props:any) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleHeader = () => {
    props.handleHeaders();
  };
 
  const handleChange = ()=> {
    navigate("/user-profile")
  }
  useEffect(() => {
    getUploadImage()
  },[]);
  
  const getUploadImage = () => {
    dispatch(fetchGetUploadImageRequest({}))
  }
  const dispatch = useDispatch();

  const logout = (): void => {
    dispatch(
      fetchLogoutRequest({})
    );
    StorageService.clearCookies();
    StorageService.setCookies("accessToken", "");
    navigate("/login");
  };

  let logOutRes:any = useSelector(getLogoutDetails)
  useEffect(() => {
    console.log(logOutRes && "isSuccess or NOT");
    console.log(logOutRes && logOutRes.isSuccess)
    // if (logOutRes && logOutRes.isSuccess == true) {
    //   StorageService.clearCookies();
    //   StorageService.setCookies("accessToken", "");
    //   logOutRes.isSuccess = false;
    //   logOutRes = null;
    //   navigate("/login");
    //   //document.location.reload();
    // }
  },[logOutRes]);

  const getUploadImageRes:any = useSelector(getUploadImageDetails)
  var res = getUploadImageRes.data

  const [image,setImage] = useState("")

useEffect(() => {
  if (res) {
    const file = new Blob([res], { type:'image/png' })
    var fileURL = URL.createObjectURL(file);
    setImage(fileURL);
    getUploadImageRes.data=null
  }
},[res]);

  const getUserProfileRes:any = useSelector(getUserProfileDetails)
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    dispatch(
      fetchGetUserProfileRequest({})
    );
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
     className="profile-alignment"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      
    >
      <MenuItem onClick={handleChange}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
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
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box  sx={{ flexGrow: 1 }}>
      <AppBar position="static"className="header-styling">
        <Toolbar className="header-hight">
          <IconButton
            className="menu-stying"
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => handleHeader()}
          >
            <MenuIcon className="menu-icon-styling" />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img className="img-styling" alt="Remy Sharp" src={image} height="40" />
              </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Typography className="user-profile">
                {getUserProfileRes.firstName}
              </Typography>
            </IconButton>
            <IconButton
              
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
             style={{color:"white"}}
            >
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
            
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

         
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
