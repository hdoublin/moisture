import React from "react";
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered } from '@mui/icons-material';
import { styled, Box } from "@mui/material";
import StyleButton from "../buttons/style_button";

const InlineIconWrapper = styled(Box)({
  display: "inline-block"
});

const BLOCK_TYPES = [
  { label: "align-left", icon: <FormatAlignLeft fontSize='small'/>, style: "left" },
  { label: "align-center", icon: <FormatAlignCenter fontSize='small'/>, style: "center" },
  { label: "align-right", icon: <FormatAlignRight fontSize='small'/>, style: "right" },
  // { label: "align-justify", icon: <FormatAlignJustify fontSize='small'/>, style: "justify" },
  // {
  //   label: "ordered-list-item",
  //   icon: <FormatListNumbered fontSize='small'/>,
  //   style: "ordered-list-item"
  // },
  // {
  //   label: "unordered-list-item",
  //   icon: <FormatListBulleted fontSize='small'/>,
  //   style: "unordered-list-item"
  // }
];

export default function PartBlockStyle(props) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <InlineIconWrapper>
      {BLOCK_TYPES.map((type, i) => (
        <StyleButton
        key={i}
        icon={type.icon}
        onToggle={props.onToggle}
        label={type.label}
        style={type.style}
        active={type.style === blockType}
        />
      ))}
    </InlineIconWrapper>
  );
}