import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  Collapse,
  Divider,
  Paper,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  AccountBalanceWallet as BudgetIcon,
  Assessment as AnalysisIcon,
  Timeline as SnapshotIcon,
  HealthAndSafety as HealthIcon,
  ShoppingCart as SpendingIcon,
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon,
  Lightbulb as InsightIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import {
  selectEssentialExpenses,
  selectNonEssentialExpenses,
  selectExpenseCategories
} from '../../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals
} from '../../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectDebts
} from '../../../store/slices/debtsSlice';
import FinancialSnapshot from './FinancialSnapshot';
import AllocationStatus from './AllocationStatus';
import ExpenseDivision from './ExpenseDivision';
import CompactFinancialHealth from './CompactFinancialHealth';
import TopExpenses from './TopExpenses';
import SavingsDebtProgress from '../SavingsDebtProgress';

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  badge,
  color = '#667eea',
  children
}) => (
  <Box sx={{ mb: 3 }}>
    <Paper
      sx={{
        p: 3,
        mb: 3,
        background: `linear-gradient(135deg, ${color}08 0%, ${color}04 100%)`,
        border: `1px solid ${color}20`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: `0 4px 16px ${color}30`
            }}
          >
            <Icon sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#1f2937' }}
              >
                {title}
              </Typography>
              {badge && (
                <Chip
                  label={badge}
                  size="small"
                  sx={{
                    backgroundColor: `${color}15`,
                    color: color,
                    border: `1px solid ${color}30`,
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}
                />
              )}
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: '#6b7280',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                maxWidth: '600px'
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Learn more about this section">
          <IconButton
            size="small"
            sx={{ color: '#9ca3af', '&:hover': { color: color } }}
          >
            <InfoIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
    {children}
  </Box>
);

const InsightCard = ({
  title,
  value,
  change,
  description,
  color = '#667eea'
}) => (
  <Paper
    sx={{
      p: 3,
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
      border: '2px solid #e2e8f0',
      borderRadius: 3,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-2px)',
        border: '2px solid #cbd5e1'
      },
      transition: 'all 0.3s ease'
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1.5
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#6b7280',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.8px'
        }}
      >
        {title}
      </Typography>
      {change && (
        <Chip
          label={change}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.7rem',
            fontWeight: 600,
            backgroundColor: change.startsWith('+') ? '#dcfce7' : '#fee2e2',
            color: change.startsWith('+') ? '#166534' : '#991b1b',
            border: `1px solid ${change.startsWith('+') ? '#bbf7d0' : '#fca5a5'}`
          }}
        />
      )}
    </Box>
    <Typography
      variant="h5"
      sx={{
        fontWeight: 800,
        color: color,
        fontSize: '1.5rem',
        mb: 1,
        lineHeight: 1
      }}
    >
      {value}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: 1.3 }}
    >
      {description}
    </Typography>
  </Paper>
);

const ProgressDivider = ({ label = 'Progress Tracking' }) => (
  <Box sx={{ my: 8, position: 'relative' }}>
    <Divider sx={{ borderColor: '#e2e8f0', borderWidth: 1 }} />
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        px: 4,
        py: 1.5,
        bgcolor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#6b7280',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {label}
      </Typography>
    </Box>
  </Box>
);

const MonthlyBudgetOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const essentialExpenses = useAppSelector(selectEssentialExpenses);
  const nonEssentialExpenses = useAppSelector(selectNonEssentialExpenses);
  const savingsContributions = useAppSelector(selectTotalSavingsContributions);
  const debtPayments = useAppSelector(selectTotalDebtPayments);
  const expenseCategories = useAppSelector(selectExpenseCategories);
  const savingsGoals = useAppSelector(selectSavingsGoals);
  const debts = useAppSelector(selectDebts);

  const totalExpenses = essentialExpenses + nonEssentialExpenses;
  const totalAllocated = totalExpenses + savingsContributions + debtPayments;
  const remaining = monthlyIncome - totalAllocated;
  const savingsRate =
    monthlyIncome > 0 ? (savingsContributions / monthlyIncome) * 100 : 0;
  const expenseRatio =
    monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ p: 0 }}>
        {/* Key Insights Bar */}
        <Paper
          sx={{
            mx: 3,
            mt: 3,
            mb: 6,
            p: 3.5,
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '2px solid #e2e8f0',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}
            >
              <InsightIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#374151', fontSize: '1.1rem' }}
            >
              Financial Overview
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 3
            }}
          >
            <InsightCard
              title="Monthly Cash Flow"
              value={
                remaining >= 0
                  ? `+£${remaining.toLocaleString()}`
                  : `-£${Math.abs(remaining).toLocaleString()}`
              }
              change={remaining >= 0 ? '+5.2%' : '-12%'}
              description="Available after all allocations"
              color={remaining >= 0 ? '#10b981' : '#ef4444'}
            />
            <InsightCard
              title="Savings Rate"
              value={`${savingsRate.toFixed(1)}%`}
              change={savingsRate >= 20 ? '+2.1%' : '-0.8%'}
              description="Of total income saved"
              color="#667eea"
            />
            <InsightCard
              title="Expense Ratio"
              value={`${expenseRatio.toFixed(1)}%`}
              change={expenseRatio <= 70 ? '+1.3%' : '+4.2%'}
              description="Of income on expenses"
              color="#f59e0b"
            />
            <InsightCard
              title="Active Goals"
              value={`${savingsGoals.length + debts.length}`}
              change={`${savingsGoals.length}S ${debts.length}D`}
              description="Savings & debt targets"
              color="#8b5cf6"
            />
          </Box>
        </Paper>

        <Box sx={{ px: 3 }}>
          <ProgressDivider label="Budget Breakdown" />

          {/* Row 1: Budget Analysis + Spending Insights */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr',
              gap: 6,
              mb: 4
            }}
          >
            <SectionHeader
              icon={AnalysisIcon}
              title="Budget Analysis"
              description="Comprehensive breakdown of your spending patterns using the proven 50/30/20 framework. This analysis helps identify areas for optimization and ensures your budget aligns with financial best practices."
              badge="50/30/20 Rule"
              color="#10b981"
            >
              <Box
                sx={{
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden',
                  p: 3
                }}
              >
                <ExpenseDivision />
              </Box>
            </SectionHeader>

            <Box>
              <TopExpenses />
            </Box>
          </Box>

          <ProgressDivider label="Financial Projections" />

          {/* Row 2: Financial Projection + Financial Health */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr',
              gap: 6,
              mb: 4
            }}
          >
            <SectionHeader
              icon={SnapshotIcon}
              title="Financial Projection"
              description="Interactive timeline showing your projected financial growth over the next 5 years. Adjust the timeline to see how your current savings and debt payments will impact your future wealth."
              badge="5-Year Outlook"
              color="#3b82f6"
            >
              <Box
                sx={{
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ p: 3 }}>
                  <FinancialSnapshot />
                </Box>
              </Box>
            </SectionHeader>

            <Box>
              <CompactFinancialHealth />
            </Box>
          </Box>

          <ProgressDivider label="Goal Tracking" />

          {/* Row 3: Progress Section */}
          <SectionHeader
            icon={TrendingUpIcon}
            title="Goal Progress"
            description="Track your journey towards financial milestones. Monitor savings goals, debt elimination progress, and emergency fund growth with detailed timelines and projections."
            badge={`${savingsGoals.length + debts.length} Active`}
            color="#ec4899"
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                border: '1px solid #e2e8f0',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ p: 3 }}>
                <SavingsDebtProgress />
              </Box>
            </Box>
          </SectionHeader>
        </Box>
      </CardContent>
    </Collapse>
  );
};

export default MonthlyBudgetOverview;
