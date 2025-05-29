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

  // Status helpers
  const getSavingsStatus = (savings) => {
    if (savings >= 25000)
      return { status: 'Excellent', color: '#10b981', emoji: '🌟' };
    if (savings >= 10000)
      return { status: 'Strong', color: '#667eea', emoji: '💪' };
    if (savings >= 3000)
      return { status: 'Building', color: '#f59e0b', emoji: '🚀' };
    if (savings >= 500)
      return { status: 'Starting', color: '#06b6d4', emoji: '🌱' };
    return { status: 'Beginning', color: '#8b5cf6', emoji: '✨' };
  };

  const getEmergencyStatus = (months) => {
    if (months >= 6) return { status: 'Secure', color: '#10b981', emoji: '🛡️' };
    if (months >= 3)
      return { status: 'Protected', color: '#667eea', emoji: '🏠' };
    if (months >= 1)
      return { status: 'Building', color: '#f59e0b', emoji: '🔨' };
    return { status: 'Vulnerable', color: '#ef4444', emoji: '⚠️' };
  };

  const getDebtStatus = (months, balance) => {
    if (balance === 0)
      return { status: 'Debt Free', color: '#10b981', emoji: '🎉' };
    if (months <= 12)
      return { status: 'Nearly Free', color: '#667eea', emoji: '🏃‍♂️' };
    if (months <= 24)
      return { status: 'On Track', color: '#f59e0b', emoji: '📈' };
    return { status: 'Long Journey', color: '#ef4444', emoji: '🗻' };
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

  // Reusable card component
  const StatusCard = ({ status, children }) => (
    <Box
      sx={{
        borderRadius: 3,
        background: `linear-gradient(135deg, ${status.color}, ${status.color}e8)`,
        p: 2.5,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 8px 32px ${status.color}40, 0 4px 16px ${status.color}20`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
          borderRadius: 3
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '3px 3px 0 0'
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );

  const CardHeader = ({ emoji, title, status }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '20px' }}>{emoji}</Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'white',
            fontSize: '0.95rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {title}
        </Typography>
      </Box>
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.7rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      />
    </Box>
  );

  const CardProgress = ({ value, label }) => (
    <Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2
          }
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.65rem',
          mt: 0.5,
          display: 'block'
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #e2e8f0' }}>
      {/* Header */}
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
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box sx={{ fontSize: '24px' }}>📊</Box>
            Your Financial Position
          </Typography>
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
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
        {/* Savings Card */}
        <Box
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${savingsStatus.color} 0%, ${savingsStatus.color}cc 40%, ${savingsStatus.color}99 100%)`,
            p: 2.5,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${savingsStatus.color}40, 0 4px 16px ${savingsStatus.color}20`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
              borderRadius: 3
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Card Header */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}
            >
              <Typography sx={{ fontSize: '24px' }}>
                {savingsStatus.emoji}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '1.1rem',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
              >
                Total Savings
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: '1.75rem',
                color: 'white',
                mb: 1,
                lineHeight: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              £
              {(timeHorizon === 0
                ? totalSavingsBalance
                : projectedSavings
              ).toLocaleString()}
            </Typography>

            {/* Status Chip */}
            <Box sx={{ mb: 2 }}>
              <Chip
                label={savingsStatus.status}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              />
            </Box>

            {timeHorizon > 0 && (
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.7rem',
                    display: 'block'
                  }}
                >
                  Growth by {projectionDate}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: 'white', fontSize: '0.85rem' }}
                >
                  +£{(projectedSavings - totalSavingsBalance).toLocaleString()}
                </Typography>
              </Box>
            )}

            <CardProgress
              value={Math.min(
                ((timeHorizon === 0 ? totalSavingsBalance : projectedSavings) /
                  25000) *
                  100,
                100
              )}
              label={`£${savingsContributions}/mo growth rate`}
            />
          </Box>
        </Box>

        {/* Emergency Card */}
        <Box
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${emergencyStatus.color} 0%, ${emergencyStatus.color}cc 40%, ${emergencyStatus.color}99 100%)`,
            p: 2.5,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${emergencyStatus.color}40, 0 4px 16px ${emergencyStatus.color}20`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
              borderRadius: 3
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Card Header */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}
            >
              <Typography sx={{ fontSize: '24px' }}>
                {emergencyStatus.emoji}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '1.1rem',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
              >
                Emergency Fund
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: '1.75rem',
                color: 'white',
                mb: 1,
                lineHeight: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths}{' '}
              months
            </Typography>

            {/* Status Chip */}
            <Box sx={{ mb: 2 }}>
              <Chip
                label={emergencyStatus.status}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.8rem',
                mb: 2
              }}
            >
              £
              {(timeHorizon === 0
                ? emergencyGoal?.currentBalance || 0
                : projectedEmergencyBalance
              ).toLocaleString()}{' '}
              saved
            </Typography>

            <CardProgress
              value={Math.min(
                ((timeHorizon === 0
                  ? emergencyMonths
                  : projectedEmergencyMonths) /
                  6) *
                  100,
                100
              )}
              label="Target: 6 months coverage"
            />
          </Box>
        </Box>

        {/* Debt Card */}
        <Box
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${debtStatus.color} 0%, ${debtStatus.color}cc 40%, ${debtStatus.color}99 100%)`,
            p: 2.5,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${debtStatus.color}40, 0 4px 16px ${debtStatus.color}20`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
              borderRadius: 3
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Card Header */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}
            >
              <Typography sx={{ fontSize: '24px' }}>
                {debtStatus.emoji}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '1.1rem',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
              >
                Debt Freedom
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize:
                  (timeHorizon === 0 ? totalDebtBalance : projectedDebt) === 0
                    ? '1.5rem'
                    : '1.75rem',
                color: 'white',
                mb: 1,
                lineHeight: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {(timeHorizon === 0 ? totalDebtBalance : projectedDebt) === 0
                ? 'Achieved!'
                : timeHorizon >= debtFreeMonths && debtFreeMonths > 0
                  ? 'Achieved!'
                  : `${Math.max(0, debtFreeMonths - timeHorizon)} months`}
            </Typography>

            {/* Status Chip */}
            <Box sx={{ mb: 2 }}>
              <Chip
                label={debtStatus.status}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.8rem',
                mb: 2
              }}
            >
              £
              {(timeHorizon === 0
                ? totalDebtBalance
                : projectedDebt
              ).toLocaleString()}{' '}
              remaining
            </Typography>

            <CardProgress
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
              label={`£${debtPayments}/mo payments`}
            />
          </Box>
        </Box>
      </Box>

      {/* Insights */}
      {timeHorizon > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: '#f0f9ff',
            borderRadius: 2,
            border: '1px solid #0ea5e9'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '0.85rem'
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
