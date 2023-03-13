import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export default function StorySkeletonDetail(props) {

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
      >
        <Skeleton animation="wave" variant="rectangular" width={150} height={200} />
        <Box sx={{width: '100%'}}>
          <Skeleton animation="wave" variant="text" width={'80%'} height={30} />
          <Skeleton animation="wave" variant="text" width={'80%'} height={30} sx={{ marginTop: 2 }}/>
          <Skeleton animation="wave" variant="rectangular" width={'80%'} height={100} />
        </Box>
      </Stack>
    </Box>
  );
}