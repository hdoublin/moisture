import { useState, useContext, useEffect } from 'react';
import {
    Container, Box, Typography, Button, Card, Tab
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Add } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosContext, StoryContext, AuthContext } from '../../../context';
import config from '../../../config/config';
import { toast } from 'react-toastify';
import { StoryItem, LoadMoreButton } from '../../components';

export default function MyStoriesPage() {

    const { getMyStories, myStories, deleteStory, creatStoryPart, myStoriesPagination, setMyStories, setMyStoriesPagination } = useContext(StoryContext);
    const { token } = useContext(AuthContext);
    const { setLoading } = useContext(AxiosContext);

    const navigate = useNavigate();

    const [value, setValue] = useState('1');
    const [isLoading, setIsLoading] = useState(false);

    const useStyles = makeStyles({
        linkText: {
            textDecoration: 'none',
            color: 'black'
        },
    });

    const classes = useStyles();

    useEffect(() => {
        if (token) {
            setMyStories([]);
            setMyStoriesPagination(null);
            getMyStories();
        }
    }, [token]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteHandler = (story) => {
        setLoading(true);
        deleteStory(story.id).then(() => {
            getMyStories().then(() => {
                setLoading(false);
                toast('Successfully deleted!');
            });
        });
    }

    const createHandler = (story) => {
        const data = {
            storyId: story.id,
            ...config.defaultWriteInfo
        };
        setLoading(true);
        creatStoryPart(data).then((response) => {
            setLoading(false);
            if (response.status) {
                navigate('/mystories/write/' + response.data.storyPart.id);
            }
        })
    }

    const loadMore = () => {
        let params = '';
        if (myStoriesPagination) {
            params += '&page=' + (myStoriesPagination.currentPage + 1);
            params += '&limit=' + myStoriesPagination.limit;
        }
        setIsLoading(true);
        getMyStories(params).then(() => {
            setIsLoading(false);
        });
    }


    return (
        <Container >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Typography variant='h5'>My Stories</Typography>
                <Link to='/mystories/new' className={classes.linkText}>
                    <Button variant="contained" color="secondary" startIcon={<Add />} size="small">
                        New Story
                    </Button>
                </Link>
            </Box>
            <Card variant="elevation" sx={{ marginY: 2 }}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs">
                                <Tab label={"All Stories (" + (myStoriesPagination?.totalCount ? myStoriesPagination.totalCount : '') + ")"} value="1" />
                                {/* <Tab label="Item Two" value="2" />
                                <Tab label="Item Three" value="3" /> */}
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box sx={{ paddingLeft: 4, paddingRight: 1 }}>

                                {myStories.map(story => (
                                    <StoryItem key={"story-my-index" + story.id} story={story} deleteHandler={deleteHandler} createHandler={createHandler} />
                                ))}
                            </Box>
                            {myStoriesPagination?.isNextPage && <LoadMoreButton isLoading={isLoading} loadMore={loadMore}/>}
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Box>
            </Card>
        </Container>
    );
}