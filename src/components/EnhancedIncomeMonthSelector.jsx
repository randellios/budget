import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Chip,
  Button,
  Divider
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon,
  Today as TodayIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectMonthlyIncome,
  updateMonthlyIncome
} from '../store/slices/incomeSlice';

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

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getMonthsBetween = () => {
    const today = new Date();
    const current = new Date(currentDate);

    const todayMonth = today.getFullYear() * 12 + today.getMonth();
    const currentMonth = current.getFullYear() * 12 + current.getMonth();

    return currentMonth - todayMonth;
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

  const monthsBetween = getMonthsBetween();

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        {isCurrentMonth() && (
          <Chip
            label="Current"
            size="small"
            sx={{
              height: 18,
              fontSize: '0.65rem',
              fontWeight: 600,
              backgroundColor: '#dcfce7',
              color: '#166534',
              border: '1px solid #bbf7d0'
            }}
          />
        )}
      </Box>

      {/* Month Navigation Card */}
      <Box
        sx={{
          // p: 2.5,
          backgroundColor: 'white',
          borderRadius: 2,
          // border: '2px solid #e2e8f0',
          mb: 3
          // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          // '&:hover': {
          //   border: '2px solid #cbd5e1',
          //   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          // },
          // transition: 'all 0.2s ease'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <IconButton
            onClick={() => navigateMonth(-1)}
            size="small"
            sx={{
              bgcolor: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#374151',
              width: 32,
              height: 32,
              '&:hover': {
                bgcolor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                color: '#1f2937',
                lineHeight: 1,
                mb: 0.5
              }}
            >
              {months[currentDate.getMonth()]}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                fontSize: '0.875rem',
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
              bgcolor: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#374151',
              width: 32,
              height: 32,
              '&:hover': {
                bgcolor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Time indicator */}
        {monthsBetween !== 0 && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: '#9ca3af',
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            >
              {monthsBetween > 0
                ? `${monthsBetween} month${monthsBetween > 1 ? 's' : ''} ahead`
                : `${Math.abs(monthsBetween)} month${Math.abs(monthsBetween) > 1 ? 's' : ''} ago`}
            </Typography>
          </Box>
        )}

        {/* Current Month Button */}
        {!isCurrentMonth() && (
          <Button
            onClick={goToCurrentMonth}
            startIcon={<TodayIcon sx={{ fontSize: 16 }} />}
            sx={{
              width: '100%',
              color: '#667eea',
              borderColor: '#e2e8f0',
              backgroundColor: '#f8fafc',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'none',
              py: 1,
              '&:hover': {
                borderColor: '#667eea',
                backgroundColor: '#f0f4ff'
              }
            }}
            variant="outlined"
          >
            Go to Current Month
          </Button>
        )}
      </Box>
      <Divider sx={{ mb: 2, borderColor: '#e2e8f0' }} />

      {/* Income Section */}
      <Typography
        variant="overline"
        sx={{
          color: '#374151',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          mb: 2,
          display: 'block'
        }}
      >
        Monthly Income
      </Typography>

      {isEditing ? (
        <Box
          sx={{
            p: 2.5,
            backgroundColor: 'white',
            borderRadius: 2,
            border: '2px solid #667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#667eea'
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
              placeholder="Enter amount"
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  '& fieldset': {
                    border: 'none'
                  }
                },
                '& input': {
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#667eea',
                  textAlign: 'left',
                  padding: '0px'
                }
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            p: 2.5,
            backgroundColor: 'white',
            borderRadius: 2,
            border: '2px solid #e2e8f0',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            '&:hover': {
              border: '2px solid #667eea',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.12)'
            },
            transition: 'all 0.2s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: '#667eea',
              borderRadius: '2px 2px 0 0'
            }
          }}
          onClick={handleStartEdit}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: '1.75rem',
                color: '#1f2937',
                lineHeight: 1
              }}
            >
              £{monthlyIncome.toLocaleString()}
            </Typography>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                backgroundColor: '#f0f4ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e0e7ff'
              }}
            >
              <EditIcon sx={{ fontSize: 14, color: '#667eea' }} />
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: '#6b7280',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Click to edit
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EnhancedIncomeMonthSelector;
