import React, { useContext } from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { StoryHottestDetail } from '../..';

export default function StoryHottestLists(props) {

  const { stories, title, description, goToStoryPage, goToTagsStories } = props;

  const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } =
      useContext(VisibilityContext);

    return (
      <>
      { !isFirstItemVisible && <IconButton disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <ArrowBackIos />
      </IconButton> }
      </>
    );
  }

  const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
      <>
        { !isLastItemVisible && <IconButton disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <ArrowForwardIos/>
      </IconButton> }
      </>
    );
  }


  return (
    <Box sx={{ marginY: 2 }}>
      <Typography variant='h5'>{title}</Typography>
      <Typography variant='body1'>{description}</Typography>
      <Box>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
        >
          {stories.map((story) => (
            <StoryHottestDetail
              itemId={story.id} // NOTE: itemId is required for track items
              story={story}
              key={story.id}
              goToStoryPage={goToStoryPage}
              goToTagsStories={goToTagsStories}
            />
          ))}
        </ScrollMenu>
      </Box>
      <Divider />
    </Box>
  );
}