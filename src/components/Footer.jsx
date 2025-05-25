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

const Footer = () => (
  <Box
    sx={{
      bgcolor: 'white',
      borderTop: '1px solid #e3e8ef',
      px: 3,
      py: 2,
      position: 'sticky',
      bottom: 0,
      zIndex: 999
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1600px',
        margin: '0 auto'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#10b981'
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Data synced
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 Budget Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            size="small"
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            Help
          </Button>
          <Button
            size="small"
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            Privacy
          </Button>
          <Button
            size="small"
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            Terms
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Footer;
