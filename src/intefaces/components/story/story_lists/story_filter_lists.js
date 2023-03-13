import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { StoryFilterDetail, LoadMoreButton } from '../..';

export default function StoryFilterLists(props) {

    const { stories, storiesPagination, isLoading, loadMore, goToStoryPage } = props;

    return (
        <Box sx={{ marginBottom: 2 }}>
            {stories.map((story, index) => (
                <StoryFilterDetail
                    story={story}
                    index={index}
                    key={'story-filter-index-' + index}
                    goToStoryPage={()=>goToStoryPage(story)}
                />
            ))}
            {storiesPagination?.isNextPage && <LoadMoreButton isLoading={isLoading} loadMore={loadMore}/>}
        </Box>
    );
}