import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  Collapse,
  Divider,
  Paper,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Psychology as PsychologyIcon,
  Assessment as AssessmentIcon,
  Lightbulb as LightbulbIcon,
  Receipt as ReceiptIcon,
  Star as StarIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Savings as SavingsIcon,
  CreditCard as CreditCardIcon,
  TrendingDown as TrendingDownIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon
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

import ProjectedFinancialOverview from './ProjectedFinancialOverview';
import ExpenseDivision from './ExpenseDivision';

const ProgressDivider = ({ label = 'Progress Tracking' }) => (
  <Box sx={{ my: 8, position: 'relative' }}>
    <Divider sx={{ borderColor: '#e2e8f0', borderWidth: 1 }} />
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        px: 4,
        py: 1.5,
        bgcolor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#6b7280',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {label}
      </Typography>
    </Box>
  </Box>
);

const MonthlyBudgetOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);

  // Fake data
  const topExpenses = [
    {
      name: 'Mortgage',
      amount: 1200,
      category: 'Housing',
      isEssential: true,
      trend: 'stable',
      change: 0
    },
    {
      name: 'Groceries',
      amount: 450,
      category: 'Food',
      isEssential: true,
      trend: 'up',
      change: 12
    },
    {
      name: 'Car Payment',
      amount: 350,
      category: 'Transport',
      isEssential: true,
      trend: 'stable',
      change: 0
    },
    {
      name: 'Dining Out',
      amount: 280,
      category: 'Lifestyle',
      isEssential: false,
      trend: 'up',
      change: 23
    },
    {
      name: 'Utilities',
      amount: 220,
      category: 'Housing',
      isEssential: true,
      trend: 'down',
      change: -8
    },
    {
      name: 'Entertainment',
      amount: 180,
      category: 'Lifestyle',
      isEssential: false,
      trend: 'up',
      change: 15
    }
  ];

  const budgetHealth = {
    score: 78,
    strengths: [
      'Emergency fund fully funded',
      'Debt payments on track',
      'Consistent savings rate'
    ],
    concerns: ['Dining expenses up 23%', 'Entertainment spending rising']
  };

  // Fake savings and debt data
  const savingsGoals = [
    {
      id: 1,
      name: 'Emergency Fund',
      currentBalance: 15000,
      targetAmount: 25000,
      monthlyContribution: 500,
      targetDate: '2025-12',
      priority: 'High',
      icon: '🛡️'
    },
    {
      id: 2,
      name: 'Holiday Fund',
      currentBalance: 3200,
      targetAmount: 8000,
      monthlyContribution: 300,
      targetDate: '2025-08',
      priority: 'Medium',
      icon: '✈️'
    },
    {
      id: 3,
      name: 'New Car Fund',
      currentBalance: 8500,
      targetAmount: 20000,
      monthlyContribution: 400,
      targetDate: '2026-06',
      priority: 'Medium',
      icon: '🚗'
    },
    {
      id: 4,
      name: 'House Deposit',
      currentBalance: 45000,
      targetAmount: 100000,
      monthlyContribution: 800,
      targetDate: '2027-12',
      priority: 'High',
      icon: '🏠'
    }
  ];

  const debts = [
    {
      id: 1,
      name: 'Credit Card',
      currentBalance: 3200,
      originalBalance: 8000,
      interestRate: 22.9,
      monthlyPayment: 300,
      priority: 'High',
      icon: '💳'
    },
    {
      id: 2,
      name: 'Car Loan',
      currentBalance: 12500,
      originalBalance: 25000,
      interestRate: 6.5,
      monthlyPayment: 420,
      priority: 'Medium',
      icon: '🚗'
    },
    {
      id: 3,
      name: 'Student Loan',
      currentBalance: 18000,
      originalBalance: 35000,
      interestRate: 3.2,
      monthlyPayment: 280,
      priority: 'Low',
      icon: '🎓'
    }
  ];

  const getHealthColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#667eea';
    if (score >= 55) return '#f59e0b';
    return '#ef4444';
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getMonthsToComplete = (current, target, monthly) => {
    if (monthly <= 0) return 'N/A';
    const remaining = target - current;
    if (remaining <= 0) return 'Complete';
    return Math.ceil(remaining / monthly);
  };

  const getDebtPayoffMonths = (balance, payment) => {
    if (payment <= 0) return 'N/A';
    return Math.ceil(balance / payment);
  };

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 3 }}>
          {/* ProjectedFinancialOverview with Budget Health and Ad */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 280px',
              gap: 4,
              mb: 6
            }}
          >
            <Box>
              <ProjectedFinancialOverview />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Top: Budget Health */}
              <Paper
                sx={{
                  p: 0,
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  height: 'calc(50% - 12px)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-2px)',
                    border: '1px solid #cbd5e1'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${getHealthColor(budgetHealth.score)} 0%, ${getHealthColor(budgetHealth.score)}aa 100%)`,
                    boxShadow: `0 2px 8px ${getHealthColor(budgetHealth.score)}40`
                  }
                }}
                onClick={() => console.log('Open budget health details')}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: `linear-gradient(135deg, ${getHealthColor(budgetHealth.score)}08 0%, ${getHealthColor(budgetHealth.score)}04 100%)`,
                      borderBottom: '1px solid #e2e8f0'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          background: `conic-gradient(${getHealthColor(budgetHealth.score)} ${budgetHealth.score * 3.6}deg, #e5e7eb 0deg)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          boxShadow: `0 4px 12px ${getHealthColor(budgetHealth.score)}20`
                        }}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            bgcolor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 900,
                              color: getHealthColor(budgetHealth.score),
                              fontSize: '1.3rem'
                            }}
                          >
                            {budgetHealth.score}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          border: '2px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Typography sx={{ fontSize: '10px' }}>ℹ️</Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: '#374151',
                        fontSize: '0.85rem',
                        mb: 0.5
                      }}
                    >
                      Budget Health
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: getHealthColor(budgetHealth.score),
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      Good Standing
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 3,
                      pt: 2,
                      background:
                        'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#10b981'
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#374151',
                            fontSize: '0.7rem',
                            fontWeight: 600
                          }}
                        >
                          Strengths
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#10b981',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            ml: 0.5
                          }}
                        >
                          {budgetHealth.strengths.length}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#f59e0b'
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#374151',
                            fontSize: '0.7rem',
                            fontWeight: 600
                          }}
                        >
                          Areas
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#f59e0b',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            ml: 0.5
                          }}
                        >
                          {budgetHealth.concerns.length}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        p: 1.5,
                        bgcolor: 'rgba(102, 126, 234, 0.08)',
                        borderRadius: 2,
                        border: '1px solid rgba(102, 126, 234, 0.12)'
                      }}
                    >
                      <Typography sx={{ fontSize: '12px' }}>👆</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#667eea',
                          fontSize: '0.7rem',
                          fontWeight: 600
                        }}
                      >
                        Click for detailed analysis
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
              {/* Bottom: Ad Placeholder */}
              <Paper
                sx={{
                  p: 3,
                  border: '2px dashed #cbd5e1',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f8fafc',
                  color: '#6b7280',
                  height: 'calc(50% - 12px)'
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <Typography sx={{ fontSize: '16px' }}>📊</Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    textAlign: 'center',
                    mb: 1,
                    fontSize: '0.8rem'
                  }}
                >
                  Financial Tools
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textAlign: 'center', fontSize: '0.7rem' }}
                >
                  Sponsored content
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: 3 }}>
          <ProgressDivider label="Budget Breakdown" />

          {/* Compact 50/30/20 Analysis */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              background: 'linear-gradient(135deg, #7b91ff 0%, #8a9fff 100%)',
              borderRadius: 3,
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, fontSize: '1.4rem', mb: 1 }}
                  >
                    50/30/20 Budget Analysis
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '0.9rem', opacity: 0.9, maxWidth: '500px' }}
                  >
                    Optimal allocation: 50% needs, 30% wants, 20% savings & debt
                    payments
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <AssessmentIcon sx={{ fontSize: 20, color: 'white' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    FRAMEWORK
                  </Typography>
                </Box>
              </Box>

              <ExpenseDivision />
            </Box>
          </Box>

          {/* Three Column Layout */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 280px',
              gap: 6,
              mb: 8
            }}
          >
            {/* Left: Top Expenses */}
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}
                >
                  Where Your Money Goes
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Your top expenses this month with trend analysis
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {topExpenses.map((expense, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 3,
                      px: 0,
                      borderBottom:
                        index < topExpenses.length - 1
                          ? '1px solid #f1f5f9'
                          : 'none',
                      '&:hover': { bgcolor: '#fafbfc' },
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: expense.isEssential ? '#667eea' : '#f59e0b'
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: '#1f2937',
                            fontSize: '1rem'
                          }}
                        >
                          {expense.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: '#6b7280', fontSize: '0.85rem' }}
                        >
                          {expense.category}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {expense.change !== 0 && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          {expense.change > 0 ? (
                            <ArrowUpwardIcon
                              sx={{ fontSize: 16, color: '#ef4444' }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              sx={{ fontSize: 16, color: '#10b981' }}
                            />
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              color: expense.change > 0 ? '#ef4444' : '#10b981',
                              fontWeight: 600,
                              fontSize: '0.8rem'
                            }}
                          >
                            {Math.abs(expense.change)}%
                          </Typography>
                        </Box>
                      )}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#1f2937',
                          fontSize: '1.2rem',
                          minWidth: '80px',
                          textAlign: 'right'
                        }}
                      >
                        £{expense.amount}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            {/* Middle: Budget Health */}
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}
                >
                  Budget Health
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  How well you're managing your finances
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 4,
                  p: 4,
                  bgcolor: '#f8fafc',
                  borderRadius: 3
                }}
              >
                <Box
                  sx={{ position: 'relative', display: 'inline-block', mb: 3 }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: `conic-gradient(${getHealthColor(budgetHealth.score)} ${budgetHealth.score * 3.6}deg, #e5e7eb 0deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        bgcolor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 900,
                          color: getHealthColor(budgetHealth.score)
                        }}
                      >
                        {budgetHealth.score}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: getHealthColor(budgetHealth.score),
                    mb: 1
                  }}
                >
                  Good Health
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#6b7280', fontSize: '0.9rem' }}
                >
                  Your budget is well-balanced with room for improvement
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <CheckCircleIcon sx={{ fontSize: 18, color: '#10b981' }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: '#1f2937' }}
                  >
                    What's Working
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {budgetHealth.strengths.map((strength, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        color: '#10b981',
                        fontSize: '0.9rem',
                        pl: 2,
                        position: 'relative'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: '#10b981'
                        }}
                      />
                      {strength}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <WarningIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: '#1f2937' }}
                  >
                    Watch Out For
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {budgetHealth.concerns.map((concern, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        color: '#f59e0b',
                        fontSize: '0.9rem',
                        pl: 2,
                        position: 'relative'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: '#f59e0b'
                        }}
                      />
                      {concern}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
            {/* Right: Ad Placeholders */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Paper
                sx={{
                  height: 250,
                  p: 3,
                  border: '2px dashed #cbd5e1',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f8fafc',
                  color: '#6b7280'
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <Typography sx={{ fontSize: '20px' }}>📢</Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}
                >
                  Advertisement
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textAlign: 'center', fontSize: '0.75rem' }}
                >
                  Sponsored content placeholder
                </Typography>
              </Paper>
              <Paper
                sx={{
                  height: 250,
                  p: 3,
                  border: '2px dashed #cbd5e1',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f8fafc',
                  color: '#6b7280'
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <Typography sx={{ fontSize: '20px' }}>💼</Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}
                >
                  Premium Feature
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textAlign: 'center', fontSize: '0.75rem' }}
                >
                  Upgrade to unlock advanced insights
                </Typography>
              </Paper>
            </Box>
          </Box>

          <ProgressDivider label="Savings & Debt Progress" />

          {/* Savings and Debt Section */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 6,
              mb: 8
            }}
          >
            {/* Left: Savings Goals */}
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}
                >
                  Savings Goals Progress
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Track your journey toward financial milestones
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {savingsGoals.map((goal) => {
                  const progress =
                    (goal.currentBalance / goal.targetAmount) * 100;
                  const monthsToComplete = getMonthsToComplete(
                    goal.currentBalance,
                    goal.targetAmount,
                    goal.monthlyContribution
                  );

                  return (
                    <Box
                      key={goal.id}
                      sx={{
                        p: 3,
                        border: '1px solid #e2e8f0',
                        borderRadius: 3,
                        background:
                          'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          transform: 'translateY(-1px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
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
                            gap: 1.5
                          }}
                        >
                          <Typography sx={{ fontSize: '18px' }}>
                            {goal.icon}
                          </Typography>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 600, color: '#1f2937' }}
                            >
                              {goal.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: '#6b7280' }}
                            >
                              £{goal.monthlyContribution}/month
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={goal.priority}
                          size="small"
                          sx={{
                            backgroundColor: `${getPriorityColor(goal.priority)}20`,
                            color: getPriorityColor(goal.priority),
                            border: `1px solid ${getPriorityColor(goal.priority)}40`,
                            fontSize: '0.7rem',
                            fontWeight: 600
                          }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: '#1f2937' }}
                          >
                            £{goal.currentBalance.toLocaleString()} / £
                            {goal.targetAmount.toLocaleString()}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#10b981', fontWeight: 600 }}
                          >
                            {progress.toFixed(1)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(progress, 100)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#f1f5f9',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#10b981',
                              borderRadius: 4
                            }
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
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <ScheduleIcon
                            sx={{ fontSize: 14, color: '#6b7280' }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: '#6b7280' }}
                          >
                            {typeof monthsToComplete === 'number'
                              ? `${monthsToComplete} months to go`
                              : monthsToComplete}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          Target: {goal.targetDate}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Right: Debt Payoff */}
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}
                >
                  Debt Payoff Progress
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Track your path to financial freedom
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {debts.map((debt) => {
                  const progress =
                    ((debt.originalBalance - debt.currentBalance) /
                      debt.originalBalance) *
                    100;
                  const monthsToPayoff = getDebtPayoffMonths(
                    debt.currentBalance,
                    debt.monthlyPayment
                  );

                  return (
                    <Box
                      key={debt.id}
                      sx={{
                        p: 3,
                        border: '1px solid #e2e8f0',
                        borderRadius: 3,
                        background:
                          'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          transform: 'translateY(-1px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
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
                            gap: 1.5
                          }}
                        >
                          <Typography sx={{ fontSize: '18px' }}>
                            {debt.icon}
                          </Typography>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 600, color: '#1f2937' }}
                            >
                              {debt.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: '#6b7280' }}
                            >
                              {debt.interestRate}% APR • £{debt.monthlyPayment}
                              /month
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={debt.priority}
                          size="small"
                          sx={{
                            backgroundColor: `${getPriorityColor(debt.priority)}20`,
                            color: getPriorityColor(debt.priority),
                            border: `1px solid ${getPriorityColor(debt.priority)}40`,
                            fontSize: '0.7rem',
                            fontWeight: 600
                          }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: '#1f2937' }}
                          >
                            £{debt.currentBalance.toLocaleString()} remaining
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#ef4444', fontWeight: 600 }}
                          >
                            {progress.toFixed(1)}% paid off
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(progress, 100)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#fef2f2',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#ef4444',
                              borderRadius: 4
                            }
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
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <TrendingDownIcon
                            sx={{ fontSize: 14, color: '#10b981' }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: '#6b7280' }}
                          >
                            {typeof monthsToPayoff === 'number'
                              ? `${monthsToPayoff} months left`
                              : monthsToPayoff}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <MoneyIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
                          <Typography
                            variant="caption"
                            sx={{ color: '#6b7280' }}
                          >
                            £
                            {(
                              debt.currentBalance *
                              (debt.interestRate / 100 / 12)
                            ).toFixed(0)}
                            /month interest
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* Bottom Insights Bar */}
          <Box
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              borderRadius: 3,
              border: '1px solid #7dd3fc'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <LightbulbIcon sx={{ fontSize: 24, color: '#0369a1' }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: '#0c4a6e' }}
              >
                Smart Recommendations
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 4
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#0c4a6e', mb: 1 }}
                >
                  🎯 Optimize Dining
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#0369a1', fontSize: '0.9rem', lineHeight: 1.5 }}
                >
                  Reduce dining out by £100/month to improve your budget score
                  by 8 points and save £1,200 annually.
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#0c4a6e', mb: 1 }}
                >
                  💰 Emergency Fund
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#0369a1', fontSize: '0.9rem', lineHeight: 1.5 }}
                >
                  You're ahead of schedule! Consider increasing retirement
                  contributions by 2% to maximize growth.
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#0c4a6e', mb: 1 }}
                >
                  📊 Trend Alert
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#0369a1', fontSize: '0.9rem', lineHeight: 1.5 }}
                >
                  Your spending efficiency has improved 12% over 3 months. Keep
                  up the great momentum!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Collapse>
  );
};

export default MonthlyBudgetOverview;
