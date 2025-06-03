import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Savings as SavingsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Balance as BalanceIcon,
  Psychology as PsychologyIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import {
  selectEssentialExpenses,
  selectNonEssentialExpenses,
  selectExpenseCategories
} from '../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals
} from '../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectDebts
} from '../../store/slices/debtsSlice';
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

  // Calculate insights and recommendations
  const getBudgetAnalysis = () => {
    const essential = {
      current: essentialExpenses,
      target: monthlyIncome * 0.5,
      percentage:
        monthlyIncome > 0 ? (essentialExpenses / monthlyIncome) * 100 : 0
    };

    const optional = {
      current: nonEssentialExpenses,
      target: monthlyIncome * 0.3,
      percentage:
        monthlyIncome > 0 ? (nonEssentialExpenses / monthlyIncome) * 100 : 0
    };

    const savingsDebt = {
      current: savingsContributions + debtPayments,
      target: monthlyIncome * 0.2,
      percentage:
        monthlyIncome > 0
          ? ((savingsContributions + debtPayments) / monthlyIncome) * 100
          : 0
    };

    return { essential, optional, savingsDebt };
  };

  const analysis = getBudgetAnalysis();

  const budgetCategories = [
    {
      title: 'Essential',
      subtitle: 'Must-have expenses',
      amount: analysis.essential.current,
      target: analysis.essential.target,
      percentage: analysis.essential.percentage,
      targetPercentage: 50,
      icon: HomeIcon,
      color: '#ffd60a'
    },
    {
      title: 'Optional',
      subtitle: 'Lifestyle & wants',
      amount: analysis.optional.current,
      target: analysis.optional.target,
      percentage: analysis.optional.percentage,
      targetPercentage: 30,
      icon: ShoppingCartIcon,
      color: '#06ffa5'
    },
    {
      title: 'Future Wealth',
      subtitle: 'Savings & debt payments',
      amount: analysis.savingsDebt.current,
      target: analysis.savingsDebt.target,
      percentage: analysis.savingsDebt.percentage,
      targetPercentage: 20,
      icon: SavingsIcon,
      color: '#40c9ff'
    }
  ];

  return (
    <Box>
      {/* 50/30/20 Analysis */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          gap: 0,
          alignItems: 'stretch'
        }}
      >
        {budgetCategories.map((category, index) => {
          const variance = category.percentage - category.targetPercentage;
          const isOver = variance > 5;
          const isUnder = variance < -5;

          return (
            <React.Fragment key={index}>
              <Box
                sx={{
                  p: 3,
                  pl: index === 0 ? 0 : 3,
                  pr: index === budgetCategories.length - 1 ? 0 : 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: 2,
                        p: 1,
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <category.icon sx={{ fontSize: 20, color: 'white' }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: 'white',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.85)',
                          fontSize: '0.75rem',
                          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                      >
                        {category.subtitle}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
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
                          fontWeight: 800,
                          fontSize: '2rem',
                          color: 'white',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                      >
                        {category.percentage.toFixed(1)}%
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.85)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                      >
                        Target: {category.targetPercentage}%
                      </Typography>
                    </Box>

                    {/* Custom Temperature Gauge for dark background */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          position: 'relative',
                          height: 20,
                          backgroundColor: 'rgba(0, 0, 0, 0.25)',
                          borderRadius: 10,
                          overflow: 'hidden',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {/* Good zone background */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left:
                              category.title === 'Future Wealth'
                                ? `${category.targetPercentage}%`
                                : '0%',
                            width:
                              category.title === 'Future Wealth'
                                ? `${100 - category.targetPercentage}%`
                                : `${category.targetPercentage}%`,
                            height: '100%',
                            backgroundColor: 'rgba(6, 255, 165, 0.25)',
                            borderRadius: 10
                          }}
                        />

                        {/* Actual fill */}
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}dd 100%)`,
                            width: `${Math.min(category.percentage, 100)}%`,
                            borderRadius: 10,
                            boxShadow: `0 0 16px ${category.color}40`,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />

                        {/* Target point marker */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left: `${Math.min(category.targetPercentage, 100)}%`,
                            top: -2,
                            width: 3,
                            height: 24,
                            backgroundColor: 'white',
                            borderRadius: 1.5,
                            border: '2px solid rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                            transform: 'translateX(-50%)'
                          }}
                        />

                        {/* Target label */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left: `${Math.min(category.targetPercentage, 100)}%`,
                            top: -22,
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            color: '#374151',
                            px: 1.5,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: '0.6rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                          }}
                        >
                          {category.targetPercentage}%
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                      {isOver && (
                        <Chip
                          icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                          label={`${variance.toFixed(1)}% over target`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(239, 68, 68, 0.25)',
                            color: 'white',
                            fontSize: '0.7rem',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            backdropFilter: 'blur(10px)'
                          }}
                        />
                      )}
                      {isUnder && (
                        <Chip
                          icon={<TrendingDownIcon sx={{ fontSize: 14 }} />}
                          label={`${Math.abs(variance).toFixed(1)}% under target`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 214, 10, 0.25)',
                            color: 'white',
                            fontSize: '0.7rem',
                            border: '1px solid rgba(255, 214, 10, 0.4)',
                            backdropFilter: 'blur(10px)'
                          }}
                        />
                      )}
                      {!isOver && !isUnder && (
                        <Chip
                          icon={<BalanceIcon sx={{ fontSize: 14 }} />}
                          label="On target"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(6, 255, 165, 0.25)',
                            color: 'white',
                            fontSize: '0.7rem',
                            border: '1px solid rgba(6, 255, 165, 0.4)',
                            backdropFilter: 'blur(10px)'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'white',
                    fontSize: '1.1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  £{category.amount.toLocaleString()}/mo
                </Typography>
              </Box>

              {index < budgetCategories.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    mx: 2
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default ExpenseDivision;
