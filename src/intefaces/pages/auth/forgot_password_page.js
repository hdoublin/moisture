import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Card,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context';

export default function ForgotPasswordPage() {

  const navigate = useNavigate();
  const { forgotPassword } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      email: data.get('email')
    };
    setLoading(true);
    const result = await forgotPassword(submitData);
    console.log(result);
    setLoading(false);
    // navigate('/auth/reset-password');
  };

  return (
    <Container maxWidth="sm">
      <Card
            sx={{ my: 8, mx: 4,display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
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
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Submit
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/login" variant="body2">
                   Go to Login Page
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/register" variant="body2">
                  Go to Register Page
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Card>
    </Container>
  );
}