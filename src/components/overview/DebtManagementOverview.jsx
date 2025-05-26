import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Avatar
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  School as SchoolIcon,
  DirectionsCar as DirectionsCarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
    background: 'linear-gradient(90deg, #667eea, #764ba2, #10b981, #f59e0b)',
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
const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  backgroundColor: '#ef4444',
  marginRight: theme.spacing(1.5)
}));
const DebtCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  border: '1px solid #e8ecf3',
  padding: theme.spacing(2.5),
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)'
  }
}));
const MetricBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  border: '1px solid #e8ecf3',
  textAlign: 'center',
  minHeight: 70,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    borderColor: '#cbd5e1'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #10b981 100%)',
    opacity: 0.6
  }
}));
const InterestCard = styled(Box)(({ theme, priority }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  background:
    priority === 'High'
      ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
      : priority === 'Medium'
        ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
        : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
  border: `2px solid ${priority === 'High' ? '#f87171' : priority === 'Medium' ? '#fbbf24' : '#60a5fa'}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  boxShadow: `0 4px 12px ${priority === 'High' ? 'rgba(239, 68, 68, 0.15)' : priority === 'Medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)'}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    background:
      priority === 'High'
        ? '#ef4444'
        : priority === 'Medium'
          ? '#f59e0b'
          : '#3b82f6'
  }
}));
const StatusFooter = styled(Box)(({ theme, priority }) => ({
  marginTop: 'auto',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  backgroundColor:
    priority === 'High'
      ? '#fef2f2'
      : priority === 'Medium'
        ? '#fef3c7'
        : '#f0fdf4',
  border: `1px solid ${priority === 'High' ? '#fca5a5' : priority === 'Medium' ? '#fbbf24' : '#bbf7d0'}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1)
}));
const DebtManagementOverview = () => {
  const totalDebt = 10000;
  const monthlyPayments = 200;
  const totalPaidOff = 22000;
  const overallProgress = 68;
  const debts = [
    {
      id: 1,
      name: 'Credit Card',
      icon: CreditCardIcon,
      current: 2000,
      original: 5000,
      interestRate: 22.9,
      monthlyPayment: 67,
      monthsRemaining: 32,
      totalInterest: 458,
      priority: 'High',
      color: '#ef4444',
      description: 'High-interest revolving debt'
    },
    {
      id: 2,
      name: 'Car Loan',
      icon: DirectionsCarIcon,
      current: 3000,
      original: 10000,
      interestRate: 6.5,
      monthlyPayment: 100,
      monthsRemaining: 32,
      totalInterest: 195,
      priority: 'Medium',
      color: '#f59e0b',
      description: 'Auto financing'
    },
    {
      id: 3,
      name: 'Student Loan',
      icon: SchoolIcon,
      current: 5000,
      original: 22000,
      interestRate: 3.2,
      monthlyPayment: 33,
      monthsRemaining: 162,
      totalInterest: 300,
      priority: 'Low',
      color: '#10b981',
      description: 'Education financing'
    }
  ];
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#ef4444';
      case 'Medium':
        return '#f59e0b';
      case 'Low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };
  return (
    <GradientCard>
      <SectionHeader>
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
              Monthly Payments: £{monthlyPayments}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
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
            Total Remaining
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#ef4444' }}
          >
            £{totalDebt.toLocaleString()}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 0.5,
              justifyContent: 'flex-end'
            }}
          >
            <TrendingDownIcon sx={{ fontSize: 14, color: '#10b981' }} />
            <Typography
              variant="caption"
              sx={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem' }}
            >
              {overallProgress}% paid off
            </Typography>
          </Box>
        </Box>
      </SectionHeader>
      <CardContent>
        <Grid container spacing={2}>
          {debts.map((debt) => {
            const IconComponent = debt.icon;
            const progress =
              ((debt.original - debt.current) / debt.original) * 100;
            const priorityColor = getPriorityColor(debt.priority);
            return (
              <Grid item xs={12} md={4} key={debt.id}>
                <DebtCard>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: `${debt.color}15`,
                        borderRadius: 2,
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24, color: debt.color }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}
                      >
                        {debt.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          color: priorityColor,
                          fontWeight: 600
                        }}
                      >
                        {debt.priority} priority
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.75rem',
                        color: debt.color,
                        mb: 0.5
                      }}
                    >
                      £{debt.current.toLocaleString()}
                      <Typography
                        component="span"
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          fontSize: '1rem',
                          ml: 1,
                          textDecoration: 'line-through'
                        }}
                      >
                        £{debt.original.toLocaleString()}
                      </Typography>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#f3f4f6',
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#10b981',
                          borderRadius: 4
                        }
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {progress.toFixed(1)}% paid off • £
                      {(debt.original - debt.current).toLocaleString()} progress
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
                    <MetricBox sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          color: '#1f2937',
                          mb: 0.25,
                          lineHeight: 1
                        }}
                      >
                        {debt.monthsRemaining}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.65rem',
                          color: '#6b7280',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Months Left
                      </Typography>
                    </MetricBox>
                    <MetricBox sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          color: debt.color,
                          mb: 0.25,
                          lineHeight: 1
                        }}
                      >
                        £{debt.monthlyPayment}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.65rem',
                          color: '#6b7280',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Monthly
                      </Typography>
                    </MetricBox>
                    <MetricBox sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'center',
                          gap: 0.25,
                          mb: 0.25
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            color: '#667eea',
                            lineHeight: 1
                          }}
                        >
                          {debt.interestRate}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            color: '#667eea',
                            fontWeight: 600
                          }}
                        >
                          %
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.65rem',
                          color: '#6b7280',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        APR
                      </Typography>
                    </MetricBox>
                  </Box>
                  <InterestCard priority={debt.priority}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        pl: 1
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          borderRadius: '50%',
                          p: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <AttachMoneyIcon
                          sx={{
                            fontSize: 18,
                            color:
                              debt.priority === 'High'
                                ? '#dc2626'
                                : debt.priority === 'Medium'
                                  ? '#d97706'
                                  : '#2563eb'
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.7rem',
                            color:
                              debt.priority === 'High'
                                ? '#7f1d1d'
                                : debt.priority === 'Medium'
                                  ? '#78350f'
                                  : '#1e3a8a',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                            display: 'block'
                          }}
                        >
                          Total Interest Cost
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.125rem',
                            color:
                              debt.priority === 'High'
                                ? '#dc2626'
                                : debt.priority === 'Medium'
                                  ? '#d97706'
                                  : '#2563eb',
                            lineHeight: 1
                          }}
                        >
                          £{debt.totalInterest}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={
                          debt.priority === 'High'
                            ? 'Pay First'
                            : debt.priority === 'Medium'
                              ? 'Moderate'
                              : 'Low Cost'
                        }
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.4)',
                          color:
                            debt.priority === 'High'
                              ? '#7f1d1d'
                              : debt.priority === 'Medium'
                                ? '#78350f'
                                : '#1e3a8a',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          border: 'none'
                        }}
                      />
                    </Box>
                  </InterestCard>
                </DebtCard>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderTop: '1px solid #e8ecf3'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.875rem' }}
            >
              Overall Progress: {overallProgress}%
            </Typography>
            <Chip
              label="Debt-Free: May 2038"
              size="small"
              sx={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fbbf24',
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.875rem' }}
            >
              Total Paid Off:
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: '#10b981', fontSize: '0.875rem' }}
            >
              £{totalPaidOff.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </GradientCard>
  );
};
export default DebtManagementOverview;
