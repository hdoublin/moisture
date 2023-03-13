import React, { createContext, useContext, useState } from 'react';
import { AxiosContext } from './axios_context';
import apis from '../config/apis';

const SearchContext = createContext();

const SearchContextProvider = (props) => {

    const { axiosInstance } = useContext(AxiosContext);
    const [searchText, setSearchText] = useState('');
    const [filterStories, setFilterStories] = useState([]);
    const [filterStoriesPagination, setFilterStoriesPagination] = useState(null);
    const [filterUsers, setFilterUsers] = useState([]);
    const [filterUsersPagination, setFilterUsersPagination] = useState(null);

    const searchStories = (text, params=null) => {
        setSearchText(text);
        return axiosInstance({
            method: 'GET',
            url: apis.search + '/stories/' + text + '?' + params,
        }).then(response => {
            if (response.data.status) {
                const pagination = response.data.data.pagination;
                let items = [];
                if (pagination?.currentPage > 1) {
                    items = filterStories;
                }                    
                items.push(...response.data.data.stories);
                setFilterStories(items);
                setFilterStoriesPagination(pagination);
            }
            return response.data;
        });
    }

    const searchPeople = (text, params=null) => {
        setSearchText(text);
        return axiosInstance({
            method: 'GET',
            url: apis.search + '/people/' + text + '?' + params,
        }).then(response => {
            if (response.data.status) {
                const pagination = response.data.data.pagination;
                let items = [];
                if (pagination?.currentPage > 1) {
                    items = filterUsers;
                }                    
                items.push(...response.data.data.users);
                setFilterUsers(items);
                setFilterUsersPagination(pagination);
            }
            return response.data;
        });
    }

    const providerValue = {
        searchStories,
        searchPeople,
        setFilterStories,
        setFilterUsers,
        searchText,
        filterStories,
        filterUsers,
        filterStoriesPagination,
        filterUsersPagination
    }

    return (
        <SearchContext.Provider value={providerValue}>
            {props.children}
        </SearchContext.Provider>
    );

}

export {
    SearchContext, SearchContextProvider
}