import { Box } from '@mui/material';
import DebtManagementOverview from './DebtManagementOverview';
import MonthlyBudgetOverview from './MonthlyBudgetOverview/MonthlyBudgetOverview';
import SavingsGoalsOverview from './SavingsGoalsOverview';

const Overview = () => {
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <MonthlyBudgetOverview />
      <SavingsGoalsOverview />
      <DebtManagementOverview />
    </Box>
  );
};

export default Overview;
