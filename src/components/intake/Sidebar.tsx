import { Box } from '@mui/material';
import MonthlyExpenses from './MonthlyExpenses';
import SavingGoals from './SavingGoals';
import Debts from './Debts';

const Sidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* <MonthlyExpenses />
      <SavingGoals />
      <Debts /> */}
    </Box>
  );
};

export default Sidebar;
