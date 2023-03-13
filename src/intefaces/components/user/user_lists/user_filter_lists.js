import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { UserFilterDetail, LoadMoreButton } from '../..';

export default function UserFilterLists(props) {

    const { users, usersPagination, isLoading, loadMore, followings, follow, myInfo } = props;

    const checkFollow = (user) => {
        console.log(myInfo)
        let f = followings?.filter((item) => item.followerId == user?.id);
        if (f.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const tryFollow = (user, isFollow) => {
        const data = {
            followerId: user.id,
            isFollow: !isFollow
        };
        follow(data);
    }

    return (
        <Box sx={{ marginBottom: 2 }}>
            {users.map((user, index) => (
                <UserFilterDetail
                    user={user}
                    index={index}
                    key={'user-filter-index-' + index}
                    isFollow={checkFollow(user)}
                    follow={()=>tryFollow(user, checkFollow(user))}
                    isMe={myInfo?.id == user?.id}
                />
            ))}
            {usersPagination?.isNextPage && <LoadMoreButton isLoading={isLoading} loadMore={loadMore}/>}
        </Box>
    );
}