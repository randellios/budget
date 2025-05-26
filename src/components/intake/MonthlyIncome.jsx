import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const MonthlyIncome = () => {
  const [income, setIncome] = useState(5000);
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
    setTempValue(income.toString());
    setIsEditing(true);
  };

  const handleSave = () => {
    const newValue = parseFloat(tempValue) || 0;
    setIncome(newValue);
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
            <Box
              sx={{
                backgroundColor: '#667eea',
                borderRadius: 1.5,
                p: 1,
                mr: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <WalletIcon sx={{ fontSize: 18, color: 'white' }} />
            </Box>
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
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                    outline: '1px solid rgba(102, 126, 234, 0.3)'
                  }
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
              <EditIcon
                sx={{
                  fontSize: 14,
                  color: '#9ca3af',
                  opacity: 0.6,
                  transition: 'opacity 0.2s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 1,
                    color: '#667eea'
                  }
                }}
                onClick={handleStartEdit}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyIncome;
