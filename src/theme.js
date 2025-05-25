import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8fa5ff',
      dark: '#764ba2'
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669'
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706'
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#16a34a'
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#64748b'
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      color: '#1a1a1a'
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: '#1a1a1a'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#333'
    },
    body1: {
      color: '#1a1a1a'
    },
    body2: {
      color: '#666'
    },
    caption: {
      color: '#666',
      fontSize: '0.75rem'
    },
    overline: {
      color: '#666',
      fontSize: '0.8125rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: 500
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e3e8ef',
          background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontSize: '0.75rem',
          fontWeight: 500
        },
        colorSuccess: {
          backgroundColor: '#dcfce7',
          color: '#166534',
          border: '1px solid #bbf7d0',
          '&:hover': {
            backgroundColor: '#bbf7d0'
          }
        },
        colorWarning: {
          backgroundColor: '#fde68a',
          color: '#92400e',
          border: '1px solid #fbbf24',
          '&:hover': {
            backgroundColor: '#fcd34d'
          }
        },
        colorError: {
          backgroundColor: '#fecaca',
          color: '#991b1b',
          border: '1px solid #fca5a5',
          '&:hover': {
            backgroundColor: '#fca5a5'
          }
        },
        colorInfo: {
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          border: '1px solid #93c5fd',
          '&:hover': {
            backgroundColor: '#bfdbfe'
          }
        },
        colorPrimary: {
          backgroundColor: '#e0e7ff',
          color: '#3730a3',
          border: '1px solid #c7d2fe',
          '&:hover': {
            backgroundColor: '#c7d2fe'
          }
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 3,
          backgroundColor: '#f0f0f0'
        },
        colorPrimary: {
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
          }
        },
        colorSecondary: {
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
          }
        },
        colorSuccess: {
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
          }
        },
        colorWarning: {
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
          }
        },
        colorInfo: {
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }
        },
        outlined: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          color: '#666',
          borderColor: '#e9ecef',
          backgroundColor: '#f8f9fa',
          '&:hover': {
            backgroundColor: '#e9ecef',
            borderColor: '#e9ecef',
            color: '#555'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
          border: '1px solid #e8ecf3',
          borderRadius: 6
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        standardWarning: {
          background: 'linear-gradient(135deg, #fef9e7 0%, #fef3c7 100%)',
          border: '1px solid #f59e0b',
          color: '#92400e',
          '& .MuiAlert-icon': {
            color: '#f59e0b'
          }
        },
        standardError: {
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          border: '1px solid #fca5a5',
          color: '#dc2626'
        },
        standardInfo: {
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          border: '1px solid #93c5fd',
          color: '#2563eb'
        }
      }
    }
  }
});

export default theme;
