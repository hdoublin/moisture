import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Stack, MenuItem, MenuList, Grow, Paper, ClickAwayListener, Popper } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Star } from '@mui/icons-material';

export default function StoryPartDetail(props) {

  const { story, storyPart, isVoted, goToStoryPartPage, isLoading, vote, user, goToEditStoryPartPage } = props;

  const bookSrc = require('../../../../assets/images/story-cover.jpeg');
  const useStyles = makeStyles({
    coverImage: {
      borderRadius: 4,
      cursor: 'pointer',
    },
    detailBox: {
      marginBottom: '10px',
      padding: '5px 10px',
      boxShadow: '0 5px 12px -2px #d5d5d5',
      
    },
  });
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleMenuItemClick = (event, index) => {
    setOpen(false);
    goToStoryPartPage(index);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const getPartTitle = (part) => {
    if (part?.title > 20) {
      return part?.title?.split(0, 19) + '...';
    }
    return part?.title;
  }

  return (
    <>
    { !isLoading && <Box className={classes.detailBox}>
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Stack
          direction="row"
          spacing={1}
          ref={anchorRef}
          onClick={handleToggle}
        >
          <img src={story?.logo ? story?.logo : bookSrc} alt={story?.title} width="45" height="80" className={classes.coverImage} />
          <Button
            size="medium"
            color="inherit"
            endIcon={<ArrowDropDown />}
          >
            {story?.title}
          </Button>
        </Stack>
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
                transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom',
                zIndex: 2
              }}
            >
              <Paper sx={{marginLeft: '10px'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {story?.storyParts?.map(part => (
                      <MenuItem
                        key={'story-part-index-' + part.id}
                        selected={false}
                        onClick={(event) => handleMenuItemClick(event, part.id)}
                      >
                        <Box sx={{ minWidth: '200px'}}>
                          <Typography variant="subtitle2">{getPartTitle(part)}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
      { user?.id !== storyPart?.userId ? <Box>
        {
          isVoted ? <Stack
            direction="row"
            spack={1}
            sx={{ cursor: 'pointer' }}
            onClick={vote}
          >
            <Star color="warning" sx={{ fontSize: 20, marginRight: 1 }} />
            <Typography variant="body1">Voted</Typography>
          </Stack> : <Stack
            direction="row"
            spack={1}
            sx={{ cursor: 'pointer' }}
            onClick={vote}
          >
            <Star color="action" sx={{ fontSize: 20, marginRight: 1 }} />
            <Typography variant="body1" >Vote</Typography>
          </Stack>
        }
      </Box> : <Button variant="contained" color="warning" size="small" onClick={goToEditStoryPartPage}>Edit Story Part</Button> }
    </Stack>
  </Box> }
    </>
  );
}