import React, { createContext, useContext, useState } from 'react';
import { AxiosContext } from './axios_context';
import apis from '../config/apis';

const CategoryContext = createContext();

const CategoryContextProvider = (props) => {

    const { axiosInstance } = useContext(AxiosContext);
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        return axiosInstance({
            method: 'GET',
            url: apis.categories,
        }).then(response => {
            if (response.data.status) {
                setCategories(response.data.data);
            }
            return response.data.data;
        });
    }

    const providerValue = {
        getCategories,
        categories,
    }

    return (
        <CategoryContext.Provider value={providerValue}>
            {props.children}
        </CategoryContext.Provider>
    );

}

export {
    CategoryContext, CategoryContextProvider
}