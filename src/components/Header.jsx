import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Alert,
  Stack,
  Paper,
  IconButton
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrackChanges as TrackChangesIcon,
  CreditCard as CreditCardIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const Header = () => {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #e3e8ef',
        px: 3,
        py: 1,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
              Budget Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your finances with ease
            </Typography>
          </Box>
        </Box>

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
