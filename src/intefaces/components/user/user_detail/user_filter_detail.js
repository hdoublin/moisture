import React from 'react';
import { Box, Typography, Stack, Card, Avatar, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GroupAdd, GroupRemove } from '@mui/icons-material';

export default function UserFilterDetail(props) {

  const { user, index, isFollow, follow, isMe } = props;

  const useStyles = makeStyles({
    detailBox: {
      marginBottom: '20px',
      padding: '10px',
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.detailBox}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          direction="row"
          spacing={2}
        >
          { user?.imageUrl ? <img
            alt={user?.fullName}
            src={user?.imageUrl}
            style={{ width: 90, height: 90, borderRadius: '50%' }}
          /> : <Avatar
            sx={{ width: 80, height: 80 }}
          /> }
          <Box>
            <Typography variant="h6">{user?.fullName}</Typography>
            <Typography variant="subtitle1">{user?.email}</Typography>
            <Stack
              direction="row"
              spacing={2}
            >
              <Stack
                direction="row"
                spacing={0.5}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{user?.totalStories}</Typography>
                <Typography variant="body2">Stories</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={0.5}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{user?.followers}</Typography>
                <Typography variant="body2">Followers</Typography>
              </Stack>
            </Stack>

          </Box>
        </Stack>
        { !isMe && <>{ isFollow ? <Button variant="contained" color="warning" startIcon={<GroupRemove/>} onClick={()=>follow(!isFollow)}>Following</Button> : <Button variant="contained" color="inherit" startIcon={<GroupAdd/>} onClick={()=>follow(!isFollow)}>Follow</Button> }</> }
      </Stack>
    </Card>
  );
}