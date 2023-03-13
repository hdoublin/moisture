import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MonetizationOn, RemoveRedEye, Star, Comment } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function StorySummeryDetail(props) {

  const { story, index, goToStoryPage, goToTagsStories } = props;

  const bookSrc = require('../../../../assets/images/story-cover.jpeg');
  const useStyles = makeStyles({
    imageBox: {
      width: '140px',
      height: '210px',
      backgroundImage: story.logo ? 'url(' + story.logo + ')' : 'url(' + bookSrc + ')',
      backgroundSize: 'cover',
      cursor: 'pointer',
    },
    badgeWrapper: {
      backgroundColor: '#ed6c02',
      width: '35px',
      height: '25px',
      color: 'white',
      fontSize: '12px',
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '0 0 5px 0',
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
      cursor: 'pointer',
    }
  });
  const classes = useStyles();

  const getTitle = () => {
    if (story?.title.length > 25) {
      return story?.title.substring(0, 24) + ' ...';
    }
    return story?.title;
  }

  const getDescription = () => {
    if (story?.description.length > 270) {
      return story?.description.substring(0, 269) + ' ...';
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
        <Box className={classes.imageBox} onClick={goToStoryPage}>
          <Box className={classes.badgeWrapper}>#{index + 1}</Box>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ cursor: 'pointer' }} onClick={goToStoryPage}>{getTitle()}</Typography>
          <Link to={'/users/' + story?.user?.id} className={classes.linkText}>
            <Typography variant="caption">by {story?.user?.fullName}</Typography>
          </Link>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <RemoveRedEye color="action" fontSize='12px' />
            <Typography variant="caption">&emsp;{story?.totalViews}&emsp;&emsp;</Typography>
            <Star color="action" fontSize='12px' />
            <Typography variant="caption">&emsp;{story?.totalVotes}&emsp;&emsp;</Typography>
            <Comment color="action" fontSize='12px' />
            <Typography variant="caption">&emsp;{story?.totalComments}</Typography>
          </Box>
          <Box sx={{maxWidth: '240px', fontSize: '14px'}}>
            {getDescription()}
          </Box>
          <Box className={classes.tagsWrapper}>
            { story?.tags.map((tag, index) => (
              <span key={'story-tag-index-' + index}>
                { index < 3 && <span className={classes.tagWrapper} onClick={() => goToTagsStories(tag)}>{tag}</span>}
              </span>
            )) }
            <Box sx={{marginTop: '5px'}}>
            { story?.tags?.length > 3 && <span>+ {story?.tags?.length - 3} more</span> }
            </Box>
            {story?.isPaid && <MonetizationOn color="warning" fontSize='small' sx={{ marginRight: '10px' }} />}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}