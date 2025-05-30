import React, { useState } from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
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
import TemperatureGauge from './TemperatureGauge';

const ExpenseDivision = () => {
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);

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
      color: '#667eea', // Changed to match your theme's primary color
      bgColor: '#f0f4ff', // Light purple-blue background
      borderColor: '#c7d2fe', // Light purple-blue border
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

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        gap: 0,
        alignItems: 'start'
      }}
    >
      {budgetCategories.map((category, index) => {
        const actualPercentage =
          monthlyIncome > 0 ? (category.amount / monthlyIncome) * 100 : 0;
        const progressPercentage = actualPercentage;
        const statusInfo = getStatusIndicator(category.amount, category.target);
        const IconComponent = category.icon;
        const StatusIcon = statusInfo.icon;

        return (
          <React.Fragment key={index}>
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: category.color,
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent sx={{ fontSize: 20, color: 'white' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: '#1f2937'
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                {category.categories.length > 0 ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {category.categories.slice(0, 4).map((cat, catIndex) => (
                      <Chip
                        key={catIndex}
                        label={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}
                          >
                            <Typography sx={{ fontSize: '12px' }}>
                              {cat.icon}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: 500
                              }}
                            >
                              {cat.name}
                            </Typography>
                          </Box>
                        }
                        size="small"
                        sx={{
                          backgroundColor: `${category.color}15`,
                          color: category.color,
                          border: `1px solid ${category.color}40`,
                          fontSize: '0.7rem',
                          height: 24,
                          '& .MuiChip-label': {
                            px: 1
                          }
                        }}
                      />
                    ))}
                    {category.categories.length > 4 && (
                      <Chip
                        label={`+${category.categories.length - 4} more`}
                        size="small"
                        sx={{
                          backgroundColor: '#f1f5f9',
                          color: '#64748b',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.65rem',
                          height: 24
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '24px'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                        fontStyle: 'italic'
                      }}
                    >
                      No active categories
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 1
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      fontSize: '2rem',
                      color: category.color,
                      lineHeight: 1
                    }}
                  >
                    £{category.amount.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#6b7280'
                    }}
                  >
                    {actualPercentage.toFixed(1)}%
                  </Typography>
                </Box>

                <TemperatureGauge
                  percentage={actualPercentage}
                  targetPercentage={category.targetPercentage}
                  isReverse={category.title === 'Savings & Debts'}
                />
              </Box>
            </Box>

            {index < budgetCategories.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderColor: '#e2e8f0',
                  borderWidth: 1,
                  mx: 0
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default ExpenseDivision;
