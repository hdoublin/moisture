import { useState, useRef } from 'react';
import {
    Box, Typography, Button, MenuItem, MenuList, Grow, Paper, Popper, ClickAwayListener, ButtonGroup, Stack
} from '@mui/material';
import { Add, RemoveRedEye, Star, Comment, ArrowDropDown } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Helpers from '../../../../utils/helpers';

export default function StoryItem(props) {
    const { story, deleteHandler, createHandler } = props;

    const useStyles = makeStyles({
        linkText: {
            textDecoration: 'none',
            color: 'black'
        },
        coverImage: {
            borderRadius: 6,
        },
    });

    const classes = useStyles();

    const bookSrc = require('../../../../assets/images/story-cover.jpeg');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

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

    const getStatusParts = (parts) => {
        const drafts = parts.filter(part => part.status === 'DRAFT');
        const published = parts.filter(part => part.status === 'PUBLISH');
        return drafts.length + ' Drafts and ' + published.length + ' Publishes'
    }

    const getTotalViews = () => {
        let views = 0;
        story?.storyParts?.map(part => {
            views += part.views;
        });
        return views;
    }

    const getTotalVotes = () => {
        let views = 0;
        story?.storyParts?.map(part => {
            views += part.votes;
        });
        return views;
    }

    const getTotalComments = () => {
        let views = 0;
        story?.storyParts?.map(part => {
            views += part.comments;
        });
        return views;
    }

    return (
        <Box key={story.id} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start', marginTop: 2 }}>
            <Link to={"/mystories/" + story.id} className={classes.linkText}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                    <img src={story.logo ? story.logo : bookSrc} alt={"story cover"} width="100" height="135" className={classes.coverImage}/>
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography variant="body1">{story.title}</Typography>
                        <Typography variant="subtitle2">{getStatusParts(story.storyParts)}</Typography>
                        <Typography variant="subtitle2">Updated {Helpers.getRelativeTime(story?.updatedAt)}</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <Stack
                                direction="row"
                                spacing={0.5}
                            >
                                <RemoveRedEye color="action" fontSize='small' />
                                <Typography variant="subtitle2">- {getTotalViews()}</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                            >
                                <Star color="action" fontSize='small' />
                                <Typography variant="subtitle2">- {getTotalVotes()}</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                            >
                                <Comment color="action" fontSize='small' />
                                <Typography variant="subtitle2">- {getTotalComments()}</Typography>
                            </Stack>

                        </Stack>                            
                    </Box>

                </Box>
            </Link>
            <Box>
                <Box>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button
                            size="medium"
                            onClick={handleToggle}
                            color="secondary"
                            endIcon={<ArrowDropDown />}
                        >
                            Continue writing
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
                                            {story.storyParts.map(part => (
                                                <MenuItem
                                                    key={'part_' + part.id}
                                                    selected={false}
                                                    onClick={(event) => handleMenuItemClick(event, 1)}
                                                >
                                                    <Link to={"/mystories/write/" + part.id} className={classes.linkText}>
                                                        <Box>
                                                            <Typography variant="subtitle2">{part.title}</Typography>
                                                            <Typography variant="subtitle2">{part.status + ' - ' + part.updatedAt}</Typography>
                                                        </Box>
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                            <MenuItem
                                                key='2'
                                                selected={false}
                                                onClick={(event) => handleMenuItemClick(event, 1)}
                                            >
                                                <Button variant="contained" color="secondary" startIcon={<Add />} size="small" onClick={() => createHandler(story)}>
                                                    New Part
                                                </Button>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" color="error" size="small" onClick={() => deleteHandler(story)}>
                        Delete Story
                    </Button>
                </Box>

            </Box>
        </Box>
    );
}