import React from "react";
import { Box } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Facebook, Google } from '@mui/icons-material';
import config from '../../../config/config';
import '../../styles/custom_style.css';

export default function SocialAuth(props) {

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box>
                <GoogleLogin
                    clientId={config.social.google.clientId}
                    render={renderProps => (
                        <button className="social-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <Google sx={{ marginRight: '10px', color: '#1976d2' }} />
                            {props.isLogin ? "LOGIN WITH GOOGLE" : "REGISTER WITH GOOGLE"}
                        </button>
                    )}
                    onSuccess={props.onResponseGoogle}
                    onFailure={props.onResponseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                    prompt="select_account"
                />
            </Box>
            <Box>
                <FacebookLogin
                    appId={config.social.facebook.appId}
                    textButton={props.isLogin ? "LOGIN WITH FACEBOOK" : "REGISTER WITH FACEBOOK"}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={props.onResponseFacebook}
                    onFailure={props.onResponseFacebookFailure}
                    cssClass="social-button"
                    icon={<Facebook sx={{ marginRight: '10px', color: '#1976d2' }} />}
                />
            </Box>
        </Box>
    );
}