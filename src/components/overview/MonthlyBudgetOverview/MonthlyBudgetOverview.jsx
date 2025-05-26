import React, { useState } from 'react';
import {
  Box,
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

const MonthlyBudgetOverview = () => {
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const monthlyIncome = 5000;
  const remaining = 330;
  const allocated = monthlyIncome - remaining;
  const allocationPercentage = (allocated / monthlyIncome) * 100;

  const essentialTarget = monthlyIncome * 0.5;
  const optionalTarget = monthlyIncome * 0.3;
  const savingsDebtTarget = monthlyIncome * 0.2;

  const cashFlowData = [
    {
      name: 'Essential',
      amount: 2300,
      icon: HomeIcon,
      color: '#ef4444',
      description: 'Housing, utilities, food',
      target: essentialTarget,
      category: '50%'
    },
    {
      name: 'Optional',
      amount: 1170,
      icon: ShoppingCartIcon,
      color: '#f59e0b',
      description: 'Entertainment, dining out',
      target: optionalTarget,
      category: '30%'
    },
    {
      name: 'Savings & Debts',
      amount: 1200,
      icon: SavingsIcon,
      color: '#10b981',
      description: 'Goals, emergency fund & debt payments',
      target: savingsDebtTarget,
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" sx={{ fontSize: '1.375rem' }}>
              Monthly Budget Overview
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.25 }}
            >
              <Typography variant="body2" color="text.secondary">
                May 2025
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AllocationCircle>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={70}
                thickness={3.5}
                sx={{ color: '#f1f5f9', position: 'absolute' }}
              />
              <CircularProgress
                variant="determinate"
                value={Math.min(allocationPercentage, 100)}
                size={70}
                thickness={3.5}
                sx={{
                  color: allocationPercentage >= 100 ? '#10b981' : '#667eea',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))'
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
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    lineHeight: 1,
                    color: '#1f2937'
                  }}
                >
                  {allocationPercentage.toFixed(0)}%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.55rem',
                    color: '#6b7280',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px'
                  }}
                >
                  Allocated
                </Typography>
              </Box>
            </Box>
          </AllocationCircle>
        </Box>
      </SectionHeader>
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
                    sx={{ position: 'relative', display: 'inline-flex', my: 2 }}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <CashFlowCard>
              <CashFlowHeader>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WaterDropIcon color="primary" sx={{ mr: 1 }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: '1.125rem' }}
                  >
                    Monthly Outgoings
                  </Typography>
                </Box>
              </CashFlowHeader>
              <Box sx={{ p: 3 }}>
                {cashFlowData.map((item, index) => {
                  const percentage = (item.amount / totalOutgoings) * 100;
                  const incomePercentage = (item.amount / monthlyIncome) * 100;
                  const targetIncomePercentage =
                    (item.target / monthlyIncome) * 100;
                  const targetStatus = getTargetStatus(
                    item.amount,
                    item.target
                  );
                  const IconComponent = item.icon;
                  return (
                    <FlowItem key={index}>
                      <IconComponent
                        sx={{ color: item.color, mr: 1.5, fontSize: 20 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 0.5
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: '#1a1a1a' }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 'bold', color: item.color }}
                          >
                            £{item.amount.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 0.5
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {item.description}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: '#6b7280',
                                backgroundColor: '#f3f4f6',
                                px: 1,
                                py: 0.25,
                                borderRadius: 1
                              }}
                            >
                              {percentage.toFixed(0)}%
                            </Typography>
                            <Chip
                              size="small"
                              label={targetStatus.status}
                              sx={{
                                backgroundColor: `${targetStatus.color}15`,
                                color: targetStatus.color,
                                fontSize: '0.6rem',
                                fontWeight: 500,
                                height: 18,
                                '& .MuiChip-label': { px: 0.75 }
                              }}
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '0.7rem',
                              color: '#666',
                              mb: 0.25,
                              display: 'block'
                            }}
                          >
                            {incomePercentage.toFixed(1)}% of income • Target:{' '}
                            {item.category}
                          </Typography>
                          <Box sx={{ position: 'relative' }}>
                            <LinearProgress
                              variant="determinate"
                              value={incomePercentage}
                              sx={{
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: '#f3f4f6',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: item.color,
                                  borderRadius: 2
                                }
                              }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                left: `${targetIncomePercentage}%`,
                                top: -1,
                                width: 2,
                                height: 6,
                                backgroundColor: '#374151',
                                borderRadius: 1,
                                zIndex: 1
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </FlowItem>
                  );
                })}
              </Box>
            </CashFlowCard>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <MetricCard sx={{ p: 2.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}
                >
                  Emergency Fund Coverage
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 14, color: '#059669' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#059669',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    +0.2 months
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 1,
                      mb: 0.5
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: '#f59e0b',
                        fontSize: '2.25rem',
                        lineHeight: 1
                      }}
                    >
                      1.5
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b7280',
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}
                    >
                      / 3 months
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{
                  mb: 2,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    background:
                      'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                    borderRadius: 4
                  }
                }}
              />
              <Box sx={{ height: 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={emergencyFundHistory}>
                    <defs>
                      <linearGradient
                        id="emergencyGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#f59e0b"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f59e0b"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      fill="url(#emergencyGradient)"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#9ca3af"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                      dot={false}
                    />
                    <XAxis dataKey="month" hide />
                    <YAxis hide domain={[0, 3]} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#6b7280',
                  fontSize: '0.7rem',
                  display: 'block',
                  textAlign: 'center'
                }}
              >
                Target: 3 months • Current: £3,750
              </Typography>
            </MetricCard>
          </Box>
          <Box sx={{ flex: 1 }}>
            <MetricCard sx={{ p: 2.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}
                >
                  Debt Freedom Timeline
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingDownIcon sx={{ fontSize: 14, color: '#059669' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#059669',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    -£400/month
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 1,
                      mb: 0.5
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: '#dc2626',
                        fontSize: '2.25rem',
                        lineHeight: 1
                      }}
                    >
                      25
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b7280',
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}
                    >
                      months left
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: '#6b7280', fontSize: '0.7rem' }}
                >
                  Remaining Balance
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#111827', fontWeight: 700, fontSize: '0.9rem' }}
                >
                  £10,000
                </Typography>
              </Box>
              <Box sx={{ height: 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={debtHistory}>
                    <defs>
                      <linearGradient
                        id="debtGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#dc2626"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#dc2626"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#dc2626"
                      strokeWidth={3}
                      fill="url(#debtGradient)"
                    />
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#6b7280',
                  fontSize: '0.7rem',
                  display: 'block',
                  textAlign: 'center'
                }}
              >
                Monthly payment: £400 • Interest rate: 4.2%
              </Typography>
            </MetricCard>
          </Box>
          <Box sx={{ flex: 1 }}>
            <MetricCard sx={{ p: 2.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}
                >
                  Net Worth Growth
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 14, color: '#059669' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#059669',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    +£750 this month
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 1,
                      mb: 0.5
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: '#0284c7',
                        fontSize: '2.25rem',
                        lineHeight: 1
                      }}
                    >
                      £13.7k
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={68}
                sx={{
                  mb: 2,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    background:
                      'linear-gradient(90deg, #0284c7 0%, #0ea5e9 100%)',
                    borderRadius: 4
                  }
                }}
              />
              <Box sx={{ height: 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={netWorthHistory}>
                    <defs>
                      <linearGradient
                        id="netWorthGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0284c7"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0284c7"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0284c7"
                      strokeWidth={3}
                      fill="url(#netWorthGradient)"
                    />
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#6b7280',
                  fontSize: '0.7rem',
                  display: 'block',
                  textAlign: 'center'
                }}
              >
                Target: £20k by year end • Growth rate: 5.8%
              </Typography>
            </MetricCard>
          </Box>
        </Box>
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
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
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
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  <MonetizationOnIcon sx={{ fontSize: 16, color: '#059669' }} />
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
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
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
                  Net worth target of £15k achievable within 3 months at current
                  pace
                </Typography>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </GradientCard>
  );
};

export default MonthlyBudgetOverview;
