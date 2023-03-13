import React, { useState, useContext, useEffect } from 'react';
import { Container, Box, Grid, Card, Tab, TextField, Button, FormControl, Typography, MenuItem, Select, InputLabel, Input, Switch, FormLabel, RadioGroup, FormControlLabel, Radio, Skeleton } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { MyStoryHeader, StoryPartItem } from '../../components';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { AxiosContext, ServiceContext, StoryContext, AuthContext, CategoryContext } from '../../../context';
import Config from '../../../config/config';

export default function EditStoryPage() {

  const { storyId } = useParams();

  const { setLoading, loading } = useContext(AxiosContext);
  const { uploadImage } = useContext(ServiceContext);
  const { token } = useContext(AuthContext);
  const { getStory, currentStory, setCurrentStory, updateStory, creatStoryPart, deleteStoryPart } = useContext(StoryContext);
  const { categories } = useContext(CategoryContext);
  const navigate = useNavigate();
  const bookSrc = require('../../../assets/images/story-cover.jpeg');

  const [preView, setPreView] = useState(null);
  const [tabValue, setTabValue] = useState('2');
  const [showTagBtn, setShowTagBtn] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [mount, setMount] = useState(false);

  const useStyles = makeStyles({
    inputStyle: {
      border: '1px solid #eee',
      padding: '0.5em 0.5em'
    },
  });

  const classes = useStyles();

  useEffect(() => {
    if (token) {
      getStory(storyId).then(response => {
        if (!response.data.story) {
          navigate('/mystories');
        }
        setMount(true);
      });
    }
  }, [token]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const inputHandler = (event) => {
    let storyInfo = { ...currentStory };
    const target = event.target;
    storyInfo[target.name] = target.value;
    if (target.name === 'rating') {
      storyInfo[target.name] = target.checked;
    }
    if (target.name === 'status') {
      storyInfo[target.name] = target.checked ? 'COMPLETED' : 'DRAFT';
    }
    if (target.name === 'currentTag' && target.value && target.value.includes(' ')) {
      const tag = target.value.replace(' ', '');
      if (!storyInfo.tags.includes(tag)) {
        storyInfo.tags.push(tag);
      }
      storyInfo[target.name] = '';
    }
    setCurrentStory(storyInfo);
  }

  const addMainCharacter = () => {
    let storyInfo = { ...currentStory };
    if (!storyInfo.mainCharacters.includes(storyInfo.currentMainCharacter)) {
      storyInfo.mainCharacters.push(storyInfo.currentMainCharacter);
    }
    storyInfo.currentMainCharacter = '';
    setCurrentStory(storyInfo);
  }

  const removeMainCharacter = (mainCharacter) => {
    let storyInfo = { ...currentStory };
    storyInfo.mainCharacters = storyInfo.mainCharacters.filter(item => item !== mainCharacter)
    setCurrentStory(storyInfo);
  }

  const removeTag = (tag) => {
    let storyInfo = { ...currentStory };
    if (storyInfo.tags.includes(tag)) {
      storyInfo.tags = storyInfo.tags.filter(item => item !== tag);
    }
    setCurrentStory(storyInfo);
  }

  const uploadFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreView(objectUrl);
    setIsLoad(true);
    let reader = new FileReader();

    reader.onloadend = () => {
      uploadImage({ base64: reader.result, name: file.name }).then((response) => {
        let storyInfo = { ...currentStory };
        storyInfo.logo = response.data;
        setCurrentStory(storyInfo);
        setIsLoad(false);
      });

    }
    reader.onerror = (error) => {
      console.log(error);
      setIsLoad(false);
    }
    reader.readAsDataURL(file);
  }

  const nextAction = () => {
    setLoading(true);
    updateStory(currentStory).then(response => {
      setLoading(false);
    });
  }

  const createHandler = () => {
    const data = {
      storyId: currentStory.id,
      ...Config.defaultWriteInfo
    };
    setLoading(true);
    creatStoryPart(data).then((response) => {
      setLoading(false);
      if (response.status) {
        navigate('/mystories/write/' + response.data.storyPart.id);
      }
    })
  }

  const deleteHandler = (storyPart) => {
    setLoading(true);
    deleteStoryPart(storyPart.id).then((response) => {
      getStory(storyId).then(() => {
        setLoading(false);
        toast('Successfully deleted!');
      });
    });
  }

  const viewHandler = (storyPart) => {
    navigate('/story/' + storyPart?.storyId + '/' + storyPart.id);
  }


  return (
    mount ? <Box>
      <MyStoryHeader data={{...currentStory, tabValue: tabValue}} handler={nextAction} />
      <Container maxWidth='lg' sx={{ marginTop: '170px', marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            {isLoad ? <Skeleton
              animation="wave"
              sx={{ bgcolor: '#eee' }}
              variant="rectangular"
              width={256}
              height={400}
            /> : preView ? <><img src={preView} width={256} height={400} /><input multiple={false} type="file" onChange={uploadFile} /></> : <><img src={currentStory.logo ? currentStory.logo : bookSrc} width={256} height={400} /><input multiple={false} type="file" onChange={uploadFile} /></>
            }
          </Grid>
          <Grid item xs={12} md={9}>
            <Card variant="elevation" sx={{ marginTop: 2 }}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs">
                      <Tab label="Story Details" value="1" />
                      <Tab label="Table of Contents" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <TextField
                      margin="normal"
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      value={currentStory.title}
                      onChange={(event) => inputHandler(event)}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="description"
                      label="description"
                      name="description"
                      multiline={true}
                      rows={5}
                      value={currentStory.description}
                      onChange={(event) => inputHandler(event)}
                    />
                    <Box>
                      <Typography>Main Characters</Typography>
                      {currentStory.mainCharacters.map(mainCharacter => (
                        <Box key={mainCharacter} sx={{ marginTop: 1, marginBottom: 1 }}>
                          <input
                            type="text"
                            className={classes.inputStyle}
                            value={mainCharacter}
                            disabled
                          />
                          <Button variant="contained" color='error' size="small" onClick={() => removeMainCharacter(mainCharacter)}>-</Button>
                        </Box>
                      ))}
                      {currentStory.mainCharacters.length < 20 && <Box>
                        <input
                          type="text"
                          className={classes.inputStyle}
                          value={currentStory.currentMainCharacter}
                          name="currentMainCharacter"
                          onChange={(event) => inputHandler(event)}
                        />
                        {currentStory.currentMainCharacter ? <Button variant="contained" color='secondary' size="small" onClick={() => addMainCharacter()}>+</Button> : <Button variant="outlined" color='secondary' size="small">+</Button>}
                      </Box>}
                    </Box>
                    <Box sx={{ minWidth: 120, maxWidth: 300, marginTop: 2, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="categoryId">Category</InputLabel>
                        <Select
                          labelId="categoryId"
                          id="categoryId"
                          value={currentStory.categoryId}
                          name="categoryId"
                          label="Category"
                          onChange={(event) => inputHandler(event)}
                        >
                          {categories.map(category => (
                            <MenuItem key={category?.id} value={category?.id}>{category?.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Typography>Tags</Typography>
                      {
                        currentStory.tags.map(tag => (
                          <Button key={tag} variant="contained" color='warning' size="small" endIcon={<Close />} onClick={() => removeTag(tag)} sx={{ marginRight: 1, marginTop: 1 }}>{tag}</Button>
                        ))
                      }
                      <Box sx={{ marginTop: 1 }}>
                        {
                          currentStory.tags.length < 10 ? showTagBtn ?
                            <Button variant="outlined" color='primary' size="small" endIcon={<Add />} onClick={() => setShowTagBtn(false)}>Add a tag</Button>
                            : <Input name="currentTag" defaultValue={currentStory.currentTag} value={currentStory.currentTag} onChange={(event) => inputHandler(event)} /> : null
                        }
                      </Box>
                    </Box>
                    <Box sx={{ minWidth: 120, maxWidth: 300, marginTop: 2, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="targetAudience">Target Audience</InputLabel>
                        <Select
                          labelId="targetAudience"
                          id="targetAudience"
                          value={currentStory.targetAudience}
                          name="targetAudience"
                          label="Target Audience"
                          onChange={(event) => inputHandler(event)}
                        >
                          {Config.targetAudiences.map(audience => (
                            <MenuItem key={audience} value={audience}>{audience}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="type"
                        name="type"
                        value={currentStory.type}
                        onChange={inputHandler}
                      >
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                      </RadioGroup>
                    </FormControl>
                    <Box sx={{ minWidth: 120, maxWidth: 300, marginTop: 2, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="language">Language</InputLabel>
                        <Select
                          labelId="language"
                          id="language"
                          value={currentStory.language}
                          name="language"
                          label="Language"
                          onChange={(event) => inputHandler(event)}
                        >
                          {Config.languages.map(language => (
                            <MenuItem key={language} value={language}>{language}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Box sx={{ minWidth: 120, maxWidth: 300, marginTop: 2, marginBottom: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel id="copyright">Copyright</InputLabel>
                          <Select
                            labelId="copyright"
                            id="copyright"
                            value={currentStory.copyright}
                            name="copyright"
                            label="Copyright"
                            onChange={(event) => inputHandler(event)}
                          >
                            {Config.copyrights.map(copyright => (
                              <MenuItem key={copyright} value={copyright}>{copyright}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Typography variant="subtitle2">You do not allow your work to be used or adapted in any way without your permission.</Typography>
                    </Box>
                    <Box>
                      <FormLabel>Rating</FormLabel>
                      <Switch
                        checked={currentStory.rating}
                        name="rating"
                        onChange={(event) => inputHandler(event)}
                      />
                      <Typography variant="subtitle2">Your story is appropriate for all audiences. The Wattpad community has the ability to rate your story Mature. For more info, please read Wattpad’s Content Guidelines</Typography>
                    </Box>
                    <Box>
                      <FormLabel>Complete</FormLabel>
                      <Switch
                        checked={currentStory?.status === 'COMPLETED'}
                        name="status"
                        onChange={(event) => inputHandler(event)}
                      />
                      <Typography variant="subtitle2">Your story is publish, all users can see your story.</Typography>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <Button variant="contained" color="secondary" startIcon={<Add />} size="small" onClick={() => createHandler()}>
                      New Part
                    </Button>
                    <Box>
                      { Array.isArray(currentStory.storyParts) && currentStory.storyParts.map((part) => (
                        <StoryPartItem key={"story-part-" + part.id} storyPart={part} deleteHandler={deleteHandler} viewHandler={viewHandler} />
                      ))}
                    </Box>
                  </TabPanel>
                </TabContext>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box> : <Container maxWidth='md' sx={{ marginTop: '80px', marginBottom: 2 }}>
      <Skeleton
        sx={{ bgcolor: '#eee' }}
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={500}
      />
    </Container>
  );
}