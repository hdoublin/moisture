import React, { useState } from 'react';
import { Card, Grid, Box, Divider, Button, Typography, Popover, CircularProgress } from '@mui/material';
import { ArrowDropDown, CheckCircleOutline } from '@mui/icons-material';
import { StorySummeryDetail, LoadMoreButton } from '../..';

export default function StoryLists(props) {

    const { stories, storiesPagination, changeOrderBy, isLoading, loadMore, orderBy, goToStoryPage, goToTagsStories } = props;

    const [anchorElUser, setAnchorElUser] = useState(null);
    const open = Boolean(anchorElUser);


    const handleOpenPopover = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorElUser(null);
    };

    const selectOrder = (o) => {
        handleClosePopover();
        changeOrderBy(o);
    }

    const getTotalStoriesCount = () => {
        if (storiesPagination?.totalCount > 999) {
            return Math.round(storiesPagination.totalCount / 1000) + 'K';
        }
        return storiesPagination?.totalCount;
    }

    return (
        <Card sx={{ paddingY: 2, paddingX: 2, marginBottom: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>{getTotalStoriesCount()} Stories</Typography>
                <Box sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                    Sort By: <Button
                        aria-describedby={'sort'}
                        onClick={handleOpenPopover}
                        endIcon={<ArrowDropDown />}
                    >
                        {orderBy}
                    </Button>
                    <Popover
                        id={'sort'} Ï
                        open={open}
                        anchorEl={anchorElUser}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Button
                            onClick={() => selectOrder('HOT')}
                            endIcon={ orderBy === 'HOT' && <CheckCircleOutline />}
                            key='hot'
                        >
                            Hot
                        </Button>
                        <Divider />
                        <Button
                            key='new'
                            onClick={() => selectOrder('NEW')}
                            endIcon={ orderBy === 'NEW' && <CheckCircleOutline />}
                        >
                            New
                        </Button>

                    </Popover>
                </Box>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
                {stories.map((story, index) => (
                    <Grid item xs={12} md={6} key={'story-index-' + story.id}>
                        <StorySummeryDetail
                            story={story}
                            index={index}
                            goToStoryPage={()=>goToStoryPage(story)}
                            goToTagsStories={goToTagsStories}
                        />
                    </Grid>
                ))}
            </Grid>
            { storiesPagination?.isNextPage && <LoadMoreButton isLoading={isLoading} loadMore={loadMore}/> }
        </Card>
    );
}