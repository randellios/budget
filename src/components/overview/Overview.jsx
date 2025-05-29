import { Box } from '@mui/material';
import DebtManagementOverview from './DebtManagementOverview';
import MonthlyBudgetOverview from './MonthlyBudgetOverview/MonthlyBudgetOverview';
import SavingsGoalsOverview from './SavingsGoalsOverview';

const Overview = () => {
  return (
    <>
      <MonthlyBudgetOverview />
      {/* <SavingsGoalsOverview />
      <DebtManagementOverview /> */}
    </>
  );
};

export default Overview;
