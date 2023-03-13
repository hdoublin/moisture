import { useState, useRef } from 'react';
import {
    Card, Typography, Button, MenuItem, MenuList, Grow, Paper, Popper, Box, ButtonGroup, ClickAwayListener, Grid
} from '@mui/material';
import { Add, RemoveRedEye, Star, Comment, ArrowDropDown } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Helper from '../../../../utils/helpers';

export default function StoryPartItem(props) {
    const { storyPart, deleteHandler, viewHandler } = props;

    const useStyles = makeStyles({
        linkText: {
            textDecoration: 'none',
            color: 'black'
        },
    });

    const classes = useStyles();

    const bookSrc = require('../../../../assets/images/story-cover.jpeg');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(2);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Card sx={{ marginTop: 1, paddingTop: 1, paddingBottom: 1, }}>
            <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={4}>
                    <Link to={'/mystories/write/' + storyPart.id} className={classes.linkText}>
                    <Typography variant="body1">{storyPart.title}</Typography>
                    <Typography variant="subtitle2">{storyPart.status + " - " + Helper.getRelativeTime(storyPart.updatedAt)}</Typography>
                    </Link>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2} justifyContent="center"
                        alignItems="center">
                        <Grid item xs={4} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <RemoveRedEye color="action" fontSize='small' />
                                <Typography variant="subtitle2">&emsp;-&emsp;{storyPart?.views}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Star color="action" fontSize='small' />
                                <Typography variant="subtitle2">&emsp;-&emsp;{storyPart?.votes}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Comment color="action" fontSize='small' />
                                <Typography variant="subtitle2">&emsp;-&emsp;{storyPart?.comments}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button
                            size="medium"
                            onClick={handleToggle}
                            color="secondary"
                            endIcon={<ArrowDropDown />}
                        >
                        </Button>
                    </ButtonGroup>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                    zIndex: 2
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu">
                                            <MenuItem
                                                key='1'
                                                selected={false}
                                                onClick={(event) => handleMenuItemClick(event, 1)}
                                            >
                                                <Button variant="contained" color="secondary" size="small" onClick={() => viewHandler(storyPart)}>
                                                    view as reader
                                                </Button>
                                            </MenuItem>
                                            <MenuItem
                                                key='2'
                                                selected={false}
                                                onClick={(event) => handleMenuItemClick(event, 1)}
                                            >
                                                <Button variant="contained" color="secondary" size="small" onClick={() => deleteHandler(storyPart)}>
                                                    delete part
                                                </Button>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
            </Grid>
        </Card>
    );
}