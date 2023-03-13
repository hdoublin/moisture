import React, { useRef, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Popper, MenuItem, MenuList, Grow, Paper, ClickAwayListener, ButtonGroup } from '@mui/material';
import { InsertPhoto, VideoCameraBack, AudioFile, ArrowDropDown, Add, EmojiEmotions, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, } from '@mui/icons-material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { PartInlineStyle, PartBlockStyle } from '..';

export default function MyStoryPartCreateHeader(props) {
  const {
    data,
    backHandler,
    publishHandler,
    saveHandler,
    previewHandler,
    editHandler,
    createHandler,
    editorState,
    isPreview,
    toggleBlockType,
    toggleInlineStyle,
    imageInsert,
    videoInsert,
    emojiInsert
  } = props;
  const { story, storyPart } = data;
  const navigate = useNavigate();
  const useStyles = makeStyles({
    root: {
      backgroundColor: 'white !important',
      top: '70px !important',
    },
    blackText: {
      color: 'black'
    },
    inputNone: {
      display: 'none'
    },
  });
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (index > 0 && index !== storyPart.id) {
      navigate('/mystories/write/' + index);
    }
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

  const goToPage = (page) => {
    if (!page) return;
    navigate(page);
  }

  return (
    <Box>
      <AppBar position="fixed" className={classes.root}>
        {
          isPreview ? <Grid container spacing={2} sx={{ alignItems: 'center', paddingRight: '10px', paddingBottom: '5px' }}>
            <Grid item xs={12} sm={12} md={4} lg={2}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="default"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => backHandler()}
                >
                  <ArrowBack />
                </IconButton>
                <Box sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                      <Button
                        size="medium"
                        onClick={handleToggle}
                        color="secondary"
                        endIcon={<ArrowDropDown />}
                      >
                        {storyPart.title}
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
                                {story.storyParts?.map(part => (
                                  <MenuItem
                                    key={'part_' + part.id}
                                    selected={false}
                                    onClick={(event) => handleMenuItemClick(event, part.id)}
                                  >
                                    <Box>
                                      <Typography variant="subtitle2">{part.title}</Typography>
                                    </Box>
                                  </MenuItem>
                                ))}
                                <MenuItem
                                  key='2'
                                  selected={false}
                                  onClick={(event) => handleMenuItemClick(event, 0)}
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
                </Box>
              </Toolbar>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={2} sx={{ color: 'black', alignItems: 'center', justifyContent: 'center' }}>

            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={2} sx={{ color: 'black', alignItems: 'center', justifyContent: 'center' }}>

            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={2} sx={{ color: 'black', alignItems: 'center', justifyContent: 'center' }}>

            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
              <Box sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button color="primary" variant='contained' onClick={editHandler}>Edit Part</Button>
              </Box>
            </Grid>
          </Grid> : <Grid container spacing={2} sx={{ alignItems: 'center', paddingRight: '10px', paddingBottom: '5px' }}>
            <Grid item xs={12} sm={12} md={4} lg={2}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="default"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => backHandler()}
                >
                  <ArrowBack />
                </IconButton>
                <Box sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                      <Button
                        size="medium"
                        onClick={handleToggle}
                        color="secondary"
                        endIcon={<ArrowDropDown />}
                      >
                        {storyPart.title}
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
                                {story.storyParts?.map(part => (
                                  <MenuItem
                                    key={'part_' + part.id}
                                    selected={false}
                                    onClick={(event) => handleMenuItemClick(event, part.id)}
                                  >
                                    <Box>
                                      <Typography variant="subtitle2">{part.title}</Typography>
                                    </Box>
                                  </MenuItem>
                                ))}
                                <MenuItem
                                  key='2'
                                  selected={false}
                                  onClick={(event) => handleMenuItemClick(event, 0)}
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
                </Box>
              </Toolbar>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={2} sx={{ color: 'black', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ textAlign: 'center' }}>Font and Paragraph</Typography>
              <Box sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PartInlineStyle editorState={editorState} onToggle={toggleInlineStyle} />
                <PartBlockStyle editorState={editorState} onToggle={toggleBlockType} />
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={2} sx={{ color: 'black', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ textAlign: 'center' }}>Insert Media</Typography>
              <Box sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <label htmlFor="icon-button-video-file">
                  <input accept="video/*" id="icon-button-video-file" type="file" className={classes.inputNone} onChange={videoInsert} />
                  <IconButton color="default" aria-label="upload video" component="span">
                    <VideoCameraBack />
                  </IconButton>
                </label>
                <label htmlFor="icon-button-image-file">
                  <input accept="image/*" id="icon-button-image-file" type="file" className={classes.inputNone} onChange={imageInsert} />
                  <IconButton color="default" aria-label="upload picture" component="span">
                    <InsertPhoto />
                  </IconButton>
                </label>
                <IconButton color="default" aria-label="upload audio" component="span">
                  <AudioFile />
                </IconButton>
                {emojiInsert}

              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={2} sx={{ color: 'black', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ textAlign: 'center' }}>Writing Help</Typography>
              <Box sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button size="small" color="primary" variant='outlined' onClick={() => goToPage('/guide')}>Guide</Button>
                <Button size="small" color="primary" variant='outlined' sx={{ marginLeft: 2 }} onClick={() => goToPage('/live-assistant')}>Live</Button>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
              <Box sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {storyPart.status !== 'PUBLISH' && <Button color="secondary" variant='contained' onClick={publishHandler}>Publish</Button>}
                <Button color="primary" variant='contained' sx={{ marginLeft: 0.5 }} onClick={saveHandler}>Save</Button>
                <Button color="primary" variant='contained' sx={{ marginLeft: 0.5 }} onClick={previewHandler}>Preview</Button>
              </Box>
            </Grid>
          </Grid>
        }
      </AppBar>
    </Box>
  );
}