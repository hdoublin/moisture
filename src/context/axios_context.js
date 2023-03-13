import React, { createContext, useContext, useState } from 'react';
import axios from "axios";
import { AuthContext } from './auth_context';
import apis from '../config/apis';

const AxiosContext = createContext();

const AxiosContextProvider = (props) => {

    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const axiosInstance = axios.create({
        baseURL: apis.baseUrl,
        headers: {
            "x-access-token": token
        }

    });

    const providerValue = {
        axiosInstance,
        loading,
        setLoading
    }

    return (
        <AxiosContext.Provider value={providerValue}>
            {props.children}
        </AxiosContext.Provider>
    );

}

export {
    AxiosContext, AxiosContextProvider
}