import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Collapse,
  IconButton,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Savings as SavingsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { GradientCard, SectionHeader } from './styled';
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

const MonthlyBudgetOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const remaining = useAppSelector(selectRemainingIncome);
  const allocationPercentage = useAppSelector(selectBudgetAllocationPercentage);

  // Get actual category data
  const expenseCategories = useAppSelector(selectExpenseCategories);
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const debts = useAppSelector(selectDebts);

  // Helper function to get categories for each budget type
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

    // Add savings goals with contributions
    savingsGoals.forEach((goal) => {
      if (goal.monthlyContribution > 0) {
        categories.push({ name: goal.name, icon: goal.icon });
      }
    });

    // Add debts with payments
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
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#fca5a5',
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
    <GradientCard>
      <SectionHeader>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            cursor: 'pointer'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontSize: '1.375rem', color: '#1f2937' }}
            >
              Monthly Budget Overview
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              Monthly Income: £{monthlyIncome.toLocaleString()} • Available: £
              {remaining.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  color: '#6b7280',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  display: 'block',
                  mb: 0.25
                }}
              >
                Allocated
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: remaining >= 0 ? '#10b981' : '#ef4444'
                }}
              >
                {Math.round(allocationPercentage)}%
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={60}
                thickness={4}
                sx={{ color: '#f3f4f6', position: 'absolute' }}
              />
              <CircularProgress
                variant="determinate"
                value={Math.min(allocationPercentage, 100)}
                size={60}
                thickness={4}
                sx={{
                  color: remaining >= 0 ? '#10b981' : '#ef4444',
                  '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
                }}
              />
            </Box>
            <IconButton size="small" sx={{ color: '#6b7280', ml: 1 }}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
      </SectionHeader>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 3 }}>
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
              const progressPercentage =
                category.target > 0
                  ? (category.amount / category.target) * 100
                  : 0;
              const statusInfo = getStatusIndicator(
                category.amount,
                category.target
              );
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
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
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
                          <IconComponent
                            sx={{ fontSize: 20, color: 'white' }}
                          />
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
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <StatusIcon
                          sx={{ fontSize: 16, color: statusInfo.color }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: statusInfo.color
                          }}
                        >
                          {statusInfo.status}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3, minHeight: '60px' }}>
                      {category.categories.length > 0 ? (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {category.categories
                            .slice(0, 4)
                            .map((cat, catIndex) => (
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

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.8rem', display: 'block', mb: 2 }}
                      >
                        Target: £{category.target.toLocaleString()} (
                        {category.targetPercentage}%)
                      </Typography>

                      <Box sx={{ position: 'relative', mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(progressPercentage, 100)}
                          sx={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: '#f3f4f6',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: category.color,
                              borderRadius: 6,
                              boxShadow: `0 2px 8px ${category.color}40`
                            }
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 2,
                            height: 8,
                            backgroundColor: '#374151',
                            borderRadius: 1,
                            opacity: progressPercentage > 85 ? 1 : 0.5
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color:
                              progressPercentage > 100 ? '#ef4444' : '#059669'
                          }}
                        >
                          {progressPercentage > 100
                            ? `£${(category.amount - category.target).toLocaleString()} over target`
                            : `£${(category.target - category.amount).toLocaleString()} under target`}
                        </Typography>
                        <Chip
                          label={`${Math.round(progressPercentage)}%`}
                          size="small"
                          sx={{
                            backgroundColor:
                              progressPercentage > 100 ? '#fee2e2' : '#dcfce7',
                            color:
                              progressPercentage > 100 ? '#991b1b' : '#166534',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            height: 22
                          }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: category.bgColor,
                        border: `1px solid ${category.borderColor}`
                      }}
                    >
                      {actualPercentage > category.targetPercentage ? (
                        <TrendingUpIcon
                          sx={{ fontSize: 16, color: '#ef4444' }}
                        />
                      ) : (
                        <TrendingDownIcon
                          sx={{ fontSize: 16, color: '#10b981' }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: '#374151',
                          lineHeight: 1.3
                        }}
                      >
                        {actualPercentage > category.targetPercentage
                          ? `${(actualPercentage - category.targetPercentage).toFixed(1)}% above 50/30/20 rule`
                          : `${(category.targetPercentage - actualPercentage).toFixed(1)}% below 50/30/20 rule`}
                      </Typography>
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

          {remaining !== 0 && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: remaining > 0 ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${remaining > 0 ? '#bbf7d0' : '#fca5a5'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              {remaining > 0 ? (
                <CheckCircleIcon sx={{ fontSize: 24, color: '#10b981' }} />
              ) : (
                <WarningIcon sx={{ fontSize: 24, color: '#ef4444' }} />
              )}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: remaining > 0 ? '#166534' : '#991b1b',
                  textAlign: 'center'
                }}
              >
                {remaining > 0
                  ? `£${remaining.toLocaleString()} available to allocate`
                  : `£${Math.abs(remaining).toLocaleString()} over budget - adjust spending or increase income`}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </GradientCard>
  );
};

export default MonthlyBudgetOverview;
