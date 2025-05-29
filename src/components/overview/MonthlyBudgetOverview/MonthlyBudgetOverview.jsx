import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Collapse,
  IconButton,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Savings as SavingsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { GradientCard, SectionHeader } from './styled';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import {
  selectTotalExpenses,
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
import {
  selectRemainingIncome,
  selectBudgetAllocationPercentage
} from '../../../store/selectors/budgetSelectors';
import TemperatureGauge from './TemperatureGauge';
import FinancialSnapshot from './FinancialSnapshot';
import AllocationStatus from './AllocationStatus';
import ExpenseDivision from './ExpenseDivision';

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

  const getEssentialCategories = () => {
    return expenseCategories
      .filter((cat) =>
        cat.items.some((item) => item.isEssential && item.amount > 0)
      )
      .map((cat) => ({ name: cat.name, icon: cat.icon }));
  };

  const getNonEssentialCategories = () => {
    return expenseCategories
      .filter((cat) =>
        cat.items.some((item) => !item.isEssential && item.amount > 0)
      )
      .map((cat) => ({ name: cat.name, icon: cat.icon }));
  };

  const getSavingsAndDebtCategories = () => {
    const categories = [];
    savingsGoals.forEach((goal) => {
      if (goal.monthlyContribution > 0) {
        categories.push({ name: goal.name, icon: goal.icon });
      }
    });
    debts.forEach((debt) => {
      if (debt.monthlyPayment > 0) {
        categories.push({ name: debt.name, icon: debt.icon });
      }
    });
    return categories;
  };

  const budgetCategories = [
    {
      title: 'Essential',
      amount: essentialExpenses,
      target: monthlyIncome * 0.5,
      targetPercentage: 50,
      icon: HomeIcon,
      color: '#667eea', // Changed to match your theme's primary color
      bgColor: '#f0f4ff', // Light purple-blue background
      borderColor: '#c7d2fe', // Light purple-blue border
      categories: getEssentialCategories()
    },
    {
      title: 'Optional',
      amount: nonEssentialExpenses,
      target: monthlyIncome * 0.3,
      targetPercentage: 30,
      icon: ShoppingCartIcon,
      color: '#f59e0b',
      bgColor: '#fef9e7',
      borderColor: '#fbbf24',
      categories: getNonEssentialCategories()
    },
    {
      title: 'Savings & Debts',
      amount: savingsContributions + debtPayments,
      target: monthlyIncome * 0.2,
      targetPercentage: 20,
      icon: SavingsIcon,
      color: '#10b981',
      bgColor: '#f0fdf4',
      borderColor: '#bbf7d0',
      categories: getSavingsAndDebtCategories()
    }
  ];

  const getStatusIndicator = (amount, target) => {
    const percentage = target > 0 ? (amount / target) * 100 : 0;
    if (percentage <= 80) {
      return {
        icon: CheckCircleIcon,
        color: '#10b981',
        status: 'Under Target'
      };
    } else if (percentage <= 110) {
      return { icon: CheckCircleIcon, color: '#667eea', status: 'On Track' };
    } else if (percentage <= 130) {
      return { icon: WarningIcon, color: '#f59e0b', status: 'Over Target' };
    }
    return { icon: ErrorIcon, color: '#ef4444', status: 'Significantly Over' };
  };

  const totalAllocated = budgetCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0
  );

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
          <Box>
            <Typography
              variant="h5"
              sx={{ fontSize: '1.375rem', color: '#1f2937' }}
            >
              Monthly Snapshot
            </Typography>
          </Box>
        </Box>
      </SectionHeader>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 3, pt: 0 }}>
          <AllocationStatus />
          <ExpenseDivision />
          <FinancialSnapshot />
        </CardContent>
      </Collapse>
    </GradientCard>
  );
};

export default MonthlyBudgetOverview;
