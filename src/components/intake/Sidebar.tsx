import React from 'react';
import { Box } from '@mui/material';
import EnhancedIncomeMonthSelector from './EnhancedIncomeMonthSelector';
import MonthlyExpenses from './MonthlyExpenses';
import SavingGoals from './SavingGoals';
import Debts from './Debts';

const Sidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <EnhancedIncomeMonthSelector />
      <MonthlyExpenses />
      <SavingGoals />
      <Debts />
    </Box>
  );
};

export default Sidebar;
