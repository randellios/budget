import { Box, Typography } from '@mui/material';
import EnhancedIncomeMonthSelector from './EnhancedIncomeMonthSelector';
import MonthlyIncome from './MonthlyIncome';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: { md: 400 },
        flexShrink: 0,
        display: { xs: 'none', md: 'block' }
      }}
    >
      <Box
        sx={{
          width: 400,
          height: '100%',
          background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
          borderRight: '1px solid #e2e8f0'
        }}
      >
        <Box sx={{ height: '100%', overflow: 'auto' }}>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
