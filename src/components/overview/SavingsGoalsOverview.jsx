import React, { useState } from 'react';
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

const SavingsGoalsOverview = () => {
  return (
    <>
      {/* Savings Goals */}
      <GradientCard>
        <SectionHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconWrapper bgcolor="#10b981">
              <TrackChangesIcon />
            </IconWrapper>
            <Box>
              <Typography variant="h5">Savings Goals Overview</Typography>
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
                      <Typography variant="h6">Emergency Fund</Typography>
                      <Typography variant="caption" color="text.secondary">
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
                  <Typography variant="caption" color="text.secondary">
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
                        <Typography variant="h6">Dec 2026</Typography>
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
                      <Typography variant="h6">Holiday Fund</Typography>
                      <Typography variant="caption" color="text.secondary">
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
                  <Typography variant="caption" color="text.secondary">
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
                      <Typography variant="h6">New Car Fund</Typography>
                      <Typography variant="caption" color="text.secondary">
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
                  <Typography variant="caption" color="text.secondary">
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
    </>
  );
};

export default SavingsGoalsOverview;
