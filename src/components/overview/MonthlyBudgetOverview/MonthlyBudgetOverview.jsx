import React, { useState } from 'react';
import { Box, CardContent, Typography, Collapse, Divider } from '@mui/material';
import {
  AccountBalanceWallet as BudgetIcon,
  Assessment as AnalysisIcon,
  Timeline as SnapshotIcon,
  HealthAndSafety as HealthIcon,
  ShoppingCart as SpendingIcon
} from '@mui/icons-material';
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
import CompactFinancialHealth from './CompactFinancialHealth';
import TopExpenses from './TopExpenses';
import SavingsDebtProgress from '../SavingsDebtProgress';

const MonthlyBudgetOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ p: 3, pt: 0 }}>
        <Box sx={{ mt: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 8, alignItems: 'start' }}>
            {/* Left Column */}
            <Box
              sx={{
                flex: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }}
            >
              {/* Budget Allocation */}
              {/* <Box>
                <AllocationStatus />
              </Box> */}

              {/* 50/30/20 Analysis */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 2
                  }}
                >
                  <AnalysisIcon sx={{ fontSize: 20, color: '#10b981' }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#374151'
                    }}
                  >
                    50/30/20 Analysis
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.85rem',
                    mb: 3,
                    lineHeight: 1.4
                  }}
                >
                  See how your spending aligns with the recommended budget
                  framework
                </Typography>
                <ExpenseDivision />
              </Box>

              {/* Financial Snapshot */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 2
                  }}
                >
                  <SnapshotIcon sx={{ fontSize: 20, color: '#f59e0b' }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#374151'
                    }}
                  >
                    Financial Snapshot
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.85rem',
                    mb: 3,
                    lineHeight: 1.4
                  }}
                >
                  Project your financial future and track key metrics over time
                </Typography>
                <FinancialSnapshot />
              </Box>
            </Box>

            {/* Right Column */}
            <Box
              sx={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }}
            >
              {/* Spending Analysis */}
              <Box>
                <TopExpenses />
              </Box>

              {/* Financial Health */}
              <Box>
                <CompactFinancialHealth />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Clear divider between horizontal and vertical sections */}
        <Divider
          sx={{
            my: 4,
            borderColor: '#e2e8f0',
            borderWidth: 1
          }}
        />

        {/* Progress Tracking */}
        <SavingsDebtProgress />
      </CardContent>
    </Collapse>
  );
};

export default MonthlyBudgetOverview;
