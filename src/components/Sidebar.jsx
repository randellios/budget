import { Box, Typography } from '@mui/material';
import EnhancedIncomeMonthSelector from './EnhancedIncomeMonthSelector';
import MonthlyIncome from './MonthlyIncome';
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 400,
        position: 'fixed',
        left: 0,
        top: 64,
        height: 'calc(100vh - 64px)',
        zIndex: 1200,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: { xs: 'none', md: 'block' },
        '&:has(.budget-setup-area:hover)': { width: 500 }
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
          borderRight: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ height: '100%', overflow: 'auto', width: 400 }}>
          <Box sx={{ p: 3 }}>
            <EnhancedIncomeMonthSelector />
            <MonthlyIncome />
            <Typography
              variant="overline"
              sx={{
                color: '#6b7280',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                mb: 2,
                display: 'block'
              }}
            >
              Budget Setup
            </Typography>
            <Box
              className="budget-setup-area"
              sx={{ minHeight: 200, position: 'relative' }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Sidebar;
