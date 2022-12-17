import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';


type PageType = {
    name: string;
    link: string;
}

type SettingType = {
    name: string;
    link: string;
}
const HeaderStyles = {
    background: '#000d12',
    color: '#efefef',
};

function ResponsiveAppBar() {
    const { user, isLoading, loginWithRedirect, logout } = useAuth0();
    const pages: PageType[] = [
        {
            name: 'Projects',
            link: '/projects'
        },
        {
            name: 'Skillset',
            link: '/skills'
        }
    ];
    const settings: SettingType[] = [
        {
            name: 'Profile',
            link: '/edit',
        },
        {
            name: 'Dashboard',
            link: '/',
        },
        {
            name: 'Logout',
            link: '/',
        }
    ];
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

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    if (user) {
        console.log(user);
    }
    return (
        <AppBar position="fixed" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Container sx={{display:'flex',alignItems:'center'}}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                ml: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 600,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            SkillKit
                        </Typography>
                    </Container>
                    {!isLoading && user && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '4vmin'
                        }}
                    >
                        SkillKit
                    </Typography>
                    {!isLoading && user && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block',mx:1}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>}
                    {!isLoading && !user && <Box sx={{ flexGrow: 0 }}>
                        <Button onClick={() => loginWithRedirect()} sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
                    </Box>}
                    {!isLoading && user && <Box sx={{ display: 'flex', flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={user?.picture} />
                            </IconButton>
                        </Tooltip>
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
                            {settings.map((setting) => (
                                setting?.name !== 'Logout' ? <Link style={{textDecoration:'none',color:'#000'}} to={setting.link}><MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem></Link> : <MenuItem key={setting.name} onClick={() => logout()}>
                                    {setting.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;