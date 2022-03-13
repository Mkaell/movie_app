import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/second_icon.png'
import './header.scss';

import MenuIcon from '@mui/icons-material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
const settings = ['Profile', 'Logout'];
const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    },
];

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}



const Header = (props: any) => {

    const navigate = useNavigate()
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth)
    console.log(user);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e: any) => {

        if (e.target.value === 'Logout') {
            (async () => {

                await signOut(auth)

                navigate('/login')
            })()

        } else {
            navigate('/profile')
        }
        setAnchorElUser(null);
    };


    return (

        <ElevationScroll {...props}>
            <AppBar >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <MovieFilterOutlinedIcon fontSize='large' color='primary' />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color='primary'
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {
                                    headerNav.map((e, i) => (
                                        <MenuItem key={i} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" >
                                                <Link to={e.path}>
                                                    {e.display}
                                                </Link>
                                            </Typography>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <MovieFilterOutlinedIcon fontSize='large' color='primary' />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {headerNav.map((page, i) => (
                                <Button
                                    key={i}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link to={page.path}>
                                        {page.display}
                                    </Link>
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {
                                user ?
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src={`${img}`} />
                                        </IconButton>
                                    </Tooltip> :
                                    <Box textAlign="center" sx={{ display: 'flex' }}>
                                        <Button
                                            variant="outlined"
                                            sx={{ my: 2, display: 'block' }}
                                        >
                                            <Link to='/registration'>
                                                Sign up
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="contained"

                                            sx={{ my: 2, display: 'block' }}
                                        >
                                            <Link to='/login'>
                                                Log in
                                            </Link>
                                        </Button>

                                    </Box>
                            }

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, i) => (
                                    <MenuItem key={setting}>
                                        <Button
                                            key={i}
                                            onClick={handleCloseUserMenu}
                                            value={setting}
                                        >
                                            {setting}
                                        </Button>
                                    </MenuItem>
                                ))
                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </ AppBar>
        </ElevationScroll >



    );
}

export default Header