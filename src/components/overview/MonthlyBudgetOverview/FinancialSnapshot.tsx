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
  const netWorth = totalSavingsBalance - totalDebtBalance;
  const monthlyCashFlow =
    monthlyIncome - totalExpenses - savingsContributions - debtPayments;
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
  const projectedNetWorth = projectedSavings - projectedDebt;
  const projectionDate = (() => {
    const date = new Date();
    date.setMonth(date.getMonth() + timeHorizon);
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric'
    });
  })();
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
  const getNetWorthStatus = (netWorth) => {
    if (netWorth >= 50000)
      return {
        status: 'Wealthy',
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: '#10b981',
        emoji: '💎'
      };
    if (netWorth >= 20000)
      return {
        status: 'Strong',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#667eea',
        emoji: '💪'
      };
    if (netWorth >= 5000)
      return {
        status: 'Positive',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        color: '#f59e0b',
        emoji: '📈'
      };
    if (netWorth >= 0)
      return {
        status: 'Building',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        color: '#06b6d4',
        emoji: '🏗️'
      };
    return {
      status: 'Negative',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      color: '#ef4444',
      emoji: '⚠️'
    };
  };
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
  const netWorthStatus = getNetWorthStatus(
    timeHorizon === 0 ? netWorth : projectedNetWorth
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
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: `2px solid ${status.color}30`,
        p: 0,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 4px 16px ${status.color}15`,
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {' '}
      <Box
        sx={{
          background: status.gradient,
          color: 'white',
          textAlign: 'center',
          py: 1.5,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
            borderRadius: '3px 3px 0 0'
          }
        }}
      >
        {' '}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {' '}
          <Typography
            sx={{
              fontSize: '28px',
              mb: 0.5,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            {' '}
            {status.emoji}{' '}
          </Typography>{' '}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {' '}
            {title}{' '}
          </Typography>{' '}
        </Box>{' '}
      </Box>{' '}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {' '}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          {' '}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              fontSize: '1.5rem',
              color: status.color,
              lineHeight: 1,
              mb: 0.5
            }}
          >
            {' '}
            {mainValue}{' '}
          </Typography>{' '}
          {subValue && (
            <Typography
              variant="body2"
              sx={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500 }}
            >
              {' '}
              {subValue}{' '}
            </Typography>
          )}{' '}
        </Box>{' '}
        {timeHorizon > 0 && timeHorizonData && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              bgcolor: `${status.color}08`,
              borderRadius: 2,
              border: `1px solid ${status.color}20`,
              textAlign: 'center'
            }}
          >
            {' '}
            <Typography
              variant="caption"
              sx={{
                color: status.color,
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'block',
                mb: 0.5
              }}
            >
              {' '}
              By {projectionDate}{' '}
            </Typography>{' '}
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: status.color, fontSize: '0.8rem' }}
            >
              {' '}
              {timeHorizonData}{' '}
            </Typography>{' '}
          </Box>
        )}{' '}
        <Box sx={{ mt: 'auto' }}>
          {' '}
          <LinearProgress
            variant="determinate"
            value={Math.min(progressValue, 100)}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#f3f4f6',
              mb: 1,
              '& .MuiLinearProgress-bar': {
                background: status.gradient,
                borderRadius: 3,
                boxShadow: `0 2px 8px ${status.color}40`
              }
            }}
          />{' '}
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.7rem',
              color: '#6b7280',
              textAlign: 'center',
              display: 'block'
            }}
          >
            {' '}
            {progressLabel}{' '}
          </Typography>{' '}
        </Box>{' '}
      </Box>{' '}
    </Box>
  );
  return (
    <Box sx={{}}>
      {' '}
      <Box sx={{ mb: 3 }}>
        {' '}
        <Box sx={{ position: 'relative' }}>
          {' '}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {' '}
            <Typography
              variant="caption"
              sx={{
                color: '#0369a1',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {' '}
              Projecting{' '}
            </Typography>{' '}
            <Chip
              label={`+${timeHorizon} months`}
              size="small"
              sx={{
                backgroundColor: '#e0e7ff',
                color: '#3730a3',
                fontSize: '0.7rem',
                fontWeight: 600
              }}
            />{' '}
            <Typography
              variant="caption"
              sx={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500 }}
            >
              {' '}
              {projectionDate} {timeHorizon > 0 && `(+${timeHorizon}mo)`}{' '}
            </Typography>{' '}
          </Box>{' '}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
            {' '}
            <Box sx={{ flex: 1, position: 'relative' }}>
              {' '}
              <Slider
                value={timeHorizon}
                onChange={(_, value) => setTimeHorizon(value)}
                min={0}
                max={60}
                step={1}
                sx={{
                  color: '#0ea5e9',
                  height: 8,
                  padding: 0,
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#0ea5e9',
                    border: '3px solid #ffffff',
                    boxShadow:
                      '0 0 0 4px rgba(14, 165, 233, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15)',
                    width: 20,
                    height: 20,
                    transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      boxShadow:
                        '0 0 0 6px rgba(14, 165, 233, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2)'
                    }
                  },
                  '& .MuiSlider-track': {
                    background:
                      'linear-gradient(90deg, #10b981 0%, #0ea5e9 50%, #6366f1 100%)',
                    height: 8,
                    borderRadius: 4,
                    border: 'none'
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#e2e8f0',
                    height: 8,
                    borderRadius: 4,
                    opacity: 1
                  }
                }}
              />{' '}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: `${100 - (timeHorizon / 60) * 100}%`,
                  height: '8px',
                  transform: 'translateY(-50%)',
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
                  borderRadius: 4,
                  pointerEvents: 'none'
                }}
              />{' '}
            </Box>{' '}
          </Box>{' '}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', ml: '0px' }}
          >
            {' '}
            {[0, 1, 2, 3, 4, 5].map((year) => (
              <Box
                key={year}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: timeHorizon >= year * 12 ? 1 : 0.4,
                  transition: 'opacity 0.2s ease'
                }}
              >
                {' '}
                <Box
                  sx={{
                    width: 2,
                    height: 6,
                    bgcolor: timeHorizon >= year * 12 ? '#0ea5e9' : '#cbd5e1',
                    borderRadius: 1,
                    mb: 0.25,
                    transition: 'background-color 0.2s ease'
                  }}
                />{' '}
                <Typography
                  variant="caption"
                  sx={{
                    color: timeHorizon >= year * 12 ? '#0369a1' : '#9ca3af',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    transition: 'color 0.2s ease'
                  }}
                >
                  {' '}
                  {year}y{' '}
                </Typography>{' '}
              </Box>
            ))}{' '}
          </Box>{' '}
        </Box>{' '}
      </Box>{' '}
      <Box>
        {' '}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {' '}
          <StatusCard
            status={savingsStatus}
            title="Total Savings"
            mainValue={`£${(timeHorizon === 0 ? totalSavingsBalance : projectedSavings).toLocaleString()}`}
            subValue={`£${savingsContributions}/mo contributions`}
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
          />{' '}
          <StatusCard
            status={emergencyStatus}
            title="Emergency Fund"
            mainValue={`${timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths} months`}
            subValue={`£${(timeHorizon === 0 ? emergencyGoal?.currentBalance || 0 : projectedEmergencyBalance).toLocaleString()} saved`}
            progressValue={Math.min(
              ((timeHorizon === 0
                ? emergencyMonths
                : projectedEmergencyMonths) /
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
          />{' '}
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
          />{' '}
          <StatusCard
            status={netWorthStatus}
            title="Net Worth"
            mainValue={`£${(timeHorizon === 0 ? netWorth : projectedNetWorth).toLocaleString()}`}
            subValue={
              netWorth >= 0 ? 'Assets exceed debts' : 'Working toward positive'
            }
            progressValue={Math.min(
              Math.max(
                ((timeHorizon === 0 ? netWorth : projectedNetWorth) + 10000) /
                  600,
                0
              ) * 100,
              100
            )}
            progressLabel="Building wealth over time"
            timeHorizonData={
              timeHorizon > 0
                ? `${projectedNetWorth >= netWorth ? '+' : ''}£${(projectedNetWorth - netWorth).toLocaleString()} change`
                : null
            }
          />{' '}
        </Box>{' '}
      </Box>{' '}
      {timeHorizon > 0 && (
        <Box
          sx={{
            mx: 2.5,
            mb: 2.5,
            p: 2,
            bgcolor: '#f0f9ff',
            borderRadius: 2,
            border: '1px solid #0ea5e9'
          }}
        >
          {' '}
          <Typography
            variant="body2"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '0.85rem'
            }}
          >
            {' '}
            🎯 By {projectionDate}, you'll have grown your net worth by £
            {(projectedNetWorth - netWorth).toLocaleString()} through consistent
            saving and debt reduction{' '}
          </Typography>{' '}
        </Box>
      )}{' '}
    </Box>
  );
};
export default FinancialSnapshot;
