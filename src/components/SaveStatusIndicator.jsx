import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import {
  selectIsSaving,
  selectSaveError,
  selectSaveQueue
} from '../store/slices/apiSlice';

const SaveStatusIndicator = ({ context }) => {
  const isSaving = useAppSelector(selectIsSaving);
  const saveError = useAppSelector(selectSaveError);
  const saveQueue = useAppSelector(selectSaveQueue);
  const [showSaved, setShowSaved] = useState(false);
  const [wasContextSaving, setWasContextSaving] = useState(false);
  const timerRef = useRef(null);

  const contextActions = {
    expenses: [
      'expenses/addCategory',
      'expenses/updateCategory',
      'expenses/deleteCategory',
      'expenses/addExpenseItem',
      'expenses/updateExpenseItem',
      'expenses/deleteExpenseItem',
      'expenses/toggleItemEssential',
      'expenses/toggleItemFlexible'
    ],
    savings: [
      'savings/addSavingsGoal',
      'savings/updateSavingsGoal',
      'savings/deleteSavingsGoal',
      'savings/updateGoalBalance'
    ],
    debts: [
      'debts/addDebt',
      'debts/updateDebt',
      'debts/deleteDebt',
      'debts/makePayment'
    ],
    income: ['income/updateMonthlyIncome']
  };

  const isMyContext = saveQueue.some((item) =>
    contextActions[context]?.includes(item.action)
  );

  // Clear any existing timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Track when saving starts for my context
  useEffect(() => {
    if (isSaving && isMyContext) {
      setWasContextSaving(true);
      setShowSaved(false);
      clearTimer();
    }
  }, [isSaving, isMyContext]);

  // Show "saved" only after saving completes for my context
  useEffect(() => {
    if (!isSaving && wasContextSaving && !saveError) {
      setShowSaved(true);
      setWasContextSaving(false);
      clearTimer();
      timerRef.current = setTimeout(() => {
        setShowSaved(false);
      }, 2000);
    } else if (saveError && wasContextSaving) {
      setWasContextSaving(false);
      setShowSaved(false);
      clearTimer();
    }
  }, [isSaving, wasContextSaving, saveError]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearTimer();
  }, []);

  const getSaveStatusColor = () => {
    if (saveError && wasContextSaving) return '#ef4444';
    if (isSaving && isMyContext) return '#f59e0b';
    return '#10b981';
  };

  const getSaveStatusText = () => {
    if (saveError && wasContextSaving) return 'Save failed';
    if (isSaving && isMyContext) return 'Saving...';
    return 'Saved';
  };

  const shouldShow =
    (isSaving && isMyContext) || (saveError && wasContextSaving) || showSaved;

  if (!shouldShow) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: getSaveStatusColor()
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: getSaveStatusColor(),
          fontSize: '0.7rem',
          fontWeight: 500
        }}
      >
        {getSaveStatusText()}
      </Typography>
    </Box>
  );
};

export default SaveStatusIndicator;
