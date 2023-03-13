import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { RemoveRedEye, Star, Comment } from '@mui/icons-material';

export default function StoryPart(props) {

  const { storyPart } = props;

  return (
    <Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">
          {storyPart?.title} ({storyPart?.status})
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          <Stack
            direction="row"
            spacing={0.5}
          >
            <RemoveRedEye variant="action" sx={{ fontSize: 20 }} />
            <Typography variant="">{storyPart?.views}</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
          >
            <Star variant="action" sx={{ fontSize: 20 }} />
            <Typography variant="">{storyPart?.votes}</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
          >
            <Comment variant="action" sx={{ fontSize: 20 }} />
            <Typography variant="">{storyPart?.comments}</Typography>
          </Stack>

        </Stack>
      </Box>
      <Divider />
      <Box>
        <div dangerouslySetInnerHTML={{ __html: storyPart?.description }}></div>
      </Box>
    </Box>
  );
}