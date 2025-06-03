import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useAppSelector } from '../store/hooks';
import { selectMonthlyIncome } from '../store/slices/incomeSlice';
import {
  selectEssentialExpenses,
  selectNonEssentialExpenses
} from '../store/slices/expensesSlice';
import { selectTotalSavingsContributions } from '../store/slices/savingsSlice';
import { selectTotalDebtPayments } from '../store/slices/debtsSlice';

const BudgetAllocationSummary = () => {
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);

  const totalAllocated =
    essentialExpenses +
    nonEssentialExpenses +
    savingsContributions +
    debtPayments;
  const remaining = monthlyIncome - totalAllocated;
  const allocationPercentage =
    monthlyIncome > 0 ? (totalAllocated / monthlyIncome) * 100 : 0;
  const isOverBudget = allocationPercentage > 100;

  const needsPercentage =
    monthlyIncome > 0 ? (essentialExpenses / monthlyIncome) * 100 : 0;
  const wantsPercentage =
    monthlyIncome > 0 ? (nonEssentialExpenses / monthlyIncome) * 100 : 0;
  const savingsPercentage =
    monthlyIncome > 0 ? (savingsContributions / monthlyIncome) * 100 : 0;
  const debtPercentage =
    monthlyIncome > 0 ? (debtPayments / monthlyIncome) * 100 : 0;

  const getStatusInfo = () => {
    if (monthlyIncome === 0) {
      return {
        message: 'Set your monthly income to get started',
        submessage: 'Enter your income in the sidebar to begin budget planning',
        color: '#6b7280',
        icon: WalletIcon
      };
    }

    if (remaining < 0) {
      return {
        message: `Over budget by £${Math.abs(remaining).toLocaleString()}`,
        submessage: 'Reduce expenses or increase income to balance your budget',
        color: '#ef4444',
        icon: WarningIcon
      };
    }

    if (remaining === 0) {
      return {
        message: 'Perfect! Every pound is allocated',
        submessage: 'Your budget is fully balanced - great job!',
        color: '#10b981',
        icon: CheckCircleIcon
      };
    }

    return {
      message: `£${remaining.toLocaleString()} left to allocate`,
      submessage:
        remaining > monthlyIncome * 0.1
          ? 'Consider adding to savings or debt payments'
          : 'Almost fully allocated',
      color: remaining > monthlyIncome * 0.05 ? '#f59e0b' : '#10b981',
      icon: TrendingUpIcon
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  const categories = [
    {
      name: 'Needs',
      current: needsPercentage,
      target: 50,
      color: '#667eea',
      amount: essentialExpenses
    },
    {
      name: 'Wants',
      current: wantsPercentage,
      target: 30,
      color: '#f59e0b',
      amount: nonEssentialExpenses
    },
    {
      name: 'Savings',
      current: savingsPercentage,
      target: 15,
      color: '#10b981',
      amount: savingsContributions
    },
    {
      name: 'Debts',
      current: debtPercentage,
      target: 5,
      color: '#ef4444',
      amount: debtPayments
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Left side - Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <StatusIcon sx={{ fontSize: 28, color: 'white' }} />
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 0.5, color: 'white' }}
          >
            {statusInfo.message}
          </Typography>
          <Typography
            variant="body1"
            sx={{ opacity: 0.9, color: 'white', mb: 1.5 }}
          >
            {statusInfo.submessage}
          </Typography>

          {monthlyIncome > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                £{totalAllocated.toLocaleString()} of £
                {monthlyIncome.toLocaleString()} allocated
              </Typography>

              <Box sx={{ position: 'relative' }}>
                {/* Custom progress bar for better visibility */}
                <Box
                  sx={{
                    width: 320,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#374151',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Progress fill */}
                  <Box
                    sx={{
                      width: `${Math.min(allocationPercentage, 100)}%`,
                      height: '100%',
                      background: isOverBudget
                        ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                        : allocationPercentage > 95
                          ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                          : 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                      borderRadius: 6,
                      boxShadow: isOverBudget
                        ? '0 0 12px rgba(239, 68, 68, 0.6)'
                        : '0 0 12px rgba(16, 185, 129, 0.4)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background:
                          'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)',
                        borderRadius: '6px 6px 0 0'
                      }
                    }}
                  />

                  {/* Over-budget indicator */}
                  {isOverBudget && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: 4,
                        background:
                          'repeating-linear-gradient(45deg, #fbbf24, #fbbf24 4px, #f59e0b 4px, #f59e0b 8px)',
                        animation: 'flash 1s infinite alternate'
                      }}
                    />
                  )}
                </Box>

                {/* Percentage indicator */}
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 'calc(50% + 2px)',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                    zIndex: 2
                  }}
                >
                  {allocationPercentage.toFixed(0)}%
                </Typography>
              </Box>

              {/* Over-budget warning */}
              {isOverBudget && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#fbbf24',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  ⚠️ Budget exceeded - reduce expenses by £
                  {Math.abs(remaining).toLocaleString()}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Right side - 50/30/15/5 breakdown */}
      {monthlyIncome > 0 && (
        <Box sx={{ display: 'flex', gap: 4 }}>
          {categories.map((category) => {
            const variance = category.current - category.target;
            const isOnTarget = Math.abs(variance) <= 5;

            return (
              <Box
                key={category.name}
                sx={{ textAlign: 'center', minWidth: 100 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: '2.5rem',
                    color: 'white',
                    lineHeight: 1
                  }}
                >
                  {category.current.toFixed(0)}%
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    mb: 0.5
                  }}
                >
                  {category.name}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Chip
                    label={
                      isOnTarget
                        ? 'On target'
                        : `${variance > 0 ? '+' : ''}${variance.toFixed(0)}%`
                    }
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      backgroundColor: isOnTarget
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'rgba(245, 158, 11, 0.3)',
                      color: 'white',
                      border: `1px solid ${isOnTarget ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)'}`
                    }}
                  />
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.8rem',
                    display: 'block',
                    mt: 0.5
                  }}
                >
                  £{category.amount.toLocaleString()}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default BudgetAllocationSummary;
