import React, {useContext} from 'react';
import { Box, Typography, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MonetizationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function StoryHottestDetail(props) {

  const { story, goToStoryPage, goToTagsStories } = props;

  const bookSrc = require('../../../../assets/images/story-cover.jpeg');
  const useStyles = makeStyles({
    coverImage: {
      borderRadius: 6,
      objectFit: 'cover',
      boxShadow: '0 4px 4px 0px lightgrey',
      marginBottom: '10px',
      cursor: 'pointer',
    },
    detailBox: {
      marginRight: '25px',
      marginTop: '10px',
      width: '120px',
      marginBottom: '10px',
    },
    linkText: {
      textDecoration: 'none',
    },
    tagWrapper: {
      color: '#6f6f6f',
      backgroundColor: 'rgb(238 238 238)',
      padding: '2px 7px',
      borderRadius: '12px',
      cursor: 'pointer',
    }
  });
  const classes = useStyles();

  const getPrimaryTag = () => {
    if (story?.tags.length > 0) {
      return story.tags[0];
    }
    return null;
  }

  return (
    <Box className={classes.detailBox}>
      <img src={story.logo ? story.logo : bookSrc} alt={story?.title} width="120" height="190" className={classes.coverImage} onClick={()=>goToStoryPage(story)}/>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {story?.isPaid && <MonetizationOn color="warning" fontSize='small' sx={{ marginRight: '10px' }} />}
        {getPrimaryTag() &&
          <Typography variant="subtitle2" className={classes.tagWrapper} onClick={() => goToTagsStories(getPrimaryTag())}>{getPrimaryTag()}</Typography>
        }
      </Box>
    </Box>
  );
}