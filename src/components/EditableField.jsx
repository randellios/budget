import React, { useEffect, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';

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

  const handleSave = () => {
    const newValue = parseValue(inputRef.current.value);
    onSave(newValue);
  };

  if (isEditing) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 1,
            border: '2px solid #667eea',
            px: 1,
            py: 0.25,
            minWidth: 120,
            ...containerStyle
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            ref={inputRef}
            type={inputType}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '14px',
              fontWeight: 600,
              ...inputStyle
            }}
            defaultValue={value}
            placeholder={placeholder}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          />
        </Box>
        <IconButton
          size="small"
          sx={{ color: 'success.main' }}
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
        >
          <Box sx={{ fontSize: '14px' }}>✓</Box>
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: 'error.main' }}
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          <Box sx={{ fontSize: '14px' }}>✕</Box>
        </IconButton>
      </Box>
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
