import React, { createContext, useContext, useState } from 'react';
import { AxiosContext } from './axios_context';
import apis from '../config/apis';

const ServiceContext = createContext();

const ServiceContextProvider = (props) => {

    const { axiosInstance } = useContext(AxiosContext);

    const uploadImage = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.uploadImage,
            data
        }).then(response => {
            console.log(response.data);
            return response.data;
        });
    }

    const uploadVideo = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.uploadVideo,
            data
        }).then(response => {
            console.log(response.data);
            return response.data;
        });
    }

    const providerValue = {
        uploadImage,
        uploadVideo,
    }

    return (
        <ServiceContext.Provider value={providerValue}>
            {props.children}
        </ServiceContext.Provider>
    );

}

export {
    ServiceContext, ServiceContextProvider
}