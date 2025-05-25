import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Alert,
  LinearProgress,
  Collapse
} from '@mui/material';
import {
  AutoFixHigh as AutoFixHighIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Calculate as CalculateIcon
} from '@mui/icons-material';

const AutoBalance = () => {
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mock data - replace with your actual data
  const currentBudget = {
    income: 5000,
    essentials: 2300, // Not flexible
    nonEssential: 720, // Flexible
    savingsDebt: 300,
    unallocated: 200
  };

  const goals = {
    savings: 1000, // Target for savings & debt combined
    currentSavingsDebt: 300
  };

  const flexibleCategories = [
    { name: 'Entertainment', current: 177, flexible: true },
    { name: 'Dining Out', current: 250, flexible: true },
    { name: 'Shopping', current: 150, flexible: true },
    { name: 'Subscriptions', current: 143, flexible: true }
  ];

  const calculateAutoBalance = () => {
    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      setIsCalculated(true);
      setIsCalculating(false);
    }, 1500);
  };

  const resetCalculation = () => {
    setIsCalculated(false);
  };

  // Mock calculation results
  const shortfall = goals.savings - goals.currentSavingsDebt; // £700
  const totalFlexible = flexibleCategories.reduce(
    (sum, cat) => sum + cat.current,
    0
  );
  const reductionNeeded = Math.min(shortfall, totalFlexible);

  const balancedCategories = flexibleCategories.map((category) => {
    const reductionPercent = reductionNeeded / totalFlexible;
    const reduction = Math.round(category.current * reductionPercent);
    return {
      ...category,
      suggested: category.current - reduction,
      reduction: reduction
    };
  });

  const canAchieveGoals = totalFlexible >= shortfall;

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AutoFixHighIcon sx={{ mr: 1, color: '#667eea' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Auto Balance
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Automatically adjust flexible spending to meet your savings and debt
          goals.
        </Typography>

        {!isCalculated && (
          <Button
            variant="contained"
            fullWidth
            onClick={calculateAutoBalance}
            disabled={isCalculating}
            startIcon={isCalculating ? <CalculateIcon /> : <TrendingUpIcon />}
            sx={{
              bgcolor: '#667eea',
              '&:hover': { bgcolor: '#5a67d8' },
              borderRadius: 2,
              py: 1.5
            }}
          >
            {isCalculating ? 'Calculating...' : 'Balance Budget'}
          </Button>
        )}

        {isCalculating && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              sx={{
                height: 6,
                borderRadius: 3,
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                }
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block', textAlign: 'center' }}
            >
              Analyzing flexible categories...
            </Typography>
          </Box>
        )}

        <Collapse in={isCalculated}>
          <Box sx={{ mt: 2 }}>
            {/* Status Alert */}
            <Alert
              severity={canAchieveGoals ? 'success' : 'warning'}
              icon={canAchieveGoals ? <CheckCircleIcon /> : <WarningIcon />}
              sx={{ mb: 3 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {canAchieveGoals
                  ? `Goals achievable! Reduce flexible spending by £${reductionNeeded}`
                  : `Cannot fully achieve goals. Maximum reduction: £${totalFlexible}`}
              </Typography>
            </Alert>

            {/* Summary */}
            <Box
              sx={{
                p: 2,
                bgcolor: '#f8fafc',
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                mb: 3
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 1 }}
              >
                REBALANCING SUMMARY
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip
                  label={`£${shortfall} Needed`}
                  size="small"
                  sx={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    border: '1px solid #fca5a5',
                    fontSize: '0.6875rem'
                  }}
                />
                <Chip
                  label={`£${reductionNeeded} Available`}
                  size="small"
                  sx={{
                    backgroundColor: canAchieveGoals ? '#dcfce7' : '#fde68a',
                    color: canAchieveGoals ? '#166534' : '#92400e',
                    border: `1px solid ${canAchieveGoals ? '#bbf7d0' : '#fbbf24'}`,
                    fontSize: '0.6875rem'
                  }}
                />
              </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Suggested Changes */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ mb: 2, display: 'block' }}
            >
              Suggested Changes
            </Typography>

            <Stack spacing={2}>
              {balancedCategories.map((category, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                    bgcolor: category.reduction > 0 ? '#fef9e7' : '#f8fafc'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {category.name}
                    </Typography>
                    {category.reduction > 0 && (
                      <Chip
                        label={`-£${category.reduction}`}
                        size="small"
                        sx={{
                          backgroundColor: '#fde68a',
                          color: '#92400e',
                          fontSize: '0.6875rem'
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Current: £{category.current}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color:
                          category.reduction > 0 ? '#d97706' : 'text.primary'
                      }}
                    >
                      Suggested: £{category.suggested}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#10b981',
                  '&:hover': { bgcolor: '#059669' },
                  borderRadius: 2
                }}
              >
                Apply Changes
              </Button>
              <Button
                variant="outlined"
                onClick={resetCalculation}
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  '&:hover': {
                    borderColor: '#cbd5e1',
                    bgcolor: '#f8fafc'
                  }
                }}
              >
                Reset
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AutoBalance;
