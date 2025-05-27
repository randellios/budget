// src/components/SaveStatus.jsx
import React from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CloudDone as CloudDoneIcon,
  CloudOff as CloudOffIcon,
  Sync as SyncIcon,
  Error as ErrorIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectIsSaving,
  selectLastSaved,
  selectSaveError,
  selectAutoSaveEnabled,
  saveBudgetData,
  clearSaveError,
  toggleAutoSave
} from '../store/slices/apiSlice';

const SaveStatus = () => {
  const dispatch = useAppDispatch();
  const isSaving = useAppSelector(selectIsSaving);
  const lastSaved = useAppSelector(selectLastSaved);
  const saveError = useAppSelector(selectSaveError);
  const autoSaveEnabled = useAppSelector(selectAutoSaveEnabled);

  const handleManualSave = () => {
    dispatch(saveBudgetData());
  };

  const handleToggleAutoSave = () => {
    dispatch(toggleAutoSave());
  };

  const handleClearError = () => {
    dispatch(clearSaveError());
  };

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (saveError) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          icon={<ErrorIcon />}
          label="Save failed"
          size="small"
          color="error"
          onClick={handleClearError}
          sx={{ cursor: 'pointer' }}
        />
        <Tooltip title="Retry save">
          <IconButton size="small" onClick={handleManualSave}>
            <SyncIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  if (isSaving) {
    return (
      <Chip
        icon={<CircularProgress size={14} />}
        label="Saving..."
        size="small"
        sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        icon={<CloudDoneIcon />}
        label={`Saved ${formatLastSaved(lastSaved)}`}
        size="small"
        sx={{ backgroundColor: '#e8f5e8', color: '#2e7d32' }}
      />

      <Tooltip
        title={autoSaveEnabled ? 'Disable auto-save' : 'Enable auto-save'}
      >
        <IconButton size="small" onClick={handleToggleAutoSave}>
          {autoSaveEnabled ? (
            <SyncIcon fontSize="small" color="primary" />
          ) : (
            <CloudOffIcon fontSize="small" color="disabled" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="Save now">
        <IconButton size="small" onClick={handleManualSave}>
          <SaveIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SaveStatus;
