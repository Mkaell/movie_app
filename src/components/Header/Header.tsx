import React, { useContext } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";

import MenuIcon from '@mui/icons-material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';

import img from '../../assets/second_icon.png'
import './header.scss';
import { UserContext } from '../../App';

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
    const { pathname } = useLocation();

    const auth = useContext(UserContext);
    const [user] = useAuthState(auth)

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

    const handleButtonUserMenu = (e: any) => {

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

    const handleCloseUserMenu = () => {
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
                                            <Typography className='header-link' textAlign="center" >
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
                                    pathname === '/registration' ?
                                        <Box textAlign="center" sx={{ display: 'flex' }}>
                                            <Button
                                                variant="contained"
                                                sx={{ my: 2, display: 'block', padding: '0', width: '7rem', height: '2rem' }}
                                            >
                                                <Link to='/registration' style={{ width: '100%' }}>
                                                    Sign up
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                sx={{ my: 2, display: 'block', padding: '0', width: '7rem', height: '2rem' }}
                                            >
                                                <Link to='/login' style={{ width: '100%' }}>
                                                    Log in
                                                </Link>
                                            </Button>
                                        </Box>
                                        :
                                        <Box textAlign="center" sx={{ display: 'flex' }}>
                                            <Button
                                                variant="outlined"
                                                sx={{ my: 2, display: 'block', backgroundColor: 'rgba(255, 152, 0, 0.1)', padding: '0', width: '7rem', height: '2rem' }}
                                            >
                                                <Link to='/registration' style={{ width: '100%' }}>
                                                    Sign up
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{ my: 2, display: 'block', padding: '0', width: '7rem', height: '2rem' }}
                                            >
                                                <Link to='/login' style={{ width: '100%' }}>
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
                                            onClick={handleButtonUserMenu}
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