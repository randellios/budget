import { Box, Card, Avatar } from '@mui/material';

import { styled } from '@mui/material/styles';

export const GradientCard = styled(Card)(({ theme }) => ({
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

export const SectionHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  borderBottom: '1px solid #e8ecf3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

export const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  backgroundColor: '#667eea',
  marginRight: theme.spacing(1.5)
}));

export const FinancialMetricCard = styled(Card)(({ theme, gradient }) => ({
  background: gradient,
  color: 'white',
  borderRadius: 12,
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  minWidth: 130,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12
  },
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
  },
  transition: 'all 0.2s ease-in-out'
}));

export const AllocationCircle = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const MetricCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  border: '1px solid #e8ecf3',
  textAlign: 'center',
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
}));

export const HealthScoreCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12
  }
}));

export const CashFlowCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  border: '1px solid #e8ecf3',
  padding: 0,
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden'
}));

export const CashFlowHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  borderBottom: '1px solid #e8ecf3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

export const InsightCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
  border: '1px solid #e8ecf3',
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
}));

export const TrendIndicator = styled(Box)(({ bgcolor, color }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '4px 8px',
  borderRadius: 20,
  backgroundColor: bgcolor,
  color: color,
  fontSize: '0.75rem',
  fontWeight: 500
}));

export const FlowItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  border: '1px solid #e8ecf3',
  background: '#ffffff',
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0
  }
}));

export const HealthMetric = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 8,
  marginBottom: theme.spacing(1),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:last-child': {
    marginBottom: 0
  }
}));
