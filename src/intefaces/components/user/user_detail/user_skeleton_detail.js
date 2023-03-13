import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export default function UserSkeletonDetail(props) {

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
      >
        <Skeleton animation="wave" variant="circular" width={80} height={80} />
        <Box sx={{width: '100%'}}>
          <Skeleton animation="wave" variant="text" width={'50%'} height={30} />
          <Skeleton animation="wave" variant="text" width={'80%'} height={40} sx={{ marginTop: 2 }}/>
        </Box>
      </Stack>
    </Box>
  );
}