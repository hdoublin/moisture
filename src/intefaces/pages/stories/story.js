import { useState, useContext, useEffect } from 'react';
import {
    Container, Box, Typography, Card, Grid, Stack, Avatar, Skeleton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams, Link } from "react-router-dom";
import { MonetizationOn } from '@mui/icons-material';
import { StoryContext, } from '../../../context';
import { StoryDetail, StoryRecommendDetail } from '../../components';

export default function StoryPage() {

    const navigate = useNavigate();
    const { storyId } = useParams();

    const { getStory, currentStory, getRecommendStories, recommendStories } = useContext(StoryContext);

    const [isLoading, setIsLoading] = useState(false);

    const useStyles = makeStyles({

        linkText: {
            textDecoration: 'none',
            color: 'black',
        },
        propertyWrapper: {
            marginTop: '10px',
            marginBottom: '10px',
        },
        tagsWrapper: {
            color: '#6f6f6f',
            fontSize: '12px',
            marginTop: '10px',
            marginBottom: '10px',
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

    useEffect(() => {
        setIsLoading(true);
        getStory(storyId).then(() => {
            setIsLoading(false);
        });
        getRecommendStories(storyId);
    }, [storyId]);

    const goToStoryPage = (story) => {
        navigate('/story/' + story.id);
    }

    const goToTagsStories = (tag) => {
        navigate('/stories/tags/' + tag);
    }

    const renderStoryData = () => {
        return (
            <Grid item xs={12} md={8}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    {currentStory?.user?.imageUrl ? <img src={currentStory?.user?.imageUrl} alt={currentStory?.user?.fullName} style={{ borderRadius: '50%' }} width={30} height={30} />
                        : <Avatar
                            sx={{ width: 30, height: 30 }}
                        />
                    }
                    <Link to={"/users/" + currentStory?.user?.id} className={classes.linkText}>
                        <Typography variant="body2">{currentStory?.user?.fullName}</Typography>
                    </Link>
                </Stack>
                <Box className={classes.propertyWrapper}>
                    {currentStory?.isPaid && <MonetizationOn color="warning" fontSize='small' sx={{ marginRight: '10px' }} />}
                    {currentStory?.status === 'COMPLETED' && <span className={classes.tagWrapper}>Complete</span>}
                </Box>
                <Box className={classes.propertyWrapper}>
                    <Typography variant="body1">{currentStory?.description}</Typography>
                </Box>
                <Typography variant="body1">@ {currentStory?.copyright}</Typography>
                <Box className={classes.tagsWrapper}>
                    {currentStory?.tags.map((tag, index) => (
                        <span key={'story-tag-index-' + index} className={classes.tagWrapper} onClick={()=>goToTagsStories(tag)}>
                            {tag}
                        </span>
                    ))}
                </Box>
                <Card sx={{ padding: 2, marginTop: 3 }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>Table of Contents</Typography>
                    {
                        currentStory?.storyParts?.map((storyPart, index) => (
                            <Link to={'/story/' + currentStory?.id + '/' + storyPart?.id} key={'story-part-index-' + index} className={classes.linkText}>
                                <Typography variant="subtitle1">{storyPart?.title}</Typography>
                            </Link>
                        ))
                    }
                </Card>
            </Grid>
        );
    }

    const renderLoadingStoryData = () => {
        return (
            <Grid item xs={12} md={8}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Skeleton animation="wave" variant="circular" width={30} height={30} />
                    <Skeleton animation="wave" variant="text" width={100} height={30} />
                </Stack>
                <Skeleton animation="wave" variant="rectangular" width={'80%'} height={80} sx={{ marginTop: '20px' }} />
                <Skeleton animation="wave" variant="text" width={'60%'} height={30} />
                <Skeleton animation="wave" variant="rectangular" width={'80%'} height={40} />
                <Skeleton animation="wave" variant="rectangular" width={'70%'} height={80}  sx={{ marginTop: '20px' }} />
            </Grid>
        );
    }

    return (
        <Box>
            <StoryDetail
                story={currentStory}
                isLoading={isLoading}
            />
            <Container maxWidth="lg" sx={{ marginTop: 5, marginBottom: 2 }}>
                <Grid container spacing={2}>
                    { isLoading? renderLoadingStoryData() : renderStoryData()}
                    <Grid item xs={12} md={4}>
                        {recommendStories?.length > 0 && <Card sx={{ padding: '10px' }}>
                            <Typography variant="h6" sx={{ margin: '10px' }}>You may also like</Typography>
                            {
                                recommendStories?.map((story, index) => (
                                    <StoryRecommendDetail story={story} goToStoryPage={() => goToStoryPage(story)} key={'story-recommend-index-' + index} />
                                ))
                            }
                        </Card>}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}