import React, { useState } from 'react';
import { Box } from '@mui/material';

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
        {/* Header - Now positioned across full width */}
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

        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            width: '530px',
            bgcolor: '#f1f5f9',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            height: '100vh',
            overflow: 'auto',
            paddingTop: '60px', // Add padding to account for header height
            px: 2
          }}
        >
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '530px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            paddingTop: '64px' // Add padding to account for header height
          }}
        >
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: '100%',
              margin: '0 auto',
              bgcolor: '#fdfdfd'
            }}
          >
            <Box Box display="flex" flexDirection="column" gap={5}>
              <Overview />

              {/* <Box width="400px" pl={3}>
                <Box
                  sx={{
                    position: 'sticky',
                    top: '80px'
                  }}
                >
                  <Box display="flex" flexDirection="column" gap={3}>
                    <MonthSelector
                      selectedMonth={selectedMonth}
                      onMonthChange={setSelectedMonth}
                    />
                    <AutoBalance />
                  </Box>
                </Box>

                <Box />
              </Box> */}
            </Box>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              position: 'sticky',
              bottom: 0,
              textAlign: 'center'
            }}
          >
            <Footer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
