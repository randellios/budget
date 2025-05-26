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
  Avatar,
  Divider,
  IconButton,
  Collapse
} from '@mui/material';
import {
  TrackChanges as TrackChangesIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon
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

const GoalRow = styled(Box)(({ theme }) => ({
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

const getIncomePercentageColor = (percentage) => {
  if (percentage >= 10) return '#ef4444';
  if (percentage >= 5) return '#f59e0b';
  return '#10b981';
};

const SavingsGoalsOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const totalSaved = 3500;
  const monthlyContributions = 200;
  const monthlyIncome = 5000;

  const savingsGoals = [
    {
      id: 1,
      name: 'Emergency Fund',
      icon: '🎯',
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
      icon: '🏖️',
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
      icon: '🚗',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ textAlign: 'right', mr: 2 }}>
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
            <IconButton size="small" sx={{ color: '#6b7280' }}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
      </SectionHeader>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 0 }}>
          {savingsGoals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            const priorityColor = getPriorityColor(goal.priority);
            const incomePercentage =
              (goal.monthlyContribution / monthlyIncome) * 100;
            const monthlyColor = getIncomePercentageColor(incomePercentage);
            const remaining = goal.target - goal.current;

            return (
              <GoalRow key={goal.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: '0 0 240px',
                    minHeight: '60px'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 2,
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontSize: '20px'
                    }}
                  >
                    {goal.icon}
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
                      {goal.name}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          display: 'inline'
                        }}
                      >
                        £{goal.monthlyContribution}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 400,
                          display: 'inline',
                          ml: 0.5
                        }}
                      >
                        /month
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
                        color: '#10b981',
                        lineHeight: 1.2
                      }}
                    >
                      £{goal.current.toLocaleString()}
                      <Typography
                        component="span"
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: '1rem', ml: 1, fontWeight: 400 }}
                      >
                        / £{goal.target.toLocaleString()}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#667eea',
                        fontSize: '0.9rem'
                      }}
                    >
                      {progress.toFixed(1)}%
                    </Typography>
                  </Box>
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
                        borderRadius: 4,
                        boxShadow: `0 2px 8px ${goal.color}40`
                      }
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: '1rem' }}
                  >
                    {goal.monthsToTarget &&
                      `${goal.monthsToTarget} months to go`}
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0 0 120px',
                    minHeight: '60px'
                  }}
                >
                  {goal.onTrack ? (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: 18, color: '#10b981' }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#166534'
                        }}
                      >
                        On Track
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <WarningIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#92400e'
                        }}
                      >
                        Needs Attention
                      </Typography>
                    </Box>
                  )}
                </Box>
              </GoalRow>
            );
          })}
        </CardContent>
      </Collapse>
    </GradientCard>
  );
};

export default SavingsGoalsOverview;
