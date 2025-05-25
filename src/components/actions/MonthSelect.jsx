import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon
} from '@mui/icons-material';

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const [currentDate, setCurrentDate] = useState(selectedMonth || new Date());

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

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const goToCurrentMonth = () => {
    const today = new Date();
    setCurrentDate(today);
    onMonthChange?.(today);
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TodayIcon sx={{ mr: 1, color: '#667eea' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Select Month
            </Typography>
          </Box>
          {isCurrentMonth() && (
            <Chip
              label="Current Month"
              size="small"
              sx={{
                backgroundColor: '#dcfce7',
                color: '#166534',
                border: '1px solid #bbf7d0',
                fontSize: '0.6875rem'
              }}
            />
          )}
        </Box>

        {/* Main Month Navigator */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            p: 2,
            bgcolor: '#f8fafc',
            borderRadius: 2,
            border: '1px solid #e2e8f0'
          }}
        >
          <IconButton
            onClick={() => navigateMonth(-1)}
            size="small"
            sx={{
              bgcolor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: '#f1f5f9' }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {months[currentDate.getMonth()]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentDate.getFullYear()}
            </Typography>
          </Box>

          <IconButton
            onClick={() => navigateMonth(1)}
            size="small"
            sx={{
              bgcolor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: '#f1f5f9' }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Current Month Indicator */}
        {!isCurrentMonth() && (
          <Box>
            <Chip
              icon={<TodayIcon />}
              label="Go to Current Month"
              onClick={goToCurrentMonth}
              variant="outlined"
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  bgcolor: '#f0f4ff',
                  borderColor: '#5a67d8'
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthSelector;
