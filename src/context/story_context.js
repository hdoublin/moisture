import React, { createContext, useContext, useState } from 'react';
import { AxiosContext } from './axios_context';
import apis from '../config/apis';
import Config from '../config/config';

const StoryContext = createContext();

const StoryContextProvider = (props) => {

    const { axiosInstance } = useContext(AxiosContext);
    const [currentStory, setCurrentStory] = useState(Config.defaultStoryInfo);
    const [currentStoryPart, setCurrentStoryPart] = useState(Config.defaultWriteInfo);
    const [myStories, setMyStories] = useState([]);
    const [myStoriesPagination, setMyStoriesPagination] = useState(null);
    const [paidStories, setPaidStories] = useState([]);
    const [stories, setStories] = useState([]);
    const [storiesPagination, setStoriesPagination] = useState(null);
    const [recommendStories, setRecommendStories] = useState([]);

    const createStory = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.story,
            data
        }).then(response => {
            setCurrentStory(response.data.data.story);
            setCurrentStoryPart(response.data.data.storyPart);
            return response.data;
        });
    }

    const getStory = (storyId) => {
        return axiosInstance({
            method: 'GET',
            url: apis.story + '/' + storyId,
        }).then(response => {              
            if (response.data.data.story) {
                setCurrentStory(response.data.data.story);
            }
            return response.data;
        });
    }

    const updateStory = (data) => {
        return axiosInstance({
            method: 'PUT',
            url: apis.story + '/' + data.id,
            data
        }).then(response => {             
            setCurrentStory(response.data.data.story);
            return response.data;
        });
    }

    const getStoryPart = (storyPartId) => {
        return axiosInstance({
            method: 'GET',
            url: apis.storyPart + '/' + storyPartId,
        }).then(response => {              
            if (response.data.data.storyPart) {
                setCurrentStoryPart(response.data.data.storyPart);
                setCurrentStory(response.data.data.storyPart.story);
            }
            return response.data;
        });
    }

    const updateStoryPart = (data) => {
        return axiosInstance({
            method: 'PUT',
            url: apis.storyPart + '/' + data.id,
            data
        }).then(response => {              
            setCurrentStoryPart(response.data.data.storyPart);
            return response.data;
        });
    }
    
    const getMyStories = (params = '') => {
        return axiosInstance({
            method: 'GET',
            url: apis.stories + '/my?' + params,
        }).then(response => {           
            if (response.data.status) {
                const pagination = response.data.data.pagination;
                let items = [];
                if (pagination?.currentPage > 1) {
                    items = myStories;
                }                    
                items.push(...response.data.data.stories);
                setMyStories(items);
                setMyStoriesPagination(pagination);
            }
            return response.data;
        });
    }

    const deleteStory = (id) => {
        return axiosInstance({
            method: 'DELETE',
            url: apis.story + '/' + id,
        }).then(response => {           
            return response.data;
        });
    }

    const deleteStoryPart = (id) => {
        return axiosInstance({
            method: 'DELETE',
            url: apis.storyPart + '/' + id,
        }).then(response => {           
            return response.data;
        });
    }

    const creatStoryPart = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.storyPart,
            data
        }).then(response => {                
            return response.data;
        });
    }

    const getPaidStories = (params) => {
        return axiosInstance({
            method: 'GET',
            url: apis.stories + '/paid?' + params,
        }).then(response => {           
            if (response.data.status) {
                setPaidStories(response.data.data.stories);
            }
            return response.data;
        });
    }

    const getStories = (params) => {
        return axiosInstance({
            method: 'GET',
            url: apis.stories + '?' + params,
        }).then(response => {           
            if (response.data.status) {
                const pagination = response.data.data.pagination;
                let items = [];
                if (pagination?.currentPage > 1) {
                    items = stories;
                }                    
                items.push(...response.data.data.stories);
                setStories(items);
                setStoriesPagination(pagination);
            }
            return response.data;
        });
    }

    const getRecommendStories = (storyId) => {
        return axiosInstance({
            method: 'GET',
            url: apis.stories + '/recommend/' + storyId,
        }).then(response => {           
            if (response.data.status) {
                setRecommendStories(response.data.data.stories);
            }
            return response.data;
        });
    }

    const vote = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.storyPart + '/vote',
            data
        }).then(response => {                
            return response.data;
        });
    }

    const view = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.storyPart + '/view',
            data
        }).then(response => {                
            return response.data;
        });
    }

    const providerValue = {
        createStory,
        getStory,
        updateStory,
        creatStoryPart,
        getStoryPart,
        updateStoryPart,
        getMyStories,
        deleteStory,
        deleteStoryPart,
        myStories,
        setMyStories,
        myStoriesPagination,
        setMyStoriesPagination,
        currentStory,
        currentStoryPart,
        setCurrentStory,
        setCurrentStoryPart,
        getPaidStories,
        getStories,
        paidStories,
        stories,
        setStories,
        storiesPagination,
        getRecommendStories,
        recommendStories,
        vote,
        view,
    }

    return (
        <StoryContext.Provider value={providerValue}>
            {props.children}
        </StoryContext.Provider>
    );

}

export {
    StoryContext, StoryContextProvider
}