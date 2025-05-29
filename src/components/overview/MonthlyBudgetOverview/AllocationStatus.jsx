import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Savings as SavingsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import {
  selectTotalExpenses,
  selectEssentialExpenses,
  selectNonEssentialExpenses,
  selectExpenseCategories
} from '../../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals
} from '../../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectDebts
} from '../../../store/slices/debtsSlice';
import {
  selectRemainingIncome,
  selectBudgetAllocationPercentage
} from '../../../store/selectors/budgetSelectors';
const AllocationStatus = () => {
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const remaining = useAppSelector(selectRemainingIncome);
  const allocationPercentage = useAppSelector(selectBudgetAllocationPercentage);
  const expenseCategories = useAppSelector(selectExpenseCategories);
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const debts = useAppSelector(selectDebts);
  const getEssentialCategories = () => {
    return expenseCategories
      .filter((cat) =>
        cat.items.some((item) => item.isEssential && item.amount > 0)
      )
      .map((cat) => ({ name: cat.name, icon: cat.icon }));
  };
  const getNonEssentialCategories = () => {
    return expenseCategories
      .filter((cat) =>
        cat.items.some((item) => !item.isEssential && item.amount > 0)
      )
      .map((cat) => ({ name: cat.name, icon: cat.icon }));
  };
  const getSavingsAndDebtCategories = () => {
    const categories = [];
    savingsGoals.forEach((goal) => {
      if (goal.monthlyContribution > 0) {
        categories.push({ name: goal.name, icon: goal.icon });
      }
    });
    debts.forEach((debt) => {
      if (debt.monthlyPayment > 0) {
        categories.push({ name: debt.name, icon: debt.icon });
      }
    });
    return categories;
  };
  const budgetCategories = [
    {
      title: 'Essential',
      amount: essentialExpenses,
      target: monthlyIncome * 0.5,
      targetPercentage: 50,
      icon: HomeIcon,
      color: '#667eea',
      bgColor: '#f0f4ff',
      borderColor: '#c7d2fe',
      categories: getEssentialCategories()
    },
    {
      title: 'Optional',
      amount: nonEssentialExpenses,
      target: monthlyIncome * 0.3,
      targetPercentage: 30,
      icon: ShoppingCartIcon,
      color: '#f59e0b',
      bgColor: '#fef9e7',
      borderColor: '#fbbf24',
      categories: getNonEssentialCategories()
    },
    {
      title: 'Savings & Debts',
      amount: savingsContributions + debtPayments,
      target: monthlyIncome * 0.2,
      targetPercentage: 20,
      icon: SavingsIcon,
      color: '#10b981',
      bgColor: '#f0fdf4',
      borderColor: '#bbf7d0',
      categories: getSavingsAndDebtCategories()
    }
  ];
  const getStatusIndicator = (amount, target) => {
    const percentage = target > 0 ? (amount / target) * 100 : 0;
    if (percentage <= 80) {
      return {
        icon: CheckCircleIcon,
        color: '#10b981',
        status: 'Under Target'
      };
    } else if (percentage <= 110) {
      return { icon: CheckCircleIcon, color: '#667eea', status: 'On Track' };
    } else if (percentage <= 130) {
      return { icon: WarningIcon, color: '#f59e0b', status: 'Over Target' };
    }
    return { icon: ErrorIcon, color: '#ef4444', status: 'Significantly Over' };
  };
  const totalAllocated = budgetCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0
  );
  return (
    <>
      {remaining !== 0 && (
        <Box sx={{ mb: 5, maxWidth: '500px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: '2.25rem',
                  background:
                    remaining > 0
                      ? 'linear-gradient(135deg, #059669, #10b981, #34d399)'
                      : 'linear-gradient(135deg, #dc2626, #ef4444, #f87171)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
                }}
              >
                £{Math.abs(remaining).toLocaleString()}
              </Typography>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: remaining > 0 ? '#059669' : '#dc2626',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  {remaining > 0
                    ? '✨ Available to Allocate'
                    : '⚠️ Over Budget'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    fontWeight: 500
                  }}
                >
                  £{totalAllocated.toLocaleString()} / £
                  {monthlyIncome.toLocaleString()} allocated
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <Chip
                label={`${Math.round(allocationPercentage)}%`}
                size="small"
                sx={{
                  backgroundColor:
                    remaining > 0
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(239, 68, 68, 0.15)',
                  color: remaining > 0 ? '#059669' : '#dc2626',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  height: 26,
                  border: `1px solid ${remaining > 0 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(allocationPercentage, 100)}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
                '& .MuiLinearProgress-bar': {
                  background:
                    remaining > 0
                      ? 'linear-gradient(90deg, #10b981, #34d399)'
                      : allocationPercentage > 100
                        ? 'linear-gradient(90deg, #ef4444, #f87171)'
                        : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  borderRadius: 6,
                  boxShadow:
                    remaining > 0
                      ? '0 2px 8px rgba(16, 185, 129, 0.3)'
                      : allocationPercentage > 100
                        ? '0 2px 8px rgba(239, 68, 68, 0.3)'
                        : '0 2px 8px rgba(245, 158, 11, 0.3)'
                }
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                borderRadius: 6,
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite',
                pointerEvents: 'none',
                '@keyframes shimmer': {
                  '0%, 100%': { backgroundPosition: '-200% 0' },
                  '50%': { backgroundPosition: '200% 0' }
                }
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
export default AllocationStatus;
