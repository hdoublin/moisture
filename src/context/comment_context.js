import React, { createContext, useContext, useState } from 'react';
import { AxiosContext } from './axios_context';
import apis from '../config/apis';

const CommentContext = createContext();

const CommentContextProvider = (props) => {

    const { axiosInstance } = useContext(AxiosContext);
    const [storyPartComments, setStoryPartComments] = useState([]);

    const getStoryPartComments = (storyPartId) => {
        return axiosInstance({
            method: 'GET',
            url: apis.storyPart + '/comments/' + storyPartId,
        }).then(response => {
            if (response.data.status) {
                setStoryPartComments(response.data.data.comments);
            }
            return response.data.data;
        });
    }

    const storyPartComment = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.storyPart + '/comments',
            data: data
        }).then(response => {
            if (response.data.status) {
                
            }
            return response.data.data;
        });
    }

    const storyPartReply = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.storyPart + '/reply',
            data: data
        }).then(response => {
            if (response.data.status) {
                
            }
            return response.data.data;
        });
    }

    const providerValue = {
        storyPartComments,
        setStoryPartComments,
        storyPartComment,
        getStoryPartComments,
        storyPartReply,
    }

    return (
        <CommentContext.Provider value={providerValue}>
            {props.children}
        </CommentContext.Provider>
    );

}

export {
    CommentContext, CommentContextProvider
}