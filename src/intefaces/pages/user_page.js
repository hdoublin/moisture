import React, { useEffect, useContext, useState } from 'react';
import {
    Box, Typography, Button, Card, Tab, Grid, Container, Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate, useParams, Link } from "react-router-dom";

import { UserContext, AuthContext, StoryContext } from '../../context';
import { UserImagesDetail, UserAboutDetail, UserFollowingDetail, UserFilterLists, UserSkeletonDetail } from '../components';

export default function UserPage() {

    const navigate = useNavigate();
    const { userId } = useParams();

    const useStyles = makeStyles({
        linkText: {
            textDecoration: 'none',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',                
        },
    });
    const classes = useStyles();

    const { token, user } = useContext(AuthContext);
    const { otherUser, getUser, getUserFollowings, userFollowings, setUserFollowings } = useContext(UserContext);
    const { storiesPagination, stories, setStories, getStories } = useContext(StoryContext);

    const [value, setValue] = useState('1');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setStories([]);
        setUserFollowings([]);
        getUser(userId);
        let params = 'userId=' + userId;
        getStories(params);
        getUserFollowings(userId);
    }, [userId]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const goToStoryPage = (story) => {
        navigate('/story/' + story.id);
    }

    const loadMore = () => {
        let params = 'userId=' + userId;
        if (storiesPagination) {
            params += '&page=' + (storiesPagination.currentPage + 1);
            params += '&limit=' + storiesPagination.limit;
        }
        setIsLoading(true);
        getStories(params).then(() => {
            setIsLoading(false);
        });
    }

    return (
        <Box>
            <UserImagesDetail
            user={otherUser}
            />
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                    <Container>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <TabList onChange={handleChange} aria-label="lab API tabs">
                                <Tab label="About" value="1" />
                                <Tab label="Conversations" value="2" />
                                <Tab label="Following" value="3" />
                            </TabList>
                            <Box>
                                { otherUser?.id === user?.id && <Link to={'/profile/edit'} className={classes.linkText}><Button variant="contained" color="warning" size="small">Edit Profile</Button></Link> }
                            </Box>
                        </Stack>
                    </Container>
                </Box>
                <TabPanel value="1">
                    <UserAboutDetail
                        user={otherUser}
                        stories={stories}
                        followings={userFollowings}
                        goToStoryPage={goToStoryPage}
                        storiesPagination={storiesPagination}
                        isLoading={isLoading}
                        loadMore={loadMore}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <Container>
                    conversations will be come to the next scope work.
                    </Container>
                </TabPanel>
                <TabPanel value="3">
                    <UserFollowingDetail
                        followings={userFollowings}
                    />
                </TabPanel>
            </TabContext>
        </Box>
    );
}