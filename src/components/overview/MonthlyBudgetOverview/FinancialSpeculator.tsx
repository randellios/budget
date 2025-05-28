import React, { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import { selectTotalExpenses } from '../../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals
} from '../../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectTotalDebtBalance
} from '../../../store/slices/debtsSlice';

const FinancialSpeculator = () => {
  const [speculatorMonths, setSpeculatorMonths] = useState(0);

  // Get data from Redux store
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const totalDebtBalance = useAppSelector(selectTotalDebtBalance);
  const savingsGoals = useAppSelector(selectSavingsGoals);

  // Financial Speculator calculations
  const currentDebtFreeMonths =
    totalDebtBalance > 0 && debtPayments > 0
      ? Math.ceil(totalDebtBalance / debtPayments)
      : 0;
  const currentDate = new Date();
  const debtFreeDate =
    currentDebtFreeMonths > 0
      ? new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + currentDebtFreeMonths
        )
      : null;
  const currentNetWorth =
    savingsGoals.reduce((sum, goal) => sum + goal.currentBalance, 0) -
    totalDebtBalance;
  const monthlyNetWorthGrowth = savingsContributions + debtPayments;
  const emergencyGoal = savingsGoals.find((g) =>
    g.name.toLowerCase().includes('emergency')
  );
  const currentEmergencyBalance = emergencyGoal?.currentBalance || 0;
  const emergencyMonthlyContribution = emergencyGoal?.monthlyContribution || 0;
  const speculatedEmergencyBalance =
    currentEmergencyBalance + emergencyMonthlyContribution * speculatorMonths;
  const speculatedEmergencyMonths =
    totalExpenses > 0
      ? Math.floor(speculatedEmergencyBalance / totalExpenses)
      : 0;
  const emergencyProgress = emergencyGoal
    ? (speculatedEmergencyBalance / emergencyGoal.targetAmount) * 100
    : 0;
  const speculatedNetWorth =
    currentNetWorth + monthlyNetWorthGrowth * speculatorMonths;
  const speculatedDebtBalance = Math.max(
    0,
    totalDebtBalance - debtPayments * speculatorMonths
  );
  const speculatedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + speculatorMonths
  );

  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #e2e8f0' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#0c4a6e',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontSize: '1.4rem'
          }}
        >
          <Box sx={{ fontSize: '28px' }}>🔮</Box>
          Financial Speculator
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            maxWidth: '400px',
            ml: 3
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              fontSize: '0.8rem',
              minWidth: 'fit-content'
            }}
          >
            Now
          </Typography>

          <Slider
            value={speculatorMonths}
            onChange={(_, value) => setSpeculatorMonths(value)}
            min={0}
            max={60}
            step={1}
            valueLabelDisplay="auto"
            sx={{
              flex: 1,
              color: '#0ea5e9',
              height: 8,
              '& .MuiSlider-thumb': {
                backgroundColor: '#0ea5e9',
                border: '3px solid #ffffff',
                boxShadow: '0 3px 8px rgba(14, 165, 233, 0.4)',
                width: 24,
                height: 24,
                '&:hover': {
                  boxShadow: '0 5px 15px rgba(14, 165, 233, 0.6)'
                }
              },
              '& .MuiSlider-track': {
                backgroundColor: '#0ea5e9',
                height: 8,
                borderRadius: 4
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#bae6fd',
                height: 8,
                borderRadius: 4
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#0ea5e9',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '6px 12px',
                borderRadius: 8,
                '&::before': {
                  borderTopColor: '#0ea5e9'
                }
              }
            }}
          />

          <Typography
            variant="body2"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              fontSize: '0.8rem',
              minWidth: 'fit-content'
            }}
          >
            5yr
          </Typography>
        </Box>
      </Box>

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
          sx={{
            color: '#0369a1',
            fontWeight: 700,
            fontSize: '1.1rem',
            minWidth: 'fit-content'
          }}
        >
          {speculatorMonths === 0
            ? 'Your current financial position'
            : `Where will you be in ${speculatorMonths} month${speculatorMonths === 1 ? '' : 's'}?`}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#0c4a6e',
            fontWeight: 600,
            fontSize: '1rem',
            bgcolor: 'rgba(14, 165, 233, 0.1)',
            px: 3,
            py: 1,
            borderRadius: 2,
            border: '1px solid rgba(14, 165, 233, 0.3)'
          }}
        >
          📅{' '}
          {speculatorMonths === 0
            ? 'Today'
            : speculatedDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            bgcolor: 'rgba(14, 165, 233, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(14, 165, 233, 0.2)'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              display: 'block',
              mb: 0.5
            }}
          >
            Debt Elimination
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#0c4a6e',
              fontSize: '1.5rem',
              mb: 0.5
            }}
          >
            {speculatorMonths >= currentDebtFreeMonths &&
            currentDebtFreeMonths > 0
              ? '🎉 DEBT FREE!'
              : debtFreeDate?.toLocaleDateString('en-GB', {
                  month: 'short',
                  year: 'numeric'
                }) || 'No debt'}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#0369a1', fontSize: '0.8rem' }}
          >
            {speculatorMonths >= currentDebtFreeMonths &&
            currentDebtFreeMonths > 0
              ? `Achieved in ${currentDebtFreeMonths} months`
              : `£${speculatedDebtBalance.toLocaleString()} ${speculatorMonths === 0 ? 'current balance' : 'remaining'}`}
            <br />
            <span style={{ fontSize: '0.75rem' }}>
              £{debtPayments}/mo payments
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            bgcolor: 'rgba(14, 165, 233, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(14, 165, 233, 0.2)'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              display: 'block',
              mb: 0.5
            }}
          >
            Net Worth Growth
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#0c4a6e',
              fontSize: '1.5rem',
              mb: 0.5
            }}
          >
            £{speculatedNetWorth.toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#0369a1', fontSize: '0.8rem' }}
          >
            {speculatorMonths === 0
              ? 'Current net worth'
              : `£${(speculatedNetWorth - currentNetWorth).toLocaleString()} growth`}
            <br />
            <span style={{ fontSize: '0.75rem' }}>
              £{monthlyNetWorthGrowth}/mo rate
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            bgcolor: 'rgba(14, 165, 233, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(14, 165, 233, 0.2)'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#0369a1',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              display: 'block',
              mb: 0.5
            }}
          >
            Emergency Buffer
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#0c4a6e',
              fontSize: '1.5rem',
              mb: 0.5
            }}
          >
            {speculatedEmergencyMonths} months
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#0369a1', fontSize: '0.8rem' }}
          >
            £{speculatedEmergencyBalance.toLocaleString()} saved
            <br />
            <span style={{ fontSize: '0.75rem' }}>
              {emergencyProgress.toFixed(0)}% of target
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FinancialSpeculator;
