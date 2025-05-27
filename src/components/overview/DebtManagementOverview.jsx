import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Collapse,
  CircularProgress
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  School as SchoolIcon,
  DirectionsCar as DirectionsCarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  LocalFireDepartment as FireIcon,
  Shield as ShieldIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../store/hooks';
import {
  selectDebts,
  selectTotalDebtPayments,
  selectTotalDebtBalance
} from '../../store/slices/debtsSlice';

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 4,
    background: 'linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #667eea)',
    backgroundSize: '400% 100%',
    animation: 'gradientShift 8s ease infinite'
  },
  '@keyframes gradientShift': {
    '0%, 100%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    }
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  borderBottom: '1px solid #e8ecf3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const DebtRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2.5, 3),
  borderBottom: '1px solid #f1f5f9',
  position: 'relative',
  minHeight: '80px',
  '&:last-child': {
    borderBottom: 'none'
  }
}));

const ProgressSection = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2)
}));

const DebtAcceleratorSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
  border: '1px solid #fca5a5',
  borderRadius: 12,
  margin: theme.spacing(0, 3, 3, 3)
}));

const DebtManagementOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [acceleratorOpen, setAcceleratorOpen] = useState(false);

  // Get data from Redux store
  const debts = useAppSelector(selectDebts);
  const totalDebtPayments = useAppSelector(selectTotalDebtPayments);
  const totalDebtBalance = useAppSelector(selectTotalDebtBalance);

  // Calculate total original debt (for progress calculation)
  const totalOriginalDebt = debts.reduce(
    (total, debt) => total + debt.startingBalance,
    0
  );
  const totalPaidOff = totalOriginalDebt - totalDebtBalance;
  const overallProgress =
    totalOriginalDebt > 0 ? (totalPaidOff / totalOriginalDebt) * 100 : 0;

  // Calculate debt-free date (simplified calculation)
  const averagePayment = totalDebtPayments;
  const monthsToDebtFree =
    averagePayment > 0 ? Math.ceil(totalDebtBalance / averagePayment) : 0;
  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + monthsToDebtFree);

  // Calculate potential interest savings (simplified)
  const averageInterestRate =
    debts.length > 0
      ? debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length
      : 0;
  const totalInterestSavings = Math.round(
    totalDebtBalance * (averageInterestRate / 100) * 0.3
  );

  const formatPayoffDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric'
    });
  };

  const getStrategyRecommendation = (debt) => {
    if (debt.interestRate > 15) {
      return { text: 'Attack first', color: '#dc2626' };
    } else if (debt.interestRate > 8) {
      return { text: 'Pay extra', color: '#d97706' };
    } else {
      return { text: 'Minimum only', color: '#059669' };
    }
  };

  const getPriorityIcon = (interestRate) => {
    if (interestRate > 15) return FireIcon;
    if (interestRate > 8) return WarningIcon;
    return ShieldIcon;
  };

  const calculatePayoffDate = (debt) => {
    if (debt.monthlyPayment <= 0) return null;
    const monthsToPayoff = Math.ceil(debt.currentBalance / debt.monthlyPayment);
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + monthsToPayoff);
    return payoffDate;
  };
  return (
    <GradientCard>
      <SectionHeader>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            cursor: 'pointer'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" sx={{ fontSize: '1.375rem' }}>
                Debt Management Overview
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.25 }}
              >
                Monthly Payments: £{totalDebtPayments}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  color: '#6b7280',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  display: 'block',
                  mb: 0.25
                }}
              >
                Debt Free By
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '1rem', color: '#10b981' }}
              >
                {monthsToDebtFree > 0 ? formatPayoffDate(debtFreeDate) : 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={70}
                thickness={3}
                sx={{ color: '#fee2e2', position: 'absolute' }}
              />
              <CircularProgress
                variant="determinate"
                value={Math.min(overallProgress, 100)}
                size={70}
                thickness={3}
                sx={{
                  color: '#10b981',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round'
                  }
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    lineHeight: 1,
                    color: '#1f2937'
                  }}
                >
                  {overallProgress.toFixed(0)}%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.65rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}
                >
                  paid off
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" sx={{ color: '#6b7280', ml: 1 }}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
      </SectionHeader>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 0 }}>
          {debts.map((debt, index) => {
            const progress =
              debt.startingBalance > 0
                ? ((debt.startingBalance - debt.currentBalance) /
                    debt.startingBalance) *
                  100
                : 0;
            const strategy = getStrategyRecommendation(debt);
            const PriorityIcon = getPriorityIcon(debt.interestRate);
            const payoffDate = calculatePayoffDate(debt);

            return (
              <DebtRow key={debt.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: '0 0 280px',
                    minHeight: '60px'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: `#ef444415`,
                      borderRadius: 2,
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      border: '1px solid #ef444440'
                    }}
                  >
                    <Typography sx={{ fontSize: '20px' }}>
                      {debt.icon}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        mb: 0.5,
                        lineHeight: 1.2
                      }}
                    >
                      {debt.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#ef4444'
                        }}
                      >
                        £{debt.monthlyPayment}/month
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#667eea'
                        }}
                      >
                        {debt.interestRate}% APR
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: 50, mx: 2, alignSelf: 'center' }}
                />
                <ProgressSection
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '60px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      mb: 1
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        color: '#ef4444',
                        lineHeight: 1.2
                      }}
                    >
                      £{debt.currentBalance.toLocaleString()}
                      <Typography
                        component="span"
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          fontSize: '1rem',
                          ml: 1,
                          fontWeight: 400,
                          textDecoration: 'line-through'
                        }}
                      >
                        £{debt.startingBalance.toLocaleString()}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#10b981',
                        fontSize: '0.9rem'
                      }}
                    >
                      {progress.toFixed(1)}% paid
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(progress, 100)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#f3f4f6',
                      mb: 1,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#10b981',
                        borderRadius: 4,
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                      }
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: '0.85rem' }}
                  >
                    £
                    {(
                      debt.startingBalance - debt.currentBalance
                    ).toLocaleString()}{' '}
                    progress
                    {debt.monthlyPayment > 0 &&
                      ` • ${Math.ceil(debt.currentBalance / debt.monthlyPayment)} months left`}
                  </Typography>
                </ProgressSection>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: 50, mx: 2, alignSelf: 'center' }}
                />
                <Box
                  sx={{
                    ml: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0 0 140px',
                    minHeight: '60px',
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <PriorityIcon
                        sx={{ fontSize: 18, color: strategy.color }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: strategy.color
                        }}
                      >
                        {strategy.text}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        color: '#6b7280',
                        lineHeight: 1.2
                      }}
                    >
                      {payoffDate
                        ? `Payoff by ${formatPayoffDate(payoffDate)}`
                        : 'No payments set'}
                    </Typography>
                  </Box>
                </Box>
              </DebtRow>
            );
          })}
        </CardContent>
        <Box
          sx={{
            bgcolor: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderTop: '1px solid #e8ecf3'
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => setAcceleratorOpen(!acceleratorOpen)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LightbulbIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '1rem', color: '#1f2937' }}
              >
                Debt Accelerator Insights
              </Typography>
              <Chip
                label="3 strategies"
                size="small"
                sx={{
                  backgroundColor: '#fecaca',
                  color: '#991b1b',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  height: 20
                }}
              />
            </Box>
            <IconButton size="small" sx={{ color: '#ef4444' }}>
              {acceleratorOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={acceleratorOpen}>
            <DebtAcceleratorSection sx={{ mt: 0 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #fca5a5'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <AttachMoneyIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#7f1d1d',
                        fontSize: '0.85rem'
                      }}
                    >
                      Interest Savings Potential
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#dc2626',
                      fontSize: '1.25rem',
                      mb: 0.5
                    }}
                  >
                    £{totalInterestSavings.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#991b1b',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Extra £100/month could save this much in interest
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #fca5a5'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <TimelineIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#7f1d1d',
                        fontSize: '0.85rem'
                      }}
                    >
                      Debt-Free Timeline
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#dc2626',
                      fontSize: '1.25rem',
                      mb: 0.5
                    }}
                  >
                    {monthsToDebtFree} months
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#991b1b',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Current pace puts you debt-free by{' '}
                    {monthsToDebtFree > 0
                      ? formatPayoffDate(debtFreeDate)
                      : 'unknown'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #fca5a5'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <FireIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#7f1d1d',
                        fontSize: '0.85rem'
                      }}
                    >
                      Strategy Recommendation
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#dc2626',
                      fontSize: '1rem',
                      mb: 0.5
                    }}
                  >
                    Avalanche Method
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#991b1b',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Target highest interest rates first for maximum savings
                  </Typography>
                </Box>
              </Box>
            </DebtAcceleratorSection>
          </Collapse>
        </Box>
      </Collapse>
    </GradientCard>
  );
};
export default DebtManagementOverview;
