import React from 'react';
import { Box } from '@mui/material';
import MonthlyIncome from './MonthlyIncome';
import MonthlyExpenses from './MonthlyExpenses';
import SavingGoals from './SavingGoals';
import Debts from './Debts';

const Sidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MonthlyIncome />
      <MonthlyExpenses />
      <SavingGoals />
      <Debts />
    </Box>
  );
};

export default Sidebar;
