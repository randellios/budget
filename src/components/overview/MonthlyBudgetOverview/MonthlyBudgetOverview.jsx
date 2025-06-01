import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  Collapse,
  Card,
  Grid,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import {
  selectEssentialExpenses,
  selectNonEssentialExpenses
} from '../../../store/slices/expensesSlice';
import { selectTotalSavingsContributions } from '../../../store/slices/savingsSlice';
import { selectTotalDebtPayments } from '../../../store/slices/debtsSlice';
import FinancialSnapshot from './FinancialSnapshot';
import AllocationStatus from './AllocationStatus';
import ExpenseDivision from './ExpenseDivision';
import SavingsDebtProgress from '../SavingsDebtProgress';
import AdvancedFinancialHealth from './AdvancedFinancialHealth';

const MonthlyBudgetOverview = () => {
  const [expandedSections, setExpandedSections] = useState({
    healthAnalysis: false,
    detailedProgress: true,
    projections: true
  });

  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const totalExpenses = essentialExpenses + nonEssentialExpenses;
  const totalAllocated = totalExpenses + savingsContributions + debtPayments;
  const remaining = monthlyIncome - totalAllocated;

  const getQuickInsights = () => {
    const insights = [];
    const savingsRate =
      monthlyIncome > 0 ? (savingsContributions / monthlyIncome) * 100 : 0;
    const essentialRate =
      monthlyIncome > 0 ? (essentialExpenses / monthlyIncome) * 100 : 0;

    if (remaining > monthlyIncome * 0.1) {
      insights.push({
        icon: '💰',
        text: `£${remaining.toLocaleString()} surplus - great financial cushion`,
        color: '#10b981'
      });
    }

    if (savingsRate >= 20) {
      insights.push({
        icon: '🎯',
        text: `${savingsRate.toFixed(1)}% savings rate - excellent wealth building`,
        color: '#10b981'
      });
    } else if (savingsRate < 10) {
      insights.push({
        icon: '📈',
        text: `${savingsRate.toFixed(1)}% savings rate - room to boost future wealth`,
        color: '#f59e0b'
      });
    }

    if (essentialRate <= 50) {
      insights.push({
        icon: '🏠',
        text: `${essentialRate.toFixed(1)}% on essentials - efficient spending`,
        color: '#667eea'
      });
    }

    return insights;
  };

  const quickInsights = getQuickInsights();

  return (
    <CardContent sx={{ p: 0 }}>
      {/* Hero Status Section */}
      <Box sx={{ mb: 6 }}>
        <AllocationStatus />
      </Box>

      {/* Core Budget Analysis */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SpeedIcon sx={{ fontSize: 20, color: 'white' }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.5rem' }}
            >
              Budget Analysis
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#6b7280', fontSize: '0.9rem' }}
            >
              How your spending aligns with the 50/30/20 rule
            </Typography>
          </Box>
        </Box>
        <Card
          sx={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 0 }}>
            <ExpenseDivision />
          </Box>
        </Card>
      </Box>

      {/* Financial Projections */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TimelineIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.5rem' }}
              >
                Financial Projections
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#6b7280', fontSize: '0.9rem' }}
              >
                Visualize your financial future over time
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={() => toggleSection('projections')}
            sx={{ color: '#667eea' }}
          >
            {expandedSections.projections ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.projections}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 4 }}>
              <FinancialSnapshot />
            </Box>
          </Card>
        </Collapse>
      </Box>

      {/* Progress Tracking */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.5rem' }}
              >
                Goals & Debt Progress
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#6b7280', fontSize: '0.9rem' }}
              >
                Track your journey to financial milestones
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={() => toggleSection('detailedProgress')}
            sx={{ color: '#667eea' }}
          >
            {expandedSections.detailedProgress ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.detailedProgress}>
          <SavingsDebtProgress />
        </Collapse>
      </Box>

      {/* Comprehensive Health Analysis */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PsychologyIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.5rem' }}
              >
                Financial Health Analysis
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#6b7280', fontSize: '0.9rem' }}
              >
                Comprehensive scoring and personalized action plan
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={() => toggleSection('healthAnalysis')}
            sx={{ color: '#667eea' }}
          >
            {expandedSections.healthAnalysis ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.healthAnalysis}>
          <AdvancedFinancialHealth />
        </Collapse>
      </Box>
    </CardContent>
  );
};

export default MonthlyBudgetOverview;
