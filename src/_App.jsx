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
import Sidebar from './components/intake/Sidebar';

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

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 4,
    background: 'linear-gradient(90deg, #667eea, #764ba2, #10b981, #f59e0b)',
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
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  borderBottom: '1px solid #e8ecf3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const IconWrapper = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 40,
  height: 40,
  backgroundColor: bgcolor || theme.palette.primary.main,
  marginRight: theme.spacing(1.5)
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  border: '1px solid #e8ecf3'
}));

const DebtCard = styled(Card)(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.error.main}`,
  background: 'linear-gradient(135deg, #fefefe 0%, #fdf2f2 100%)',
  '&:hover': {
    borderLeftColor: theme.palette.error.dark
  }
}));

const SmartWidget = styled(Card)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  }
}));

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: 'white',
            borderBottom: '1px solid #e3e8ef',
            px: 3,
            py: 2,
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
              maxWidth: '1600px',
              margin: '0 auto'
            }}
          >
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
                  sx={{ fontWeight: 700, color: '#1e293b' }}
                >
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

        {/* Main Layout */}
        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Fixed Left Sidebar */}
          <Box
            sx={{
              width: '500px',
              position: 'fixed',
              top: '92px', // Height of header
              left: 0,
              bottom: '73px', // Height of footer
              zIndex: 100,
              bgcolor: 'background.default',
              borderRight: '1px solid #e3e8ef',
              overflowY: 'auto',
              p: 2.5,
              '&::-webkit-scrollbar': {
                width: '6px'
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '3px'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '3px',
                '&:hover': {
                  background: '#a8a8a8'
                }
              }
            }}
          >
            <Sidebar />
          </Box>

          {/* Main Content Area */}
          <Box
            sx={{
              flex: 1,
              marginLeft: '500px', // Width of sidebar
              p: 2.5
            }}
          >
            <Grid container spacing={3} maxWidth="1280px" margin="0 auto">
              {/* Main Content */}
              <Grid item xs={12} lg={8}>
                <Stack spacing={3}>
                  {/* Budget Overview */}
                  <GradientCard>
                    <SectionHeader>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconWrapper bgcolor="#667eea">
                          <AssessmentIcon />
                        </IconWrapper>
                        <Box>
                          <Typography variant="h5">
                            Monthly Budget Overview
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              mt: 0.5
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Monthly Income: £5,000
                            </Typography>
                            <Chip
                              icon={
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#f59e0b'
                                  }}
                                />
                              }
                              label="£200 Unallocated"
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                color: '#475569',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
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
                        label="66% Allocated"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          color: '#475569',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                      />
                    </SectionHeader>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <ProgressCard>
                            <Typography
                              variant="overline"
                              color="text.secondary"
                            >
                              Essentials
                            </Typography>
                            <Typography variant="h4" sx={{ my: 1 }}>
                              £2,300
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              of £2,500 target
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={92}
                              color="success"
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: '#f0f0f0'
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 1, display: 'block' }}
                            >
                              92% of target • £200 remaining
                            </Typography>
                            <Chip
                              label="On track"
                              size="small"
                              sx={{
                                mt: 1,
                                backgroundColor: '#f0fdf4',
                                color: '#16a34a',
                                border: '1px solid #bbf7d0',
                                fontSize: '0.75rem'
                              }}
                            />
                          </ProgressCard>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <ProgressCard>
                            <Typography
                              variant="overline"
                              color="text.secondary"
                            >
                              Non-essential
                            </Typography>
                            <Typography variant="h4" sx={{ my: 1 }}>
                              £720
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              of £1,500 target
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={48}
                              color="warning"
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: '#f0f0f0'
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 1, display: 'block' }}
                            >
                              48% of target • £780 remaining
                            </Typography>
                            <Chip
                              label="Under budget"
                              size="small"
                              sx={{
                                mt: 1,
                                backgroundColor: '#fef3c7',
                                color: '#d97706',
                                border: '1px solid #fbbf24',
                                fontSize: '0.75rem'
                              }}
                            />
                          </ProgressCard>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <ProgressCard>
                            <Typography
                              variant="overline"
                              color="text.secondary"
                            >
                              Savings & Debts
                            </Typography>
                            <Typography variant="h4" sx={{ my: 1 }}>
                              £300
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              of £1,000 target
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={30}
                              color="info"
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: '#f0f0f0'
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 1, display: 'block' }}
                            >
                              30% of target • £700 remaining
                            </Typography>
                            <Chip
                              label="Needs attention"
                              size="small"
                              sx={{
                                mt: 1,
                                backgroundColor: '#fef3c7',
                                color: '#d97706',
                                border: '1px solid #fbbf24',
                                fontSize: '0.75rem'
                              }}
                            />
                          </ProgressCard>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Box
                      sx={{
                        px: 3,
                        py: 2,
                        bgcolor: '#f8f9fa',
                        borderTop: '1px solid #e8ecf3'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Total Allocated: £3,320 of £5,000
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Budget Health: Good progress on essentials
                        </Typography>
                      </Box>
                    </Box>
                  </GradientCard>

                  {/* Savings Goals */}
                  <GradientCard>
                    <SectionHeader>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconWrapper bgcolor="#10b981">
                          <TrackChangesIcon />
                        </IconWrapper>
                        <Box>
                          <Typography variant="h5">
                            Savings Goals Overview
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              mt: 0.5
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Monthly Contributions: £200
                            </Typography>
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
                              label="£3,500 Total Saved"
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                color: '#475569',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          icon={
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: '#f59e0b'
                              }}
                            />
                          }
                          label="1/3 On Track"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }
                          }}
                        />
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
                          label="22% Progress"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }
                          }}
                        />
                      </Box>
                    </SectionHeader>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mb: 2
                                }}
                              >
                                <Box>
                                  <Typography variant="h6">
                                    Emergency Fund
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Essential safety net
                                  </Typography>
                                </Box>
                                <Chip
                                  label="High"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#fee2e2',
                                    color: '#991b1b',
                                    border: '1px solid #fca5a5',
                                    fontSize: '0.6875rem'
                                  }}
                                />
                              </Box>
                              <Typography variant="h4" sx={{ mb: 2 }}>
                                £1,000
                                <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.secondary"
                                >
                                  / £5,000
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={20}
                                color="success"
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                20% complete • £4,000 remaining
                              </Typography>
                              <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">20</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Months to goal
                                    </Typography>
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">
                                      Dec 2026
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Target date
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mb: 2
                                }}
                              >
                                <Box>
                                  <Typography variant="h6">
                                    Holiday Fund
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Next family vacation
                                  </Typography>
                                </Box>
                                <Chip
                                  label="Medium"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#fde68a',
                                    color: '#92400e',
                                    border: '1px solid #fbbf24',
                                    fontSize: '0.6875rem'
                                  }}
                                />
                              </Box>
                              <Typography variant="h4" sx={{ mb: 2 }}>
                                £500
                                <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.secondary"
                                >
                                  / £2,000
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={25}
                                color="warning"
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                25% complete • £1,500 remaining
                              </Typography>
                              <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">∞</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Months to goal
                                    </Typography>
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">£0</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Monthly needed
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mb: 2
                                }}
                              >
                                <Box>
                                  <Typography variant="h6">
                                    New Car Fund
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Vehicle replacement
                                  </Typography>
                                </Box>
                                <Chip
                                  label="Low"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#dcfce7',
                                    color: '#166534',
                                    border: '1px solid #bbf7d0',
                                    fontSize: '0.6875rem'
                                  }}
                                />
                              </Box>
                              <Typography variant="h4" sx={{ mb: 2 }}>
                                £2,000
                                <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.secondary"
                                >
                                  / £10,000
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={20}
                                color="success"
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                20% complete • £8,000 remaining
                              </Typography>
                              <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">∞</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Months to goal
                                    </Typography>
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">£0</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Monthly needed
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Box
                      sx={{
                        px: 3,
                        py: 2,
                        bgcolor: '#f8f9fa',
                        borderTop: '1px solid #e8ecf3'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Overall Progress: 22%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          1/3 Goals on Track
                        </Typography>
                      </Box>
                    </Box>
                  </GradientCard>

                  {/* Debt Management */}
                  <GradientCard>
                    <SectionHeader>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconWrapper bgcolor="#ef4444">
                          <CreditCardIcon />
                        </IconWrapper>
                        <Box>
                          <Typography variant="h5">
                            Debt Management Overview
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              mt: 0.5
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Monthly Payments: £200
                            </Typography>
                            <Chip
                              icon={
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#ef4444'
                                  }}
                                />
                              }
                              label="£10,000 Total Debt"
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                color: '#475569',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
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
                          label="68% Paid Off"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }
                          }}
                        />
                        <Chip
                          icon={
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: '#f59e0b'
                              }}
                            />
                          }
                          label="May 2038 Debt-Free"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }
                          }}
                        />
                      </Box>
                    </SectionHeader>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <DebtCard sx={{ height: '100%' }}>
                            <CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mb: 2
                                }}
                              >
                                <Box>
                                  <Typography variant="h6">
                                    Credit Card
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    High-interest revolving debt
                                  </Typography>
                                </Box>
                                <Chip
                                  label="High"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#fee2e2',
                                    color: '#991b1b',
                                    border: '1px solid #fca5a5',
                                    fontSize: '0.6875rem'
                                  }}
                                />
                              </Box>
                              <Typography
                                variant="h4"
                                sx={{ mb: 2, color: 'error.main' }}
                              >
                                £2,000
                                <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.secondary"
                                  sx={{ textDecoration: 'line-through' }}
                                >
                                  £5,000
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={60}
                                color="success"
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                60% paid off • £3,000 progress
                              </Typography>
                              <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">32</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Months to payoff
                                    </Typography>
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">£458</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Interest cost
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>
                              <Box
                                sx={{
                                  mt: 2,
                                  p: 1,
                                  backgroundColor: '#fef2f2',
                                  border: '1px solid #fca5a5',
                                  borderRadius: '12px',
                                  textAlign: 'center'
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#dc2626',
                                    fontSize: '0.6875rem'
                                  }}
                                >
                                  22.9% APR • £67/month
                                </Typography>
                              </Box>
                            </CardContent>
                          </DebtCard>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <DebtCard sx={{ height: '100%' }}>
                            <CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mb: 2
                                }}
                              >
                                <Box>
                                  <Typography variant="h6">Car Loan</Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Auto financing
                                  </Typography>
                                </Box>
                                <Chip
                                  label="Medium"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#fde68a',
                                    color: '#92400e',
                                    border: '1px solid #fbbf24',
                                    fontSize: '0.6875rem'
                                  }}
                                />
                              </Box>
                              <Typography
                                variant="h4"
                                sx={{ mb: 2, color: 'error.main' }}
                              >
                                £3,000
                                <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.secondary"
                                  sx={{ textDecoration: 'line-through' }}
                                >
                                  £10,000
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={70}
                                color="success"
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                70% paid off • £7,000 progress
                              </Typography>
                              <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">32</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Months to payoff
                                    </Typography>
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">£195</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Interest cost
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>
                              <Box
                                sx={{
                                  mt: 2,
                                  p: 1,
                                  backgroundColor: '#fef3c7',
                                  border: '1px solid #fbbf24',
                                  borderRadius: '12px',
                                  textAlign: 'center'
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#d97706',
                                    fontSize: '0.6875rem'
                                  }}
                                >
                                  6.5% APR • £100/month
                                </Typography>
                              </Box>
                            </CardContent>
                          </DebtCard>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <DebtCard sx={{ height: '100%' }}>
                            <CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mb: 2
                                }}
                              >
                                <Box>
                                  <Typography variant="h6">
                                    Student Loan
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Education financing
                                  </Typography>
                                </Box>
                                <Chip
                                  label="Low"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#dcfce7',
                                    color: '#166534',
                                    border: '1px solid #bbf7d0',
                                    fontSize: '0.6875rem'
                                  }}
                                />
                              </Box>
                              <Typography
                                variant="h4"
                                sx={{ mb: 2, color: 'error.main' }}
                              >
                                £5,000
                                <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.secondary"
                                  sx={{ textDecoration: 'line-through' }}
                                >
                                  £22,000
                                </Typography>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={77}
                                color="success"
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                77% paid off • £17,000 progress
                              </Typography>
                              <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">162</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Months to payoff
                                    </Typography>
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">£300</Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                      }}
                                    >
                                      Interest cost
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>
                              <Box
                                sx={{
                                  mt: 2,
                                  p: 1,
                                  backgroundColor: '#eff6ff',
                                  border: '1px solid #93c5fd',
                                  borderRadius: '12px',
                                  textAlign: 'center'
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#2563eb',
                                    fontSize: '0.6875rem'
                                  }}
                                >
                                  3.2% APR • £33/month
                                </Typography>
                              </Box>
                            </CardContent>
                          </DebtCard>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Box
                      sx={{
                        px: 3,
                        py: 2,
                        bgcolor: '#f8f9fa',
                        borderTop: '1px solid #e8ecf3'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Overall Progress: 68% • Debt-Free: May 2038
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          2/3 Debts on Track
                        </Typography>
                      </Box>
                    </Box>
                  </GradientCard>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Footer */}
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
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
