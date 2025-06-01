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
import CompactFinancialHealth from './CompactFinancialHealth';
import TopExpenses from './TopExpenses';
import SavingsDebtProgress from '../SavingsDebtProgress';

const MonthlyBudgetOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ p: 3, pt: 0 }}>
        {/* Top Section - Budget Overview */}
        <Box sx={{ mt: 2, mb: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: '1.5rem',
                color: '#1f2937',
                mb: 1
              }}
            >
              📊 Budget Overview
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}
            >
              Track your spending patterns, monitor financial health, and
              optimize your budget allocation
            </Typography>
          </Box>

          {/* Main Dashboard Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '60% 40%',
              gap: 4,
              alignItems: 'start'
            }}
          >
            {/* Left Column: Budget Allocation + Expense Division + Financial Snapshot */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Budget Allocation Status */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#374151',
                    mb: 2
                  }}
                >
                  💰 Budget Allocation
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.85rem',
                    mb: 3,
                    lineHeight: 1.4
                  }}
                >
                  Your monthly income allocation and remaining balance
                </Typography>
                <AllocationStatus />
              </Box>

              {/* 50/30/20 Budget Analysis */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#374151',
                    mb: 2
                  }}
                >
                  📈 50/30/20 Analysis
                </Typography>
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
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#374151',
                    mb: 2
                  }}
                >
                  🔮 Financial Snapshot
                </Typography>
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

            {/* Right Column: Financial Health + Top Expenses */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Financial Health */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#374151',
                    mb: 2
                  }}
                >
                  🩺 Financial Health
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.85rem',
                    mb: 3,
                    lineHeight: 1.4
                  }}
                >
                  Comprehensive wellness score based on emergency fund, debt
                  management, and savings metrics
                </Typography>
                <CompactFinancialHealth />
              </Box>

              {/* Top Expenses */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#374151',
                    mb: 2
                  }}
                >
                  💸 Spending Analysis
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.85rem',
                    mb: 3,
                    lineHeight: 1.4
                  }}
                >
                  Your largest expenses and their impact on your budget
                </Typography>
                <TopExpenses />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Progress Tracking */}
        <SavingsDebtProgress />
      </CardContent>
    </Collapse>
  );
};

export default MonthlyBudgetOverview;
