import React, { useState } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Card,
  IconButton,
  Tooltip,
  Collapse
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  CreditCard as CreditCardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import {
  selectEssentialExpenses,
  selectNonEssentialExpenses
} from '../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals,
  selectTotalSavingsBalance
} from '../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectDebts,
  selectTotalDebtBalance
} from '../../store/slices/debtsSlice';

const CompactFinancialHealth = () => {
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

  const calculateHealthScore = () => {
    const totalExpenses = essentialExpenses + nonEssentialExpenses;
    const totalAllocated = totalExpenses + savingsContributions + debtPayments;
    const cashFlow = monthlyIncome - totalAllocated;

    // Emergency Fund Score (0-30)
    const emergencyFund = savingsGoals.find(
      (goal) =>
        goal.name.toLowerCase().includes('emergency') ||
        goal.name.toLowerCase().includes('safety')
    );
    const emergencyBalance = emergencyFund ? emergencyFund.currentBalance : 0;
    const monthsOfExpensesCovered =
      totalExpenses > 0 ? emergencyBalance / totalExpenses : 0;

    let emergencyScore = 0;
    if (monthsOfExpensesCovered >= 6) emergencyScore = 30;
    else if (monthsOfExpensesCovered >= 3) emergencyScore = 25;
    else if (monthsOfExpensesCovered >= 1) emergencyScore = 15;
    else if (monthsOfExpensesCovered >= 0.5) emergencyScore = 8;

    // Debt Health Score (0-25)
    let debtScore = 25;
    const highInterestDebt = debts
      .filter((debt) => debt.interestRate > 15)
      .reduce((sum, debt) => sum + debt.currentBalance, 0);
    const debtToIncomeRatio =
      monthlyIncome > 0 ? (totalDebtBalance / (monthlyIncome * 12)) * 100 : 0;

    if (debtToIncomeRatio > 40) debtScore -= 15;
    else if (debtToIncomeRatio > 20) debtScore -= 8;
    if (highInterestDebt > monthlyIncome * 3) debtScore -= 10;
    else if (highInterestDebt > 0) debtScore -= 5;
    debtScore = Math.max(debtScore, 0);

    // Savings Rate Score (0-25)
    const savingsRate =
      monthlyIncome > 0 ? (savingsContributions / monthlyIncome) * 100 : 0;
    let savingsScore = 0;
    if (savingsRate >= 20) savingsScore = 25;
    else if (savingsRate >= 15) savingsScore = 20;
    else if (savingsRate >= 10) savingsScore = 15;
    else if (savingsRate >= 5) savingsScore = 8;

    // Cash Flow Score (0-20)
    const cashFlowRatio =
      monthlyIncome > 0 ? (cashFlow / monthlyIncome) * 100 : 0;
    let cashFlowScore = 0;
    if (cashFlowRatio >= 10) cashFlowScore = 20;
    else if (cashFlowRatio >= 5) cashFlowScore = 15;
    else if (cashFlowRatio >= 0) cashFlowScore = 10;
    else if (cashFlowRatio >= -5) cashFlowScore = 3;

    const totalScore =
      emergencyScore + debtScore + savingsScore + cashFlowScore;

    return {
      totalScore: Math.round(totalScore),
      breakdown: {
        emergency: { score: emergencyScore, months: monthsOfExpensesCovered },
        debt: {
          score: debtScore,
          highInterest: highInterestDebt,
          ratio: debtToIncomeRatio
        },
        savings: { score: savingsScore, rate: savingsRate },
        cashFlow: {
          score: cashFlowScore,
          ratio: cashFlowRatio,
          amount: cashFlow
        }
      }
    };
  };

  const getTopInsights = (healthData) => {
    const insights = [];
    const { breakdown } = healthData;

    if (breakdown.emergency.score < 20) {
      insights.push({
        priority: breakdown.emergency.score < 10 ? 'critical' : 'high',
        title: 'Build Emergency Fund',
        description: `${breakdown.emergency.months.toFixed(1)} months coverage`,
        icon: ShieldIcon,
        color: breakdown.emergency.score < 10 ? '#ef4444' : '#f59e0b'
      });
    }

    if (breakdown.debt.highInterest > 0) {
      insights.push({
        priority: 'critical',
        title: 'High-Interest Debt',
        description: `£${breakdown.debt.highInterest.toLocaleString()} at 15%+ APR`,
        icon: CreditCardIcon,
        color: '#ef4444'
      });
    }

    if (breakdown.savings.score < 15) {
      insights.push({
        priority: 'medium',
        title: 'Boost Savings Rate',
        description: `${breakdown.savings.rate.toFixed(1)}% savings rate`,
        icon: TrendingUpIcon,
        color: '#667eea'
      });
    }

    if (breakdown.cashFlow.amount < 0) {
      insights.push({
        priority: 'critical',
        title: 'Overspending',
        description: `£${Math.abs(breakdown.cashFlow.amount).toFixed(0)} over budget`,
        icon: WarningIcon,
        color: '#ef4444'
      });
    }

    return insights.slice(0, 3);
  };

  const healthData = calculateHealthScore();
  const topInsights = getTopInsights(healthData);

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

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        height: 'fit-content'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2.5,
          borderBottom: '1px solid #e8ecf3'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${getScoreColor(healthData.totalScore)} 0%, ${getScoreColor(healthData.totalScore)}aa 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            <PsychologyIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                color: '#1f2937',
                lineHeight: 1
              }}
            >
              Financial Health
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#6b7280', fontSize: '0.75rem' }}
            >
              Overall wellness score
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: '2rem',
                color: getScoreColor(healthData.totalScore),
                lineHeight: 1
              }}
            >
              {healthData.totalScore}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: getScoreColor(healthData.totalScore),
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              {getScoreStatus(healthData.totalScore)}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={() => setShowDetails(!showDetails)}
            sx={{
              color: '#6b7280',
              '&:hover': { bgcolor: '#f3f4f6' }
            }}
          >
            {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Score Progress */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={healthData.totalScore}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#f3f4f6',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getScoreColor(healthData.totalScore),
              borderRadius: 4,
              boxShadow: `0 2px 8px ${getScoreColor(healthData.totalScore)}40`
            }
          }}
        />
      </Box>

      {/* Top Insights */}
      <Box sx={{ p: 2.5, pt: 1.5 }}>
        {topInsights.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#6b7280',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              Priority Actions
            </Typography>
            {topInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    bgcolor: `${insight.color}08`,
                    borderRadius: 2,
                    border: `1px solid ${insight.color}20`
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 1.5,
                      bgcolor: insight.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComponent sx={{ fontSize: 14, color: 'white' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        color: '#1f2937',
                        lineHeight: 1.2
                      }}
                    >
                      {insight.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.7rem',
                        lineHeight: 1.2
                      }}
                    >
                      {insight.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={insight.priority.toUpperCase()}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      backgroundColor: insight.color,
                      color: 'white'
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 2,
              bgcolor: '#f0fdf4',
              borderRadius: 2,
              border: '1px solid #bbf7d0'
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 20, color: '#10b981', mb: 0.5 }} />
            <Typography
              variant="body2"
              sx={{ color: '#166534', fontWeight: 600, fontSize: '0.8rem' }}
            >
              Excellent financial health!
            </Typography>
          </Box>
        )}
      </Box>

      {/* Detailed Breakdown */}
      <Collapse in={showDetails}>
        <Box sx={{ px: 2.5, pb: 2.5, borderTop: '1px solid #f3f4f6' }}>
          <Typography
            variant="overline"
            sx={{
              color: '#6b7280',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              mb: 2,
              display: 'block',
              pt: 2
            }}
          >
            Score Breakdown
          </Typography>

          <Box
            sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: '0.75rem', color: '#6b7280' }}
              >
                Emergency Fund
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: '0.8rem' }}
              >
                {healthData.breakdown.emergency.score}/30
              </Typography>
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
                sx={{ fontSize: '0.75rem', color: '#6b7280' }}
              >
                Debt Health
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: '0.8rem' }}
              >
                {healthData.breakdown.debt.score}/25
              </Typography>
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
                sx={{ fontSize: '0.75rem', color: '#6b7280' }}
              >
                Savings Rate
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: '0.8rem' }}
              >
                {healthData.breakdown.savings.score}/25
              </Typography>
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
                sx={{ fontSize: '0.75rem', color: '#6b7280' }}
              >
                Cash Flow
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: '0.8rem' }}
              >
                {healthData.breakdown.cashFlow.score}/20
              </Typography>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CompactFinancialHealth;
