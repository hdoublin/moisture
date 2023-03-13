import { useState, useContext, useEffect } from 'react';
import { Container, Box, Card, Typography, Grid, Skeleton, Divider } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { StoryContext, UserContext, AuthContext, CommentContext } from '../../../context';
import { StoryPartDetail, StoryRecommendDetail, StoryPart, StoryUser, StoryPartCommentInput, StoryPartCommentDetail } from '../../components';
import { toast } from 'react-toastify';

export default function StoryPartPage() {

    const navigate = useNavigate();
    const { storyId, storyPartId } = useParams();

    const { getStory, currentStory, getRecommendStories, recommendStories, setCurrentStoryPart, currentStoryPart, vote, view } = useContext(StoryContext);
    const { follow, getMyFollowings, myFollowings } = useContext(UserContext);
    const { user, token } = useContext(AuthContext);
    const {
        storyPartComments,
        storyPartComment,
        storyPartReply,
        getStoryPartComments,
    } = useContext(CommentContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isVoted, setIsVoted] = useState(false);

    useEffect(() => {
        setIsVoted(false);
        setIsLoading(true);
        getStory(storyId).then(() => {
            setIsLoading(false);
        });
        getRecommendStories(storyId);
        getStoryPartComments(storyPartId);
    }, [storyId, storyPartId]);

    useEffect(() => {
        if (currentStory) {
            getCurrentStoryPart();
            tryView();
        }
    }, [currentStory, user]);

    const getCurrentStoryPart = () => {
        const storyParts = currentStory?.storyParts?.filter(part => part.id == storyPartId);
        if (storyParts.length > 0) {
            setCurrentStoryPart(storyParts[0]);
            storyParts[0]?.partVotes?.map(v => {
                if (v.userId === user?.id) {
                    setIsVoted(true);
                }
                return [];
            });
            return storyParts[0];
        } else {
            return null;
        }
    }

    const goToStoryPage = (story) => {
        navigate('/story/' + story.id);
    }

    const goToStoryPartPage = (partId) => {
        navigate('/story/' + storyId + '/' + partId);
    }

    const goToEditStoryPartPage = () => {
        navigate('/mystories/write/' + storyPartId);
    }

    const checkFollow = () => {
        let f = myFollowings?.filter(m => m.followerId === currentStory?.userId);
        if (f.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const tryfollow = (isFollow) => {
        if (!token) {
            navigate('/auth/login');
            return;
        }
        const data = {
            userId: user?.id,
            followerId: currentStory?.user?.id,
            isFollow: isFollow
        };
        follow(data).then(() => {
            getMyFollowings();
            toast(isFollow ? 'You followed this user!' : 'You unfollowed this user!');
        });
    }

    const tryVote = () => {
        if (!token) {
            navigate('/auth/login');
            return;
        }
        const data = {
            userId: user?.id,
            storyId: storyId,
            storyPartId: storyPartId,
            isVote: !isVoted
        };
        setIsVoted(!isVoted);
        vote(data).then(() => {
            // toast(!isVoted ? 'You voted this story part!' : 'You do not vote this story part!');
        });
    }

    const tryView = () => {
        const data = {
            storyId: storyId,
            storyPartId: storyPartId,
            userId: user?.id,
        }
        view(data);
    }

    const tryComment = (commentText) => {
        if (commentText) {
            const data = {
                userId: user?.id,
                storyId: storyId,
                storyPartId: storyPartId,
                comment: commentText,
                sentence: ''
            };
            storyPartComment(data).then(() => {
                toast('You have commentted on this part!');
                getStoryPartComments(storyPartId);
            });
        } else {
            toast('Please input the text');
        }
    }

    const tryReply = (replyText, commentId) => {
        if (!replyText || !commentId) {
            toast('Please input the text');
        } else {
            const data = {
                userId: user?.id,
                commentId: commentId,
                reply: replyText
            };
            storyPartReply(data).then(() => {
                toast('You have commentted on this comment!');
                getStoryPartComments(storyPartId);
            });
        }
    }

    const renderStoryPartData = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <StoryUser
                        user={currentStory?.user}
                        isFollow={checkFollow()}
                        myInfo={user}
                        follow={tryfollow}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StoryPart
                        storyPart={currentStoryPart}
                    />
                    {token && <StoryPartCommentInput
                        comment={tryComment}
                        user={user}
                        value={''}
                    />}
                    {
                        storyPartComments?.map((storyPartComment, index) => (
                            <StoryPartCommentDetail
                                key={'story-part-comment-index-' + index}
                                comment={storyPartComment}
                                reply={tryReply}
                                user={user}
                            />
                        ))
                    }
                </Grid>
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
        );
    }

    const renderLoadingStoryPartData = () => {
        return (
            <Grid container spacing={2} sx={{ marginTop: '100px' }}>
                <Grid item xs={12} md={2}>
                    <Skeleton animation="wave" variant="circular" width={80} height={80} />
                    <Skeleton animation="wave" variant="rectangular" width={80} height={250} sx={{ marginTop: 2 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Skeleton animation="wave" variant="rectangular" width={'80%'} height={50} />
                    <Divider sx={{ marginTop: 2 }} />
                    <Skeleton animation="wave" variant="rectangular" width={'100%'} height={250} sx={{ marginTop: 5 }} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Box>
            <StoryPartDetail
                story={currentStory}
                storyPart={currentStoryPart}
                goToStoryPartPage={goToStoryPartPage}
                goToEditStoryPartPage={goToEditStoryPartPage}
                isLoading={isLoading}
                isVoted={isVoted}
                vote={tryVote}
                user={user}
            />
            <Container maxWidth="lg" sx={{ marginTop: 5, marginBottom: 2 }}>
                {isLoading ? renderLoadingStoryPartData() : renderStoryPartData()}
            </Container>
        </Box>
    );
}