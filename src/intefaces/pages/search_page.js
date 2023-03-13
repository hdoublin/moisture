import React, { useEffect, useContext, useState } from 'react';
import {
  Box, Typography, Button, Card, Tab, Grid
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { SearchContext, UserContext, AuthContext } from '../../context';
import { StoryFilter, StoryFilterLists, StorySkeletonDetail, UserFilterLists, UserSkeletonDetail } from '../components';

export default function SearchPage() {

  const navigate = useNavigate();
  const { queryText } = useParams();
  const {
    searchStories,
    searchPeople,
    setFilterStories,
    setFilterUsers,
    filterStories,
    filterUsers,
    filterStoriesPagination,
    filterUsersPagination,
  } = useContext(SearchContext);
  const { follow, getMyFollowings, myFollowings } = useContext(UserContext);
  const { token, user } = useContext(AuthContext);

  const [value, setValue] = useState('1');
  const [params, setParams] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(false);

  useEffect(() => {
    setIsFirstLoading(true);
    setFilterStories([]);
    setFilterUsers([]);
    searchStories(queryText).then(() => {
      setIsFirstLoading(false);
    });
    searchPeople(queryText);
  }, [queryText]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getStoriesCount = () => {
    if (filterStoriesPagination?.totalCount > 999) {
      return Math.round(filterStoriesPagination.totalCount / 1000) + ' K results';
    }
    if (filterStoriesPagination?.totalCount) {
      return filterStoriesPagination?.totalCount + ' results';
    }
    return '';
  }

  const getUsersCount = () => {
    if (filterUsersPagination?.totalCount > 999) {
      return Math.round(filterUsersPagination.totalCount / 1000) + ' K results';
    }
    if (filterUsersPagination?.totalCount) {
      return filterUsersPagination?.totalCount + ' results';
    }
    return '';
  }

  const onSetQuery = (p) => {
    setParams(p);
    setFilterStories([]);
    setIsFirstLoading(true);
    searchStories(queryText, p).then(() => {
      setIsFirstLoading(false);
    });
  }

  const loadMoreStories = () => {
    let p = '';
    if (filterStoriesPagination) {
      p += '&page=' + (filterStoriesPagination.currentPage + 1);
      p += '&limit=' + filterStoriesPagination.limit;
    }
    setIsLoading(true);
    searchStories(queryText, p).then(() => {
      setIsLoading(false);
    });
  }

  const loadMoreUsers = () => {
    let p = '';
    if (filterUsersPagination) {
      p += '&page=' + (filterUsersPagination.currentPage + 1);
      p += '&limit=' + filterUsersPagination.limit;
    }
    searchStories(queryText, p);
  }

  const loadingStories = () => {
    var skeletons = [];
    for (let i = 0; i < 3; i++) {
      skeletons.push(<Card key={'story-loading-index-' + i} sx={{ padding: '5px', marginBottom: 2 }}><StorySkeletonDetail /></Card>);
    }
    return skeletons;
  }

  const loadingUsers = () => {
    var skeletons = [];
    for (let i = 0; i < 5; i++) {
      skeletons.push(<Card key={'user-loading-index-' + i} sx={{ padding: '5px', marginBottom: 2 }}><UserSkeletonDetail /></Card>);
    }
    return skeletons;
  }

  const goToStoryPage = (story) => {
    navigate('/story/' + story.id);
  }

  const tryfollow = (info) => {
    if (!token) {
        navigate('/auth/login');
        return;
    }
    const data = {
        ...info,
        userId: user?.id,
    };
    follow(data).then(() => {
        getMyFollowings();
        toast(info.isFollow ? 'You followed this user!' : 'You unfollowed this user!');
    });
}

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX: 2, marginY: 2 }}>
          <TabList onChange={handleChange} aria-label="lab API tabs">
            <Tab label="Stories" value="1" />
            <Tab label="Profiles" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Typography variant="h5">"{queryText}"</Typography>
              <Typography variant="subtitle2">{getStoriesCount()}</Typography>
              <StoryFilter
                onSetQuery={onSetQuery}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              {filterStories?.length > 0 && <StoryFilterLists
                stories={filterStories}
                storiesPagination={filterStoriesPagination}
                isLoading={isLoading}
                loadMore={loadMoreStories}
                goToStoryPage={goToStoryPage}
              />}
              {isFirstLoading && loadingStories()}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Typography variant="h5">"{queryText}"</Typography>
              <Typography variant="subtitle2">{getUsersCount()}</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              {filterUsers?.length > 0 && <UserFilterLists
                users={filterUsers}
                usersPagination={filterUsersPagination}
                isLoading={isLoading}
                loadMore={loadMoreUsers}
                follow={tryfollow}
                followings={myFollowings}
                myInfo={user}
              />}
              {isFirstLoading && loadingUsers()}
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
}