import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/intake/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import AutoBalance from './components/actions/AutoBalance';
import MonthSelector from './components/actions/MonthSelect';
import theme from './theme';
import Overview from './components/overview/Overview';

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            width: '530px',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            height: '100vh',
            zIndex: 1200
          }}
        >
          {/* Logo/Brand Section - Fixed */}
          <Box sx={{ p: 3, bgcolor: '#cbd5e1 ', borderTopRightRadius: '24px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                B
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: 'white' }}
                >
                  Budget Dashboard
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Manage your finances with ease
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Scrollable Content Area */}
          <Box
            sx={{
              flex: 1,
              bgcolor: '#cbd5e1 ',
              overflow: 'auto',
              px: 2,
              py: 2
            }}
          >
            <Sidebar />
          </Box>
        </Box>

        {/* Header - Behind sidebar */}
        <Box
          component="header"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Header />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '530px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            paddingTop: '64px'
          }}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: '100%',
              margin: '0 auto'
              // bgcolor: '#fdfdfd'
            }}
          >
            <Box display="flex" flexDirection="column" gap={5}>
              <Overview />
            </Box>
          </Box>
          <Box
            component="footer"
            // sx={{ position: 'sticky', bottom: 0, textAlign: 'center' }}
          >
            <Footer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
