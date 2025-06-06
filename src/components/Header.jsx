import React from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        px: 3,
        py: 0.5
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto'
        }}
      >
        <Box sx={{ marginLeft: '530px' }}></Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: '#10b981'
                }}
              />
            }
            label="All Systems Operational"
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              color: '#475569',
              border: '1px solid #e2e8f0',
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          />
          <IconButton sx={{ color: 'text.secondary' }}>
            <Box sx={{ fontSize: '20px' }}>⚙️</Box>
          </IconButton>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Box sx={{ fontSize: '20px' }}>👤</Box>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
