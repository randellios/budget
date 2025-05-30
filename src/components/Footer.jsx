import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Favorite as HeartIcon
} from '@mui/icons-material';

const Footer = () => (
  <Box
    sx={{
      background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
      borderTop: '1px solid #e3e8ef',
      px: 3,
      py: 3,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background:
          'linear-gradient(90deg, #667eea 0%, #764ba2 30%, #10b981 60%, #f59e0b 100%)',
        backgroundSize: '400% 100%',
        animation: 'gradientShift 8s ease infinite'
      },
      '@keyframes gradientShift': {
        '0%, 100%': {
          backgroundPosition: '0% 50%'
        },
        '50%': {
          backgroundPosition: '100% 50%'
        }
      }
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      {/* Left - Copyright */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: '#64748b', fontSize: '0.85rem' }}
        >
          © 2025 Budget Dashboard. Made with
        </Typography>
        <HeartIcon sx={{ fontSize: 14, color: '#ef4444' }} />
        <Typography
          variant="body2"
          sx={{ color: '#64748b', fontSize: '0.85rem' }}
        >
          for better financial wellness
        </Typography>
      </Box>

      {/* Center - Links */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Button
          size="small"
          sx={{
            textTransform: 'none',
            color: '#64748b',
            fontSize: '0.85rem',
            fontWeight: 500,
            '&:hover': {
              color: '#667eea',
              bgcolor: 'rgba(102, 126, 234, 0.05)'
            }
          }}
        >
          Privacy Policy
        </Button>
        <Button
          size="small"
          sx={{
            textTransform: 'none',
            color: '#64748b',
            fontSize: '0.85rem',
            fontWeight: 500,
            '&:hover': {
              color: '#667eea',
              bgcolor: 'rgba(102, 126, 234, 0.05)'
            }
          }}
        >
          Terms of Service
        </Button>
        <Button
          size="small"
          sx={{
            textTransform: 'none',
            color: '#64748b',
            fontSize: '0.85rem',
            fontWeight: 500,
            '&:hover': {
              color: '#667eea',
              bgcolor: 'rgba(102, 126, 234, 0.05)'
            }
          }}
        >
          Help & Support
        </Button>
      </Box>

      {/* Right - Social */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          size="small"
          sx={{
            color: '#9ca3af',
            '&:hover': {
              color: '#667eea',
              bgcolor: 'rgba(102, 126, 234, 0.08)'
            }
          }}
        >
          <GitHubIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: '#9ca3af',
            '&:hover': {
              color: '#667eea',
              bgcolor: 'rgba(102, 126, 234, 0.08)'
            }
          }}
        >
          <TwitterIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: '#9ca3af',
            '&:hover': {
              color: '#667eea',
              bgcolor: 'rgba(102, 126, 234, 0.08)'
            }
          }}
        >
          <LinkedInIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  </Box>
);

export default Footer;
