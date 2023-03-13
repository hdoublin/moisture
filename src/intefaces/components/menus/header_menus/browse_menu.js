import { useState } from 'react';
import { Typography, Button, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';


export default function BrowseMenu(props) {

    const {title, items, slugItems, hrefIndex} = props;

    const [anchorElUser, setAnchorElUser] = useState(null);
    const open = Boolean(anchorElUser);

    const useStyles = makeStyles({
        linkText: {
            textDecoration: 'none',
            color: 'black'
        },
    });

    const classes = useStyles();


    const handleOpenPopover = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorElUser(null);
    };



    return (
        <>
            <Button
                aria-describedby={title}
                onClick={handleOpenPopover}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {title}
            </Button>
            <Popover
                id={title}
                open={open}
                anchorEl={anchorElUser}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {items?.map((item, index) => (
                    <Link to={hrefIndex + slugItems[index]} className={classes.linkText} key={slugItems[index]}>
                        <Typography sx={{ paddingX: 2, paddingY: 0.5 }} onClick={handleClosePopover}>{item}</Typography>
                    </Link>
                ))}


            </Popover>
        </>
    );
};