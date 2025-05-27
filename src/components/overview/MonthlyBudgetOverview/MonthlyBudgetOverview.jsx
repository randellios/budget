import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Stack,
  CircularProgress,
  Divider,
  Collapse,
  IconButton
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  MonetizationOn as MonetizationOnIcon,
  Speed as SpeedIcon,
  Timeline as TimelineIcon,
  WaterDrop as WaterDropIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Savings as SavingsIcon,
  AccountBalance as AccountBalanceIcon,
  ModeStandby as TargetIcon,
  CalendarMonth as CalendarIcon,
  AccountBalanceWallet as WalletIcon,
  Paid as PaidIcon,
  RestaurantMenu as RestaurantMenuIcon,
  DirectionsCar as DirectionsCarIcon,
  Schedule as ScheduleIcon,
  TrendingFlat as TrendingFlatIcon,
  Lightbulb as LightbulbIcon,
  Flag as FlagIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import {
  AllocationCircle,
  CashFlowCard,
  CashFlowHeader,
  FinancialMetricCard,
  FlowItem,
  GradientCard,
  HealthMetric,
  HealthScoreCard,
  IconWrapper,
  InsightCard,
  MetricCard,
  SectionHeader,
  TrendIndicator
} from './styled';
import FinancialProgress from './FinancialProgress';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import {
  selectTotalExpenses,
  selectEssentialExpenses,
  selectNonEssentialExpenses
} from '../../../store/slices/expensesSlice';
import { selectTotalSavingsContributions } from '../../../store/slices/savingsSlice';
import { selectTotalDebtPayments } from '../../../store/slices/debtsSlice';
import {
  selectBudgetBreakdown,
  selectRemainingIncome,
  selectBudgetAllocationPercentage
} from '../../../store/selectors/budgetSelectors';

