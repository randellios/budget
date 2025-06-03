import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Chip,
  Paper,
  LinearProgress
} from '@mui/material';
import { Lightbulb as InsightIcon } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import { selectTotalExpenses } from '../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals,
  selectTotalSavingsBalance
} from '../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectTotalDebtBalance
} from '../../store/slices/debtsSlice';
const InsightCard = ({
  title,
  value,
  change,
  description,
  color = '#667eea',
  progressValue,
  progressLabel
}) => (
  <Paper
    sx={{
      p: 3,
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
      border: '2px solid #e2e8f0',
      borderRadius: 3,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-2px)',
        border: '2px solid #cbd5e1'
      },
      transition: 'all 0.3s ease'
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1.5
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#6b7280',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.8px'
        }}
      >
        {title}
      </Typography>
      {change && (
        <Chip
          label={change}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.7rem',
            fontWeight: 600,
            backgroundColor: change.startsWith('+') ? '#dcfce7' : '#fee2e2',
            color: change.startsWith('+') ? '#166534' : '#991b1b',
            border: `1px solid ${change.startsWith('+') ? '#bbf7d0' : '#fca5a5'}`
          }}
        />
      )}
    </Box>
    <Typography
      variant="h5"
      sx={{
        fontWeight: 800,
        color: color,
        fontSize: '1.5rem',
        mb: 1,
        lineHeight: 1
      }}
    >
      {value}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: 1.3, mb: 2 }}
    >
      {description}
    </Typography>
    <Box>
      <LinearProgress
        variant="determinate"
        value={Math.min(progressValue, 100)}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: '#f0f0f0',
          mb: 1,
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 3
          }
        }}
      />
      <Typography
        variant="caption"
        sx={{
          fontSize: '0.7rem',
          color: '#6b7280',
          textAlign: 'center',
          display: 'block',
          fontWeight: 500
        }}
      >
        {progressLabel}
      </Typography>
    </Box>
  </Paper>
);
const ProjectedFinancialOverview = () => {
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
  const savingsChange =
    timeHorizon > 0
      ? `+£${(projectedSavings - totalSavingsBalance).toLocaleString()}`
      : null;
  const emergencyChange =
    timeHorizon > 0
      ? `${projectedEmergencyMonths > emergencyMonths ? '+' : ''}${projectedEmergencyMonths - emergencyMonths} months`
      : null;
  const debtChange =
    timeHorizon > 0 && totalDebtBalance > 0
      ? `-£${(totalDebtBalance - projectedDebt).toLocaleString()}`
      : null;
  const netWorthChange =
    timeHorizon > 0
      ? `${projectedNetWorth >= netWorth ? '+' : ''}£${(projectedNetWorth - netWorth).toLocaleString()}`
      : null;
  return (
    <Paper
      sx={{
        mx: 3,
        mt: 3,
        mb: 6,
        p: 3.5,
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        border: '2px solid #e2e8f0',
        borderRadius: 4,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
          >
            <InsightIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#374151', fontSize: '1.1rem' }}
          >
            Financial Overview
          </Typography>
        </Box>
        <Box sx={{ flex: 0.5, ml: 6, mr: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: -1,
                position: 'relative',
                zIndex: 2
              }}
            >
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
                  <Typography
                    variant="caption"
                    sx={{
                      color: timeHorizon >= year * 12 ? '#0369a1' : '#9ca3af',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      transition: 'color 0.2s ease',
                      mb: 0.5
                    }}
                  >
                    {year}y
                  </Typography>
                  <Box
                    sx={{
                      width: 2,
                      height: 4,
                      bgcolor: timeHorizon >= year * 12 ? '#0ea5e9' : '#cbd5e1',
                      borderRadius: 1,
                      transition: 'background-color 0.2s ease'
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Slider
              value={timeHorizon}
              onChange={(_, value) => setTimeHorizon(value)}
              min={0}
              max={60}
              step={1}
              sx={{
                color: '#0ea5e9',
                height: 10,
                mt: 1,
                '& .MuiSlider-thumb': {
                  backgroundColor: '#0ea5e9',
                  border: '3px solid #ffffff',
                  boxShadow:
                    '0 0 0 4px rgba(14, 165, 233, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15)',
                  width: 24,
                  height: 24,
                  '&:hover': {
                    boxShadow:
                      '0 0 0 6px rgba(14, 165, 233, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2)'
                  }
                },
                '& .MuiSlider-track': {
                  background:
                    'linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%)',
                  height: 10,
                  borderRadius: 5,
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)'
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#e2e8f0',
                  height: 10,
                  borderRadius: 5,
                  opacity: 1,
                  border: '1px solid #cbd5e1'
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}
      >
        <InsightCard
          title="Total Savings"
          value={`£${(timeHorizon === 0 ? totalSavingsBalance : projectedSavings).toLocaleString()}`}
          change={savingsChange}
          description={
            timeHorizon > 0
              ? `Growth from savings plan`
              : `Building wealth through consistency`
          }
          color="#10b981"
          progressValue={Math.min(
            ((timeHorizon === 0 ? totalSavingsBalance : projectedSavings) /
              25000) *
              100,
            100
          )}
          progressLabel="Progress to £25k target"
        />
        <InsightCard
          title="Emergency Fund"
          value={`${timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths} months`}
          change={emergencyChange}
          description={
            timeHorizon > 0
              ? `Months of coverage by ${projectionDate}`
              : `Months of expenses covered`
          }
          color="#3b82f6"
          progressValue={Math.min(
            ((timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths) /
              6) *
              100,
            100
          )}
          progressLabel="Target: 6 months coverage"
        />
        <InsightCard
          title="Debt Freedom"
          value={
            (timeHorizon === 0 ? totalDebtBalance : projectedDebt) === 0
              ? 'Achieved!'
              : timeHorizon >= debtFreeMonths && debtFreeMonths > 0
                ? 'Achieved!'
                : `${Math.max(0, debtFreeMonths - timeHorizon)} months`
          }
          change={debtChange}
          description={
            timeHorizon > 0 ? `Debt reduction progress` : `Path to debt freedom`
          }
          color="#ef4444"
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
        />
        <InsightCard
          title="Net Worth"
          value={`£${(timeHorizon === 0 ? netWorth : projectedNetWorth).toLocaleString()}`}
          change={netWorthChange}
          description={
            timeHorizon > 0 ? `Wealth accumulation` : `Assets minus debts`
          }
          color="#8b5cf6"
          progressValue={Math.min(
            Math.max(
              ((timeHorizon === 0 ? netWorth : projectedNetWorth) + 10000) /
                600,
              0
            ) * 100,
            100
          )}
          progressLabel="Building wealth over time"
        />
      </Box>
    </Paper>
  );
};
export default ProjectedFinancialOverview;
