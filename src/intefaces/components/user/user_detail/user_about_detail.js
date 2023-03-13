import React from 'react';
import { Box, Typography, Stack, Card, Container, Grid, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FmdGood, InsertLink } from '@mui/icons-material';
import Helper from '../../../../utils/helpers';
import { StoryFilterDetail, LoadMoreButton } from '../..';
import { Link } from 'react-router-dom';

export default function UserAboutDetail(props) {

    const { user, stories, goToStoryPage, storiesPagination, isLoading, loadMore, followings } = props;

    const useStyles = makeStyles({
        detailBox: {
            padding: '10px',
        },
        linkText: {
            textDecoration: 'none',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        userBox: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#bdbdbd',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            color: 'white',
            fontWeight: 'bold',
        },
    });
    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Card className={classes.detailBox}>
                        <Typography>{user?.about}</Typography>
                        {user?.location && <Stack
                            direction="row"
                            spacing={2}
                        >
                            <FmdGood />
                            <Typography>{user?.location}</Typography>
                        </Stack>}
                        <Typography>Joined {Helper.getRelativeTime(user?.createdAt)}</Typography>
                        {user?.website && <Box>
                            <Divider sx={{ marginY: 1 }} />
                            <Stack
                                direction="row"
                                spacing={2}
                            >
                                <InsertLink />
                                <Typography>{user?.website}</Typography>
                            </Stack>
                        </Box>}
                        <Box>
                            <Divider sx={{ marginY: 1 }} />
                            <Typography variant="subtitle1">FOLLOWING</Typography>
                            <Stack
                                direction="row"
                                spacing={1}
                            >
                                {followings?.map((follow, index) => (
                                    <span key={'user-about-follow-index-' + index}>
                                        {index < 6 && <Link to={'/users/' + follow?.followerId} className={classes.linkText}>
                                            {follow?.follower?.imageUrl ? <img
                                                alt={follow?.follower?.fullName}
                                                src={follow?.follower?.imageUrl}
                                                style={{ width: 30, height: 30, borderRadius: '50%' }}
                                            /> : <div className={classes.userBox}>{follow?.follower?.firstName[0].toUpperCase()}</div>}
                                        </Link>}
                                    </span>
                                ))}
                                {followings?.length > 6 && <div className={classes.userBox} style={{ width: '55px', borderRadius: '40%', backgroundColor: 'rgb(102, 187, 106)' }}>+ {followings?.length - 6}</div>}
                            </Stack>
                        </Box>
                        <Box>
                            <Divider sx={{ marginY: 1 }} />
                            <Typography variant="subtitle1">SHARE PROFILE</Typography>
                        </Box>

                    </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                    <Card className={classes.detailBox}>
                        <Typography variant="h6">Stories by {user?.fullName}</Typography>
                        {
                            stories?.map((story, index) => (
                                <StoryFilterDetail
                                    story={story}
                                    goToStoryPage={() => goToStoryPage(story)}
                                    key={'user-story-index-' + index}
                                    index={index}
                                />
                            ))
                        }
                        {storiesPagination?.isNextPage && <LoadMoreButton isLoading={isLoading} loadMore={loadMore} />}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}