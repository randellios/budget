import React, { useEffect, useRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';
const EditableField = ({
  value,
  displayValue,
  onSave,
  onCancel,
  isEditing,
  onStartEdit,
  placeholder = '',
  inputStyle = {},
  containerStyle = {},
  displayStyle = {},
  displayVariant = 'body2',
  displayTypographyProps = {},
  formatValue = (val) => val,
  parseValue = (val) => val,
  inputType = 'text'
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newValue = parseValue(e.target.value);
      onSave(newValue);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };
  const handleBlur = (e) => {
    const newValue = parseValue(e.target.value);
    onSave(newValue);
  };
  if (isEditing) {
    return (
      <TextField
        inputRef={inputRef}
        variant="outlined"
        size="small"
        type={inputType}
        defaultValue={value}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        sx={{
          minWidth: 120,
          ...containerStyle,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: '#667eea',
              borderWidth: 2
            },
            '&:hover fieldset': {
              borderColor: '#5a67d8'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#667eea'
            }
          },
          '& .MuiInputBase-input': {
            fontSize: '14px',
            fontWeight: 600,
            ...inputStyle
          }
        }}
        fullWidth
      />
    );
  }
  return (
    <Box
      sx={{
        px: 1,
        py: 0.5,
        borderRadius: 1,
        cursor: 'text',
        minWidth: 120,
        '&:hover': {
          bgcolor: 'rgba(102, 126, 234, 0.1)',
          outline: '1px solid rgba(102, 126, 234, 0.3)'
        },
        ...displayStyle
      }}
      onClick={(e) => {
        e.stopPropagation();
        onStartEdit();
      }}
    >
      <Typography
        variant={displayVariant}
        sx={{
          color: 'text.secondary',
          ...displayTypographyProps
        }}
      >
        {displayValue || formatValue(value)}
      </Typography>
    </Box>
  );
};
export default EditableField;
