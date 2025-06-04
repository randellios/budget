import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Chip,
  Paper,
  LinearProgress
} from '@mui/material';
import {
  Lightbulb as InsightIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Savings as SavingsIcon,
  Security as SecurityIcon,
  CreditCard as DebtIcon,
  AccountBalance as WealthIcon
} from '@mui/icons-material';
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
  progressLabel,
  trend,
  icon: Icon
}) => (
  <Paper
    sx={{
      p: 0,
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
      border: '2px solid #e2e8f0',
      borderRadius: 4,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      '&:hover': {
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-3px)',
        border: '2px solid #cbd5e1'
      },
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`,
        boxShadow: `0 2px 8px ${color}40`
      }
    }}
  >
    {/* Header Section */}
    <Box
      sx={{
        p: 3,
        pb: 2,
        background: `linear-gradient(135deg, ${color}08 0%, ${color}04 100%)`,
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: `0 3px 8px ${color}40`
            }}
          >
            <Icon sx={{ fontSize: 18 }} />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: '#6b7280',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px'
            }}
          >
            {title}
          </Typography>
        </Box>

        {change && (
          <Chip
            label={change}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.65rem',
              fontWeight: 700,
              backgroundColor: change.startsWith('+')
                ? '#dcfce7'
                : change.startsWith('-')
                  ? '#fee2e2'
                  : '#e0e7ff',
              color: change.startsWith('+')
                ? '#166534'
                : change.startsWith('-')
                  ? '#991b1b'
                  : '#3730a3',
              border: `1px solid ${change.startsWith('+') ? '#bbf7d0' : change.startsWith('-') ? '#fca5a5' : '#c7d2fe'}`,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          />
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: color,
            fontSize: '2rem',
            lineHeight: 1,
            textShadow: `0 2px 4px ${color}20`
          }}
        >
          {value}
        </Typography>
        {trend && (
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background:
                trend === 'up'
                  ? '#dcfce7'
                  : trend === 'down'
                    ? '#fee2e2'
                    : '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${trend === 'up' ? '#bbf7d0' : trend === 'down' ? '#fca5a5' : '#e5e7eb'}`
            }}
          >
            <TrendingUpIcon
              sx={{
                fontSize: 16,
                color:
                  trend === 'up'
                    ? '#10b981'
                    : trend === 'down'
                      ? '#ef4444'
                      : '#6b7280',
                transform: trend === 'down' ? 'rotate(180deg)' : 'none'
              }}
            />
          </Box>
        )}
      </Box>
    </Box>

    {/* Content Section */}
    <Box sx={{ p: 3, pt: 2.5 }}>
      <Typography
        variant="body2"
        sx={{
          color: '#6b7280',
          fontSize: '0.85rem',
          lineHeight: 1.5,
          mb: 3,
          minHeight: '2.5rem'
        }}
      >
        {description}
      </Typography>

      <Box>
        <Box sx={{ mb: 1.5 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(progressValue, 100)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`,
                borderRadius: 5,
                boxShadow: `0 0 12px ${color}30`
              }
            }}
          />
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
            sx={{
              fontSize: '0.7rem',
              color: '#9ca3af',
              fontWeight: 500
            }}
          >
            {progressLabel}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.7rem',
              color: color,
              fontWeight: 700
            }}
          >
            {Math.round(progressValue)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  </Paper>
);

const ProjectedFinancialOverview = () => {
  const [timeHorizon, setTimeHorizon] = useState(12);
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
      month: 'long',
      year: 'numeric'
    });
  })();

  const getYearsMonthsText = (months) => {
    if (months === 0) return 'Today';
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years}y ${remainingMonths}m`;
  };

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
    <>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}
              >
                Financial Projection
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Interactive timeline showing your projected financial growth
              </Typography>
            </Box>
          </Box>

          {/* Fixed Width Date and Time Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ textAlign: 'right', minWidth: '120px' }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#6b7280',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Time Horizon
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: '#0ea5e9', fontSize: '1.1rem' }}
              >
                {getYearsMonthsText(timeHorizon)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 1.5,
                bgcolor: 'white',
                borderRadius: 3,
                border: '2px solid #e0e7ff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                minWidth: '200px' // Fixed width to prevent jumping
              }}
            >
              <CalendarIcon sx={{ fontSize: 18, color: '#0ea5e9' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.7rem',
                    display: 'block',
                    lineHeight: 1
                  }}
                >
                  Projection Date
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: '#374151',
                    fontSize: '0.9rem',
                    lineHeight: 1
                  }}
                >
                  {projectionDate}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Enhanced Slider Section */}
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
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
                  transition: 'opacity 0.3s ease'
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: timeHorizon >= year * 12 ? '#0369a1' : '#9ca3af',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    transition: 'color 0.3s ease',
                    mb: 0.5
                  }}
                >
                  {year === 0 ? 'Now' : `${year}y`}
                </Typography>
                <Box
                  sx={{
                    width: 3,
                    height: 6,
                    bgcolor: timeHorizon >= year * 12 ? '#0ea5e9' : '#cbd5e1',
                    borderRadius: 1.5,
                    transition: 'background-color 0.3s ease'
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
              height: 12,
              mt: 1,
              '& .MuiSlider-thumb': {
                backgroundColor: '#0ea5e9',
                border: '4px solid #ffffff',
                boxShadow:
                  '0 0 0 4px rgba(14, 165, 233, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)',
                width: 28,
                height: 28,
                '&:hover': {
                  boxShadow:
                    '0 0 0 6px rgba(14, 165, 233, 0.3), 0 6px 16px rgba(0, 0, 0, 0.2)'
                }
              },
              '& .MuiSlider-track': {
                background: 'linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%)',
                height: 12,
                borderRadius: 6,
                border: 'none',
                boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)'
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e2e8f0',
                height: 12,
                borderRadius: 6,
                opacity: 1,
                border: '2px solid #cbd5e1'
              }
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          height: '300px'
        }}
      >
        <InsightCard
          title="Total Savings"
          value={`£${(timeHorizon === 0 ? totalSavingsBalance : projectedSavings).toLocaleString()}`}
          change={savingsChange}
          description={
            timeHorizon > 0
              ? `Projected growth through consistent saving`
              : `Current savings balance across all goals`
          }
          color="#10b981"
          progressValue={Math.min(
            ((timeHorizon === 0 ? totalSavingsBalance : projectedSavings) /
              25000) *
              100,
            100
          )}
          progressLabel="Progress to £25k milestone"
          trend={timeHorizon > 0 ? 'up' : null}
          icon={SavingsIcon}
        />
        <InsightCard
          title="Emergency Fund"
          value={`${timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths} months`}
          change={emergencyChange}
          description={
            timeHorizon > 0
              ? `Months of expenses covered by ${projectionDate.split(' ')[0]}`
              : `Current months of expenses covered`
          }
          color="#3b82f6"
          progressValue={Math.min(
            ((timeHorizon === 0 ? emergencyMonths : projectedEmergencyMonths) /
              6) *
              100,
            100
          )}
          progressLabel="Target: 6 months of expenses"
          trend={
            timeHorizon > 0 && projectedEmergencyMonths > emergencyMonths
              ? 'up'
              : null
          }
          icon={SecurityIcon}
        />
        <InsightCard
          title="Debt Freedom"
          value={
            (timeHorizon === 0 ? totalDebtBalance : projectedDebt) === 0
              ? '🎉 Achieved!'
              : timeHorizon >= debtFreeMonths && debtFreeMonths > 0
                ? '🎉 Achieved!'
                : `${Math.max(0, debtFreeMonths - timeHorizon)} months`
          }
          change={debtChange}
          description={
            timeHorizon > 0
              ? `Progress towards eliminating all debt`
              : `Estimated months to complete debt payoff`
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
          progressLabel={
            totalDebtBalance === 0
              ? 'Debt free! 🎉'
              : `£${debtPayments.toLocaleString()}/month payments`
          }
          trend={
            timeHorizon > 0 && projectedDebt < totalDebtBalance ? 'down' : null
          }
          icon={DebtIcon}
        />
      </Box>
    </>
  );
};

export default ProjectedFinancialOverview;
