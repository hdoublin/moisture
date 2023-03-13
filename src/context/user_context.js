import React, { createContext, useContext, useState } from 'react';
import { AxiosContext } from './axios_context';
import apis from '../config/apis';

const UserContext = createContext();

const UserContextProvider = (props) => {

    const { axiosInstance } = useContext(AxiosContext);
    const [myFollowings, setMyFollowings] = useState([]);
    const [userFollowings, setUserFollowings] = useState([]);
    const [otherUser, setOtherUser] = useState(null);

    const getUser = (userId) => {
        return axiosInstance({
            method: 'GET',
            url: apis.users + '/' + userId,
        }).then(response => {
            if (response.data.status) {
                setOtherUser(response.data.data);
            }
            return response.data;
        });
    }

    const getMyFollowings = () => {
        return axiosInstance({
            method: 'GET',
            url: apis.users + '/follow/my',
        }).then(response => {
            if (response.data.status) {
                setMyFollowings(response.data.data.followers);
            }
            return response.data;
        });
    }

    const getUserFollowings = (userId) => {
        return axiosInstance({
            method: 'GET',
            url: apis.users + '/follow/' + userId,
        }).then(response => {
            if (response.data.status) {
                setUserFollowings(response.data.data.followers);
            }
            return response.data;
        });
    }

    const follow = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.users + '/follow',
            data: data
        }).then(response => {
            return response.data;
        });
    }

    const updateUser = (data) => {
        return axiosInstance({
            method: 'PUT',
            url: apis.users + '/' + data.id,
            data
        }).then(response => {
            return response.data;
        });
    }

    const providerValue = {
        getUser,
        getUserFollowings,
        follow,
        getMyFollowings,
        myFollowings,
        otherUser,
        userFollowings,
        setUserFollowings,
        updateUser,
    }

    return (
        <UserContext.Provider value={providerValue}>
            {props.children}
        </UserContext.Provider>
    );

}

export {
    UserContext, UserContextProvider
}