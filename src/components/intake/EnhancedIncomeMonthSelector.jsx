import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectMonthlyIncome,
  updateMonthlyIncome
} from '../../store/slices/incomeSlice';

const EnhancedIncomeMonthSelector = () => {
  const dispatch = useAppDispatch();
  const monthlyIncome = useAppSelector(selectMonthlyIncome);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef(null);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleStartEdit = () => {
    setTempValue(monthlyIncome.toString());
    setIsEditing(true);
  };

  const handleSave = () => {
    const newValue = parseFloat(tempValue) || 0;
    dispatch(updateMonthlyIncome(newValue));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '-10px',
        zIndex: 100,
        mx: -2,
        mb: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #fdfdfd 100%)',
        border: '2px solid #667eea',
        borderLeft: 'none',
        borderRight: 'none',
        boxShadow:
          '0 6px 24px rgba(102, 126, 234, 0.12), 0 3px 12px rgba(102, 126, 234, 0.08)',
        backdropFilter: 'blur(20px)',
        px: 3,
        py: 2
      }}
    >
      {/* Single Row Layout */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Left - Month Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <IconButton
            onClick={() => navigateMonth(-1)}
            size="small"
            sx={{
              bgcolor: 'white',
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              width: 32,
              height: 32,
              '&:hover': {
                bgcolor: '#f8fafc',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <Box sx={{ textAlign: 'center', minWidth: '140px' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.5rem',
                color: '#1e293b',
                lineHeight: 1
              }}
            >
              {months[currentDate.getMonth()]}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              {currentDate.getFullYear()}
            </Typography>
          </Box>

          <IconButton
            onClick={() => navigateMonth(1)}
            size="small"
            sx={{
              bgcolor: 'white',
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              width: 32,
              height: 32,
              '&:hover': {
                bgcolor: '#f8fafc',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Right - Monthly Income */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            position: 'relative'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#64748b',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              mb: 0.5
            }}
          >
            Monthly Income
          </Typography>

          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#667eea',
                  mr: 0.75
                }}
              >
                £
              </Typography>
              <TextField
                inputRef={inputRef}
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#667eea',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#5a67d8'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                    }
                  },
                  '& input': {
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#667eea',
                    textAlign: 'center',
                    width: '120px',
                    padding: '8px 12px'
                  }
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                px: 2,
                py: 0.75,
                borderRadius: 2,
                bgcolor: 'rgba(102, 126, 234, 0.08)',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                '&:hover': {
                  bgcolor: 'rgba(102, 126, 234, 0.12)',
                  border: '2px solid rgba(102, 126, 234, 0.4)',
                  transform: 'scale(1.02)'
                },
                transition: 'all 0.2s ease'
              }}
              onClick={handleStartEdit}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: '#667eea',
                  mr: 1
                }}
              >
                £{monthlyIncome.toLocaleString()}
              </Typography>
              <EditIcon sx={{ fontSize: 16, color: '#667eea', opacity: 0.7 }} />
            </Box>
          )}

          {/* Current Month Badge */}
          {isCurrentMonth() && (
            <Box
              sx={{
                position: 'absolute',
                top: -6,
                right: -6,
                transform: 'rotate(12deg)'
              }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 0.25,
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  color: 'white',
                  borderRadius: 1.5,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 3px 8px rgba(16, 185, 129, 0.3)',
                  border: '1.5px solid white',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: -3,
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '3px solid transparent',
                    borderBottom: '3px solid transparent',
                    borderRight: '3px solid #10b981'
                  }
                }}
              >
                Current
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EnhancedIncomeMonthSelector;
