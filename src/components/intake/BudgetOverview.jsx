import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import { selectTotalExpenses } from '../../store/slices/expensesSlice';
import { selectTotalSavingsContributions } from '../../store/slices/savingsSlice';
import { selectTotalDebtPayments } from '../../store/slices/debtsSlice';

const BudgetOverview = () => {
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);

  const totalAllocated = totalExpenses + savingsContributions + debtPayments;
  const remaining = monthlyIncome - totalAllocated;

  const getBudgetStatus = () => {
    if (remaining > monthlyIncome * 0.1) {
      return {
        status: 'Excellent',
        color: '#10b981',
        borderColor: '#10b981',
        icon: CheckCircleIcon,
        shadowColor: 'rgba(16, 185, 129, 0.15)'
      };
    }
    if (remaining > 0) {
      return {
        status: 'Good',
        color: '#667eea',
        borderColor: '#667eea',
        icon: CheckCircleIcon,
        shadowColor: 'rgba(102, 126, 234, 0.15)'
      };
    }
    if (remaining >= -100) {
      return {
        status: 'Warning',
        color: '#f59e0b',
        borderColor: '#f59e0b',
        icon: WarningIcon,
        shadowColor: 'rgba(245, 158, 11, 0.15)'
      };
    }
    return {
      status: 'Over Budget',
      color: '#ef4444',
      borderColor: '#ef4444',
      icon: ErrorIcon,
      shadowColor: 'rgba(239, 68, 68, 0.15)'
    };
  };

  const budgetStatus = getBudgetStatus();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '-10px',
        zIndex: 100,
        mx: -2,
        mb: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #fdfdfd 100%)',
        border: `1px solid ${budgetStatus.borderColor}`,
        borderLeft: 'none',
        borderRight: 'none',
        boxShadow: `0 4px 16px ${budgetStatus.shadowColor}`,
        px: 3,
        py: 3,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}
    >
      {/* Left Side - Monthly Income */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: '#64748b',
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'block',
            mb: 0.5
          }}
        >
          Monthly Income
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              color: '#1e293b',
              fontWeight: 700,
              fontSize: '1.25rem',
              mr: 0.5
            }}
          >
            £
          </Typography>
          <TextField
            variant="outlined"
            type="number"
            value={monthlyIncome}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: 1,
                '& fieldset': {
                  borderColor: '#cbd5e1',
                  borderWidth: 1.5
                },
                '&:hover fieldset': {
                  borderColor: '#667eea'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2
                }
              },
              '& input': {
                color: '#1e293b',
                fontWeight: 700,
                fontSize: '1.25rem',
                padding: '6px 8px'
              }
            }}
            placeholder="5000"
          />
        </Box>
      </Box>

      {/* Right Side - Available Balance */}
      {/* <Box sx={{ flex: 1, textAlign: 'right' }}>
        <Typography
          variant="caption"
          sx={{
            color: '#64748b',
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'block',
            mb: 0.5
          }}
        >
          {remaining >= 0 ? 'Available to Spend' : 'Over Budget'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: '1.75rem',
              color: budgetStatus.color,
              lineHeight: 1,
              mr: 0.5
            }}
          >
            £{Math.abs(remaining).toLocaleString()}
          </Typography>
          {remaining >= 0 ? (
            <TrendingUpIcon
              sx={{
                fontSize: 20,
                color: budgetStatus.color,
                opacity: 0.8
              }}
            />
          ) : (
            <TrendingDownIcon
              sx={{
                fontSize: 20,
                color: budgetStatus.color,
                opacity: 0.8
              }}
            />
          )}
        </Box>
      </Box> */}
    </Box>
  );
};

export default BudgetOverview;
