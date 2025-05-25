import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Paper,
  Avatar
} from '@mui/material';
import {
  TrackChanges as TrackChangesIcon,
  Security as SecurityIcon,
  BeachAccess as BeachAccessIcon,
  DirectionsCar as DirectionsCarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
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

const IconWrapper = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 36,
  height: 36,
  backgroundColor: bgcolor || theme.palette.primary.main,
  marginRight: theme.spacing(1.5)
}));

const ProgressCard = styled(Card)(({ theme }) => ({
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
  padding: theme.spacing(1.5),
  borderRadius: 8,
  border: '1px solid #e8ecf3',
  backgroundColor: '#ffffff',
  textAlign: 'center',
  minHeight: 60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const StatusFooter = styled(Box)(({ theme, ontrack }) => ({
  marginTop: 'auto',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  backgroundColor: ontrack === 'true' ? '#f0fdf4' : '#fef3c7',
  border: `1px solid ${ontrack === 'true' ? '#bbf7d0' : '#fbbf24'}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1)
}));

const SavingsGoalsOverview = () => {
  const totalSaved = 3500;
  const monthlyContributions = 200;
  const monthlyIncome = 5000;

  const savingsGoals = [
    {
      id: 1,
      name: 'Emergency Fund',
      icon: SecurityIcon,
      current: 1000,
      target: 5000,
      priority: 'High',
      color: '#ef4444',
      monthlyContribution: 100,
      monthsToTarget: 40,
      targetDate: 'Dec 2026',
      description: 'Essential safety net',
      onTrack: true
    },
    {
      id: 2,
      name: 'Holiday Fund',
      icon: BeachAccessIcon,
      current: 500,
      target: 2000,
      priority: 'Medium',
      color: '#f59e0b',
      monthlyContribution: 0,
      monthsToTarget: null,
      targetDate: '2025-08',
      description: 'Next family vacation',
      onTrack: false
    },
    {
      id: 3,
      name: 'New Car Fund',
      icon: DirectionsCarIcon,
      current: 2000,
      target: 10000,
      priority: 'Low',
      color: '#10b981',
      monthlyContribution: 100,
      monthsToTarget: 80,
      targetDate: null,
      description: 'Vehicle replacement',
      onTrack: false
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
          <IconWrapper bgcolor="#10b981">
            <TrackChangesIcon />
          </IconWrapper>
          <Box>
            <Typography variant="h5" sx={{ fontSize: '1.375rem' }}>
              Savings Goals Overview
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              Monthly Contributions: £{monthlyContributions}
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
            Total Saved
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#10b981' }}
          >
            £{totalSaved.toLocaleString()}
          </Typography>
        </Box>
      </SectionHeader>
      <CardContent>
        <Grid container spacing={2}>
          {savingsGoals.map((goal) => {
            const IconComponent = goal.icon;
            const progress = (goal.current / goal.target) * 100;
            const priorityColor = getPriorityColor(goal.priority);
            const incomePercentage = (
              (goal.monthlyContribution / monthlyIncome) *
              100
            ).toFixed(1);
            return (
              <Grid item xs={12} md={4} key={goal.id}>
                <ProgressCard>
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
                        backgroundColor: `${goal.color}15`,
                        borderRadius: 2,
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24, color: goal.color }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}
                      >
                        {goal.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          color: priorityColor,
                          fontWeight: 600
                        }}
                      >
                        {goal.priority} priority
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.75rem',
                        color: goal.color,
                        mb: 0.5
                      }}
                    >
                      £{goal.current.toLocaleString()}
                      <Typography
                        component="span"
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: '1rem', ml: 1 }}
                      >
                        / £{goal.target.toLocaleString()}
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
                          backgroundColor: goal.color,
                          borderRadius: 4
                        }
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {progress.toFixed(1)}% complete • £
                      {(goal.target - goal.current).toLocaleString()} remaining
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <MetricBox sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          color: '#1f2937',
                          mb: 0.5
                        }}
                      >
                        {goal.monthsToTarget || '∞'}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.7rem',
                          color: '#6b7280',
                          fontWeight: 500
                        }}
                      >
                        Months to goal
                      </Typography>
                    </MetricBox>
                    <MetricBox sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          color: goal.color,
                          mb: 0.5
                        }}
                      >
                        £{goal.monthlyContribution}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.7rem',
                          color: '#6b7280',
                          fontWeight: 500
                        }}
                      >
                        Monthly
                      </Typography>
                    </MetricBox>
                    <MetricBox sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          color: '#667eea',
                          mb: 0.5
                        }}
                      >
                        {incomePercentage}%
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.7rem',
                          color: '#6b7280',
                          fontWeight: 500
                        }}
                      >
                        Of income
                      </Typography>
                    </MetricBox>
                  </Box>
                  <StatusFooter ontrack={goal.onTrack.toString()}>
                    {goal.onTrack ? (
                      <CheckCircleIcon
                        sx={{ fontSize: 16, color: '#10b981' }}
                      />
                    ) : (
                      <WarningIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: goal.onTrack ? '#166534' : '#92400e'
                      }}
                    >
                      {goal.onTrack
                        ? 'On track to meet goal'
                        : 'Needs attention'}
                    </Typography>
                  </StatusFooter>
                </ProgressCard>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </GradientCard>
  );
};

export default SavingsGoalsOverview;
