import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { styled, ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MonthlyBudgetOverview from './components/overview/MonthlyBudgetOverview';
import Sidebar from './components/Sidebar';
import BudgetAllocationSummary from './components/BudgetAllocationSummary';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
}));
const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  minHeight: '100vh',
  position: 'relative',
  paddingLeft: 400,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none'
  }
}));
const DashboardCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
  borderRadius: 16,
  padding: 24,
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #667eea, #764ba2, #10b981, #f59e0b)',
    borderRadius: '16px 16px 0 0'
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
  }
}));
export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <StyledAppBar position="sticky" elevation={0}>
          <Toolbar sx={{ minHeight: '64px !important' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                {' '}
                B
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                Budget Dashboard
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <MainContent
            component="main"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
              <DashboardCard
                sx={{
                  mb: 4,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none'
                }}
              >
                <BudgetAllocationSummary />
              </DashboardCard>
              <DashboardCard>
                <MonthlyBudgetOverview />
              </DashboardCard>
            </Box>
          </MainContent>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
