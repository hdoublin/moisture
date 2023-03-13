import React from 'react';
import { Typography, Box, Avatar, Button } from '@mui/material';
import { GroupAdd, GroupRemove } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function StoryUser(props) {

  const { user, isFollow, follow, myInfo } = props;

  return (
    <Box mt={10}>
      <Link to={'/users/' + user?.id} style={{ textDecoration: 'none', color: 'black' }}>
        <Box>
        { user?.imageUrl ? <img
          alt={user?.fullName}
          src={user?.imageUrl}
          style={{ width: 80, height: 80, borderRadius: '50%' }}
        /> : <Avatar sx={{ width: 80, height: 80, textAlign: 'center' }}/> }
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '14px', marginTop: 2 }}>
          by {user?.fullName}
        </Typography>          
      </Link>
      { user?.id != myInfo?.id && <Box sx={{ marginTop: 2 }}>
          { isFollow ? <Button variant="contained" color="warning" startIcon={<GroupRemove/>} onClick={()=>follow(!isFollow)}>Following</Button> : <Button variant="contained" color="inherit" startIcon={<GroupAdd/>} onClick={()=>follow(!isFollow)}>Follow</Button> }
        </Box> }
    </Box>
  );
}