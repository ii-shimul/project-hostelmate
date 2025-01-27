import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet, useLocation } from "react-router-dom";
import checkAdmin from "./checkAdmin";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const isAdmin = checkAdmin();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItemsStudent = [
    { text: "My Profile", path: "/dashboard" },
    { text: "Requested Meals", path: "/dashboard/requested-meals" },
    { text: "My Reviews", path: "/dashboard/my-reviews" },
    { text: "Payment History", path: "/dashboard/payment-history" },
    { text: "← Home", path: "/" },
  ];
  const drawerItemsAdmin = [
    { text: "Admin Profile", path: "/dashboard" },
    { text: "Manage Users", path: "/dashboard/requested-meals" },
    { text: "Add Meal", path: "/dashboard/my-reviews" },
    { text: "Payment History", path: "/dashboard/payment-history" },
    { text: "← Home", path: "/" },
  ];

const drawer = (
  <div>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Link to={"/"} className="flex items-center justify-center gap-2">
        <img
          src="/logo.png"
          alt="Logo"
          style={{ maxWidth: "100%", maxHeight: "40px", objectFit: "contain" }}
        />
        <h1 className="text-primary text-2xl">HostelMate</h1>
      </Link>
    </Toolbar>
    <Divider />
    <List>
      {isAdmin
        ? drawerItemsAdmin.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))
        : drawerItemsStudent.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
    </List>
  </div>
);


  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ddeaf6",
          color: "#235784",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* Render Route Content Here */}
        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
