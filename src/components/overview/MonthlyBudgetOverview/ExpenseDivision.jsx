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
import AdvancedFinancialHealth from './CompactFinancialHealth';
import FinancialSnapshot from './FinancialSnapshot';

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

  const getTopSpendingInsights = () => {
    const allItems = [];

    expenseCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.amount > 0) {
          allItems.push({
            name: item.name,
            category: cat.name,
            amount: item.amount,
            isEssential: item.isEssential,
            percentageOfIncome:
              monthlyIncome > 0 ? (item.amount / monthlyIncome) * 100 : 0
          });
        }
      });
    });

    return allItems.sort((a, b) => b.amount - a.amount).slice(0, 5);
  };

  const getBudgetHealth = () => {
    const analysis = getBudgetAnalysis();
    const totalAllocated =
      analysis.essential.current +
      analysis.optional.current +
      analysis.savingsDebt.current;
    const remaining = monthlyIncome - totalAllocated;

    let score = 100;
    let issues = [];

    // Check essential expenses (max 25 points deduction)
    const essentialVariance = Math.abs(analysis.essential.percentage - 50);
    if (essentialVariance > 15) {
      score -= 25;
      issues.push({
        category: 'essential',
        severity: 'high',
        variance: essentialVariance
      });
    } else if (essentialVariance > 10) {
      score -= 15;
      issues.push({
        category: 'essential',
        severity: 'medium',
        variance: essentialVariance
      });
    } else if (essentialVariance > 5) {
      score -= 8;
      issues.push({
        category: 'essential',
        severity: 'low',
        variance: essentialVariance
      });
    }

    // Check optional expenses (max 20 points deduction)
    const optionalVariance = Math.abs(analysis.optional.percentage - 30);
    if (optionalVariance > 15) {
      score -= 20;
      issues.push({
        category: 'optional',
        severity: 'high',
        variance: optionalVariance
      });
    } else if (optionalVariance > 10) {
      score -= 12;
      issues.push({
        category: 'optional',
        severity: 'medium',
        variance: optionalVariance
      });
    } else if (optionalVariance > 5) {
      score -= 6;
      issues.push({
        category: 'optional',
        severity: 'low',
        variance: optionalVariance
      });
    }

    // Check savings/debt (max 30 points deduction - most important)
    const savingsVariance = Math.abs(analysis.savingsDebt.percentage - 20);
    if (savingsVariance > 15) {
      score -= 30;
      issues.push({
        category: 'savings',
        severity: 'high',
        variance: savingsVariance
      });
    } else if (savingsVariance > 10) {
      score -= 18;
      issues.push({
        category: 'savings',
        severity: 'medium',
        variance: savingsVariance
      });
    } else if (savingsVariance > 5) {
      score -= 10;
      issues.push({
        category: 'savings',
        severity: 'low',
        variance: savingsVariance
      });
    }

    // Check for over-spending (max 25 points deduction)
    if (remaining < -200) {
      score -= 25;
      issues.push({
        category: 'overspending',
        severity: 'high',
        amount: Math.abs(remaining)
      });
    } else if (remaining < 0) {
      score -= 15;
      issues.push({
        category: 'overspending',
        severity: 'medium',
        amount: Math.abs(remaining)
      });
    }

    score = Math.max(score, 0);

    let status, color, description;
    if (score >= 90) {
      status = 'Excellent';
      color = '#10b981';
      description =
        'Your budget follows best practices and sets you up for financial success.';
    } else if (score >= 75) {
      status = 'Good';
      color = '#667eea';
      description = 'Solid budget with room for minor improvements.';
    } else if (score >= 60) {
      status = 'Fair';
      color = '#f59e0b';
      description =
        'Budget needs some adjustments to optimize your financial health.';
    } else {
      status = 'Needs Work';
      color = '#ef4444';
      description =
        'Significant budget improvements needed for financial stability.';
    }

    return { score, status, color, description, issues };
  };

  const getOptimizationTips = () => {
    const budgetHealth = getBudgetHealth();
    const analysis = getBudgetAnalysis();
    const tips = [];

    budgetHealth.issues.forEach((issue) => {
      let tip = {};

      switch (issue.category) {
        case 'essential':
          if (analysis.essential.percentage > 50) {
            tip = {
              title: `Reduce Essential Expenses`,
              description: `Your essentials are ${issue.variance.toFixed(1)}% over the 50% target`,
              action: `Lower essentials by £${(analysis.essential.current - analysis.essential.target).toFixed(0)}`,
              points: `+${issue.severity === 'high' ? 25 : issue.severity === 'medium' ? 15 : 8} points`,
              priority: issue.severity,
              icon: '🏠'
            };
          } else {
            tip = {
              title: `Increase Essential Budget`,
              description: `You may be under-budgeting for necessities`,
              action: `Review if all essential expenses are captured`,
              points: `+${issue.severity === 'high' ? 25 : issue.severity === 'medium' ? 15 : 8} points`,
              priority: issue.severity,
              icon: '🏠'
            };
          }
          break;

        case 'optional':
          if (analysis.optional.percentage > 30) {
            tip = {
              title: `Cut Discretionary Spending`,
              description: `Lifestyle spending is ${issue.variance.toFixed(1)}% over the 30% target`,
              action: `Reduce optional expenses by £${(analysis.optional.current - analysis.optional.target).toFixed(0)}`,
              points: `+${issue.severity === 'high' ? 20 : issue.severity === 'medium' ? 12 : 6} points`,
              priority: issue.severity,
              icon: '🛍️'
            };
          } else {
            tip = {
              title: `Enjoy Life More`,
              description: `You have room for more lifestyle spending`,
              action: `Could spend £${(analysis.optional.target - analysis.optional.current).toFixed(0)} more on wants`,
              points: `+${issue.severity === 'high' ? 20 : issue.severity === 'medium' ? 12 : 6} points`,
              priority: issue.severity,
              icon: '🎉'
            };
          }
          break;

        case 'savings':
          if (analysis.savingsDebt.percentage < 20) {
            tip = {
              title: `Boost Future Wealth`,
              description: `Only ${analysis.savingsDebt.percentage.toFixed(1)}% going to savings/debt`,
              action: `Increase by £${(analysis.savingsDebt.target - analysis.savingsDebt.current).toFixed(0)} monthly`,
              points: `+${issue.severity === 'high' ? 30 : issue.severity === 'medium' ? 18 : 10} points`,
              priority: issue.severity,
              icon: '💰'
            };
          } else {
            tip = {
              title: `Optimize Allocation`,
              description: `High savings rate - ensure emergency fund is covered first`,
              action: `Review if savings/debt balance is optimal`,
              points: `+${issue.severity === 'high' ? 30 : issue.severity === 'medium' ? 18 : 10} points`,
              priority: issue.severity,
              icon: '⚖️'
            };
          }
          break;

        case 'overspending':
          tip = {
            title: `Stop Overspending`,
            description: `You're spending £${issue.amount.toFixed(0)} more than you earn`,
            action: `Cut expenses or increase income to balance budget`,
            points: `+${issue.severity === 'high' ? 25 : 15} points`,
            priority: 'high',
            icon: '🚨'
          };
          break;
      }

      if (tip.title) tips.push(tip);
    });

    // Sort by priority (high first)
    tips.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    return tips;
  };

  const analysis = getBudgetAnalysis();
  const topSpending = getTopSpendingInsights();
  const budgetHealth = getBudgetHealth();
  const optimizationTips = getOptimizationTips();

  const budgetCategories = [
    {
      title: 'Essential',
      subtitle: 'Must-have expenses',
      amount: analysis.essential.current,
      target: analysis.essential.target,
      percentage: analysis.essential.percentage,
      targetPercentage: 50,
      icon: HomeIcon,
      color: '#667eea'
    },
    {
      title: 'Optional',
      subtitle: 'Lifestyle & wants',
      amount: analysis.optional.current,
      target: analysis.optional.target,
      percentage: analysis.optional.percentage,
      targetPercentage: 30,
      icon: ShoppingCartIcon,
      color: '#f59e0b'
    },
    {
      title: 'Future Wealth',
      subtitle: 'Savings & debt payments',
      amount: analysis.savingsDebt.current,
      target: analysis.savingsDebt.target,
      percentage: analysis.savingsDebt.percentage,
      targetPercentage: 20,
      icon: SavingsIcon,
      color: '#10b981'
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
          alignItems: 'stretch',
          mb: 4
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
                      mb: 1
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: category.color,
                        borderRadius: 2,
                        p: 1
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
                          color: '#1f2937'
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#6b7280', fontSize: '0.75rem' }}
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
                        mb: 1
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          fontSize: '1.75rem',
                          color: category.color
                        }}
                      >
                        {category.percentage.toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        Target: {category.targetPercentage}%
                      </Typography>
                    </Box>

                    <TemperatureGauge
                      percentage={category.percentage}
                      targetPercentage={category.targetPercentage}
                      isReverse={category.title === 'Future Wealth'}
                    />

                    <Box sx={{ mt: 1 }}>
                      {isOver && (
                        <Chip
                          icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                          label={`${variance.toFixed(1)}% over target`}
                          size="small"
                          sx={{
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                      {isUnder && (
                        <Chip
                          icon={<TrendingDownIcon sx={{ fontSize: 14 }} />}
                          label={`${Math.abs(variance).toFixed(1)}% under target`}
                          size="small"
                          sx={{
                            backgroundColor: '#fef3c7',
                            color: '#d97706',
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                      {!isOver && !isUnder && (
                        <Chip
                          icon={<BalanceIcon sx={{ fontSize: 14 }} />}
                          label="On target"
                          size="small"
                          sx={{
                            backgroundColor: '#dcfce7',
                            color: '#166534',
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: '#374151', fontSize: '1rem' }}
                >
                  £{category.amount.toLocaleString()}/mo
                </Typography>
              </Box>

              {index < budgetCategories.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: '#e2e8f0', borderWidth: 1 }}
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
