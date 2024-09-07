import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem } from '@mui/material';
import { Menu as MenuIcon, Save as SaveIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Layout.css';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <div className="layout-container">
            <AppBar position="sticky" color="transparent" elevation={0}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="logo"
                        sx={{ p: 0 }}
                        onClick={() => navigate('/')}
                    >
                        <img style={{ width: 60, height: 60 }} src="/aristto-logo-zip-file/png/logo-no-background.png" alt="Logo" />
                    </IconButton>

                    {isMobile && (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {!isMobile && (
                        <IconButton color="inherit" onClick={() => navigate('/saved')}>
                            <SaveIcon />
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>
                                Saved Papers
                            </Typography>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <List>
                    <ListItem button onClick={() => handleNavigation('/')}>
                        <HomeIcon />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            Home
                        </Typography>
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation('/saved')}>
                        <SaveIcon />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            Saved Papers
                        </Typography>
                    </ListItem>
                </List>
            </Drawer>

            <main>
                {children}
            </main>

            <footer className="footer">
                <Typography variant="body2" color="white" align="center">
                    © {new Date().getFullYear()} Sudeep Ranjan Sahoo. Assignment for Aristto.
                </Typography>
            </footer>
        </div>
    );
};

export default Layout;
