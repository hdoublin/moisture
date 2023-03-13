import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

export default function StoryFilter(props) {

    const { onSetQuery } = props;

    const [partsLength, setPartsLength] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [contents, setContents] = useState([]);

    const onChange = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        const name = e.target.name;
        if (name === 'partsLength') {
            let items = partsLength;
            if (isChecked) {
                setPartsLength([...items, value]);                             
            } else {
                const index = items.indexOf(value);
                items.splice(index, 1);
                setPartsLength([...items]);
            }
        }
        if (name === 'updatedAt') {
            let items = updates;
            if (isChecked) {
                setUpdates([...items, value]);                             
            } else {
                const index = items.indexOf(value);
                items.splice(index, 1);
                setUpdates([...items]);
            }
        }
        if (name === 'content') {
            let items = contents;
            if (isChecked) {
                setContents([...items, value]);                             
            } else {
                const index = items.indexOf(value);
                items.splice(index, 1);
                setContents([...items]);
            }
        }
        onSetQuery();
    }

    return (
        <Box>
            <Box sx={{ marginTop: '10px' }}>
                <Typography variant="h6">Length</Typography>
                <Typography variant="subtitle2">You can select multiple options</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="partsLength" defaultChecked value="0" onChange={onChange}/>} label="Any Length" />
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="partsLength" value="1-10" />} label="1 - 10 Parts" onChange={onChange}/>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="partsLength" value="10-20" />} label="10 - 20 Parts" onChange={onChange}/>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="partsLength" value="20-50" />} label="20 - 50 Parts" onChange={onChange}/>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="partsLength" value="50" />} label="50 Parts or more" onChange={onChange}/>
                </FormGroup>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6">Last updated</Typography>
                <Typography variant="subtitle2">You can select multiple options</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="updatedAt" defaultChecked value="all" onChange={onChange}/>} label="Anytime" />
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="updatedAt" value="day" />} label="Today" onChange={onChange}/>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="updatedAt" value="week" />} label="This week" onChange={onChange}/>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="updatedAt" value="month" />} label="This month" onChange={onChange}/>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="updatedAt" value="year" />} label="This year" onChange={onChange}/>
                </FormGroup>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6">Content</Typography>
                <Typography variant="subtitle2">You can select multiple options</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="content" value="paid" />} label="Show only paid stories" onChange={onChange}/>
                    <FormControlLabel control={<Checkbox sx={{ padding: '3px' }} name="content" value="free" />} label="Show only free stories" onChange={onChange}/>
                </FormGroup>
            </Box>
        </Box>
    );
}