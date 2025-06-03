import React, { useState } from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import { selectExpenseCategories } from '../../store/slices/expensesSlice';

const TopExpenses = () => {
  const [showMore, setShowMore] = useState(false);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const expenseCategories = useAppSelector(selectExpenseCategories);

  const getTopExpenses = () => {
    const allExpenses = [];

    // Iterate through the object-based categories
    Object.values(expenseCategories).forEach((category) => {
      category.items.forEach((item) => {
        if (item.amount > 0) {
          // Determine if essential based on category type
          const isEssential =
            category.id === 'needs' || category.id === 'basics';

          allExpenses.push({
            name: item.name,
            amount: item.amount,
            category: category.name,
            categoryIcon: category.icon,
            isEssential: isEssential,
            percentageOfIncome:
              monthlyIncome > 0 ? (item.amount / monthlyIncome) * 100 : 0
          });
        }
      });
    });

    return allExpenses.sort((a, b) => b.amount - a.amount);
  };

  const allTopExpenses = getTopExpenses();
  const displayedExpenses = showMore
    ? allTopExpenses.slice(0, 9)
    : allTopExpenses.slice(0, 4);

  const totalTopExpenses = displayedExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const topExpensesPercentage =
    monthlyIncome > 0 ? (totalTopExpenses / monthlyIncome) * 100 : 0;

  const getExpenseColor = (isEssential, percentageOfIncome) => {
    if (isEssential) {
      return percentageOfIncome > 15 ? '#ef4444' : '#667eea';
    } else {
      return percentageOfIncome > 10 ? '#f59e0b' : '#10b981';
    }
  };

  const getExpenseGradient = (isEssential) => {
    return isEssential
      ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(90deg, #10b981 0%, #34d399 100%)';
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          borderBottom: '1px solid #e8ecf3'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                color: '#1f2937',
                lineHeight: 1
              }}
            >
              Top Expenses
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#6b7280', fontSize: '0.75rem' }}
            >
              Your biggest spending categories
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: '1.25rem',
              color: '#f59e0b',
              lineHeight: 1
            }}
          >
            {topExpensesPercentage.toFixed(0)}%
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#6b7280',
              fontSize: '0.7rem'
            }}
          >
            of income
          </Typography>
        </Box>
      </Box>

      {/* Expense List */}
      <Box sx={{ p: 3 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#6b7280',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            mb: 2,
            display: 'block'
          }}
        >
          Expense Breakdown
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {displayedExpenses.map((expense, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                bgcolor: '#f8fafc',
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: getExpenseGradient(expense.isEssential),
                  borderRadius: '2px 0 0 2px'
                }
              }}
            >
              {/* Rank */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: index < 3 ? '#f59e0b' : '#9ca3af',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {index + 1}
              </Box>

              {/* Expense Details */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: '#1f2937',
                      lineHeight: 1.2
                    }}
                  >
                    {expense.name}
                  </Typography>
                  {expense.isEssential ? (
                    <StarIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
                  ) : (
                    <StarBorderIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#6b7280',
                      fontSize: '0.7rem'
                    }}
                  >
                    {expense.category}
                  </Typography>
                  <Chip
                    label={expense.isEssential ? 'Essential' : 'Optional'}
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      backgroundColor: expense.isEssential
                        ? '#e0e7ff'
                        : '#dcfce7',
                      color: expense.isEssential ? '#3730a3' : '#166534'
                    }}
                  />
                </Box>
              </Box>

              {/* Amount and Percentage */}
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: getExpenseColor(
                      expense.isEssential,
                      expense.percentageOfIncome
                    ),
                    lineHeight: 1
                  }}
                >
                  £{expense.amount.toLocaleString()}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#6b7280',
                    fontSize: '0.7rem',
                    fontWeight: 500
                  }}
                >
                  {expense.percentageOfIncome.toFixed(1)}% of income
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* See More/Less Button */}
        {allTopExpenses.length > 4 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              onClick={() => setShowMore(!showMore)}
              startIcon={showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{
                color: '#f59e0b',
                fontSize: '0.875rem',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(245, 158, 11, 0.08)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {showMore
                ? `Show Less`
                : `See More (${Math.min(allTopExpenses.length - 4, 5)} more)`}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TopExpenses;