const MonthlyBudgetOverview = () => {
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Get data from Redux store
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const budgetBreakdown = useAppSelector(selectBudgetBreakdown);
  const remaining = useAppSelector(selectRemainingIncome);
  const allocationPercentage = useAppSelector(selectBudgetAllocationPercentage);

  const allocated = monthlyIncome - remaining;

  const cashFlowData = [
    {
      name: 'Essential',
      amount: essentialExpenses,
      icon: HomeIcon,
      color: '#ef4444',
      description: 'Housing, utilities, food',
      target: budgetBreakdown.essential.target,
      category: '50%'
    },
    {
      name: 'Optional',
      amount: nonEssentialExpenses,
      icon: ShoppingCartIcon,
      color: '#f59e0b',
      description: 'Entertainment, dining out',
      target: budgetBreakdown.nonEssential.target,
      category: '30%'
    },
    {
      name: 'Savings & Debts',
      amount: savingsContributions + debtPayments,
      icon: SavingsIcon,
      color: '#10b981',
      description: 'Goals, emergency fund & debt payments',
      target: budgetBreakdown.savingsAndDebts.target,
      category: '20%'
    }
  ];

  const totalOutgoings = cashFlowData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const getTargetStatus = (amount, target) => {
    const percentage = (amount / target) * 100;
    if (percentage <= 90) return { status: 'Under', color: '#059669' };
    if (percentage <= 110) return { status: 'On track', color: '#10b981' };
    return { status: 'Over', color: '#ef4444' };
  };

  // Mock data for charts (you can replace these with real historical data from your store later)
  const emergencyFundHistory = [
    { month: 'Dec', value: 0.8, target: 3 },
    { month: 'Jan', value: 1.0, target: 3 },
    { month: 'Feb', value: 1.1, target: 3 },
    { month: 'Mar', value: 1.2, target: 3 },
    { month: 'Apr', value: 1.3, target: 3 },
    { month: 'May', value: 1.5, target: 3 }
  ];

  const debtHistory = [
    { month: 'Dec', value: 12000, payment: 400 },
    { month: 'Jan', value: 11600, payment: 400 },
    { month: 'Feb', value: 11200, payment: 400 },
    { month: 'Mar', value: 10800, payment: 400 },
    { month: 'Apr', value: 10400, payment: 400 },
    { month: 'May', value: 10000, payment: 400 }
  ];

  const netWorthHistory = [
    { month: 'Dec', value: 10200, change: 450 },
    { month: 'Jan', value: 10800, change: 600 },
    { month: 'Feb', value: 11450, change: 650 },
    { month: 'Mar', value: 12150, change: 700 },
    { month: 'Apr', value: 12900, change: 750 },
    { month: 'May', value: 13650, change: 750 }
  ];

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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontSize: '1.375rem', color: '#1f2937' }}
              >
                Monthly Budget Overview
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton size="small" sx={{ color: '#6b7280', ml: 1 }}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
      </SectionHeader>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Box sx={{ flex: '0 0 320px' }}>
              <HealthScoreCard>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        opacity: 0.9,
                        letterSpacing: 1,
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      Financial Health
                    </Typography>
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        my: 2
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={75}
                        size={80}
                        thickness={6}
                        sx={{
                          color: 'rgba(255,255,255,0.95)',
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
                          variant="h2"
                          component="div"
                          sx={{
                            fontWeight: 700,
                            fontSize: '2rem',
                            lineHeight: 1
                          }}
                        >
                          75
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        color: '#34d399'
                      }}
                    >
                      Excellent
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <HealthMetric>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <SecurityIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          Emergency Fund
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#fbbf24'
                        }}
                      >
                        Needs Work
                      </Typography>
                    </HealthMetric>
                    <HealthMetric>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <CreditCardIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          Debt Ratio
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#34d399'
                        }}
                      >
                        Good
                      </Typography>
                    </HealthMetric>
                    <HealthMetric>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <SavingsIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          Savings Rate
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#34d399'
                        }}
                      >
                        Excellent
                      </Typography>
                    </HealthMetric>
                  </Box>
                </Box>
              </HealthScoreCard>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WaterDropIcon color="primary" sx={{ mr: 1 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      color: '#1f2937'
                    }}
                  >
                    Monthly Breakdown
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    50/30/20 Rule
                  </Typography>
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '1.5px solid #94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'help',
                      '&:hover': {
                        backgroundColor: '#f1f5f9'
                      }
                    }}
                    title="The 50/30/20 rule suggests allocating 50% of income to essentials, 30% to optional spending, and 20% to savings and debt payments"
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        lineHeight: 1
                      }}
                    >
                      ?
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mb: 1, borderColor: '#e2e8f0' }} />
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 0, px: 2 }}
              >
                {cashFlowData.map((item, index) => {
                  const incomePercentage = (item.amount / monthlyIncome) * 100;
                  const targetIncomePercentage =
                    (item.target / monthlyIncome) * 100;
                  const IconComponent = item.icon;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        mb: 1
                      }}
                    >
                      <IconComponent
                        sx={{ color: item.color, mr: 1.5, fontSize: 20 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: '#1f2937',
                              fontSize: '1rem'
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              color: item.color,
                              fontSize: '1.25rem'
                            }}
                          >
                            £{item.amount.toLocaleString()}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1.5,
                            fontSize: '0.875rem',
                            fontStyle: 'italic'
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#1f2937',
                              fontSize: '0.95rem',
                              fontWeight: 600
                            }}
                          >
                            {incomePercentage.toFixed(1)}% of income
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: '#6b7280', fontSize: '0.875rem' }}
                          >
                            Target: {item.category}
                          </Typography>
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                          <LinearProgress
                            variant="determinate"
                            value={incomePercentage}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#f3f4f6',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: item.color,
                                borderRadius: 4,
                                boxShadow: `0 2px 8px ${item.color}40`
                              }
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              left: `${Math.min(targetIncomePercentage, 100)}%`,
                              top: -1,
                              width: 2,
                              height: 10,
                              backgroundColor: '#374151',
                              borderRadius: 1,
                              zIndex: 1,
                              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <FinancialProgress />
        </CardContent>
        <Box
          sx={{
            bgcolor: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderTop: '1px solid #e8ecf3'
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => setRecommendationsOpen(!recommendationsOpen)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LightbulbIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '1rem', color: '#1f2937' }}
              >
                Smart Recommendations
              </Typography>
              <Chip
                label="3 insights"
                size="small"
                sx={{
                  backgroundColor: '#e0e7ff',
                  color: '#3730a3',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  height: 20
                }}
              />
            </Box>
            <IconButton size="small" sx={{ color: '#667eea' }}>
              {recommendationsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={recommendationsOpen}>
            <Box sx={{ px: 3, pb: 2.5 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#fef3c7',
                    border: '1px solid #f59e0b'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <SecurityIcon sx={{ fontSize: 16, color: '#d97706' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#92400e',
                        fontSize: '0.85rem'
                      }}
                    >
                      Priority: Emergency Fund
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#78350f',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Redirect £50/month from optional spending to reach 3 months
                    coverage faster
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#dcfce7',
                    border: '1px solid #10b981'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <MonetizationOnIcon
                      sx={{ fontSize: 16, color: '#059669' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#065f46',
                        fontSize: '0.85rem'
                      }}
                    >
                      Optimization Opportunity
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#064e3b',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Consider increasing savings to 20% to accelerate wealth
                    building timeline
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#dbeafe',
                    border: '1px solid #3b82f6'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <FlagIcon sx={{ fontSize: 16, color: '#1d4ed8' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#1e40af',
                        fontSize: '0.85rem'
                      }}
                    >
                      Next Milestone
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#1e3a8a',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Net worth target of £15k achievable within 3 months at
                    current pace
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Collapse>
    </GradientCard>
  );
};
export default MonthlyBudgetOverview;
