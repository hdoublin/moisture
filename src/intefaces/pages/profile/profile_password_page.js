import React, { useEffect, useContext, useState } from 'react';
import {
    Box, Typography, Button, Card, TextField, Container, Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

import { UserContext, AuthContext, StoryContext } from '../../../context';
import { UserImagesDetail, UserAboutDetail, UserFollowingDetail, UserFilterLists, UserSkeletonDetail } from '../../components';
import { toast } from 'react-toastify';

export default function ProfilePasswordPage() {

    const navigate = useNavigate();

    const useStyles = makeStyles({
        linkText: {
            textDecoration: 'none',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        cardWrapper: {
            padding: '10px',
            margin: '20px',
        },
    });
    const classes = useStyles();

    const { token, user, updatePassword } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [formValue, setFormValue] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const inputHandler = (e) => {
        let data = { ...formValue };
        const target = e.target;
        data[target.name] = target.value;
        setFormValue(data);
    }

    const onSave = () => {
        if (!formValue.oldPassword) {
            toast('Please input the current password');
            return;
        }
        if (!formValue.newPassword) {
            toast('Please input the new password');
            return;
        }
        if (!formValue.confirmPassword) {
            toast('Please input the confirm password');
            return;
        }
        if (formValue.newPassword !== formValue.confirmPassword) {
            toast('Please confirm password');
            return;
        }
        setIsLoading(true);
        updatePassword(formValue).then(res => {
            setIsLoading(false);
            toast(res.data);
        });
    }

    const onCancel = () => {
        navigate('/profile/edit');
    }

    return (
        <Box>
            <Container>
                <Card className={classes.cardWrapper}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="oldPassword"
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                        value={formValue?.oldPassword}
                        onChange={(event) => inputHandler(event)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={formValue?.newPassword}
                        onChange={(event) => inputHandler(event)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formValue?.confirmPassword}
                        onChange={(event) => inputHandler(event)}
                    />
                    <Stack
                        spacing={2}
                        direction="row"
                        sx={{ marginTop: '10px' }}
                    >
                        {!isLoading && <Button variant="contained" color="warning" onClick={onSave}>Update Password</Button>}
                        <Button variant="contained" color="inherit" onClick={onCancel}>Cancel</Button>
                    </Stack>
                </Card>
            </Container>
        </Box>
    );
}