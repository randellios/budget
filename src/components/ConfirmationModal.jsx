import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Help as HelpIcon
} from '@mui/icons-material';

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning', // 'warning', 'error', 'info', 'question'
  destructive = false
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'error':
        return <ErrorIcon sx={{ fontSize: 24, color: '#ef4444' }} />;
      case 'info':
        return <InfoIcon sx={{ fontSize: 24, color: '#3b82f6' }} />;
      case 'question':
        return <HelpIcon sx={{ fontSize: 24, color: '#667eea' }} />;
      default:
        return <WarningIcon sx={{ fontSize: 24, color: '#f59e0b' }} />;
    }
  };

  const getButtonColor = () => {
    if (destructive) return '#ef4444';
    switch (variant) {
      case 'error':
        return '#ef4444';
      case 'info':
        return '#3b82f6';
      case 'question':
        return '#667eea';
      default:
        return '#f59e0b';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {getIcon()}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#1f2937'
            }}
          >
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: '#4b5563',
            fontSize: '0.9rem',
            lineHeight: 1.5
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#e5e7eb',
            color: '#6b7280',
            '&:hover': {
              borderColor: '#d1d5db',
              backgroundColor: '#f9fafb'
            }
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: getButtonColor(),
            '&:hover': {
              backgroundColor: getButtonColor(),
              filter: 'brightness(0.9)'
            }
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
