import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Edit as EditIcon
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectMonthlyIncome,
  updateMonthlyIncome
} from '../../store/slices/incomeSlice';

const MonthlyIncome = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef(null);
  const income = useAppSelector(selectMonthlyIncome);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setTempValue(income.toString());
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
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: 1.5,
            backgroundColor: '#f8fafc',
            border: '2px solid #e2e8f0'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: '#1f2937'
              }}
            >
              Monthly Income
            </Typography>
          </Box>

          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#667eea',
                    mr: 0.5
                  }}
                >
                  £
                </Typography>
                <input
                  ref={inputRef}
                  type="number"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  style={{
                    border: '2px solid #667eea',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#667eea',
                    backgroundColor: 'white',
                    outline: 'none',
                    fontFamily: 'inherit',
                    textAlign: 'right',
                    width: '100px'
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  cursor: 'text',
                  bgcolor: 'rgba(102, 126, 234, 0.1)',
                  outline: '1px solid rgba(102, 126, 234, 0.3)',
                  minWidth: '100px'
                }}
                onClick={handleStartEdit}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: '#667eea'
                  }}
                >
                  £{income.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyIncome;
