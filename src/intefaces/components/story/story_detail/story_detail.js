import React from 'react';
import { Box, Typography, Stack, Divider, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RemoveRedEye, Star, Comment, ViewList } from '@mui/icons-material';

export default function StoryDetail(props) {

  const { story, isLoading } = props;

  const bookSrc = require('../../../../assets/images/story-cover.jpeg');
  const useStyles = makeStyles({
    coverImage: {
      borderRadius: 6,
      objectFit: 'cover',
      boxShadow: '0 5px 12px -2px #d5d5d5',
      cursor: 'pointer',
    },
    detailBox: {
      marginBottom: '10px',
      padding: '20px',
      boxShadow: '0 5px 12px -2px #d5d5d5',
    },
  });
  const classes = useStyles();

  const getTitle = () => {
    if (story?.title.length > 40) {
      return story?.title.substring(0, 39) + ' ...';
    }
    return story?.title;
  }

  const getTotalViews = () => {
    let value = 0;
    story?.storyParts?.map((storyPart) => {
      value += storyPart?.views;
    });
    return value;
  }

  const getTotalVotes = () => {
    let value = 0;
    story?.storyParts?.map((storyPart) => {
      value += storyPart?.votes;
    });
    return value;
  }

  const getTotalComments = () => {
    let value = 0;
    story?.storyParts?.map((storyPart) => {
      value += storyPart?.comments;
    });
    return value;
  }

  const renderData = () => {
    return (
      <Stack
        direction="row"
        spacing={2}
        alignItems="start"
        justifyContent="center"
      >
        <Box className={classes.imageBox}>
          <img src={story?.logo ? story?.logo : bookSrc} alt={story?.title} width="160" height="250" className={classes.coverImage} />
        </Box>
        <Box sx={{ paddingTop: '20px' }}>
          <Typography variant="h5">{getTitle()}</Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ marginTop: '30px' }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                <RemoveRedEye color="action" fontSize='12px' />
                <Typography variant="caption">Reads</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{getTotalViews()}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                <Star color="action" fontSize='12px' />
                <Typography variant="caption">Votes</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{getTotalVotes()}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                <ViewList color="action" fontSize='12px' />
                <Typography variant="caption">Parts</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{story?.storyParts?.length}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                 <Comment color="action" fontSize='12px' />
                <Typography variant="caption">Comments</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{getTotalComments()}</Typography>
            </Box>
          </Stack>        
        </Box>
      </Stack>
    );
  }

  const loadingData = () => {
    return (
      <Stack
        direction="row"
        spacing={2}
        alignItems="start"
        justifyContent="center"
      >
        <Box className={classes.imageBox}>
          <Skeleton animation="wave" variant="rectangular" width={160} height={250} />
        </Box>
        <Box sx={{ paddingTop: '20px' }}>
          <Skeleton animation="wave" variant="text" width={100} height={30} />
          <Skeleton animation="wave" variant="rectangular" width={300} height={50} sx={{ marginTop: '30px' }}/>
        </Box>
      </Stack>
    );
  }

  return (
    <Box className={classes.detailBox}>
       { isLoading ? loadingData() : renderData()}
    </Box>
  );
}