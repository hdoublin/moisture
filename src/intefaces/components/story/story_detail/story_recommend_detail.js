import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MonetizationOn, ViewList, } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function StoryRecommendDetail(props) {

  const { story, goToStoryPage } = props;

  const bookSrc = require('../../../../assets/images/story-cover.jpeg');
  const useStyles = makeStyles({
    coverImage: {
      cursor: 'pointer',
      borderRadius: '6px'
    },
    detailBox: {
      marginBottom: '20px',
    },
    linkText: {
      textDecoration: 'none',
      color: 'black',
    },
    tagsWrapper: {
      color: '#6f6f6f',
      fontSize: '11px',
      marginTop: '5px',
    },
    tagWrapper: {
      backgroundColor: 'rgb(238 238 238)',
      padding: '2px 7px',
      borderRadius: '12px',
      marginRight: '4px',
    }
  });
  const classes = useStyles();

  const getTitle = () => {
    if (story?.title.length > 20) {
      return story?.title.substring(0, 19) + ' ...';
    }
    return story?.title;
  }

  const getDescription = () => {
    if (story?.description.length > 200) {
      return story?.description.substring(0, 199) + ' ...';
    }
    return story?.description;
  }

  return (
    <Box className={classes.detailBox}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="start"
      >
       <img src={story.logo ? story.logo : bookSrc} alt={story?.title} width="80" height="130" className={classes.coverImage} onClick={goToStoryPage}/>
        <Box>
          <Typography variant="subtitle1" sx={{ cursor: 'pointer' }} onClick={goToStoryPage}>{story?.isPaid && <MonetizationOn color="warning" fontSize='small' />} {getTitle()}</Typography>
          <Stack
            direction="row"
            spacing={1}
          >
            <ViewList color="action" fontSize='small' />
            <Typography variant="subtitle2">{ story?.totalParts } Parts</Typography>
          </Stack>
          <Box sx={{fontSize: '12px'}}>
            {getDescription()}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}