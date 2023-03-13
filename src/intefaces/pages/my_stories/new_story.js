import React, { useState, useContext, useEffect } from 'react';
import { Container, Box, Grid, Card, Tab, TextField, Button, FormControl, Typography, MenuItem, Select, InputLabel, Input, Switch, FormLabel, RadioGroup, FormControlLabel, Radio, Skeleton } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { MyStoryCreateHeader } from '../../components';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AxiosContext, ServiceContext, StoryContext, CategoryContext } from '../../../context';
import Config from '../../../config/config';

export default function NewStoryPage() {

  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AxiosContext);
  const { uploadImage } = useContext(ServiceContext);
  const { createStory } = useContext(StoryContext);
  const { categories } = useContext(CategoryContext);
  const [preView, setPreView] = useState(null);
  const [tabValue, setTabValue] = useState('1');
  const defaultStoryInfo = {
    title: "Untitled Story",
    description: "",
    mainCharacters: [],
    currentMainCharacter: "",
    categoryId: 1,
    tags: [],
    currentTag: "",
    type: "public",
    targetAudience: "",
    language: "",
    copyright: "",
    active: true,
    status: "",
    rating: false,
    logo: null,
};
  const [formValue, setFormValue] = useState(defaultStoryInfo);
  const [showTagBtn, setShowTagBtn] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
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
    if (!mount) {
      setFormValue(defaultStoryInfo);
      setMount(true);
    }
  }, [mount])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const inputHandler = (event) => {
    setIsChanged(true);
    let storyInfo = { ...formValue };
    const target = event.target;
    storyInfo[target.name] = target.value;
    if (target.name === 'rating') {
      storyInfo[target.name] = target.checked;
    }
    if (target.name === 'currentTag' && target.value && target.value.includes(' ')) {
      const tag = target.value.replace(' ', '');
      if (!storyInfo.tags.includes(tag)) {
        storyInfo.tags.push(tag);
      }
      storyInfo[target.name] = '';
    }
    setFormValue(storyInfo);
  }

  const addMainCharacter = () => {
    let storyInfo = { ...formValue };
    if (!storyInfo.mainCharacters.includes(storyInfo.currentMainCharacter)) {
      storyInfo.mainCharacters.push(storyInfo.currentMainCharacter);
    }
    storyInfo.currentMainCharacter = '';
    setFormValue(storyInfo);
  }

  const removeMainCharacter = (mainCharacter) => {
    let storyInfo = { ...formValue };
    storyInfo.mainCharacters = storyInfo.mainCharacters.filter(item => item !== mainCharacter)
    setFormValue(storyInfo);
  }

  const removeTag = (tag) => {
    let storyInfo = { ...formValue };
    if (storyInfo.tags.includes(tag)) {
      storyInfo.tags = storyInfo.tags.filter(item => item !== tag);
    }
    setFormValue(storyInfo);
  }

  const uploadFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    setIsChanged(true);
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreView(objectUrl);
    setIsLoad(true);
    let reader = new FileReader();

    reader.onloadend = () => {
      uploadImage({ base64: reader.result }).then((response) => {
        let storyInfo = { ...formValue };
        storyInfo.logo = response.data;
        setFormValue(storyInfo);
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
    if (loading) return;
    setLoading(true);
    createStory(formValue).then((response) => {
      setLoading(false);
      if (response.status) {
        const storyPartId = response.data.storyPart.id;
        navigate('/mystories/write/' + storyPartId);
      } else {
        toast(response.data);
      }
    });
  }


  return (
    <Box>
      <MyStoryCreateHeader data={{ isChanged: isChanged, ...formValue }} handler={nextAction} />
      <Container maxWidth='md' sx={{ marginTop: '170px', marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {/* {preView ? <img src={preView} width={256} height={400} /> : <Box sx={{ height: 400, width: 256, backgroundColor: '#eee', }}>
            </Box>}
            <input multiple={false} type="file" onChange={uploadFile} /> */}
            {isLoad ? <Skeleton
              sx={{ bgcolor: '#eee' }}
              variant="rectangular"
              width={256}
              height={400}
            /> : preView ? <><img src={preView} width={256} /><input multiple={false} type="file" onChange={uploadFile} /></> : <><Box sx={{ height: 400, width: 256, backgroundColor: '#eee', }}>
            </Box><input multiple={false} type="file" onChange={uploadFile} /></>
            }
          </Grid>
          <Grid item xs={12} md={8}>
            <Card variant="elevation" sx={{ marginTop: 2 }}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs">
                      <Tab label="All Stories" value="1" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <TextField
                      margin="normal"
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      value={formValue?.title}
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
                      value={formValue?.description}
                      onChange={(event) => inputHandler(event)}
                    />
                    <Box>
                      <Typography>Main Characters</Typography>
                      {formValue?.mainCharacters?.map(mainCharacter => (
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
                      {formValue?.mainCharacters?.length < 20 && <Box>
                        <input
                          type="text"
                          className={classes.inputStyle}
                          value={formValue?.currentMainCharacter}
                          name="currentMainCharacter"
                          onChange={(event) => inputHandler(event)}
                        />
                        {formValue?.currentMainCharacter ? <Button variant="contained" color='secondary' size="small" onClick={() => addMainCharacter()}>+</Button> : <Button variant="outlined" color='secondary' size="small">+</Button>}
                      </Box>}
                    </Box>
                    <Box sx={{ minWidth: 120, maxWidth: 300, marginTop: 2, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="categoryId">Category</InputLabel>
                        <Select
                          labelId="categoryId"
                          id="categoryId"
                          value={formValue?.categoryId}
                          name="categoryId"
                          label="Category"
                          onChange={(event) => inputHandler(event)}
                        >
                          {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>{category?.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Typography>Tags</Typography>
                      {
                        formValue?.tags?.map(tag => (
                          <Button key={tag} variant="contained" color='warning' size="small" endIcon={<Close />} onClick={() => removeTag(tag)} sx={{ marginRight: 1, marginTop: 1 }}>{tag}</Button>
                        ))
                      }
                      <Box sx={{ marginTop: 1 }}>
                        {
                          formValue?.tags?.length < 10 ? showTagBtn ?
                            <Button variant="outlined" color='primary' size="small" endIcon={<Add />} onClick={() => setShowTagBtn(false)}>Add a tag</Button>
                            : <Input name="currentTag" defaultValue={formValue?.currentTag} value={formValue?.currentTag} onChange={(event) => inputHandler(event)} /> : null
                        }
                      </Box>
                    </Box>
                    <Box sx={{ minWidth: 120, maxWidth: 300, marginTop: 2, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="targetAudience">Target Audience</InputLabel>
                        <Select
                          labelId="targetAudience"
                          id="targetAudience"
                          value={formValue?.targetAudience}
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
                        value={formValue?.type}
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
                          value={formValue?.language}
                          name="language"
                          label="Language"
                          onChange={(event) => inputHandler(event)}
                        >
                          {Config.languages?.map(language => (
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
                            value={formValue?.copyright}
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
                        checked={formValue?.rating}
                        name="rating"
                        onChange={(event) => inputHandler(event)}
                      />
                      <Typography variant="subtitle2">Your story is appropriate for all audiences. The Wattpad community has the ability to rate your story Mature. For more info, please read Wattpad’s Content Guidelines</Typography>
                    </Box>
                  </TabPanel>
                </TabContext>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}