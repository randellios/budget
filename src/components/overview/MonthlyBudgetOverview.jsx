import React, { useState } from 'react';
import { Box, CardContent, Typography, Collapse, Divider } from '@mui/material';

import { useAppSelector } from '../../store/hooks';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import {
  selectEssentialExpenses,
  selectNonEssentialExpenses,
  selectExpenseCategories
} from '../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals
} from '../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectDebts
} from '../../store/slices/debtsSlice';

import ProjectedFinancialOverview from './ProjectedFinancialOverview';

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
        <ProjectedFinancialOverview />
        <Box sx={{ px: 3 }}>
          <ProgressDivider label="Next section" />
        </Box>
      </CardContent>
    </Collapse>
  );
};

export default MonthlyBudgetOverview;
