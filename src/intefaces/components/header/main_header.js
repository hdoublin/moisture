import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, Button, MenuItem, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useGoogleLogout } from 'react-google-login';
import config from '../../../config/config';
import { BrowseMenu } from '..';

export default function MainHeader(props) {

    const { logout, getToken, user, categories, searchText, onSearch } = props;


    const useStyles = makeStyles({
        root: {
            backgroundColor: 'rgb(18, 18, 18) !important',
            height: '70px',
        },
        linkText: {
            textDecoration: 'none',
            color: 'white'
        },
    });

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: 10,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
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
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const navigate = useNavigate();
    const pages = ['Browse', 'Community', 'Write Story'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [items, setItems] = useState([]);
    const [slugItems, setSlugItems] = useState([]);
    const [queryText, setQueryText] = useState('');

    useEffect(() => {
        setQueryText(searchText);
        if (Array.isArray(categories)) {
            let c = [];
            let s = [];
            categories.map(category => {
                c.push(category.name);
                s.push(category.slug);
            });
            setItems(c);
            setSlugItems(s);
        }
    }, [categories]);

    const classes = useStyles();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenPopover = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClosePopover = () => {
        setAnchorElUser(null);
    };

    const inputHandler = (event) => {
        const target = event.target;
        setQueryText(target.value);
    }

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter' && queryText) {
            onSearch(queryText);
        }
    }

    const { signOut, loaded } = useGoogleLogout({
        clientId: config.social.google.clientId,
        cookiePolicy: 'single_host_origin',
        onLogoutSuccess: () => {
            console.log('google logout');
        },
        onFailure: (e) => {
            console.log(e);
        },
    });

    const handleProfile = () => {
        handleClosePopover();
        navigate('/users/' + user?.id);
    }

    const handleEditProfile = () => {
        handleClosePopover();
        navigate('/profile/edit');
    }

    const handleLogout = () => {
        handleClosePopover();
        signOut();
        window?.FB?.logout();
        logout();
        navigate('/');
        window.location.reload();
    }

    return (
        <AppBar position="fixed" className={classes.root}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" className={classes.linkText}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            LOGO
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link to='/mystories' className={classes.linkText}><Typography textAlign="center">{page}</Typography></Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <BrowseMenu title='browse' items={items} slugItems={slugItems} hrefIndex={'/stories/categories/'} />
                        <BrowseMenu title='community' items={config.communities} slugItems={config.communitySlugs} hrefIndex={'/communities/'} />
                        <Link to='/mystories' className={classes.linkText}>
                            <Button
                                onClick={() => handleCloseNavMenu()}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Write story
                            </Button>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={queryText}
                                name='queryText'
                                onKeyPress={onKeyDownHandler}
                                onChange={(event) => inputHandler(event)}
                            />
                        </Search>
                    </Box>

                    {
                        getToken() && <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open Profile">
                                <IconButton onClick={handleOpenPopover} sx={{ p: 0 }}>
                                    <Avatar alt={user?.fullName} src={user?.imageUrl ? user.imageUrl : "/static/images/avatar/2.jpg"} />
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
                                onClose={handleClosePopover}
                            >
                                <MenuItem key={1} onClick={handleProfile}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem key={3} onClick={handleEditProfile}>
                                    <Typography textAlign="center">Edit Profile</Typography>
                                </MenuItem>
                                <MenuItem key={2} onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};