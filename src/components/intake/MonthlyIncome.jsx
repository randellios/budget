import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, LinearProgress } from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectMonthlyIncome,
  updateMonthlyIncome
} from '../../store/slices/incomeSlice';
import {
  selectTotalOutgoings,
  selectRemainingIncome,
  selectBudgetAllocationPercentage
} from '../../store/selectors/budgetSelectors';

const MonthlyIncome = () => {
  const dispatch = useAppDispatch();
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalAllocated = useAppSelector(selectTotalOutgoings);
  const remaining = useAppSelector(selectRemainingIncome);
  const allocationPercentage = useAppSelector(selectBudgetAllocationPercentage);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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

  const getStatusColor = () => {
    if (remaining > monthlyIncome * 0.1) return '#10b981';
    if (remaining > 0) return '#667eea';
    if (remaining >= -100) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          <WalletIcon sx={{ fontSize: 16 }} />
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151' }}>
          Monthly Income
        </Typography>
      </Box>

      {isEditing ? (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#667eea' }}
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
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { borderColor: '#667eea', borderWidth: 2 },
                  '&:hover fieldset': { borderColor: '#5a67d8' },
                  '&.Mui-focused fieldset': { borderColor: '#667eea' }
                },
                '& input': {
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#667eea',
                  textAlign: 'left',
                  padding: '8px 12px'
                }
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: '#f8fafc',
            borderRadius: 2,
            border: '2px solid #e2e8f0',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              border: '2px solid #667eea',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.12)'
            },
            transition: 'all 0.2s ease'
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
                fontSize: '1.5rem',
                color: '#1f2937',
                lineHeight: 1
              }}
            >
              £{monthlyIncome.toLocaleString()}
            </Typography>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                backgroundColor: '#f0f4ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e0e7ff'
              }}
            >
              <EditIcon sx={{ fontSize: 12, color: '#667eea' }} />
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: '#6b7280',
              fontSize: '0.7rem',
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

export default MonthlyIncome;
