import React, { useState, useRef } from 'react';
import { Box, Typography, Stack, Avatar, MenuItem, MenuList, Grow, Paper, ClickAwayListener, Popper, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Helpers from '../../../utils/helpers';
import { StoryPartCommentInput } from '..';

export default function StoryPartComment(props) {

  const { comment, reply, user } = props;

  const useStyles = makeStyles({
    linkText: {
      textDecoration: 'none',
      color: 'black',
    },
  });
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const anchorRef = useRef(null);

  const handleMenuItemClick = (event, index) => {
    setOpen(false);
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

  const handelReply = (text) => {
    reply(text, comment?.id);
  }

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
      >
        <Link to={"/users/" + comment?.user?.id}>
          {comment?.user?.imageUrl ? <img width={30} height={30} src={comment?.user?.imageUrl} style={{ borderRadius: '50%' }} alt={comment?.user?.fullName}/> : <Avatar width={30} height={30} />}
        </Link>
        <Box sx={{ width: '100%' }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
          >
            <Box>
              <Link to={"/users/" + comment?.user?.id} className={classes.linkText}><Typography>{comment?.user?.fullName}</Typography></Link>
              <Typography variant="caption">{Helpers.getRelativeTime(comment.updatedAt)}</Typography>
            </Box>
            <IconButton
              ref={anchorRef}
              onClick={handleToggle}
            >
              <MoreHoriz />
            </IconButton>
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
                    transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
                    zIndex: 2
                  }}
                >
                  <Paper sx={{ marginLeft: '10px' }}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        <MenuItem
                          key={'comment-action-index-1'}
                          selected={false}
                          onClick={(event) => handleMenuItemClick(event, 1)}
                        >
                          <Box sx={{ minWidth: '100px' }}>
                            <Typography variant="subtitle2">Mute {comment?.user?.fullName}</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem
                          key={'comment-action-index-2'}
                          selected={false}
                          onClick={(event) => handleMenuItemClick(event, 2)}
                        >
                          <Box sx={{ minWidth: '100px' }}>
                            <Typography variant="subtitle2">Report Comment</Typography>
                          </Box>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Stack>
          <Typography variant="body2">{comment?.comment}</Typography>

          <Typography variant="subtitle2" sx={{ color: '#ed6c02', cursor: 'pointer', marginY: 1 }} onClick={() => setOpenReply(!openReply)}>{comment?.replies?.length > 0 && comment?.replies?.length} Reply</Typography>
          {openReply && <>
            {user && <StoryPartCommentInput
              user={user}
              comment={handelReply}
              value={'@' + user?.fullName}
            />}
            {comment?.replies?.map((item, index) => (
              <Stack
                direction="row"
                spacing={2}
                key={'reply-index-' + index}
                mt={1}
              >
                <Box sx={{ width: '100%' }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Link to={"/users/" + item?.user?.id}>
                      {item?.user?.imageUrl ? <img width={30} height={30} src={item?.user?.imageUrl} style={{ borderRadius: '50%' }} alt={comment?.user?.fullName}/> : <Avatar width={30} height={30} />}
                    </Link>
                    <Box>
                      <Link to={"/users/" + item?.user?.id} className={classes.linkText}><Typography>{item?.user?.fullName}</Typography></Link>
                      <Typography variant="caption">{Helpers.getRelativeTime(item?.updatedAt)}</Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2">{item?.reply}</Typography>
                </Box>
              </Stack>
            ))}
          </>}

        </Box>

      </Stack>
    </Box>
  );
}