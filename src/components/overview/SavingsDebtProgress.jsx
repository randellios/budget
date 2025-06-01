import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectSavingsGoals } from '../../store/slices/savingsSlice';
import { selectDebts } from '../../store/slices/debtsSlice';

const SavingsDebtProgress = () => {
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const debts = useAppSelector(selectDebts);

  const calculateMonthsToTarget = (current, target, monthlyAmount) => {
    if (monthlyAmount <= 0) return null;
    const remaining = target - current;
    if (remaining <= 0) return 0;
    return Math.ceil(remaining / monthlyAmount);
  };

  const calculateDebtPayoffMonths = (balance, monthlyPayment) => {
    if (monthlyPayment <= 0) return null;
    return Math.ceil(balance / monthlyPayment);
  };

  const formatTargetDate = (months) => {
    if (months === null) return 'No contributions set';
    if (months === 0) return '🎉 Target reached!';
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric'
    });
  };

  const getProgressGradient = (progress, type = 'savings') => {
    if (type === 'savings') {
      if (progress >= 90)
        return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
      if (progress >= 70)
        return 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)';
      if (progress >= 40)
        return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
      if (progress >= 90)
        return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
      if (progress >= 70)
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      if (progress >= 40)
        return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
      return 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
    }
  };

  const getGlowColor = (progress, type = 'savings') => {
    if (type === 'savings') {
      if (progress >= 90) return 'rgba(16, 185, 129, 0.3)';
      if (progress >= 70) return 'rgba(14, 165, 233, 0.3)';
      if (progress >= 40) return 'rgba(245, 158, 11, 0.3)';
      return 'rgba(102, 126, 234, 0.3)';
    } else {
      if (progress >= 90) return 'rgba(16, 185, 129, 0.3)';
      if (progress >= 70) return 'rgba(102, 126, 234, 0.3)';
      if (progress >= 40) return 'rgba(245, 158, 11, 0.3)';
      return 'rgba(239, 68, 68, 0.3)';
    }
  };
  return null;
  return (
    <Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {/* Savings */}
        <Box flex={1}>
          {savingsGoals.map((goal, index) => {
            const progress =
              goal.targetAmount > 0
                ? (goal.currentBalance / goal.targetAmount) * 100
                : 0;
            const remaining = Math.max(
              0,
              goal.targetAmount - goal.currentBalance
            );
            const monthsToTarget = calculateMonthsToTarget(
              goal.currentBalance,
              goal.targetAmount,
              goal.monthlyContribution
            );
            const progressGradient = getProgressGradient(progress, 'savings');
            const glowColor = getGlowColor(progress, 'savings');

            return (
              <Box
                key={goal.id}
                sx={{
                  mb: index === savingsGoals.length - 1 ? 0 : 4,
                  p: 3,
                  background: '#ffffff',
                  borderRadius: 3,
                  border: '2px solid #e2e8f0',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: progressGradient,
                    borderRadius: '3px 3px 0 0'
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        fontSize: '24px',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}
                    >
                      {goal.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#1f2937',
                        fontSize: '1.125rem'
                      }}
                    >
                      {goal.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={
                      progress >= 100
                        ? '🎉 Complete!'
                        : `${progress.toFixed(0)}%`
                    }
                    sx={{
                      background:
                        progress >= 100
                          ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                          : progressGradient,
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      boxShadow: `0 4px 12px ${glowColor}`,
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      mb: 2
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        background: progressGradient,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.75rem',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                      }}
                    >
                      £{goal.currentBalance.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#6b7280',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      of £{goal.targetAmount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 12,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      borderRadius: 6,
                      overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        width: `${Math.min(progress, 100)}%`,
                        background: progressGradient,
                        borderRadius: 6,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px ${glowColor}`,
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s ease-in-out infinite',
                        '@keyframes shimmer': {
                          '0%, 100%': { backgroundPosition: '-200% 0' },
                          '50%': { backgroundPosition: '200% 0' }
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        mb: 0.5
                      }}
                    >
                      {remaining > 0
                        ? `💰 £${remaining.toLocaleString()} to go`
                        : '🎉 Target achieved!'}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 0.5,
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 2,
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                      }}
                    >
                      <Typography sx={{ fontSize: '12px' }}>💵</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#059669',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}
                      >
                        £{goal.monthlyContribution}/month
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        lineHeight: 1.2
                      }}
                    >
                      {formatTargetDate(monthsToTarget)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.7rem',
                        display: 'block'
                      }}
                    >
                      {monthsToTarget && monthsToTarget > 0
                        ? `${monthsToTarget} months`
                        : ''}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* Debts */}
        <Box flex={1}>
          {debts.map((debt, index) => {
            const progress =
              debt.startingBalance > 0
                ? ((debt.startingBalance - debt.currentBalance) /
                    debt.startingBalance) *
                  100
                : 0;
            const monthsToPayoff = calculateDebtPayoffMonths(
              debt.currentBalance,
              debt.monthlyPayment
            );
            const progressGradient = getProgressGradient(progress, 'debt');
            const glowColor = getGlowColor(progress, 'debt');
            const isComplete = debt.currentBalance === 0;

            return (
              <Box
                key={debt.id}
                sx={{
                  mb: index === debts.length - 1 ? 0 : 4,
                  p: 3,
                  background: '#ffffff',
                  borderRadius: 3,
                  border: isComplete
                    ? '2px solid #10b981'
                    : '2px solid #e2e8f0',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: isComplete
                      ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                      : progressGradient,
                    borderRadius: '3px 3px 0 0'
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        fontSize: '24px',
                        filter: isComplete ? 'grayscale(0)' : 'grayscale(0.2)'
                      }}
                    >
                      {debt.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#1f2937',
                        fontSize: '1.125rem'
                      }}
                    >
                      {debt.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={
                      isComplete
                        ? '🎉 Debt Free!'
                        : `${progress.toFixed(0)}% paid`
                    }
                    sx={{
                      background: isComplete
                        ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                        : progressGradient,
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      boxShadow: `0 4px 12px ${glowColor}`,
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      mb: 2
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        background: isComplete
                          ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                          : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.75rem',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                      }}
                    >
                      {isComplete
                        ? '£0'
                        : `£${debt.currentBalance.toLocaleString()}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#6b7280',
                        fontSize: '1rem',
                        fontWeight: 600,
                        textDecoration: 'line-through'
                      }}
                    >
                      was £{debt.startingBalance.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 12,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      borderRadius: 6,
                      overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        width: `${Math.min(progress, 100)}%`,
                        background: isComplete
                          ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                          : progressGradient,
                        borderRadius: 6,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px ${glowColor}`,
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s ease-in-out infinite',
                        '@keyframes shimmer': {
                          '0%, 100%': { backgroundPosition: '-200% 0' },
                          '50%': { backgroundPosition: '200% 0' }
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        mb: 0.5
                      }}
                    >
                      {isComplete
                        ? '🎉 Completely eliminated!'
                        : `🔥 £${(debt.startingBalance - debt.currentBalance).toLocaleString()} crushed`}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 0.5,
                        bgcolor: isComplete
                          ? 'rgba(16, 185, 129, 0.1)'
                          : 'rgba(239, 68, 68, 0.1)',
                        borderRadius: 2,
                        border: isComplete
                          ? '1px solid rgba(16, 185, 129, 0.2)'
                          : '1px solid rgba(239, 68, 68, 0.2)'
                      }}
                    >
                      <Typography sx={{ fontSize: '12px' }}>
                        {isComplete ? '✅' : '💸'}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isComplete ? '#059669' : '#dc2626',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}
                      >
                        £{debt.monthlyPayment}/month
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        background: isComplete
                          ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        lineHeight: 1.2
                      }}
                    >
                      {isComplete
                        ? '🎉 Free!'
                        : formatTargetDate(monthsToPayoff)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.7rem',
                        display: 'block'
                      }}
                    >
                      {!isComplete && monthsToPayoff && monthsToPayoff > 0
                        ? `${monthsToPayoff} months`
                        : ''}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SavingsDebtProgress;
