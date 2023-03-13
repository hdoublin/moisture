import { useState, useContext, useEffect } from 'react';
import {
    Container, Box, Typography, Button, Card, Tab, Grid
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams, Link } from "react-router-dom";
import { AxiosContext, StoryContext, AuthContext, CategoryContext } from '../../../context';
import config from '../../../config/config';
import { toast } from 'react-toastify';
import { StoryHottestLists, StoryLists, StorySkeletonDetail } from '../../components';

export default function CategoryStoriesPage() {

    const navigate = useNavigate();
    const { categorySlug } = useParams();

    const { categories } = useContext(CategoryContext);
    const { getPaidStories, paidStories, getStories, stories, storiesPagination, setStories } = useContext(StoryContext);

    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstLoading, setFirstIsLoading] = useState(false);
    const [orderBy, setOrderBy] = useState('HOT');

    useEffect(() => {
        setStories([]);
        if (categories.length > 0) {
            let c = categories.filter(item => item.slug === categorySlug);
            if (c.length > 0) {
                setCategory(c[0]);
                let params = 'categoryId=' + c[0].id;
                getPaidStories(params);
                setFirstIsLoading(true);
                getStories(params).then(() => {
                    setFirstIsLoading(false);
                });
            }
        }
    }, [categories, categorySlug]);

    const changeOrderBy = (orderBy) => {
        setOrderBy(orderBy);
        const o = orderBy === 'HOT' ? 'totalVotes' : 'updatedAt';
        let params = 'categoryId=' + category.id + '&orderBy=' + o;
        setIsLoading(true);
        getStories(params).then(() => {
            setIsLoading(false);
        });
    }

    const loadMore = () => {
        let params = 'categoryId=' + category.id + '&orderBy=' + orderBy;
        if (storiesPagination) {
            params += '&page=' + (storiesPagination.currentPage + 1);
            params += '&limit=' + storiesPagination.limit;
        }
        setIsLoading(true);
        getStories(params).then(() => {
            setIsLoading(false);
        });
    }

    const loadingStories = () => {
        var skeletons = [];
        for (let i = 0; i < 6; i++) {
            skeletons.push(<Grid item xs={12} md={6} key={'story-loading-index-' + i}>
                <StorySkeletonDetail />
            </Grid>);
        }
        return skeletons;
    }

    const goToStoryPage = (story) => {
        navigate('/story/' + story.id);
    }

    const goToTagsStories = (tag) => {
        navigate('/stories/tags/' + tag);
    }


    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                <Typography variant='h4'>{category?.name}</Typography>
            </Box>
            {paidStories?.length > 0 && <StoryHottestLists
                stories={paidStories}
                title={'Hottest Paid Stories'}
                description={'Read the stories we love'}
                goToStoryPage={goToStoryPage}
                goToTagsStories={goToTagsStories}
            />}
            <StoryLists
                stories={stories}
                storiesPagination={storiesPagination}
                changeOrderBy={changeOrderBy}
                isLoading={isLoading}
                orderBy={orderBy}
                loadMore={loadMore}
                goToStoryPage={goToStoryPage}
                goToTagsStories={goToTagsStories}
            />
            { isFirstLoading &&  <Card sx={{ padding: 2 }}>
                <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
                    {loadingStories()}
                </Grid>
            </Card> }
        </Container>
    );
}