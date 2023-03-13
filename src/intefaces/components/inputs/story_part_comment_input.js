import { useState } from 'react';
import { Stack, Box, TextField, Button, Avatar } from '@mui/material';
import { toast } from 'react-toastify';

export default function StoryPartCommentInput(props) {

    const { user, comment, value } = props;
    const [text, setText] = useState(value);

    const inputHandler = (e) => {
        setText(e.target.value);
    }

    const post = () => {
        comment(text);
        setText('');
    }
    
    return (
        <Box sx={{ marginTop: 1 }}>
            <Stack
                direction="row"
                spacing={2}
            >
                { user?.imageUrl ? <img src={user?.imageUrl} width={50} height={50} style={{ borderRadius: '50%' }}/> : <Avatar width={60} height={60}/>}
                <Box width={'100%'}>
                    <TextField
                      margin="none"
                      fullWidth
                      label="Please input the text..."
                      name="description"
                      multiline={true}
                      rows={3}
                      value={text}
                      onChange={inputHandler}
                    />
                    <Box sx={{ marginTop: 1, textAlign: 'end' }}>
                        <Button variant="contained" color="warning" size="small" onClick={post}>Post</Button>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}