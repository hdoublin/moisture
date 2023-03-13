import React from 'react';
import { EditorState, Modifier } from 'draft-js';

export default function PartAddStar(props) {

    const { editorState, onChange } = props;

    const addStar = () => {
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            '⭐',
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    };

    return (
        <div onClick={addStar}>⭐</div>
    );
}