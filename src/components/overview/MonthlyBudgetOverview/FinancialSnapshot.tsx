import React, { useState } from 'react';
import { Box, Typography, Slider, Chip, LinearProgress } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import { selectTotalExpenses } from '../../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals,
  selectTotalSavingsBalance
} from '../../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectTotalDebtBalance
} from '../../../store/slices/debtsSlice';

const FinancialSnapshot = () => {
  const [timeHorizon, setTimeHorizon] = useState(0);

  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const totalDebtBalance = useAppSelector(selectTotalDebtBalance);
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const totalSavingsBalance = useAppSelector(selectTotalSavingsBalance);

  // Current financial position calculations
  const monthlyNetFlow = savingsContributions + debtPayments;
  const emergencyGoal = savingsGoals.find((g) =>
    g.name.toLowerCase().includes('emergency')
  );
  const emergencyMonths =
    emergencyGoal && totalExpenses > 0
      ? Math.floor(emergencyGoal.currentBalance / totalExpenses)
      : 0;
  const debtFreeMonths =
    totalDebtBalance > 0 && debtPayments > 0
      ? Math.ceil(totalDebtBalance / debtPayments)
      : 0;

  // Future projections based on slider
  const projectedSavings =
    totalSavingsBalance + savingsContributions * timeHorizon;
  const projectedDebt = Math.max(
    0,
    totalDebtBalance - debtPayments * timeHorizon
  );
  const projectedEmergencyBalance = emergencyGoal
    ? emergencyGoal.currentBalance +
      emergencyGoal.monthlyContribution * timeHorizon
    : 0;
  const projectedEmergencyMonths =
    totalExpenses > 0
      ? Math.floor(projectedEmergencyBalance / totalExpenses)
      : 0;

  const getSavingsStatus = (savings) => {
    if (savings >= 25000)
      return {
        status: 'Excellent',
        gradient: 'linear-gradient(135deg, #059669, #10b981, #34d399, #6ee7b7)',
        emoji: '🌟'
      };
    if (savings >= 10000)
      return {
        status: 'Strong',
        gradient: 'linear-gradient(135deg, #4338ca, #667eea, #8b5cf6, #a78bfa)',
        emoji: '💪'
      };
    if (savings >= 3000)
      return {
        status: 'Building',
        gradient: 'linear-gradient(135deg, #d97706, #f59e0b, #fbbf24, #fcd34d)',
        emoji: '🚀'
      };
    if (savings >= 500)
      return {
        status: 'Starting',
        gradient: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee, #67e8f9)',
        emoji: '🌱'
      };
    return {
      status: 'Beginning',
      gradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6, #a78bfa, #c4b5fd)',
      emoji: '✨'
    };
  };

  const getEmergencyStatus = (months) => {
    if (months >= 6)
      return {
        status: 'Secure',
        gradient: 'linear-gradient(135deg, #059669, #10b981, #34d399, #6ee7b7)',
        emoji: '🛡️'
      };
    if (months >= 3)
      return {
        status: 'Protected',
        gradient: 'linear-gradient(135deg, #4338ca, #667eea, #8b5cf6, #a78bfa)',
        emoji: '🏠'
      };
    if (months >= 1)
      return {
        status: 'Building',
        gradient: 'linear-gradient(135deg, #d97706, #f59e0b, #fbbf24, #fcd34d)',
        emoji: '🔨'
      };
    return {
      status: 'Vulnerable',
      gradient: 'linear-gradient(135deg, #dc2626, #ef4444, #f87171, #fca5a5)',
      emoji: '⚠️'
    };
  };

  const getDebtStatus = (months, balance) => {
    if (balance === 0)
      return {
        status: 'Debt Free',
        gradient: 'linear-gradient(135deg, #059669, #10b981, #34d399, #6ee7b7)',
        emoji: '🎉'
      };
    if (months <= 12)
      return {
        status: 'Nearly Free',
        gradient: 'linear-gradient(135deg, #4338ca, #667eea, #8b5cf6, #a78bfa)',
        emoji: '🏃‍♂️'
      };
    if (months <= 24)
      return {
        status: 'On Track',
        gradient: 'linear-gradient(135deg, #d97706, #f59e0b, #fbbf24, #fcd34d)',
        emoji: '📈'
      };
    return {
      status: 'Long Journey',
      gradient: 'linear-gradient(135deg, #dc2626, #ef4444, #f87171, #fca5a5)',
      emoji: '🗻'
    };
  };

  const currentSavingsStatus = getSavingsStatus(
    timeHorizon === 0 ? totalSavingsBalance : projectedSavings
  );
  const currentEmergencyStatus = getEmergencyStatus(
    timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths
  );
  const currentDebtStatus = getDebtStatus(
    debtFreeMonths,
    timeHorizon === 0 ? totalDebtBalance : projectedDebt
  );

  const projectionDate =
    timeHorizon > 0
      ? (() => {
          const date = new Date();
          date.setMonth(date.getMonth() + timeHorizon);
          return date.toLocaleDateString('en-GB', {
            month: 'short',
            year: 'numeric'
          });
        })()
      : null;

  const GradientCard = ({ children, gradient, emoji }) => (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        p: '4px',
        background: gradient,
        height: '100%',
        boxShadow:
          '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Subtle background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            opacity: 0.03,
            fontSize: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(15deg)',
            zIndex: 0
          }}
        >
          {emoji}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: -10,
            left: -10,
            width: 40,
            height: 40,
            opacity: 0.02,
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-10deg)',
            zIndex: 0
          }}
        >
          {emoji}
        </Box>

        {/* Content with higher z-index */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #e2e8f0' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#1f2937',
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box sx={{ fontSize: '28px' }}>📊</Box>
            Your Financial Position
          </Typography>
          <Chip
            label={timeHorizon === 0 ? 'Right Now' : `In ${timeHorizon} months`}
            sx={{
              backgroundColor: '#f0f9ff',
              color: '#0369a1',
              fontWeight: 600,
              border: '1px solid #0ea5e9'
            }}
          />
        </Box>

        {/* Time Horizon Slider */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            minWidth: '300px'
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.8rem' }}
          >
            Now
          </Typography>
          <Slider
            value={timeHorizon}
            onChange={(_, value) => setTimeHorizon(value)}
            min={0}
            max={60}
            step={3}
            sx={{
              flex: 1,
              color: '#0ea5e9',
              height: 6,
              '& .MuiSlider-thumb': {
                backgroundColor: '#0ea5e9',
                border: '3px solid #ffffff',
                boxShadow: '0 3px 8px rgba(14, 165, 233, 0.4)',
                width: 20,
                height: 20
              },
              '& .MuiSlider-track': {
                backgroundColor: '#0ea5e9',
                height: 6,
                borderRadius: 3
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#bae6fd',
                height: 6,
                borderRadius: 3
              }
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.8rem' }}
          >
            5yr
          </Typography>
        </Box>
      </Box>

      {/* Status Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 6,
          alignItems: 'stretch'
        }}
      >
        {/* Total Savings Card */}
        <GradientCard
          gradient={currentSavingsStatus.gradient}
          emoji={currentSavingsStatus.emoji}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 2
            }}
          >
            <Typography sx={{ fontSize: '28px' }}>
              {currentSavingsStatus.emoji}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#1f2937', fontSize: '1.1rem' }}
            >
              Total Savings
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: '2.25rem',
              background: currentSavingsStatus.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              lineHeight: 1
            }}
          >
            £
            {(timeHorizon === 0
              ? totalSavingsBalance
              : projectedSavings
            ).toLocaleString()}
          </Typography>

          <Chip
            label={currentSavingsStatus.status}
            size="small"
            sx={{
              background: currentSavingsStatus.gradient,
              color: 'white',
              fontWeight: 600,
              mb: 2,
              width: 'fit-content',
              mx: 'auto',
              px: 1.5
            }}
          />

          {timeHorizon > 0 && (
            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}
              >
                Growth by {projectionDate}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  background: currentSavingsStatus.gradient,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '0.9rem'
                }}
              >
                +£{(projectedSavings - totalSavingsBalance).toLocaleString()}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 'auto' }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(
                ((timeHorizon === 0 ? totalSavingsBalance : projectedSavings) /
                  25000) *
                  100,
                100
              )}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#f1f5f9',
                '& .MuiLinearProgress-bar': {
                  background: currentSavingsStatus.gradient,
                  borderRadius: 3
                }
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontSize: '0.7rem',
                mt: 0.5,
                display: 'block'
              }}
            >
              £{savingsContributions}/mo growth rate
            </Typography>
          </Box>
        </GradientCard>

        {/* Emergency Fund Card */}
        <GradientCard
          gradient={currentEmergencyStatus.gradient}
          emoji={currentEmergencyStatus.emoji}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 2
            }}
          >
            <Typography sx={{ fontSize: '28px' }}>
              {currentEmergencyStatus.emoji}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#1f2937', fontSize: '1.1rem' }}
            >
              Emergency Fund
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: '2.25rem',
              background: currentEmergencyStatus.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              lineHeight: 1
            }}
          >
            {timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths}{' '}
            months
          </Typography>

          <Chip
            label={currentEmergencyStatus.status}
            size="small"
            sx={{
              background: currentEmergencyStatus.gradient,
              color: 'white',
              fontWeight: 600,
              mb: 2,
              width: 'fit-content',
              mx: 'auto',
              px: 1.5
            }}
          />

          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontSize: '0.85rem', mb: 2 }}
          >
            £
            {(timeHorizon === 0
              ? emergencyGoal?.currentBalance || 0
              : projectedEmergencyBalance
            ).toLocaleString()}{' '}
            saved
          </Typography>

          <Box sx={{ mt: 'auto' }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(
                ((timeHorizon === 0
                  ? emergencyMonths
                  : projectedEmergencyMonths) /
                  6) *
                  100,
                100
              )}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#f1f5f9',
                '& .MuiLinearProgress-bar': {
                  background: currentEmergencyStatus.gradient,
                  borderRadius: 3
                }
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontSize: '0.7rem',
                mt: 0.5,
                display: 'block'
              }}
            >
              Target: 6 months coverage
            </Typography>
          </Box>
        </GradientCard>

        {/* Debt Freedom Card */}
        <GradientCard
          gradient={currentDebtStatus.gradient}
          emoji={currentDebtStatus.emoji}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 2
            }}
          >
            <Typography sx={{ fontSize: '28px' }}>
              {currentDebtStatus.emoji}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#1f2937', fontSize: '1.1rem' }}
            >
              Debt Freedom
            </Typography>
          </Box>

          {(timeHorizon === 0 ? totalDebtBalance : projectedDebt) === 0 ? (
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: '1.8rem',
                background: currentDebtStatus.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                lineHeight: 1
              }}
            >
              Achieved!
            </Typography>
          ) : (
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: '2.25rem',
                background: currentDebtStatus.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                lineHeight: 1
              }}
            >
              {timeHorizon >= debtFreeMonths && debtFreeMonths > 0
                ? 'Achieved!'
                : `${Math.max(0, debtFreeMonths - timeHorizon)} months`}
            </Typography>
          )}

          <Chip
            label={currentDebtStatus.status}
            size="small"
            sx={{
              background: currentDebtStatus.gradient,
              color: 'white',
              fontWeight: 600,
              mb: 2,
              width: 'fit-content',
              mx: 'auto',
              px: 1.5
            }}
          />

          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontSize: '0.85rem', mb: 2 }}
          >
            £
            {(timeHorizon === 0
              ? totalDebtBalance
              : projectedDebt
            ).toLocaleString()}{' '}
            remaining
          </Typography>

          <Box sx={{ mt: 'auto' }}>
            <LinearProgress
              variant="determinate"
              value={
                totalDebtBalance > 0
                  ? Math.min(
                      ((totalDebtBalance -
                        (timeHorizon === 0
                          ? totalDebtBalance
                          : projectedDebt)) /
                        totalDebtBalance) *
                        100,
                      100
                    )
                  : 100
              }
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#f1f5f9',
                '& .MuiLinearProgress-bar': {
                  background: currentDebtStatus.gradient,
                  borderRadius: 3
                }
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontSize: '0.7rem',
                mt: 0.5,
                display: 'block'
              }}
            >
              £{debtPayments}/mo payments
            </Typography>
          </Box>
        </GradientCard>
      </Box>

      {/* Quick Insights */}
      {timeHorizon > 0 && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: '#f0f9ff',
            borderRadius: 2,
            border: '1px solid #0ea5e9'
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: '#0369a1', fontWeight: 600, textAlign: 'center' }}
          >
            🎯 By {projectionDate}, you'll have grown your savings by £
            {(projectedSavings - totalSavingsBalance).toLocaleString()} through
            consistent monthly contributions of £{savingsContributions}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FinancialSnapshot;
