import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Chip,
  Button,
  IconButton,
  Divider,
  Collapse,
  TextField,
  Typography
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  TrackChanges as TargetIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
import CollapsibleCard from '../CollapsibleCard';
import SaveStatusIndicator from '../SaveStatusIndicator';
import ConfirmationModal from '../ConfirmationModal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectSavingsGoals,
  selectTotalSavingsContributions,
  addSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal
} from '../../store/slices/savingsSlice';
import {
  selectExpandedSavings,
  selectEditingField,
  selectShowIconPicker,
  toggleSaving,
  setEditingField,
  setShowIconPicker
} from '../../store/slices/uiSlice';
import {
  selectSaveError,
  saveBudgetData,
  clearSaveError
} from '../../store/slices/apiSlice';
const availableIcons = [
  '🎯',
  '🏖️',
  '🚗',
  '🏠',
  '💰',
  '📱',
  '🛍️',
  '⚡',
  '🍔',
  '✈️'
];
const SavingGoals = () => {
  const dispatch = useAppDispatch();
  const goalData = useAppSelector(selectSavingsGoals);
  const totalSavings = useAppSelector(selectTotalSavingsContributions);
  const expandedSavings = useAppSelector(selectExpandedSavings);
  const editingField = useAppSelector(selectEditingField);
  const showIconPicker = useAppSelector(selectShowIconPicker);
  const saveError = useAppSelector(selectSaveError);
  const [isExpanded, setIsExpanded] = useState(true);
  const [localValues, setLocalValues] = useState({});
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });
  const debouncedUpdateGoal = useDebouncedCallback(
    ({ goalId, field, value }) => {
      dispatch(updateSavingsGoal({ goalId, field, value }));
    },
    500
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showIconPicker && !event.target.closest('.icon-picker')) {
        dispatch(setShowIconPicker(null));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showIconPicker, dispatch]);
  useEffect(() => {
    if (saveError) {
      const timer = setTimeout(() => {
        dispatch(clearSaveError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [saveError, dispatch]);
  const handleToggleSaving = (savingId) => {
    dispatch(toggleSaving(savingId));
  };
  const updateGoalField = (goalId, field, newValue) => {
    dispatch(updateSavingsGoal({ goalId, field, value: newValue }));
    dispatch(setEditingField(null));
  };
  const handleIconSelect = (goalId, icon) => {
    dispatch(updateSavingsGoal({ goalId, field: 'icon', value: icon }));
    dispatch(setShowIconPicker(null));
  };
  const handleDeleteGoal = (goalId) => {
    const goal = goalData.find((g) => g.id === goalId);
    setConfirmModal({
      open: true,
      title: 'Delete Savings Goal',
      message: `Are you sure you want to delete "${goal?.name}"? This action cannot be undone.`,
      onConfirm: () => {
        dispatch(deleteSavingsGoal(goalId));
        setConfirmModal((prev) => ({ ...prev, open: false }));
      }
    });
  };
  const handleGoalAmountChange = (goalId, field, value) => {
    const key = `${goalId}-${field}`;
    setLocalValues((prev) => ({ ...prev, [key]: value }));
    debouncedUpdateGoal({ goalId, field, value });
  };
  const getGoalValue = (goalId, field, originalValue) => {
    const key = `${goalId}-${field}`;
    return localValues[key] !== undefined ? localValues[key] : originalValue;
  };
  const handleAddGoal = () => {
    dispatch(addSavingsGoal({ name: 'New Goal', icon: '🎯' }));
  };
  const handleManualSave = () => {
    dispatch(saveBudgetData());
  };
  return (
    <CollapsibleCard
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: '#10b981',
              borderRadius: 1.5,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TargetIcon sx={{ fontSize: 18, color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}
            >
              Savings Goals
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
              >
                £{totalSavings}/month • {goalData.length} goals
              </Typography>
              <SaveStatusIndicator
                showInTitle={true}
                size="small"
                context="savings"
              />
            </Box>
          </Box>
        </Box>
      }
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
    >
      {saveError && (
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: '#dc2626', fontSize: '0.8rem' }}
          >
            Failed to save: {saveError}
          </Typography>
          <Button
            size="small"
            onClick={handleManualSave}
            sx={{
              color: '#dc2626',
              fontSize: '0.7rem',
              textTransform: 'none',
              minWidth: 'auto'
            }}
          >
            Retry
          </Button>
        </Box>
      )}
      {goalData.map((goal) => {
        return (
          <Box
            key={goal.id}
            sx={{
              mb: 2,
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              bgcolor: '#fafbfc',
              position: 'relative'
            }}
          >
            {showIconPicker === goal.id && (
              <Box
                className="icon-picker"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 10,
                  bgcolor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  p: 1,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  display: 'flex',
                  gap: 0.5,
                  flexWrap: 'wrap',
                  maxWidth: 200
                }}
              >
                {availableIcons.map((icon) => (
                  <IconButton
                    key={icon}
                    size="small"
                    sx={{
                      fontSize: '16px',
                      '&:hover': { bgcolor: '#f0f9ff' }
                    }}
                    onClick={() => handleIconSelect(goal.id, icon)}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Box>
            )}
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
              onClick={() => handleToggleSaving(goal.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  {expandedSavings[goal.id] ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(102, 126, 234, 0.1)',
                        borderRadius: 1
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setShowIconPicker(goal.id));
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: '18px', px: 0.5, py: 0.25 }}
                    >
                      {goal.icon}
                    </Typography>
                  </Box>
                  <EditableField
                    value={goal.name}
                    isEditing={editingField === `${goal.id}-name`}
                    onStartEdit={() =>
                      dispatch(setEditingField(`${goal.id}-name`))
                    }
                    onSave={(newValue) =>
                      updateGoalField(goal.id, 'name', newValue)
                    }
                    onCancel={() => dispatch(setEditingField(null))}
                    displayStyle={{
                      fontWeight: 600
                    }}
                    displayTypographyProps={{
                      fontWeight: 600
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: '#d1d5db',
                    '&:hover': {
                      color: '#ef4444',
                      bgcolor: 'rgba(239, 68, 68, 0.1)'
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGoal(goal.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
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
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      bgcolor: '#f8fafc',
                      borderRadius: 2,
                      border: '2px solid #667eea'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        minWidth: '120px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: '#667eea'
                      }}
                    >
                      Monthly Contribution:
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={getGoalValue(
                        goal.id,
                        'monthlyContribution',
                        goal.monthlyContribution
                      )}
                      onChange={(e) =>
                        handleGoalAmountChange(
                          goal.id,
                          'monthlyContribution',
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <Typography variant="body2" sx={{ mr: 0.5 }}>
                            £
                          </Typography>
                        )
                      }}
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: '#667eea',
                            borderWidth: 2
                          },
                          '&:hover fieldset': {
                            borderColor: '#5a67d8'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea'
                          }
                        },
                        '& .MuiInputBase-input': {
                          color: '#667eea',
                          fontWeight: 700,
                          fontSize: '1.1rem'
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        minWidth: '120px',
                        fontWeight: 500,
                        fontSize: '0.8rem'
                      }}
                    >
                      Current Balance:
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={getGoalValue(
                        goal.id,
                        'currentBalance',
                        goal.currentBalance
                      )}
                      onChange={(e) =>
                        handleGoalAmountChange(
                          goal.id,
                          'currentBalance',
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <Typography variant="body2" sx={{ mr: 0.5 }}>
                            £
                          </Typography>
                        )
                      }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        minWidth: '120px',
                        fontWeight: 500,
                        fontSize: '0.8rem'
                      }}
                    >
                      Target Amount:
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={getGoalValue(
                        goal.id,
                        'targetAmount',
                        goal.targetAmount
                      )}
                      onChange={(e) =>
                        handleGoalAmountChange(
                          goal.id,
                          'targetAmount',
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <Typography variant="body2" sx={{ mr: 0.5 }}>
                            £
                          </Typography>
                        )
                      }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        minWidth: '120px',
                        fontWeight: 500,
                        fontSize: '0.8rem'
                      }}
                    >
                      Target Date:
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="month"
                      value={getGoalValue(
                        goal.id,
                        'targetDate',
                        goal.targetDate
                      )}
                      onChange={(e) =>
                        handleGoalAmountChange(
                          goal.id,
                          'targetDate',
                          e.target.value
                        )
                      }
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </Box>
        );
      })}
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
        onClick={handleAddGoal}
      >
        Add Saving Goal
      </Button>
      {!isExpanded && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: '#f8fafc',
            borderRadius: 1,
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.75rem' }}
            >
              {goalData.length} goals
            </Typography>
            <SaveStatusIndicator
              showManualSave={false}
              size="small"
              context="savings"
            />
          </Box>
          <Chip
            label={`£${totalSavings.toLocaleString()}`}
            size="small"
            sx={{
              backgroundColor: '#dcfce7',
              color: '#166534',
              fontSize: '0.7rem',
              fontWeight: 500,
              height: 20
            }}
          />
        </Box>
      )}
      <ConfirmationModal
        open={confirmModal.open}
        onClose={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant="warning"
        destructive={true}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </CollapsibleCard>
  );
};
export default SavingGoals;
