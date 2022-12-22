import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import StorageService from "../../services/Storage.service";

const useStyles=makeStyles({
  root: {
    "& .MuiPaper-root": {width :"100% !important", left: "0px", color:"#fff", backgroundColor:"#0f1941"},
    
  }

})
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const location = useLocation();
  
  const classses=useStyles();
  let employerName = StorageService.getCookies("employerName");
  const pages = [
    { page: "Home", url: "/"+employerName+"/" },
    { page: "FAQ", url: "/"+employerName+"/faq" },
    { page: "Contact", url: "/"+employerName+"/contact-us" },
  ];

  return (
    <AppBar position="sticky" className="navbar-qle">
      <Toolbar disableGutters style={{ padding: "0px 25px" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          onClick={() => navigate("/")}
          style={{cursor: "pointer"}}
        >
          {/* <img src={'./'  + 'assets/img/logo.svg'} height="25" /> */}
          <img src={process.env.REACT_APP_RELATIVE_PATH   + '/assets/img/logo.svg'} height="25" />
        </Typography>
        {console.log(location)}
        
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
        >
         {/* <img src={'./'  + 'assets/img/logo.svg'} height="25" /> */}
         <img src={ process.env.REACT_APP_RELATIVE_PATH  + '/assets/img/logo.svg'} height="25" />
        
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none", justifyContent: "end" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
           
          >
            <MenuIcon />
          </IconButton>
          <Menu
           className={classses.root}
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page, index) => (
              <MenuItem key={index} onClick={() => navigate(page.url)}>
                <Typography  textAlign="center">{page.page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "end",
          }}
        >
          {pages.map((page, index) => (
            <Button
              key={index}
              onClick={() => navigate(page.url)}
              sx={{ my: 2, color: "rgba(255,255,255,.5)", display: "block", fontWeight:"400"}}
              className={location.pathname == page.url ? "active" : "p-15" }
            >
              {page.page}
            </Button>
          ))}
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
};
export default Header;
