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
import CheckAdmin from "./CheckAdmin";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DropdownNav from "../../components/DropdownNav"

const drawerWidth = 240;

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const isAdmin = CheckAdmin();
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    React.useEffect(() => {
      const localTheme = localStorage.getItem("theme");
      if (localTheme === "dark") {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItemsStudent = [
    { text: "Overview", path: "/dashboard" },
    { text: "My Profile", path: "/dashboard/profile" },
    { text: "Requested Meals", path: "/dashboard/requested-meals" },
    { text: "My Reviews", path: "/dashboard/my-reviews" },
    { text: "Payment History", path: "/dashboard/payment-history" },
    { text: "← Home", path: "/" },
  ];
  const drawerItemsAdmin = [
    { text: "Overview", path: "/dashboard" },
    { text: "Admin Profile", path: "/dashboard/profile" },
    { text: "Manage Users", path: "/dashboard/manage-users" },
    { text: "Add Meal", path: "/dashboard/add-meal" },
    { text: "All Meals", path: "/dashboard/all-meals" },
    { text: "All Reviews", path: "/dashboard/all-reviews" },
    { text: "Serve Meals", path: "/dashboard/serve-meals" },
    { text: "Upcoming Meals", path: "/dashboard/upcoming-meals" },
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
          backgroundColor: !isDarkMode && "#f5f5f5",
        }}
      >
        <Link to={"/"} className="flex items-center justify-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              maxWidth: "100%",
              maxHeight: "40px",
              objectFit: "contain",
              borderRadius: "4px"
            }}
          />
          <h1 className="text-primary text-2xl dark:text-secondary">HostelMate</h1>
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
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: !isDarkMode && "#ddeaf6",
            color: !isDarkMode && "#235784",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar className="justify-between">
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
            <div>
              <DropdownNav/>
            </div>
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
          className="md:p-3"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
