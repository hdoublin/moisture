import React from 'react';
import { Box, Typography, Stack, Card, Avatar, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function UserImagesDetail(props) {

  const { user } = props;

  const defaultBackgroundImage = require('../../../../assets/images/user-background.jpg');

  const useStyles = makeStyles({
    detailBox: {
      marginBottom: '20px',
      backgroundImage: user?.backgroundImage ? 'url(' + user?.backgroundImage + ')' : 'url(' + defaultBackgroundImage + ')',
      paddingTop: '50px',
      paddingBottom: '50px',
      backgroundSize: 'cover',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',        
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.detailBox}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {user?.imageUrl ? <img
          alt={user?.fullName}
          src={user?.imageUrl}
          style={{ width: 90, height: 90, borderRadius: '50%' }}
        /> : <Avatar
          sx={{ width: 80, height: 80 }}
        />}
        <Typography variant="h6" color="white">{user?.fullName}</Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Stack
            direction="column"
            spacing={0.5}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }} color="white">{user?.totalStories}</Typography>
            <Typography variant="body2" color="white">Stories</Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={0.5}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }} color="white">{user?.followers}</Typography>
            <Typography variant="body2" color="white">Followers</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}