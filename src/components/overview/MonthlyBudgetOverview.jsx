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
  ArrowDownward as ArrowDownwardIcon
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

  const getHealthColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#667eea';
    if (score >= 55) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ p: 0 }}>
        <ProjectedFinancialOverview />

        <Box sx={{ px: 3 }}>
          <ProgressDivider label="Budget Breakdown" />

          {/* Hero Section - 50/30/20 Analysis */}
          <Box
            sx={{
              mb: 8,
              p: 6,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, fontSize: '2rem', mb: 2 }}
                >
                  50/30/20 Budget Analysis
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px' }}
                >
                  The proven framework for financial success: 50% for needs, 30%
                  for wants, 20% for savings and debt payments.
                </Typography>
              </Box>

              <ExpenseDivision />
            </Box>
          </Box>

          {/* Two Column Layout */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
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

            {/* Right: Budget Health */}
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

              {/* Health Score Circle */}
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

              {/* Strengths */}
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

              {/* Concerns */}
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
