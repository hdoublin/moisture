import React from "react";
import { Box, CircularProgress, Button } from '@mui/material';

export default function LoadMoreButton(props) {

    const { isLoading, loadMore } = props;

    return (
        <Box sx={{ textAlign: 'center', marginTop: 1 }}>
                { !isLoading && <Button variant="contained" color="warning" onClick={loadMore}>Load More</Button> }
                { isLoading && <CircularProgress color="warning" /> }
        </Box>
    );
}