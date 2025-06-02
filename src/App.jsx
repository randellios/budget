import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon,
  ShoppingCart as ShoppingCartIcon,
  TrackChanges as TargetIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Overview from './components/overview/Overview';
import MonthlyExpenses from './components/intake/MonthlyExpenses';
import SavingGoals from './components/intake/SavingGoals';
import Debts from './components/intake/Debts';
import EnhancedIncomeMonthSelector from './components/EnhancedIncomeMonthSelector';
import { useAppSelector } from './store/hooks';
import { selectMonthlyIncome } from './store/slices/incomeSlice';
import { selectRemainingIncome } from './store/selectors/budgetSelectors';
import MonthlyIncome from './components/intake/MonthlyIncome';

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

const SidebarSection = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  border: 'none',
  '&:before': {
    display: 'none'
  },
  '& .MuiAccordionSummary-root': {
    padding: '12px 0',
    minHeight: 'auto',
    '&.Mui-expanded': {
      minHeight: 'auto'
    }
  },
  '& .MuiAccordionDetails-root': {
    padding: '0 0 16px 0'
  }
}));

// Memoized components to prevent unnecessary re-renders
const MemoizedMonthlyExpenses = React.memo(MonthlyExpenses);
const MemoizedSavingGoals = React.memo(SavingGoals);
const MemoizedDebts = React.memo(Debts);

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    expenses: true,
    savings: true,
    debts: true
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const remainingIncome = useAppSelector(selectRemainingIncome);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const handleSectionToggle = useCallback((section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Memoize the sidebar content to prevent re-renders when Redux state changes
  const SidebarContent = useMemo(
    () => () => (
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

          {/* Monthly Expenses Section */}
          <SidebarSection
            expanded={expandedSections.expenses}
            onChange={() => handleSectionToggle('expenses')}
            TransitionProps={{ unmountOnExit: false }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#667eea' }} />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1.5
                }
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1.5,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: '#374151' }}
              >
                Monthly Expenses
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MemoizedMonthlyExpenses />
            </AccordionDetails>
          </SidebarSection>

          {/* Savings Goals Section */}
          <SidebarSection
            expanded={expandedSections.savings}
            onChange={() => handleSectionToggle('savings')}
            TransitionProps={{ unmountOnExit: false }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#10b981' }} />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1.5
                }
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1.5,
                  background:
                    'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <TargetIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: '#374151' }}
              >
                Savings Goals
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MemoizedSavingGoals />
            </AccordionDetails>
          </SidebarSection>

          {/* Debts Section */}
          <SidebarSection
            expanded={expandedSections.debts}
            onChange={() => handleSectionToggle('debts')}
            TransitionProps={{ unmountOnExit: false }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#ef4444' }} />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1.5
                }
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1.5,
                  background:
                    'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <CreditCardIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: '#374151' }}
              >
                Debts
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MemoizedDebts />
            </AccordionDetails>
          </SidebarSection>
        </Box>
      </Box>
    ),
    [expandedSections, handleSectionToggle]
  );

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
          {/* Desktop Sidebar */}
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
              <SidebarContent />
            </Box>
          </Box>

          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: 400,
                background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)'
              }
            }}
          >
            <SidebarContent />
          </Drawer>

          {/* Main Content */}
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                      Welcome back! 👋
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Your financial health score is looking strong this month.
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="h2"
                      sx={{ fontWeight: 900, lineHeight: 1 }}
                    >
                      84
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Health Score
                    </Typography>
                  </Box>
                </Box>
              </DashboardCard>

              <DashboardCard>
                <Overview />
              </DashboardCard>
            </Box>
          </MainContent>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
