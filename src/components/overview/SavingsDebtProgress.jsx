import React from 'react';
import { Box, Typography, LinearProgress, Chip, Divider } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AttachMoney as SavingsIcon,
  CreditCard as DebtIcon,
  CheckCircle as CheckIcon,
  Schedule as ClockIcon,
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  Star as StarIcon,
  Shield as ShieldIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import {
  selectSavingsGoals,
  selectTotalSavingsBalance,
  selectTotalSavingsContributions
} from '../../store/slices/savingsSlice';
import {
  selectDebts,
  selectTotalDebtBalance,
  selectTotalDebtPayments
} from '../../store/slices/debtsSlice';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import { selectTotalExpenses } from '../../store/slices/expensesSlice';

const SavingsDebtProgress = () => {
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const debts = useAppSelector(selectDebts);
  const totalSavingsBalance = useAppSelector(selectTotalSavingsBalance);
  const totalDebtBalance = useAppSelector(selectTotalDebtBalance);
  const totalSavingsContributions = useAppSelector(
    selectTotalSavingsContributions
  );
  const totalDebtPayments = useAppSelector(selectTotalDebtPayments);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);

  const calculateMonthsToTarget = (current, target, monthlyAmount) => {
    if (monthlyAmount <= 0) return null;
    const remaining = target - current;
    if (remaining <= 0) return 0;
    return Math.ceil(remaining / monthlyAmount);
  };

  const calculateDebtPayoffMonths = (balance, monthlyPayment) => {
    if (monthlyPayment <= 0) return null;
    return Math.ceil(balance / monthlyPayment);
  };

  const formatTargetDate = (months) => {
    if (months === null) return 'No contributions';
    if (months === 0) return 'Target reached!';
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric'
    });
  };

  const isEmergencyFund = (goal) => {
    return (
      goal.name.toLowerCase().includes('emergency') ||
      goal.name.toLowerCase().includes('safety') ||
      goal.name.toLowerCase().includes('fund')
    );
  };

  const ProgressCard = ({ item, type }) => {
    const isDebt = type === 'debt';
    const isEmergency = !isDebt && isEmergencyFund(item);

    const progress = isDebt
      ? item.startingBalance > 0
        ? ((item.startingBalance - item.currentBalance) /
            item.startingBalance) *
          100
        : 0
      : item.targetAmount > 0
        ? (item.currentBalance / item.targetAmount) * 100
        : 0;

    const monthsToComplete = isDebt
      ? calculateDebtPayoffMonths(item.currentBalance, item.monthlyPayment)
      : calculateMonthsToTarget(
          item.currentBalance,
          item.targetAmount,
          item.monthlyContribution
        );

    const isComplete = isDebt ? item.currentBalance === 0 : progress >= 100;
    const amount = isDebt ? item.currentBalance : item.currentBalance;
    const target = isDebt ? item.startingBalance : item.targetAmount;
    const monthlyAmount = isDebt
      ? item.monthlyPayment
      : item.monthlyContribution;

    const getStatusChip = () => {
      if (isComplete) {
        return {
          label: isDebt ? '🎉 Debt Free!' : '🎯 Complete!',
          color: '#10b981',
          bg: '#dcfce7',
          border: '#bbf7d0'
        };
      }

      if (monthsToComplete && monthsToComplete <= 12) {
        return {
          label: `${monthsToComplete}mo left`,
          color: '#f59e0b',
          bg: '#fef3c7',
          border: '#fde68a'
        };
      }

      return {
        label: `${progress.toFixed(0)}%`,
        color: isDebt ? '#ef4444' : isEmergency ? '#3b82f6' : '#667eea',
        bg: isDebt ? '#fee2e2' : isEmergency ? '#dbeafe' : '#e0e7ff',
        border: isDebt ? '#fca5a5' : isEmergency ? '#93c5fd' : '#c7d2fe'
      };
    };

    const statusChip = getStatusChip();

    // Emergency fund specific styling
    if (isEmergency) {
      const monthsCovered =
        totalExpenses > 0 ? item.currentBalance / totalExpenses : 0;

      return (
        <Box
          sx={{
            p: 0,
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
          }}
        >
          {/* Decorative background elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              opacity: 0.6
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              opacity: 0.8
            }}
          />

          {/* Header */}
          <Box sx={{ p: 3, pb: 2, position: 'relative', zIndex: 1 }}>
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
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 22, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: 'white',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Emergency Protection
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={`${monthsCovered.toFixed(1)}mo`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(10px)'
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  mb: 2
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: '2rem',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  £{amount.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.85rem'
                  }}
                >
                  of £{target.toLocaleString()}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={Math.min(progress, 100)}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    background:
                      'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                    borderRadius: 6,
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                  }
                }}
              />

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  Protection Level:{' '}
                  {monthsCovered >= 6
                    ? '🛡️ Fully Protected'
                    : monthsCovered >= 3
                      ? '⚠️ Partially Protected'
                      : '🚨 Vulnerable'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              p: 3,
              pt: 0,
              background: 'rgba(0, 0, 0, 0.1)',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.8rem',
                    mb: 0.5
                  }}
                >
                  Monthly Contribution
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                >
                  £{monthlyAmount.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.8rem',
                    mb: 0.5
                  }}
                >
                  {isComplete ? 'Completed' : 'Target Date'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                >
                  {formatTargetDate(monthsToComplete)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }

    // Standard savings/debt card with new styling
    const cardColors = isDebt
      ? {
          primary: '#991b1b',
          secondary: '#dc2626',
          accent: '#ef4444'
        }
      : {
          primary: '#059669',
          secondary: '#10b981',
          accent: '#34d399'
        };

    return (
      <Box
        sx={{
          p: 0,
          background: `linear-gradient(135deg, ${cardColors.primary} 0%, ${cardColors.secondary} 100%)`,
          borderRadius: 3,
          boxShadow: `0 8px 32px ${cardColors.secondary}30`,
          position: 'relative',
          overflow: 'hidden',
          color: 'white'
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            opacity: 0.6
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            opacity: 0.8
          }}
        />

        {/* Header */}
        <Box sx={{ p: 3, pb: 2, position: 'relative', zIndex: 1 }}>
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
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '20px'
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {isDebt ? 'Debt Elimination' : 'Savings Goal'}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={statusChip.label}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: '0.7rem',
                fontWeight: 700,
                backdropFilter: 'blur(10px)'
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                mb: 2
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: '2rem',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                £{amount.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem' }}
              >
                {isDebt ? 'remaining' : `of £${target.toLocaleString()}`}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${cardColors.accent} 0%, #ffffff 100%)`,
                  borderRadius: 6,
                  boxShadow: `0 0 20px ${cardColors.accent}50`
                }
              }}
            />
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            pt: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.8rem',
                  mb: 0.5
                }}
              >
                Monthly {isDebt ? 'Payment' : 'Contribution'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              >
                £{monthlyAmount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.8rem',
                  mb: 0.5
                }}
              >
                {isComplete ? 'Completed' : 'Target Date'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              >
                {formatTargetDate(monthsToComplete)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TrendingUpIcon sx={{ fontSize: 20, color: '#667eea' }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#374151'
          }}
        >
          Progress Tracking
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: '#6b7280',
          fontSize: '0.85rem',
          mb: 4,
          lineHeight: 1.4
        }}
      >
        Track your journey towards financial freedom and savings milestones
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 280px',
          gap: 4,
          mb: 4
        }}
      >
        {/* Savings Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <SavingsIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: '#374151'
              }}
            >
              Savings Goals
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {savingsGoals.length > 0 ? (
              savingsGoals.map((goal) => (
                <ProgressCard key={goal.id} item={goal} type="savings" />
              ))
            ) : (
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: '#f8fafc',
                  borderRadius: 3,
                  border: '2px dashed #cbd5e1'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: '#6b7280', fontSize: '0.85rem' }}
                >
                  No savings goals yet. Add one to start tracking progress!
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Debts Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <DebtIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: '#374151'
              }}
            >
              Debt Elimination
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {debts.length > 0 ? (
              debts.map((debt) => (
                <ProgressCard key={debt.id} item={debt} type="debt" />
              ))
            ) : (
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: '#f0fdf4',
                  borderRadius: 3,
                  border: '2px solid #bbf7d0'
                }}
              >
                <CheckIcon sx={{ fontSize: 32, color: '#10b981', mb: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ color: '#166534', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  🎉 Debt Free!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#6b7280', fontSize: '0.8rem' }}
                >
                  You have no debts to track
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Ad Placeholder */}
        <Box>
          <Box
            sx={{
              width: '100%',
              height: 400,
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              border: '2px dashed #cbd5e1',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af'
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 2,
                background: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <Typography sx={{ fontSize: '24px' }}>📢</Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#6b7280',
                mb: 0.5,
                textAlign: 'center'
              }}
            >
              Advertisement Space
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#9ca3af',
                fontSize: '0.75rem',
                textAlign: 'center'
              }}
            >
              280 x 400px
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SavingsDebtProgress;
