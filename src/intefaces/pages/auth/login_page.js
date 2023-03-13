import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context';
import { SocialAuth } from '../../components';
import config from '../../../config/config';

export default function LoginPage() {

  const navigate = useNavigate();
  const { login, socialAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    setLoading(true);
    const user = await login(loginData);
    setLoading(false);
    if (user.token) {
      // window.location.href = window.location.protocol + '//' + window.location.host;
      navigate('/');
    } else {
      toast(user);
    }
  };

  const onResponseGoogleFailure = (response) => {
    // toast('Something is wrong');
    console.log(response);
  }

  const onResponseGoogle = async(response) => {
    const { email, familyName, givenName, googleId, imageUrl, name } = response.profileObj;
    const postData = {
      email: email,
      firstName: givenName,
      lastName: familyName,
      fullName: name,
      imageUrl: imageUrl.split('?')[0],
      provider: config.auth.provider.google,
      providerId: googleId,
    };
    setLoading(true);
    const user = await socialAuth(postData);
    setLoading(false);
    if (user.token) {
      window.location.href = window.location.protocol + '//' + window.location.host;
    } else {
      toast(user);
    }
  }

  const onResponseFacebookFailure = (response) => {
    // toast('Something is wrong');
    console.log(response);
  }

  const onResponseFacebook = async(response) => {
    const { email, id, name, picture } = response;
    const postData = {
      email: email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      fullName: name,
      imageUrl: picture?.data?.url.split('?')[0],
      provider: config.auth.provider.facebook,
      providerId: id,
    };
    setLoading(true);
    const user = await socialAuth(postData);
    setLoading(false);
    if (user.token) {
      window.location.href = window.location.protocol + '//' + window.location.host;
    } else {
      toast(user);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="/auth/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/auth/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <SocialAuth 
                  onResponseGoogle={onResponseGoogle} 
                  onResponseGoogleFailure={onResponseGoogleFailure} 
                  onResponseFacebook={onResponseFacebook}
                  onResponseFacebookFailure={onResponseFacebookFailure}
                  isLogin={true}
                />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}