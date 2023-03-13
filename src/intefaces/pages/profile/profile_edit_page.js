import React, { useEffect, useContext, useState } from 'react';
import {
    Box, Typography, Button, Card, TextField, Container, Stack, Avatar, IconButton
} from '@mui/material';
import { toast } from 'react-toastify';
import { PhotoCamera } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

import { UserContext, AuthContext, ServiceContext } from '../../../context';
import config from '../../../config/config';

export default function ProfileEditPage() {

    const navigate = useNavigate();

    const { user, getMyInfo } = useContext(AuthContext);
    const { updateUser } = useContext(UserContext);
    const { uploadImage } = useContext(ServiceContext);

    const [isLoading, setIsLoading] = useState(false);
    const [formValue, setFormValue] = useState(null);

    const defaultBackgroundImage = require('../../../assets/images/user-background.jpg');

    const useStyles = makeStyles({
        detailBox: {
            marginBottom: '20px',
            backgroundImage: formValue?.backgroundImage ? 'url(' + formValue?.backgroundImage + ')' : 'url(' + defaultBackgroundImage + ')',
            paddingTop: '50px',
            paddingBottom: '50px',
            backgroundSize: 'cover',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        linkText: {
            textDecoration: 'none',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        cardWrapper: {
            padding: '10px',
            marginBottom: '20px',
        },
    });
    const classes = useStyles();

    useEffect(() => {
        if (user) {
            setFormValue(user);
        }
    }, [user]);

    const inputHandler = (e) => {
        let data = { ...formValue };
        const target = e.target;
        data[target.name] = target.value;
        setFormValue(data);
    }

    const onSave = () => {
        setIsLoading(true);
        updateUser(formValue).then(() => {
            setIsLoading(false);
            getMyInfo();
        });
    }

    const onChangePassword = () => {
        navigate('/profile/change-password');
    }

    const uploadFile = (event, targetName) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0];
        if (file.size > config.uploadMaxSize.image) {
            toast('Please upload image less than ' + config.uploadMaxSize.image / 1000000 + 'MB.');
            return;
        }
        let reader = new FileReader();

        reader.onloadend = () => {
            uploadImage({ base64: reader.result }).then((response) => {
                let data = { ...formValue };
                data[targetName] = response.data;
                setFormValue(data);
            });

        }
        reader.onerror = (error) => {
            console.log(error);
        }
        reader.readAsDataURL(file);
    }

    return (
        <Box>
            <Card className={classes.detailBox}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <label htmlFor="contained-button-file">
                        <input accept="image/*" id="contained-button-file" type="file" style={{ display: 'none' }} onChange={(e) => uploadFile(e, 'backgroundImage')} />
                        <Button variant="contained" component="span" size="small" color="warning" startIcon={<PhotoCamera />}>
                            Change Background Image
                        </Button>
                    </label>
                    {formValue?.imageUrl ? <img
                        alt={formValue?.firstName}
                        src={formValue?.imageUrl}
                        style={{ width: 90, height: 90, borderRadius: '50%', marginTop: '10px', marginBottom: '10px' }}
                    /> : <Avatar
                        sx={{ width: 80, height: 80, mt: '10px', mb: '10px' }}
                    />}
                    <label htmlFor="icon-button-file">
                        <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={(e) => uploadFile(e, 'imageUrl')} />
                        <IconButton color="warning" aria-label="upload picture" component="span" size="large">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Typography variant="h6" color="white">{formValue?.firstName + ' ' + formValue?.lastName}</Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Stack
                            direction="column"
                            spacing={0.5}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }} color="white">{formValue?.totalStories}</Typography>
                            <Typography variant="body2" color="white">Stories</Typography>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={0.5}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }} color="white">{formValue?.followers}</Typography>
                            <Typography variant="body2" color="white">Followers</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
            <Container>
                {formValue && <Card className={classes.cardWrapper}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={formValue?.firstName}
                        onChange={(event) => inputHandler(event)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={formValue?.lastName}
                        onChange={(event) => inputHandler(event)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="about"
                        label="About"
                        name="about"
                        value={formValue?.about}
                        multiline={true}
                        rows={5}
                        onChange={(event) => inputHandler(event)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        value={formValue?.location}
                        onChange={(event) => inputHandler(event)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="website"
                        label="WebSite"
                        name="website"
                        value={formValue?.website}
                        onChange={(event) => inputHandler(event)}
                    />
                    <Stack
                        spacing={2}
                        sx={{ marginTop: '10px' }}
                    >
                        {!isLoading && <Button variant="contained" color="warning" onClick={onSave}>Save Changes</Button>}
                        <Button variant="contained" color="warning" onClick={onChangePassword}>Change Password</Button>
                    </Stack>
                </Card>}
            </Container>
        </Box>
    );
}