import React, {useContext} from 'react';
import {AppBar,Box,Toolbar, Typography, Button, IconButton, Container  } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { AxiosContext } from '../../../context';

export default function MyStoryHeader(props) {
  const {data, handler} = props;
  const { loading } = useContext(AxiosContext);
  const navigate = useNavigate();
    const useStyles = makeStyles({
        root: {
          backgroundColor: 'white !important',
          top: '70px !important'
        }
      });
      const classes = useStyles();

  const goBack = () => {
    if (loading) {
      return;
    }
    navigate('/mystories');
  }    
  
  return (
    <Box>
      <AppBar position="fixed" className={classes.root}>
      <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>goBack()}
          >
            <ArrowBack />
          </IconButton>
          <Box sx={{ flexGrow: 1, color: 'black' }}>
            <Typography variant="subtitle2" component="div">
                Add story Info
            </Typography>
            <Typography variant="h6" component="div">
                { data.title ? data.title : "Untitled Story" }
            </Typography>
          </Box>
          
          <Button color="primary" variant='contained' onClick={()=>goBack()}>Cancel</Button>
           <Button color="error" variant='contained' sx={{marginLeft: 2}} onClick={()=>handler()}>Save</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}