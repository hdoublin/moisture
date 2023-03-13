import React from 'react';
import { Box, Typography, Stack, Card, Avatar, Button, Container, Grid, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FmdGood, InsertLink } from '@mui/icons-material';
import Helper from '../../../../utils/helpers';
import { StoryFilterDetail, LoadMoreButton } from '../..';
import { Link } from 'react-router-dom';

export default function UserFollowingDetail(props) {

    const { followings } = props;

    const defaultBackgroundImage = require('../../../../assets/images/user-background.jpg');


    const useStyles = makeStyles({
        detailBox: {
            padding: '0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 130px',
            paddingTop: '70px',
        },
        linkText: {
            textDecoration: 'none',
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold',
        },
    });
    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={3}>
                {followings?.map((follow, index) => (
                    <Grid item md={4} key={'user-follow-index-' + index}>
                        <Card className={classes.detailBox} style={{ backgroundImage: follow?.follower?.backgroundImage ? 'url(' + follow?.follower?.backgroundImage + ')' : 'url(' + defaultBackgroundImage + ')' }}>
                            <Stack
                                direction="column"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                            >
                                {follow?.follower?.imageUrl ? <img
                                    alt={follow?.follower?.fullName}
                                    src={follow?.follower?.imageUrl}
                                    style={{ width: 90, height: 90, borderRadius: '50%' }}
                                /> : <Avatar
                                    sx={{ width: 80, height: 80 }}
                                />}
                                <Link to={'/users/' + follow?.followerId} className={classes.linkText}>
                                    {follow?.follower?.fullName}
                                </Link>
                                <Stack
                                    direction="row"
                                    sx={{ backgroundColor: '#f0fbfb', width: '100%', paddingY: 1}}
                                    justifyContent="space-between"
                                >
                                    <Box sx={{textAlign: 'center', paddingLeft: '10px'}}>
                                        <Typography color="GrayText">0</Typography>
                                        <Typography variant="caption" color="GrayText">Works</Typography>
                                    </Box>
                                    <Box sx={{textAlign: 'center'}}>
                                    <Typography color="GrayText">0</Typography>
                                        <Typography variant="caption" color="GrayText">Works</Typography>
                                    </Box>
                                    <Box sx={{textAlign: 'center', paddingRight: '10px'}}>
                                    <Typography color="GrayText">0</Typography>
                                        <Typography variant="caption" color="GrayText">Works</Typography>
                                    </Box>
                                </Stack>
                            </Stack>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}