import React, { useState } from 'react';
import { Box, CardContent, Typography, Collapse } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { selectMonthlyIncome } from '../../../store/slices/incomeSlice';
import {
  selectEssentialExpenses,
  selectNonEssentialExpenses,
  selectExpenseCategories
} from '../../../store/slices/expensesSlice';
import {
  selectTotalSavingsContributions,
  selectSavingsGoals
} from '../../../store/slices/savingsSlice';
import {
  selectTotalDebtPayments,
  selectDebts
} from '../../../store/slices/debtsSlice';
import FinancialSnapshot from './FinancialSnapshot';
import AllocationStatus from './AllocationStatus';
import ExpenseDivision from './ExpenseDivision';
import SavingsDebtProgress from '../SavingsDebtProgress';

const MonthlyBudgetOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ p: 3, pt: 0 }}>
        <Box sx={{ mt: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
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
              📊
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: '#1f2937',
                  lineHeight: 1.2
                }}
              >
                Budget Breakdown
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Divide your income into optimal percentages for balanced
                financial health
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: 3,
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <AllocationStatus />

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: '#1f2937',
                  mb: 0.5
                }}
              >
                50/30/20 Rule
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.95rem',
                  mb: 0.5
                }}
              >
                A proven budgeting framework: 50% essentials, 30% wants, 20%
                savings & debt payments for balanced financial health
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#3b82f6',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Learn more about effective budgeting strategies →
              </Typography>
            </Box>

            <ExpenseDivision />
          </Box>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              💰
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: '#1f2937',
                  lineHeight: 1.2
                }}
              >
                Your Financial Position
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Monitor your wealth building journey and financial security
                milestones
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: 3,
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <FinancialSnapshot />
          </Box>
        </Box>

        <SavingsDebtProgress />
      </CardContent>
    </Collapse>
  );
};

export default MonthlyBudgetOverview;
