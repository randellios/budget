import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import { selectTotalExpenses } from '../../../store/slices/expensesSlice';
import { selectTotalSavingsContributions } from '../../../store/slices/savingsSlice';
import { selectTotalDebtPayments } from '../../../store/slices/debtsSlice';
import {
  selectRemainingIncome,
  selectBudgetAllocationPercentage
} from '../../../store/selectors/budgetSelectors';

const AllocationStatus = () => {
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const remaining = useAppSelector(selectRemainingIncome);
  const allocationPercentage = useAppSelector(selectBudgetAllocationPercentage);

  const totalAllocated = totalExpenses + savingsContributions + debtPayments;

  return (
    <>
      {remaining !== 0 && (
        <Box sx={{ mb: 5, maxWidth: '600px' }}>
          <Box
            sx={{
              p: 4,
              background:
                remaining > 0
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(52, 211, 153, 0.03) 50%, rgba(255, 255, 255, 0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(248, 113, 113, 0.03) 50%, rgba(255, 255, 255, 0.8) 100%)',
              borderRadius: 3,
              border: `2px solid ${remaining > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
              boxShadow:
                remaining > 0
                  ? '0 4px 16px rgba(16, 185, 129, 0.1)'
                  : '0 4px 16px rgba(239, 68, 68, 0.1)'
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 2,
                      mb: 0.5
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        fontSize: '2.5rem',
                        background:
                          remaining > 0
                            ? 'linear-gradient(135deg, #059669, #10b981)'
                            : 'linear-gradient(135deg, #dc2626, #ef4444)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1
                      }}
                    >
                      £{Math.abs(remaining).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: remaining > 0 ? '#059669' : '#dc2626',
                        textTransform: 'lowercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {remaining > 0 ? 'remaining' : 'over budget'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Chip
                label={`${Math.round(allocationPercentage)}%`}
                sx={{
                  backgroundColor: remaining > 0 ? '#10b981' : '#ef4444',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  height: 32,
                  px: 1,
                  boxShadow:
                    remaining > 0
                      ? '0 2px 8px rgba(16, 185, 129, 0.3)'
                      : '0 2px 8px rgba(239, 68, 68, 0.3)'
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.9rem',
                color: '#64748b',
                fontWeight: 500,
                // textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              £{totalAllocated.toLocaleString()} of £
              {monthlyIncome.toLocaleString()} allocated
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <LinearProgress
                variant="determinate"
                value={Math.min(allocationPercentage, 100)}
                sx={{
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid rgba(0, 0, 0, 0.15)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.08)',
                  '& .MuiLinearProgress-bar': {
                    background:
                      remaining > 0
                        ? 'linear-gradient(90deg, #10b981, #34d399)'
                        : allocationPercentage > 100
                          ? 'linear-gradient(90deg, #ef4444, #f87171)'
                          : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                    borderRadius: 5,
                    boxShadow:
                      remaining > 0
                        ? '0 2px 8px rgba(16, 185, 129, 0.4)'
                        : allocationPercentage > 100
                          ? '0 2px 8px rgba(239, 68, 68, 0.4)'
                          : '0 2px 8px rgba(245, 158, 11, 0.4)'
                  }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '100%',
                  borderRadius: 7,
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 5s ease-in-out infinite',
                  pointerEvents: 'none',
                  '@keyframes shimmer': {
                    '0%, 100%': { backgroundPosition: '-200% 0' },
                    '50%': { backgroundPosition: '200% 0' }
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AllocationStatus;
