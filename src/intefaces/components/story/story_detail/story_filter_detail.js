import React from 'react';
import { Box, Typography, Stack, Card, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MonetizationOn, RemoveRedEye, Star, Comment, ViewList } from '@mui/icons-material';

export default function StoryFilterDetail(props) {

  const { story, index, goToStoryPage } = props;

  const bookSrc = require('../../../../assets/images/story-cover.jpeg');
  const useStyles = makeStyles({
    imageBox: {
    },
    coverImage: {
      borderRadius: 6,
      objectFit: 'cover',
      boxShadow: '0 4px 4px 0px lightgrey',
      cursor: 'pointer',
    },
    detailBox: {
      marginBottom: '10px',
      padding: '10px',
    },
    linkText: {
      textDecoration: 'none',
      color: 'black',
    },
    tagWrapper: {
      backgroundColor: 'rgb(102, 187, 106)',
      padding: '2px 7px',
      borderRadius: '12px',
      marginRight: '4px',
      color: 'white',
      fontSize: '12px',
    },
    propertyWrapper: {
      marginTop: '10px',
      marginBottom: '10px',
    },
  });
  const classes = useStyles();

  const getTitle = () => {
    if (story?.title.length > 40) {
      return story?.title.substring(0, 39) + ' ...';
    }
    return story?.title;
  }

  const getDescription = () => {
    if (story?.description.length > 300) {
      return story?.description.substring(0, 299) + ' ...';
    }
    return story?.description;
  }

  return (
    <Card className={classes.detailBox}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="start"
      >
        <Box className={classes.imageBox}>
          <img src={story.logo ? story.logo : bookSrc} alt={story?.title} width="130" height="210" className={classes.coverImage} onClick={goToStoryPage}/>
        </Box>
        <Box>
          <Typography variant="h6" onClick={goToStoryPage}>{getTitle()}</Typography>
          <Box className={classes.propertyWrapper}>
            {story?.isPaid && <MonetizationOn color="warning" fontSize='small' sx={{ marginRight: '10px' }} />}
            { story?.status === 'COMPLETED' && <span className={classes.tagWrapper}>Complete</span>}
          </Box>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                <RemoveRedEye color="action" fontSize='12px' />
                <Typography variant="caption">Reads</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{story?.totalViews}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                <Star color="action" fontSize='12px' />
                <Typography variant="caption">Votes</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{story?.totalVotes}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                <ViewList color="action" fontSize='12px' />
                <Typography variant="caption">Parts</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{story?.totalParts}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Stack
               direction="row"
               spacing={0.5}
              >
                 <Comment color="action" fontSize='12px' />
                <Typography variant="caption">Comments</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{lineHeight: '0.75'}}>{story?.totalComments}</Typography>
            </Box>
          </Stack>          
          <Box sx={{ fontSize: '13px', marginTop: '3px'}}>
            {getDescription()}
          </Box>            
        </Box>
      </Stack>
    </Card>
  );
}