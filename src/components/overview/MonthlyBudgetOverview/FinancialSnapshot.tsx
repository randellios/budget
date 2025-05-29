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

  // Redux selectors
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const totalDebtBalance = useAppSelector(selectTotalDebtBalance);
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const totalSavingsBalance = useAppSelector(selectTotalSavingsBalance);

  // Calculated values
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

  // Projections
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

  // Status helpers with gradient colors
  const getSavingsStatus = (savings) => {
    if (savings >= 25000)
      return {
        status: 'Excellent',
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: '#10b981',
        emoji: '💰'
      };
    if (savings >= 10000)
      return {
        status: 'Strong',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#667eea',
        emoji: '💪'
      };
    if (savings >= 3000)
      return {
        status: 'Building',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        color: '#f59e0b',
        emoji: '🚀'
      };
    if (savings >= 500)
      return {
        status: 'Starting',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        color: '#06b6d4',
        emoji: '🌱'
      };
    return {
      status: 'Beginning',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      color: '#8b5cf6',
      emoji: '✨'
    };
  };

  const getEmergencyStatus = (months) => {
    if (months >= 6)
      return {
        status: 'Secure',
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: '#10b981',
        emoji: '🛡️'
      };
    if (months >= 3)
      return {
        status: 'Protected',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#667eea',
        emoji: '🏠'
      };
    if (months >= 1)
      return {
        status: 'Building',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        color: '#f59e0b',
        emoji: '🔨'
      };
    return {
      status: 'Vulnerable',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      color: '#ef4444',
      emoji: '⚠️'
    };
  };

  const getDebtStatus = (months, balance) => {
    if (balance === 0)
      return {
        status: 'Debt Free',
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: '#10b981',
        emoji: '🎉'
      };
    if (months <= 12)
      return {
        status: 'Nearly Free',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#667eea',
        emoji: '🏃‍♂️'
      };
    if (months <= 24)
      return {
        status: 'On Track',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        color: '#f59e0b',
        emoji: '📈'
      };
    return {
      status: 'Long Journey',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      color: '#ef4444',
      emoji: '🗻'
    };
  };

  // Current statuses
  const savingsStatus = getSavingsStatus(
    timeHorizon === 0 ? totalSavingsBalance : projectedSavings
  );
  const emergencyStatus = getEmergencyStatus(
    timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths
  );
  const debtStatus = getDebtStatus(
    debtFreeMonths,
    timeHorizon === 0 ? totalDebtBalance : projectedDebt
  );

  const StatusCard = ({
    status,
    title,
    mainValue,
    subValue,
    progressValue,
    progressLabel,
    timeHorizonData
  }) => (
    <Box
      sx={{
        borderRadius: 4,
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: `2px solid ${status.color}`,
        p: 0,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 8px 32px ${status.color}20, 0 4px 16px ${status.color}10`,
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Icon Header with Gradient */}
      <Box
        sx={{
          background: status.gradient,
          color: 'white',
          textAlign: 'center',
          py: 1,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
            borderRadius: '4px 4px 0 0'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '4px 4px 0 0'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            sx={{
              fontSize: '48px',
              mb: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {status.emoji}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Main Value */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: '2.25rem',
              color: status.color,
              lineHeight: 1,
              mb: 0.5
            }}
          >
            {mainValue}
          </Typography>
          {subValue && (
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.9rem',
                color: '#6b7280',
                fontWeight: 500
              }}
            >
              {subValue}
            </Typography>
          )}
        </Box>

        {/* Time Horizon Info */}
        {timeHorizon > 0 && timeHorizonData && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: `${status.color}08`,
              borderRadius: 2,
              border: `1px solid ${status.color}20`,
              textAlign: 'center'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: status.color,
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'block',
                mb: 0.5
              }}
            >
              By {projectionDate}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: status.color,
                fontSize: '0.9rem'
              }}
            >
              {timeHorizonData}
            </Typography>
          </Box>
        )}

        {/* Progress Bar */}
        <Box sx={{ mt: 'auto' }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(progressValue, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#f3f4f6',
              mb: 1,
              '& .MuiLinearProgress-bar': {
                background: status.gradient,
                borderRadius: 4,
                boxShadow: `0 2px 8px ${status.color}40`
              }
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              color: '#6b7280',
              textAlign: 'center',
              display: 'block'
            }}
          >
            {progressLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={timeHorizon === 0 ? 'Right Now' : `In ${timeHorizon} months`}
            size="small"
            sx={{
              backgroundColor: '#f0f9ff',
              color: '#0369a1',
              fontWeight: 600,
              border: '1px solid #0ea5e9',
              fontSize: '0.75rem'
            }}
          />
        </Box>

        {/* Time Horizon Slider */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            minWidth: '280px'
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}
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
              height: 4,
              '& .MuiSlider-thumb': {
                backgroundColor: '#0ea5e9',
                border: '2px solid #ffffff',
                boxShadow: '0 2px 6px rgba(14, 165, 233, 0.4)',
                width: 16,
                height: 16
              },
              '& .MuiSlider-track': {
                backgroundColor: '#0ea5e9',
                height: 4,
                borderRadius: 2
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#bae6fd',
                height: 4,
                borderRadius: 2
              }
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}
          >
            5yr
          </Typography>
        </Box>
      </Box>

      {/* Cards Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        <StatusCard
          status={savingsStatus}
          title="Total Savings"
          mainValue={`£${(timeHorizon === 0 ? totalSavingsBalance : projectedSavings).toLocaleString()}`}
          subValue={`£${savingsContributions}/mo growth rate`}
          progressValue={Math.min(
            ((timeHorizon === 0 ? totalSavingsBalance : projectedSavings) /
              25000) *
              100,
            100
          )}
          progressLabel="Progress to £25k target"
          timeHorizonData={
            timeHorizon > 0
              ? `+£${(projectedSavings - totalSavingsBalance).toLocaleString()} growth`
              : null
          }
        />

        <StatusCard
          status={emergencyStatus}
          title="Emergency Fund"
          mainValue={`${timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths} months`}
          subValue={`£${(timeHorizon === 0 ? emergencyGoal?.currentBalance || 0 : projectedEmergencyBalance).toLocaleString()} saved`}
          progressValue={Math.min(
            ((timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths) /
              6) *
              100,
            100
          )}
          progressLabel="Target: 6 months coverage"
          timeHorizonData={
            timeHorizon > 0
              ? `${projectedEmergencyMonths} months coverage`
              : null
          }
        />

        <StatusCard
          status={debtStatus}
          title="Debt Freedom"
          mainValue={
            (timeHorizon === 0 ? totalDebtBalance : projectedDebt) === 0
              ? 'Achieved!'
              : timeHorizon >= debtFreeMonths && debtFreeMonths > 0
                ? 'Achieved!'
                : `${Math.max(0, debtFreeMonths - timeHorizon)} months`
          }
          subValue={`£${(timeHorizon === 0 ? totalDebtBalance : projectedDebt).toLocaleString()} remaining`}
          progressValue={
            totalDebtBalance > 0
              ? Math.min(
                  ((totalDebtBalance -
                    (timeHorizon === 0 ? totalDebtBalance : projectedDebt)) /
                    totalDebtBalance) *
                    100,
                  100
                )
              : 100
          }
          progressLabel={`£${debtPayments}/mo payments`}
          timeHorizonData={
            timeHorizon > 0
              ? `£${projectedDebt.toLocaleString()} remaining`
              : null
          }
        />
      </Box>

      {/* Insights */}
      {timeHorizon > 0 && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            bgcolor: '#f0f9ff',
            borderRadius: 3,
            border: '1px solid #0ea5e9'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '0.95rem'
            }}
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
