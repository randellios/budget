import React, { useState } from 'react';
import { Box, CardContent, Typography, Collapse } from '@mui/material';
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
import SavingsDebtProgress from '../SavingsDebtProgress';
import AdvancedFinancialHealth from './AdvancedFinancialHealth';

const MonthlyBudgetOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ p: 3, pt: 0 }}>
        <Box sx={{ mt: 2, mb: 4 }}>
          <AllocationStatus />

          <ExpenseDivision />
          <FinancialSnapshot />
        </Box>

        <SavingsDebtProgress />
      </CardContent>
    </Collapse>
  );
};

export default MonthlyBudgetOverview;
