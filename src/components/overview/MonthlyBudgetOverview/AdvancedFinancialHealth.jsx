import React, { useState } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Divider,
  Card,
  Grid,
  Tooltip,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Speed as SpeedIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  LocalFireDepartment as FireIcon,
  Savings as SavingsIcon,
  CreditCard as CreditCardIcon,
  Timeline as TimelineIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
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
  selectSavingsGoals,
  selectTotalSavingsBalance
} from '../../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectDebts,
  selectTotalDebtBalance
} from '../../../store/slices/debtsSlice';

const AdvancedFinancialHealth = () => {
  const [showDetails, setShowDetails] = useState(false);

  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const debts = useAppSelector(selectDebts);
  const totalSavingsBalance = useAppSelector(selectTotalSavingsBalance);
  const totalDebtBalance = useAppSelector(selectTotalDebtBalance);
  const expenseCategories = useAppSelector(selectExpenseCategories);

  const calculateComprehensiveHealth = () => {
    const totalExpenses = essentialExpenses + nonEssentialExpenses;
    const totalAllocated = totalExpenses + savingsContributions + debtPayments;
    const cashFlow = monthlyIncome - totalAllocated;
    const netWorth = totalSavingsBalance - totalDebtBalance;

    // 1. EMERGENCY FUND SCORE (0-25 points) - Most critical
    const emergencyFund = savingsGoals.find(
      (goal) =>
        goal.name.toLowerCase().includes('emergency') ||
        goal.name.toLowerCase().includes('safety')
    );
    const emergencyBalance = emergencyFund ? emergencyFund.currentBalance : 0;
    const monthsOfExpensesCovered =
      totalExpenses > 0 ? emergencyBalance / totalExpenses : 0;

    let emergencyScore = 0;
    if (monthsOfExpensesCovered >= 6) emergencyScore = 25;
    else if (monthsOfExpensesCovered >= 3) emergencyScore = 20;
    else if (monthsOfExpensesCovered >= 1) emergencyScore = 12;
    else if (monthsOfExpensesCovered >= 0.5) emergencyScore = 6;

    // 2. DEBT HEALTH SCORE (0-20 points)
    let debtScore = 20;
    const debtToIncomeRatio =
      monthlyIncome > 0 ? (totalDebtBalance / (monthlyIncome * 12)) * 100 : 0;
    const highInterestDebt = debts
      .filter((debt) => debt.interestRate > 15)
      .reduce((sum, debt) => sum + debt.currentBalance, 0);
    const monthlyDebtRatio =
      monthlyIncome > 0 ? (debtPayments / monthlyIncome) * 100 : 0;

    if (debtToIncomeRatio > 40) debtScore -= 10;
    else if (debtToIncomeRatio > 20) debtScore -= 5;

    if (highInterestDebt > monthlyIncome * 3) debtScore -= 8;
    else if (highInterestDebt > 0) debtScore -= 4;

    if (monthlyDebtRatio > 20) debtScore -= 5;
    else if (monthlyDebtRatio > 15) debtScore -= 2;

    debtScore = Math.max(debtScore, 0);

    // 3. WEALTH BUILDING SCORE (0-20 points)
    const totalWealthBuilding =
      savingsContributions +
      Math.max(
        0,
        debtPayments - debts.reduce((sum, debt) => sum + debt.minimumPayment, 0)
      );
    const wealthBuildingRate =
      monthlyIncome > 0 ? (totalWealthBuilding / monthlyIncome) * 100 : 0;
    const savingsGoalProgress =
      savingsGoals.reduce((total, goal) => {
        return (
          total +
          (goal.targetAmount > 0
            ? (goal.currentBalance / goal.targetAmount) * 100
            : 0)
        );
      }, 0) / Math.max(savingsGoals.length, 1);

    let wealthScore = 0;
    if (wealthBuildingRate >= 25) wealthScore = 20;
    else if (wealthBuildingRate >= 20) wealthScore = 18;
    else if (wealthBuildingRate >= 15) wealthScore = 15;
    else if (wealthBuildingRate >= 10) wealthScore = 10;
    else if (wealthBuildingRate >= 5) wealthScore = 5;

    if (savingsGoalProgress > 50) wealthScore += 2;

    // 4. CASH FLOW SCORE (0-15 points)
    const cashFlowRatio =
      monthlyIncome > 0 ? (cashFlow / monthlyIncome) * 100 : 0;
    let cashFlowScore = 0;
    if (cashFlowRatio >= 10) cashFlowScore = 15;
    else if (cashFlowRatio >= 5) cashFlowScore = 12;
    else if (cashFlowRatio >= 0) cashFlowScore = 8;
    else if (cashFlowRatio >= -5) cashFlowScore = 3;

    // 5. SPENDING EFFICIENCY SCORE (0-10 points)
    const essentialRatio =
      monthlyIncome > 0 ? (essentialExpenses / monthlyIncome) * 100 : 0;
    let efficiencyScore = 0;
    if (essentialRatio <= 40) efficiencyScore = 10;
    else if (essentialRatio <= 50) efficiencyScore = 8;
    else if (essentialRatio <= 60) efficiencyScore = 5;
    else if (essentialRatio <= 70) efficiencyScore = 2;

    // 6. RISK ASSESSMENT SCORE (0-10 points)
    let riskScore = 10;

    if (monthsOfExpensesCovered < 1) riskScore -= 4;
    if (highInterestDebt > monthlyIncome * 6) riskScore -= 3;
    else if (highInterestDebt > monthlyIncome * 2) riskScore -= 2;
    if (cashFlow < 0) riskScore -= 3;

    riskScore = Math.max(riskScore, 0);

    const totalScore =
      emergencyScore +
      debtScore +
      wealthScore +
      cashFlowScore +
      efficiencyScore +
      riskScore;

    return {
      totalScore: Math.round(totalScore),
      breakdown: {
        emergency: {
          score: emergencyScore,
          max: 25,
          monthsCovered: monthsOfExpensesCovered
        },
        debt: {
          score: debtScore,
          max: 20,
          ratio: debtToIncomeRatio,
          highInterest: highInterestDebt,
          monthlyRatio: monthlyDebtRatio
        },
        wealth: {
          score: wealthScore,
          max: 20,
          rate: wealthBuildingRate,
          progress: savingsGoalProgress
        },
        cashFlow: {
          score: cashFlowScore,
          max: 15,
          ratio: cashFlowRatio,
          amount: cashFlow
        },
        efficiency: { score: efficiencyScore, max: 10, essentialRatio },
        risk: { score: riskScore, max: 10 }
      },
      metrics: {
        netWorth,
        debtToIncomeRatio,
        emergencyMonths: monthsOfExpensesCovered,
        savingsRate: wealthBuildingRate,
        cashFlowRatio
      }
    };
  };

  const generateActionableInsights = (healthData) => {
    const insights = [];
    const { breakdown, metrics } = healthData;

    if (breakdown.emergency.score < 20) {
      const targetEmergency = essentialExpenses * 6;
      const currentEmergency =
        breakdown.emergency.monthsCovered * essentialExpenses;
      const needed = targetEmergency - currentEmergency;

      insights.push({
        priority: breakdown.emergency.score < 10 ? 'critical' : 'high',
        category: 'Emergency Fund',
        icon: '🛡️',
        title:
          breakdown.emergency.score === 0
            ? 'Build Emergency Fund'
            : 'Expand Emergency Fund',
        description: `You have ${breakdown.emergency.monthsCovered.toFixed(1)} months of expenses saved`,
        action: `Save £${needed.toFixed(0)} more to reach 6-month target`,
        impact: `+${25 - breakdown.emergency.score} points`,
        timeframe:
          needed > 0 && savingsContributions > 0
            ? `${Math.ceil(needed / savingsContributions)} months at current rate`
            : 'Set up automatic savings'
      });
    }

    if (breakdown.debt.highInterest > 0) {
      const highInterestDebts = debts.filter((debt) => debt.interestRate > 15);
      insights.push({
        priority: 'critical',
        category: 'Debt Elimination',
        icon: '🔥',
        title: 'Eliminate High-Interest Debt',
        description: `£${breakdown.debt.highInterest.toLocaleString()} in debt over 15% APR`,
        action: `Focus extra payments on highest rate debt (${highInterestDebts[0]?.name} at ${highInterestDebts[0]?.interestRate}%)`,
        impact: 'Saves thousands in interest',
        timeframe: 'Priority #1'
      });
    }

    if (breakdown.wealth.score < 15) {
      const targetRate = 20;
      const currentRate = breakdown.wealth.rate;
      const increase = ((targetRate - currentRate) / 100) * monthlyIncome;

      insights.push({
        priority: breakdown.wealth.score < 10 ? 'high' : 'medium',
        category: 'Wealth Building',
        icon: '💰',
        title: 'Boost Savings Rate',
        description: `Currently saving ${breakdown.wealth.rate.toFixed(1)}% for future`,
        action: `Increase savings by £${increase.toFixed(0)}/month to reach 20% target`,
        impact: `+${20 - breakdown.wealth.score} points`,
        timeframe: 'Gradual increase recommended'
      });
    }

    if (breakdown.cashFlow.score < 12) {
      if (breakdown.cashFlow.amount < 0) {
        insights.push({
          priority: 'critical',
          category: 'Cash Flow',
          icon: '🚨',
          title: 'Stop Overspending',
          description: `Spending £${Math.abs(breakdown.cashFlow.amount).toFixed(0)} more than earning`,
          action: 'Cut expenses or increase income immediately',
          impact: 'Prevents debt accumulation',
          timeframe: 'This month'
        });
      } else {
        insights.push({
          priority: 'medium',
          category: 'Cash Flow',
          icon: '💸',
          title: 'Improve Cash Flow Buffer',
          description: `Only £${breakdown.cashFlow.amount.toFixed(0)} monthly buffer`,
          action: 'Build larger monthly surplus for unexpected expenses',
          impact: `+${15 - breakdown.cashFlow.score} points`,
          timeframe: '2-3 months'
        });
      }
    }

    if (breakdown.efficiency.score < 8) {
      insights.push({
        priority: 'medium',
        category: 'Spending Efficiency',
        icon: '✂️',
        title: 'Optimize Essential Expenses',
        description: `${breakdown.efficiency.essentialRatio.toFixed(1)}% going to essentials`,
        action: 'Review and reduce fixed costs where possible',
        impact: `+${10 - breakdown.efficiency.score} points`,
        timeframe: 'Next review cycle'
      });
    }

    return insights.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const healthData = calculateComprehensiveHealth();
  const insights = generateActionableInsights(healthData);

  const getScoreColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#667eea';
    if (score >= 55) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreStatus = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 55) return 'Fair';
    return 'Needs Work';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#ef4444';
      case 'high':
        return '#f59e0b';
      case 'medium':
        return '#667eea';
      default:
        return '#6b7280';
    }
  };

  const scoreCategories = [
    {
      key: 'emergency',
      label: 'Emergency Fund',
      icon: <ShieldIcon sx={{ fontSize: 18 }} />,
      tooltip:
        'Based on months of expenses covered. 6+ months = 25pts, 3-6 months = 20pts, 1-3 months = 12pts, 0.5-1 months = 6pts. Emergency funds are the foundation of financial security.',
      color: '#667eea'
    },
    {
      key: 'debt',
      label: 'Debt Health',
      icon: <CreditCardIcon sx={{ fontSize: 18 }} />,
      tooltip:
        'Evaluates debt-to-income ratio, high-interest debt burden, and monthly payment load. Penalizes debt above 20% of annual income and any debt over 15% APR heavily.',
      color: '#ef4444'
    },
    {
      key: 'wealth',
      label: 'Wealth Building',
      icon: <TrendingUpIcon sx={{ fontSize: 18 }} />,
      tooltip:
        'Measures savings rate and goal progress. 25%+ rate = 20pts, 20-25% = 18pts, 15-20% = 15pts. Includes bonus for achieving savings goals. Builds long-term financial freedom.',
      color: '#10b981'
    },
    {
      key: 'cashFlow',
      label: 'Cash Flow',
      icon: <AccountBalanceIcon sx={{ fontSize: 18 }} />,
      tooltip:
        'Monthly surplus after all expenses. 10%+ surplus = 15pts, 5-10% = 12pts, break-even = 8pts. Negative cash flow severely penalized as it leads to debt accumulation.',
      color: '#f59e0b'
    },
    {
      key: 'efficiency',
      label: 'Efficiency',
      icon: <SpeedIcon sx={{ fontSize: 18 }} />,
      tooltip:
        'How efficiently you manage essential expenses. Under 40% of income = 10pts, 40-50% = 8pts, 50-60% = 5pts. Lower essential costs free up money for wealth building.',
      color: '#667eea'
    },
    {
      key: 'risk',
      label: 'Risk Score',
      icon: <WarningIcon sx={{ fontSize: 18 }} />,
      tooltip:
        'Assesses financial vulnerabilities: lack of emergency fund, high-interest debt exposure, and overspending patterns. Lower risk = higher score. Maximum 10 points.',
      color: '#9ca3af'
    }
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 3,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <PsychologyIcon sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    color: 'white',
                    lineHeight: 1.2
                  }}
                >
                  Financial Health Score
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}
                >
                  Comprehensive analysis of your financial wellbeing
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: '3rem',
                  color: 'white',
                  lineHeight: 1
                }}
              >
                {healthData.totalScore}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                {getScoreStatus(healthData.totalScore)}
              </Typography>
            </Box>
          </Box>

          <LinearProgress
            variant="determinate"
            value={healthData.totalScore}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'white',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Score Breakdown */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#1f2937', fontSize: '1.125rem' }}
            >
              📊 Score Breakdown
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowDetails(!showDetails)}
              sx={{
                color: '#667eea',
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.2)' }
              }}
            >
              {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {scoreCategories.map((category) => {
              const data = healthData.breakdown[category.key];
              const percentage = (data.score / data.max) * 100;

              return (
                <Grid item xs={12} sm={6} md={4} key={category.key}>
                  <Box
                    sx={{
                      p: 2,
                      background:
                        'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                      border: '1px solid #e2e8f0',
                      borderRadius: 2,
                      height: '100%',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, ${category.color}, ${category.color}aa)`,
                        borderRadius: '2px 2px 0 0'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Box sx={{ color: category.color }}>
                          {category.icon}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: '#374151',
                            fontSize: '0.875rem'
                          }}
                        >
                          {category.label}
                        </Typography>
                        <Tooltip title={category.tooltip} arrow placement="top">
                          <InfoIcon
                            sx={{
                              fontSize: 14,
                              color: '#9ca3af',
                              cursor: 'help'
                            }}
                          />
                        </Tooltip>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: category.color,
                          fontSize: '1.1rem'
                        }}
                      >
                        {data.score}/{data.max}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#f3f4f6',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: category.color,
                          borderRadius: 3
                        }
                      }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Detailed Metrics */}
        <Collapse in={showDetails}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#1f2937',
                mb: 2,
                fontSize: '1.125rem'
              }}
            >
              🔍 Key Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: '#6b7280', fontSize: '0.75rem' }}
                  >
                    Emergency Coverage
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        healthData.breakdown.emergency.monthsCovered >= 3
                          ? '#10b981'
                          : '#ef4444'
                    }}
                  >
                    {healthData.breakdown.emergency.monthsCovered.toFixed(1)}{' '}
                    months
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: '#6b7280', fontSize: '0.75rem' }}
                  >
                    Net Worth
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        healthData.metrics.netWorth >= 0 ? '#10b981' : '#ef4444'
                    }}
                  >
                    £{healthData.metrics.netWorth.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: '#6b7280', fontSize: '0.75rem' }}
                  >
                    Savings Rate
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        healthData.breakdown.wealth.rate >= 15
                          ? '#10b981'
                          : '#f59e0b'
                    }}
                  >
                    {healthData.breakdown.wealth.rate.toFixed(1)}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: '#6b7280', fontSize: '0.75rem' }}
                  >
                    Monthly Surplus
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        healthData.breakdown.cashFlow.amount >= 0
                          ? '#10b981'
                          : '#ef4444'
                    }}
                  >
                    £{healthData.breakdown.cashFlow.amount.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>

        <Divider sx={{ my: 3 }} />

        {/* Action Plan */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              mb: 3,
              fontSize: '1.125rem'
            }}
          >
            🎯 Personalized Action Plan
          </Typography>

          {insights.length > 0 ? (
            <Grid container spacing={2}>
              {insights.slice(0, 6).map((insight, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      background:
                        'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                      border: `2px solid ${getPriorityColor(insight.priority)}30`,
                      borderRadius: 3,
                      borderLeft: `4px solid ${getPriorityColor(insight.priority)}`,
                      height: '100%',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px ${getPriorityColor(insight.priority)}20`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        mb: 2
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: '#374151',
                              fontSize: '1rem'
                            }}
                          >
                            {insight.icon} {insight.title}
                          </Typography>
                          <Chip
                            label={insight.priority.toUpperCase()}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              backgroundColor: getPriorityColor(
                                insight.priority
                              ),
                              color: 'white'
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: '#6b7280', fontSize: '0.875rem', mb: 1 }}
                        >
                          {insight.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#059669',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            mb: 1
                          }}
                        >
                          💡 {insight.action}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            flexWrap: 'wrap'
                          }}
                        >
                          <Chip
                            label={`Impact: ${insight.impact}`}
                            size="small"
                            sx={{
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              fontSize: '0.7rem',
                              fontWeight: 600
                            }}
                          />
                          <Chip
                            label={`Timeline: ${insight.timeframe}`}
                            size="small"
                            sx={{
                              backgroundColor: '#e0e7ff',
                              color: '#3730a3',
                              fontSize: '0.7rem',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: 3,
                border: '2px solid #bbf7d0'
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: '#10b981', fontWeight: 700, mb: 1 }}
              >
                🎉 Outstanding Financial Health!
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#166534', fontWeight: 500 }}
              >
                Your finances are in excellent shape. Keep up the great work and
                stay consistent with your financial habits.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdvancedFinancialHealth;
