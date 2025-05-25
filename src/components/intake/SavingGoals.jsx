import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Button,
  IconButton,
  Divider,
  Collapse
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

// Sample data
const expenseCategories = [
  {
    id: 1,
    name: 'Home',
    icon: '🏠',
    isEssential: true,
    items: [
      { id: 1, name: 'Mortgage', amount: 1000, isEssential: true },
      { id: 2, name: 'Council Tax', amount: 150, isEssential: true },
      { id: 3, name: 'Home Insurance', amount: 150, isEssential: true }
    ]
  },
  {
    id: 2,
    name: 'Utilities',
    icon: '⚡',
    isEssential: true,
    items: [
      { id: 4, name: 'Electricity', amount: 120, isEssential: true },
      { id: 5, name: 'Gas', amount: 80, isEssential: true },
      { id: 6, name: 'Water', amount: 45, isEssential: true },
      { id: 7, name: 'Internet', amount: 35, isEssential: false }
    ]
  },
  {
    id: 3,
    name: 'Entertainment',
    icon: '🍿',
    isEssential: false,
    items: [
      { id: 8, name: 'Netflix', amount: 15, isEssential: false },
      { id: 9, name: 'Spotify', amount: 12, isEssential: false },
      { id: 10, name: 'Dining Out', amount: 150, isEssential: false }
    ]
  }
];
const savingsGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    icon: '🎯',
    currentBalance: 1000,
    targetAmount: 5000,
    targetDate: '2026-12',
    monthlyContribution: 100
  },
  {
    id: 2,
    name: 'Holiday Fund',
    icon: '🏖️',
    currentBalance: 500,
    targetAmount: 2000,
    targetDate: '2025-08',
    monthlyContribution: 100
  }
];

const debts = [
  {
    id: 1,
    name: 'Credit Card',
    icon: '💳',
    currentBalance: 2000,
    interestRate: 22.9,
    monthlyPayment: 67
  },
  {
    id: 2,
    name: 'Car Loan',
    icon: '🚗',
    currentBalance: 3000,
    interestRate: 6.5,
    monthlyPayment: 100
  },
  {
    id: 3,
    name: 'Student Loan',
    icon: '🎓',
    currentBalance: 5000,
    interestRate: 3.2,
    monthlyPayment: 33
  }
];

const SavingGoals = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSavings, setExpandedSavings] = useState({});
  const [expandedDebts, setExpandedDebts] = useState({});
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  const categoryInputRef = useRef(null);
  const itemInputRef = useRef(null);

  // Auto-focus when editing starts
  useEffect(() => {
    if (editingCategoryId && categoryInputRef.current) {
      categoryInputRef.current.focus();
      categoryInputRef.current.select();
    }
  }, [editingCategoryId]);

  useEffect(() => {
    if (editingItemId && itemInputRef.current) {
      itemInputRef.current.focus();
      itemInputRef.current.select();
    }
  }, [editingItemId]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleSaving = (savingId) => {
    setExpandedSavings((prev) => ({
      ...prev,
      [savingId]: !prev[savingId]
    }));
  };

  const toggleDebt = (debtId) => {
    setExpandedDebts((prev) => ({
      ...prev,
      [debtId]: !prev[debtId]
    }));
  };

  const getCategoryTotal = (category) =>
    category.items.reduce((total, item) => total + item.amount, 0);

  const totalExpenses = expenseCategories.reduce(
    (total, category) => total + getCategoryTotal(category),
    0
  );

  const totalSavings = savingsGoals.reduce(
    (total, goal) => total + goal.monthlyContribution,
    0
  );

  const totalDebtPayments = debts.reduce(
    (total, debt) => total + debt.monthlyPayment,
    0
  );

  const monthlyIncome = 5000;
  const remaining =
    monthlyIncome - totalExpenses - totalSavings - totalDebtPayments;

  return (
    <Card>
      <CardHeader
        title="Savings Goals"
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              £{totalSavings}/month
            </Typography>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        {savingsGoals.map((goal) => (
          <Box
            key={goal.id}
            sx={{
              mb: 2,
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              bgcolor: '#fafbfc'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#f8fafc'
                }
              }}
              onClick={() => toggleSaving(goal.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  {expandedSavings[goal.id] ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </IconButton>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {goal.icon} {goal.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  £{goal.currentBalance.toLocaleString()} / £
                  {goal.targetAmount.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#10b981' }}
                >
                  £{goal.monthlyContribution}/month
                </Typography>
                <IconButton
                  size="small"
                  sx={{ color: 'error.main' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Box sx={{ fontSize: '14px' }}>✕</Box>
                </IconButton>
              </Box>
            </Box>

            <Collapse
              in={expandedSavings[goal.id]}
              timeout="auto"
              unmountOnExit
            >
              <Box sx={{ p: 2, pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Current Balance
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: 'white',
                          borderRadius: 1,
                          border: '1px solid #e2e8f0',
                          px: 1.5,
                          py: 0.5
                        }}
                      >
                        <Typography variant="body2">£</Typography>
                        <input
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '14px'
                          }}
                          defaultValue={goal.currentBalance}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Target Amount
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: 'white',
                          borderRadius: 1,
                          border: '1px solid #e2e8f0',
                          px: 1.5,
                          py: 0.5
                        }}
                      >
                        <Typography variant="body2">£</Typography>
                        <input
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '14px'
                          }}
                          defaultValue={goal.targetAmount}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Target Date
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: 'white',
                          borderRadius: 1,
                          border: '1px solid #e2e8f0',
                          px: 1.5,
                          py: 0.5
                        }}
                      >
                        <input
                          type="month"
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '14px'
                          }}
                          defaultValue={goal.targetDate}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Monthly Contribution
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: '#f0fdf4',
                          borderRadius: 1,
                          border: '2px solid #10b981',
                          px: 1.5,
                          py: 0.5
                        }}
                      >
                        <Typography variant="body2" sx={{ color: '#10b981' }}>
                          £
                        </Typography>
                        <input
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#10b981'
                          }}
                          defaultValue={goal.monthlyContribution}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </Box>
        ))}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            mt: 1,
            color: 'text.secondary',
            borderColor: '#e9ecef',
            backgroundColor: '#f8f9fa',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#e9ecef',
              borderColor: '#e9ecef',
              color: '#555'
            }
          }}
        >
          Add Saving Goal
        </Button>
      </CardContent>
    </Card>
  );
};

export default SavingGoals;
