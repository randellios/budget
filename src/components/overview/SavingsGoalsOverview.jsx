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
  Collapse,
  CircularProgress
} from '@mui/material';
import {
  TrackChanges as TrackChangesIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Lightbulb as LightbulbIcon,
  Speed as SpeedIcon,
  GpsFixed as TargetIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../store/hooks';
import {
  selectSavingsGoals,
  selectTotalSavingsContributions,
  selectTotalSavingsBalance,
  selectTotalSavingsTarget
} from '../../store/slices/savingsSlice';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';

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

const SavingsAcceleratorSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  border: '1px solid #bbf7d0',
  borderRadius: 12,
  margin: theme.spacing(0, 3, 3, 3)
}));

const SavingsGoalsOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [acceleratorOpen, setAcceleratorOpen] = useState(false);

  // Get data from Redux store
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const totalSavingsContributions = useAppSelector(
    selectTotalSavingsContributions
  );
  const totalSavingsBalance = useAppSelector(selectTotalSavingsBalance);
  const totalSavingsTarget = useAppSelector(selectTotalSavingsTarget);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);

  // Calculate overall progress
  const overallProgress =
    totalSavingsTarget > 0
      ? (totalSavingsBalance / totalSavingsTarget) * 100
      : 0;

  // Calculate next milestone (earliest target date)
  const nextMilestone = savingsGoals.reduce((earliest, goal) => {
    if (!goal.targetDate) return earliest;
    const goalDate = new Date(goal.targetDate);
    if (!earliest || goalDate < earliest) return goalDate;
    return earliest;
  }, null);

  const formatCompletionDate = (date) => {
    if (!date) return 'Not set';
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateGoalStatus = (goal) => {
    if (!goal.targetDate || !goal.monthlyContribution) {
      return { onTrack: false, monthsBehind: null };
    }

    const targetDate = new Date(goal.targetDate);
    const currentDate = new Date();
    const monthsRemaining = Math.max(
      0,
      (targetDate.getFullYear() - currentDate.getFullYear()) * 12 +
        (targetDate.getMonth() - currentDate.getMonth())
    );

    const remainingAmount = goal.targetAmount - goal.currentBalance;
    const monthsNeeded =
      goal.monthlyContribution > 0
        ? Math.ceil(remainingAmount / goal.monthlyContribution)
        : Infinity;

    const onTrack = monthsNeeded <= monthsRemaining;
    const monthsBehind = onTrack ? 0 : monthsNeeded - monthsRemaining;

    return { onTrack, monthsBehind };
  };

  const calculateExpectedCompletion = (goal) => {
    if (!goal.monthlyContribution || goal.monthlyContribution <= 0) return null;

    const remainingAmount = goal.targetAmount - goal.currentBalance;
    const monthsNeeded = Math.ceil(remainingAmount / goal.monthlyContribution);

    const completionDate = new Date();
    completionDate.setMonth(completionDate.getMonth() + monthsNeeded);

    return completionDate;
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
                Savings Goals Overview
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.25 }}
              >
                Monthly Contributions: £{totalSavingsContributions}
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
                Next Milestone
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '1rem', color: '#667eea' }}
              >
                {formatCompletionDate(nextMilestone)}
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={70}
                thickness={3}
                sx={{ color: '#dcfce7', position: 'absolute' }}
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
                  complete
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
          {savingsGoals.map((goal, index) => {
            const progress =
              goal.targetAmount > 0
                ? (goal.currentBalance / goal.targetAmount) * 100
                : 0;
            const remaining = goal.targetAmount - goal.currentBalance;
            const { onTrack, monthsBehind } = calculateGoalStatus(goal);
            const expectedCompletion = calculateExpectedCompletion(goal);

            return (
              <GoalRow key={goal.id}>
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
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f0fdf4',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        border: '2px solid #10b981',
                        width: 'fit-content'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: '#10b981',
                          display: 'inline'
                        }}
                      >
                        £{goal.monthlyContribution}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: '#059669',
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
                      £{goal.currentBalance.toLocaleString()}
                      <Typography
                        component="span"
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: '1rem', ml: 1, fontWeight: 400 }}
                      >
                        / £{goal.targetAmount.toLocaleString()}
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
                    £{remaining.toLocaleString()} remaining
                    {goal.targetDate &&
                      ` • Target: ${new Date(goal.targetDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`}
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
                  {onTrack ? (
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
                        <CheckCircleIcon
                          sx={{ fontSize: 18, color: '#10b981' }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#166534'
                          }}
                        >
                          On Track
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          color: '#059669',
                          lineHeight: 1.2
                        }}
                      >
                        Complete by {formatCompletionDate(expectedCompletion)}
                      </Typography>
                    </Box>
                  ) : (
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
                        <WarningIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#92400e'
                          }}
                        >
                          {goal.monthlyContribution === 0
                            ? 'No Contributions'
                            : 'Off Track'}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          color: '#d97706',
                          lineHeight: 1.2
                        }}
                      >
                        {goal.monthlyContribution === 0
                          ? 'Add monthly contribution'
                          : monthsBehind > 0
                            ? `${monthsBehind} months behind schedule`
                            : 'No target date set'}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </GoalRow>
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
                  backgroundColor: '#10b981',
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
                Savings Accelerator Insights
              </Typography>
              <Chip
                label="3 opportunities"
                size="small"
                sx={{
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  height: 20
                }}
              />
            </Box>
            <IconButton size="small" sx={{ color: '#10b981' }}>
              {acceleratorOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={acceleratorOpen}>
            <SavingsAcceleratorSection sx={{ mt: 0 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #bbf7d0'
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
                    <AttachMoneyIcon sx={{ fontSize: 16, color: '#059669' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#064e3b',
                        fontSize: '0.85rem'
                      }}
                    >
                      Compound Growth Potential
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#059669',
                      fontSize: '1.25rem',
                      mb: 0.5
                    }}
                  >
                    £
                    {Math.round(
                      totalSavingsContributions * 0.84 * 60
                    ).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#065f46',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Extra £50/month invested could grow to this much by 2030
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #bbf7d0'
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
                    <SpeedIcon sx={{ fontSize: 16, color: '#059669' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#064e3b',
                        fontSize: '0.85rem'
                      }}
                    >
                      Goal Acceleration
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#059669',
                      fontSize: '1.25rem',
                      mb: 0.5
                    }}
                  >
                    {Math.round(
                      (totalSavingsContributions / monthlyIncome) * 100
                    )}
                    % of income
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#065f46',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Current savings rate - consider increasing to 20% for faster
                    goals
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #bbf7d0'
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
                    <TargetIcon sx={{ fontSize: 16, color: '#059669' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#064e3b',
                        fontSize: '0.85rem'
                      }}
                    >
                      Priority Recommendation
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#059669',
                      fontSize: '1rem',
                      mb: 0.5
                    }}
                  >
                    Emergency Fund First
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#065f46',
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Complete your safety net before tackling other goals
                  </Typography>
                </Box>
              </Box>
            </SavingsAcceleratorSection>
          </Collapse>
        </Box>
      </Collapse>
    </GradientCard>
  );
};
export default SavingsGoalsOverview;
