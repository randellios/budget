// src/components/SaveStatusIndicator.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectIsSaving,
  selectSaveError,
  selectAutoSaveEnabled,
  saveBudgetData
} from '../store/slices/apiSlice';

const SaveStatusIndicator = ({
  showInTitle = false,
  showManualSave = true,
  size = 'small'
}) => {
  const dispatch = useAppDispatch();
  const isSaving = useAppSelector(selectIsSaving);
  const saveError = useAppSelector(selectSaveError);
  const autoSaveEnabled = useAppSelector(selectAutoSaveEnabled);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && !saveError) {
      setShowSaved(true);
      const timer = setTimeout(() => {
        setShowSaved(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, saveError]);

  const handleManualSave = () => {
    dispatch(saveBudgetData());
  };

  const getSaveStatusColor = () => {
    if (saveError) return '#ef4444';
    if (isSaving) return '#f59e0b';
    return '#10b981';
  };

  const getSaveStatusText = () => {
    if (saveError) return 'Save failed';
    if (isSaving) return 'Saving...';
    return 'Saved';
  };

  const dotSize = size === 'small' ? 6 : size === 'medium' ? 8 : 10;
  const textSize =
    size === 'small' ? '0.7rem' : size === 'medium' ? '0.75rem' : '0.8rem';

  // Don't show anything if not saving, no error, and past the 3 second window
  if (!isSaving && !saveError && !showSaved) {
    return null;
  }

  if (showInTitle) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: getSaveStatusColor()
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: getSaveStatusColor(),
            fontSize: textSize,
            fontWeight: 500
          }}
        >
          {getSaveStatusText()}
        </Typography>
        {showManualSave && (!autoSaveEnabled || saveError) && (
          <Tooltip title={saveError ? 'Retry save' : 'Save manually'}>
            <IconButton
              size="small"
              onClick={handleManualSave}
              sx={{
                color: saveError ? '#ef4444' : '#667eea',
                '&:hover': {
                  backgroundColor: saveError
                    ? 'rgba(239, 68, 68, 0.1)'
                    : 'rgba(102, 126, 234, 0.1)'
                }
              }}
            >
              <Box sx={{ fontSize: '16px' }}>💾</Box>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: getSaveStatusColor()
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: getSaveStatusColor(),
          fontSize: textSize,
          fontWeight: 500
        }}
      >
        {getSaveStatusText()}
      </Typography>
    </Box>
  );
};

export default SaveStatusIndicator;
