import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import { EmojiEmotions } from '@mui/icons-material';
import { MyStoryPartCreateHeader, StoryPartPreview } from '../../components';
import { EditorState, RichUtils, getDefaultKeyBinding, AtomicBlockUtils } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createVideoPlugin from '@draft-js-plugins/video';
import createFocusPlugin from '@draft-js-plugins/focus';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import '../../styles/editor_rich_style.css';
import "draft-js/dist/Draft.css";
import '@draft-js-plugins/emoji/lib/plugin.css';
import { convertToHTML, convertFromHTML } from "draft-convert";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosContext, ServiceContext, StoryContext, AuthContext } from '../../../context';
import config from '../../../config/config';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator
);
const imagePlugin = createImagePlugin();
// const videoPlugin = createVideoPlugin({ decorator });
const videoPlugin = createVideoPlugin();
const emojiPlugin = createEmojiPlugin({
  selectButtonContent: <EmojiEmotions />,
});
const { types } = videoPlugin;
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [focusPlugin, alignmentPlugin, resizeablePlugin, videoPlugin, imagePlugin, emojiPlugin];

export default function WritePartPage() {

  const { storyPartId } = useParams();

  const { setLoading } = useContext(AxiosContext);
  const { uploadImage, uploadVideo } = useContext(ServiceContext);
  const { getStoryPart, currentStory, currentStoryPart, setCurrentStoryPart, updateStoryPart, creatStoryPart } = useContext(StoryContext);
  const { token, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editor, setEditor] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getStoryPart(storyPartId).then(response => {

        if (!response.data.storyPart) {
          navigate('/mystories');
        } else {

          const storyPart = response.data.storyPart;
          if (storyPart.description) {
            const editContent = convertFromHTML({
              htmlToBlock: (nodeName, node, lastList, inBlock) => {
                if (
                  (nodeName === 'p' || nodeName === 'div') &&
                  inBlock === 'blockquote'
                ) {
                  return 'blockquote';
                }

                if (nodeName === 'figure') {
                  if (node.firstChild.nodeName === 'IMG') {
                    return {
                      type: 'atomic',
                      data: {
                        atomicType: config.entityType.image,
                        src: node.firstChild.getAttribute('src'),
                      },
                    };
                  }
                  if (node.firstChild.nodeName === 'VIDEO') {
                    return {
                      type: 'atomic',
                      data: {
                        atomicType: config.entityType.video,
                        src: node.firstChild.getAttribute('src'),
                      },
                    };
                  }
                }
                if (nodeName === 'img' && inBlock !== 'atomic') {
                  return 'atomic';
                }
                if (nodeName === 'video' && inBlock !== 'atomic') {
                  return 'atomic';
                }

                if (nodeName === 'header') {
                  return 'header';
                }
                switch (node.style.justifyContent) {
                  case "blockquote":
                    return {
                      type: 'RichEditor-blockquote',
                      data: {}
                    };
                  case "flex-start":
                    return {
                      type: 'left',
                      data: {}
                    };
                  case "center":
                    return {
                      type: 'center',
                      data: {}
                    };
                  case "flex-end":
                    return {
                      type: 'right',
                      data: {}
                    };
                  case "justify":
                    return {
                      type: 'justify',
                      data: {}
                    };
                  default:
                    return {};
                }
              },
              htmlToStyle: (nodeName, node, inlineStyle) => {
                if (
                  nodeName === 'span' &&
                  (node.style.fontFamily === 'Test' ||
                    node.style.fontFamily === "'Test'")
                ) {
                  return inlineStyle.add('FONT-TEST');
                }
                return inlineStyle;
              },
              htmlToEntity: (nodeName, node, createEntity) => {
                if (nodeName === 'img') {
                  return createEntity(
                    config.entityType.image,
                    'IMMUTABLE',
                    { src: node.getAttribute('src') }
                  );
                }
                if (nodeName === 'video') {
                  return createEntity(
                    types.VIDEOTYPE,
                    'IMMUTABLE',
                    { src: node.getAttribute('src') }
                  );
                }
              },
              textToEntity: (text, createEntity) => {
                const acc = [];
                const pattern = new RegExp('\\@\\w+', 'ig');
                let resultArray = pattern.exec(text);
                while (resultArray != null) {
                  const name = resultArray[0].slice(1);
                  acc.push({
                    offset: resultArray.index,
                    length: resultArray[0].length,
                    entity: createEntity('AT-MENTION', 'IMMUTABLE', { name }),
                  });
                  resultArray = pattern.exec(text);
                }
                text.replace(/\{\{\s*(\w+)\s*\}\}/gi, (match, tag, offset) => {
                  acc.push({
                    offset,
                    length: match.length,
                    result: tag,
                    entity: createEntity('MERGE-TAG', 'IMMUTABLE', { tag }),
                  });
                });
                return acc;
              },
            })(storyPart.description);
            setEditorState(EditorState.createWithContent(editContent));
          } else {
            setEditorState(EditorState.createEmpty());
          }
        }
        setLoading(false);
      }).catch(error => {
        console.error(error);
        setLoading(false);
      });
    }
  }, [token, storyPartId]);

  const focus = () => {
    editor.focus();
  };

  const inputHandler = (event) => {
    let storyInfo = { ...currentStoryPart };
    const target = event.target;
    storyInfo[target.name] = target.value;
    setCurrentStoryPart(storyInfo);
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

  const onChange = (e) => {
    setEditorState(e);
    const description = convertToHTML({
      styleToHTML: (style) => { },
      blockToHTML: (block) => {
        if (block.type === "center") {
          return <p style={{ display: "flex", justifyContent: "center" }} />;
        } else if (block.type === "left") {
          return <p style={{ display: "flex", justifyContent: "flex-start" }} />;
        } else if (block.type === "right") {
          return <p style={{ display: "flex", justifyContent: "flex-end" }} />;
        } else if (block.type === "justify") {
          return <p style={{ display: "flex", justifyContent: "justify" }} />;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === config.entityType.image) {
          return <img src={entity.data.src} />;
        }
        if (entity.type === types.VIDEOTYPE) {
          return <video src={entity.data.src} controls/>;
        }
        return originalText;
      }
    })(e.getCurrentContent());
    let storyInfo = { ...currentStoryPart };
    storyInfo.description = description;
    setCurrentStoryPart(storyInfo);
  }

  const backHandler = () => {
    navigate('/mystories/' + currentStory.id);
  }

  const publishHandler = () => {
    let storyInfo = { ...currentStoryPart };
    storyInfo.status = 'PUBLISH';
    setCurrentStoryPart(storyInfo);
    setLoading(true);
    updateStoryPart(storyInfo).then(response => {
      setLoading(false);
    });
  }

  const saveHandler = () => {
    setLoading(true);
    updateStoryPart(currentStoryPart).then(response => {
      setLoading(false);
    });
  }

  const previewHandler = () => {
    setIsPreview(true);
  }

  const editHandler = () => {
    setIsPreview(false);
  }

  const handleKeyCommand = (command, handleEditorState) => {
    const newState = RichUtils.handleKeyCommand(handleEditorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  const imageInsert = async (e) => {

    let file = e.target.files[0];

    if (file.size > config.uploadMaxSize.image) {
      toast('Please upload image less than ' + config.uploadMaxSize.image / 1000000 + 'MB.');
      return;
    }

    setLoading(true);
    let imageLink = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        uploadImage({ base64: reader.result, name: file.name }).then((response) => {
          resolve(response.data);
        });
      }
      reader.onerror = (error) => {
        console.log(error);
      }
      reader.readAsDataURL(file);
    });

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      config.entityType.image,
      'IMMUTABLE',
      { src: imageLink },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );
    setLoading(false);
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));

  }

  const videoInsert = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file.size > config.uploadMaxSize.image) {
      toast('Please upload image less than ' + config.uploadMaxSize.image / 1000000 + 'MB.');
      return;
    }

    setLoading(true);
    let videoLink = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        uploadVideo({ base64: reader.result, name: file.name }).then((response) => {
          resolve(response.data);
        });
      }
      reader.onerror = (error) => {
        console.log(error);
      }
      reader.readAsDataURL(file);
    });
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      types.VIDEOTYPE,
      'IMMUTABLE',
      { src: videoLink },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );
    setLoading(false);
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));

  }

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      case "left":
        return "align-left";
      case "center":
        return "align-center";
      case "right":
        return "align-right";
      case "justify":
        return "align-justify";
      default:
        return null;
    }
  }


  return (
    <Box>
      <MyStoryPartCreateHeader
        data={{ story: currentStory, storyPart: currentStoryPart }}
        backHandler={backHandler}
        publishHandler={publishHandler}
        saveHandler={saveHandler}
        previewHandler={previewHandler}
        editHandler={editHandler}
        isPreview={isPreview}
        createHandler={createHandler}
        editorState={editorState}
        toggleBlockType={toggleBlockType}
        toggleInlineStyle={toggleInlineStyle}
        imageInsert={imageInsert}
        videoInsert={videoInsert}
        emojiInsert={<EmojiSelect />}
      />
      <Box sx={{ marginTop: '200px' }}>
      {isPreview
        ? <StoryPartPreview
          story={currentStory}
          storyPart={currentStoryPart}
          user={user}
        />
        : <Container maxWidth="md" sx={{ marginTop: 5, marginBottom: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={currentStoryPart.title}
            onChange={(event) => inputHandler(event)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="prompt"
            label="Prompt"
            name="prompt"
            value={currentStoryPart.prompt}
            onChange={(event) => inputHandler(event)}
          />
          <Box onClick={focus} sx={{ border: "1px solid #0000004d", borderRadius: "4px", padding: "10px", minHeight: "100px" }}>
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={mapKeyToEditorCommand}
              onChange={onChange}
              placeholder="description..."
              ref={element => {
                setEditor(element);
              }}
              plugins={plugins}
              spellCheck={true}
            />
            {/* <AlignmentTool /> */}
            <EmojiSuggestions />
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "10px" }}>
            <Button variant="contained" color="secondary" onClick={() => createHandler(currentStory)}>New Part</Button>
          </Box>
        </Container>
      }
      </Box>
    </Box>
  );
}