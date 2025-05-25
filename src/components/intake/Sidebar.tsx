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
import MonthlyExpenses from './MonthlyExpenses';
import SavingGoals from './SavingGoals';
import Debts from './Debts';

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

const Sidebar = () => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MonthlyExpenses />
      <SavingGoals />
      <Debts />
    </Box>
  );
};

export default Sidebar;
