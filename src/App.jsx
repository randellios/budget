import React, { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Fab,
  Drawer,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Overview from './components/overview/Overview';
import Sidebar from './components/intake/Sidebar';

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

const QuickActionCard = styled(Box)(({ theme, color = '#667eea' }) => ({
  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
  borderRadius: 12,
  padding: 16,
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: `0 4px 16px ${color}30`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${color}40`
  }
}));

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [budgetPanelOpen, setBudgetPanelOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBudgetPanel = () => {
    setBudgetPanelOpen(!budgetPanelOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        {/* Top Navigation */}
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
              <Button
                variant="outlined"
                onClick={handleBudgetPanel}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Edit Budget
              </Button>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </StyledAppBar>

        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Left Navigation Panel */}
          <Box
            sx={{
              width: { md: 240 },
              flexShrink: 0,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box
              sx={{
                width: 240,
                height: '100%',
                background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
                borderRight: '1px solid #e2e8f0',
                p: 3
              }}
            >
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
                Quick Actions
              </Typography>

              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
              >
                <QuickActionCard color="#667eea" onClick={handleBudgetPanel}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DashboardIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Budget Setup
                    </Typography>
                  </Box>
                </QuickActionCard>

                <QuickActionCard color="#10b981">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingUpIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Financial Health
                    </Typography>
                  </Box>
                </QuickActionCard>
              </Box>

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
                Quick Stats
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    Monthly Income
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#10b981' }}
                  >
                    £5,000
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    Available
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#667eea' }}
                  >
                    £1,480
                  </Typography>
                </Box>
              </Box>
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
              '& .MuiDrawer-paper': { width: 240 }
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Navigation
              </Typography>
              {/* Mobile nav content */}
            </Box>
          </Drawer>

          {/* Main Dashboard Area */}
          <MainContent
            component="main"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
              {/* Hero Section */}
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

              {/* Overview Components */}
              <DashboardCard>
                <Overview />
              </DashboardCard>
            </Box>
          </MainContent>

          {/* Right Budget Panel */}
          <Drawer
            anchor="right"
            open={budgetPanelOpen}
            onClose={() => setBudgetPanelOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: { xs: '100%', sm: 500 },
                background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
              }
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Budget Setup
                </Typography>
                <IconButton onClick={() => setBudgetPanelOpen(false)}>
                  ×
                </IconButton>
              </Box>
              <Sidebar />
            </Box>
          </Drawer>
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
            }
          }}
          onClick={handleBudgetPanel}
        >
          <AddIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
}
