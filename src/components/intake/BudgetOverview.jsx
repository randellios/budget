import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
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
  const allocatedPercentage =
    monthlyIncome > 0 ? (totalAllocated / monthlyIncome) * 100 : 0;

  const getBudgetStatus = () => {
    if (remaining > monthlyIncome * 0.1) {
      return {
        status: 'excellent',
        color: '#10b981',
        bgColor: '#dcfce7',
        borderColor: '#667eea',
        icon: CheckCircleIcon
      };
    }
    if (remaining > 0) {
      return {
        status: 'good',
        color: '#f59e0b',
        bgColor: '#fef3c7',
        borderColor: '#667eea',
        icon: CheckCircleIcon
      };
    }
    if (remaining >= -100) {
      return {
        status: 'warning',
        color: '#ef4444',
        bgColor: '#fee2e2',
        borderColor: '#fca5a5',
        icon: WarningIcon
      };
    }
    return {
      status: 'critical',
      color: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#f87171',
      icon: ErrorIcon
    };
  };

  const budgetStatus = getBudgetStatus();
  const StatusIcon = budgetStatus.icon;

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: `2px solid ${budgetStatus.borderColor}`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Income Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderBottom: '1px solid #cbd5e1',
          px: 3,
          py: 2,
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

      <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        {/* Budget Status with Circular Progress */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Circular Progress */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={80}
              thickness={2}
              sx={{ color: '#f3f4f6', position: 'absolute' }}
            />
            <CircularProgress
              variant="determinate"
              value={Math.min(allocatedPercentage, 100)}
              size={80}
              thickness={2}
              sx={{
                color: budgetStatus.color,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round'
                }
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: budgetStatus.color,
                  lineHeight: 1
                }}
              >
                {Math.min(allocatedPercentage, 100).toFixed(0)}%
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.65rem',
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  fontWeight: 500
                }}
              >
                Used
              </Typography>
            </Box>
          </Box>

          {/* Budget Status Display - Centered */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1
              }}
            >
              <StatusIcon
                sx={{ fontSize: 20, color: budgetStatus.color, mr: 0.5 }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: '2rem',
                  color: budgetStatus.color,
                  lineHeight: 1
                }}
              >
                £{Math.abs(remaining).toLocaleString()}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: budgetStatus.color,
                fontSize: '0.9rem'
              }}
            >
              {remaining >= 0 ? 'Available' : 'Over Budget'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
