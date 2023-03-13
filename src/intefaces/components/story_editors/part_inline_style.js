import React from "react";
import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material';
import { styled, Box } from "@mui/material";
import StyleButton from "../buttons/style_button";

const InlineIconWrapper = styled(Box)({
  display: "inline-block"
});

const INLINE_STYLES = [
  { label: "bold", icon: <FormatBold fontSize='small'/>, style: "BOLD" },
  { label: "italic", icon: <FormatItalic fontSize='small'/>, style: "ITALIC" },
  { label: "underline", icon: <FormatUnderlined fontSize='small'/>, style: "UNDERLINE" }
];

export default function PartInlineStyle(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <InlineIconWrapper>
      {INLINE_STYLES.map((type, i) => (
        <StyleButton
          key={i}
          active={currentStyle.has(type.style)}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </InlineIconWrapper>
  );
}