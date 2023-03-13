import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import apis from '../config/apis';

const AuthContext = createContext(undefined);

const AuthContextProvider = (props) => {

    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [cookies, setCookies, removeCookie] = useCookies(['token']);

    const axiosInstance = axios.create({
        baseURL: apis.baseUrl,
        headers: {
            "x-access-token": token
        }
    });

    useEffect(()=> {
        setToken(cookies.token);
        if (token) {
            getMyInfo().then(res => {
                const data = res;
                if (data.status) {
                    setUser(data.data);
                }
            });
        }
    }, [token]);

    const getToken = () => {
        return cookies.token;
    }

    const login = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.login,
            data
        }).then((response) => {
            const data = response.data;
            if (data.status) {
                setUser(data.data);
                saveToken(data.data.token);
            }
            return data.data;
        })
    }

    const register = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.register,
            data
        }).then((response) => {
            const data = response.data;
            if (data.status) {
                setUser(data.data);
                saveToken(data.data.token);
            }
            return data.data;
        })
    }

    const socialAuth = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.socialAuth,
            data
        }).then((response) => {
            const data = response.data;
            if (data.status) {
                setUser(data.data);
                saveToken(data.data.token);
            }
            return data.data;
        });
    }

    const getMyInfo = () => {
        return axiosInstance({
            method: 'GET',
            url: apis.myInfo,
        }).then(response => {
            if (response.data.status) {
                setUser(response.data.data);
            }
            return response.data;
        });
    }

    const updatePassword = (data) => {
        return axiosInstance({
            method: 'PUT',
            url: apis.users + '/password/' + user.id,
            data
        }).then(response => {
            return response.data;
        });
    }

    const saveToken = (token) => {
        setToken(token);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+10);
        setCookies('token', token, { expires: tomorrow });
    }

    const logout = () => {
        setToken('');
        setUser(null);
        removeCookie('token');
        deleteAllCookies();        
    }

    const forgotPassword = (data) => {
        return axiosInstance({
            method: 'POST',
            url: apis.forgotPassword,
            data
        }).then((response) => {
            const data = response.data;
            return data.data;
        })
    }

    const deleteAllCookies = () => {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    }

    const providerValue = {
        token,
        user,
        getToken,
        login,
        register,
        socialAuth,
        logout,
        getMyInfo,
        updatePassword,
        forgotPassword,
    }

    return (
        <AuthContext.Provider value={providerValue}>
            {props.children}
        </AuthContext.Provider>
    );

}

export {
    AuthContext, AuthContextProvider
}