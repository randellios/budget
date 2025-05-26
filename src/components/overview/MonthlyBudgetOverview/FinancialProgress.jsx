import { Box, Typography, CircularProgress, Divider } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  Savings as SavingsIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';

const FinancialProgress = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SpeedIcon color="primary" sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}
          >
            Financial Progress
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 3, borderColor: '#e2e8f0' }} />
      <Box
        sx={{ display: 'flex', gap: 4, px: 2, justifyContent: 'space-between' }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <SecurityIcon
            sx={{
              position: 'absolute',
              top: 10,
              right: -10,
              fontSize: 120,
              color: '#f59e0b',
              opacity: 0.08,
              transform: 'rotate(15deg)',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 2,
              zIndex: 1
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              size={90}
              thickness={2}
              sx={{
                color: '#fef3c7',
                position: 'absolute',
                transform: 'rotate(-90deg)'
              }}
            />
            <CircularProgress
              variant="determinate"
              value={50}
              size={90}
              thickness={2}
              sx={{
                color: '#f59e0b',
                transform: 'rotate(-90deg)',
                '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
              }}
            />
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                position: 'absolute',
                top: 5,
                left: 5
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.75rem',
                  lineHeight: 0.8
                }}
              >
                20
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                months left
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              fontSize: '1rem',
              mb: 0.5,
              position: 'relative',
              zIndex: 1
            }}
          >
            Emergency Fund
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#059669',
              fontWeight: 600,
              fontSize: '0.9rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            50% Complete
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <CreditCardIcon
            sx={{
              position: 'absolute',
              top: 10,
              right: -10,
              fontSize: 120,
              color: '#ef4444',
              opacity: 0.08,
              transform: 'rotate(-15deg)',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 2,
              zIndex: 1
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              size={90}
              thickness={2}
              sx={{
                color: '#fecaca',
                position: 'absolute',
                transform: 'rotate(-90deg)'
              }}
            />
            <CircularProgress
              variant="determinate"
              value={68}
              size={90}
              thickness={2}
              sx={{
                color: '#10b981',
                transform: 'rotate(-90deg)',
                '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
              }}
            />
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #f87171)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)',
                position: 'absolute',
                top: 5,
                left: 5
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.75rem',
                  lineHeight: 0.8
                }}
              >
                25
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                months left
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              fontSize: '1rem',
              mb: 0.5,
              position: 'relative',
              zIndex: 1
            }}
          >
            Debt Freedom
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#059669',
              fontWeight: 600,
              fontSize: '0.9rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            68% Paid Off
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <TrendingUpIcon
            sx={{
              position: 'absolute',
              top: 10,
              right: -10,
              fontSize: 120,
              color: '#3b82f6',
              opacity: 0.08,
              transform: 'rotate(15deg)',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 2,
              zIndex: 1
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              size={90}
              thickness={2}
              sx={{
                color: '#dbeafe',
                position: 'absolute',
                transform: 'rotate(-90deg)'
              }}
            />
            <CircularProgress
              variant="determinate"
              value={100}
              size={90}
              thickness={2}
              sx={{
                color: '#3b82f6',
                transform: 'rotate(-90deg)',
                '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
              }}
            />
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                position: 'absolute',
                top: 5,
                left: 5
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.25rem',
                  lineHeight: 0.9
                }}
              >
                £13.7k
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  textTransform: 'uppercase'
                }}
              >
                net worth
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              fontSize: '1rem',
              mb: 0.5,
              position: 'relative',
              zIndex: 1
            }}
          >
            Wealth Building
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#059669',
              fontWeight: 600,
              fontSize: '0.9rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            Growing Strong
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <SavingsIcon
            sx={{
              position: 'absolute',
              top: 10,
              right: -10,
              fontSize: 120,
              color: '#10b981',
              opacity: 0.08,
              transform: 'rotate(-15deg)',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 2,
              zIndex: 1
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              size={90}
              thickness={2}
              sx={{
                color: '#dcfce7',
                position: 'absolute',
                transform: 'rotate(-90deg)'
              }}
            />
            <CircularProgress
              variant="determinate"
              value={22}
              size={90}
              thickness={2}
              sx={{
                color: '#10b981',
                transform: 'rotate(-90deg)',
                '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
              }}
            />
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                position: 'absolute',
                top: 5,
                left: 5
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.25rem',
                  lineHeight: 0.9
                }}
              >
                £3.5k
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  textTransform: 'uppercase'
                }}
              >
                saved
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              fontSize: '1rem',
              mb: 0.5,
              position: 'relative',
              zIndex: 1
            }}
          >
            Total Savings
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#059669',
              fontWeight: 600,
              fontSize: '0.9rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            22% Progress
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default FinancialProgress;
