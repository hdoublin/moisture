import React from 'react';
import { Container, Grid } from '@mui/material';
import { StoryPart, StoryUser } from '../..';

export default function StoryPartPreview(props) {

  const { story, storyPart, user } = props;

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5, marginBottom: 2 }}>
        <Grid container spacing={2} sx={{ paddingRight: '10px', paddingBottom: '5px' }}>
            <Grid item xs={12} sm={3}>
              <StoryUser 
              user={user}
              myInfo={user}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <StoryPart 
                story={story}
                storyPart={storyPart}
              />
            </Grid>
          </Grid>
      </Container>
  );
}