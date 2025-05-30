import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Collapse,
  Tooltip,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Delete as DeleteIcon,
  TrackChanges as TargetIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
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
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import ConfirmationModal from '../ConfirmationModal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const availableIcons = [
  '🎯',
  '🏖️',
  '🚗',
  '🏠',
  '💰',
  '📱',
  '🛍️',
  '⚡',
  '✈️',
  '🎓'
];

const SavingGoals = () => {
  const dispatch = useAppDispatch();
  const goalData = useAppSelector(selectSavingsGoals);
  const totalSavings = useAppSelector(selectTotalSavingsContributions);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const expandedSavings = useAppSelector(selectExpandedSavings);
  const editingField = useAppSelector(selectEditingField);
  const showIconPicker = useAppSelector(selectShowIconPicker);
  const saveError = useAppSelector(selectSaveError);
  const [localValues, setLocalValues] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
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

  const handleMenuClick = (event, goalId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedGoal(goalId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedGoal(null);
  };

  const handleCloneGoal = (goalId) => {
    const goal = goalData.find((g) => g.id === goalId);
    if (goal) {
      dispatch(
        addSavingsGoal({
          name: `${goal.name} (Copy)`,
          icon: goal.icon,
          currentBalance: goal.currentBalance,
          targetAmount: goal.targetAmount,
          targetDate: goal.targetDate,
          monthlyContribution: goal.monthlyContribution,
          priority: goal.priority,
          description: goal.description
        })
      );
    }
    setAnchorEl(null);
  };

  const handleInputFocus = (event) => {
    event.target.select();
  };

  const savingsPercentage =
    monthlyIncome > 0 ? (totalSavings / monthlyIncome) * 100 : 0;

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        mb: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
          color: '#1f2937',
          position: 'relative',
          border: '1px solid #e2e8f0',
          borderRadius: '12px 12px 0 0',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#10b981',
            borderRadius: '12px 12px 0 0'
          }
        }}
      >
        <Box sx={{ p: 2, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TargetIcon sx={{ fontSize: 18, color: '#10b981' }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#374151',
                    lineHeight: 1.2
                  }}
                >
                  Savings Goals
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'flex-end',
                  gap: 0.5
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#10b981',
                    lineHeight: 1
                  }}
                >
                  £{totalSavings.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: '#9ca3af',
                    lineHeight: 1
                  }}
                >
                  /mo
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ p: 0 }}>
        {saveError && (
          <Box
            sx={{
              m: 3,
              p: 2,
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: '#dc2626', fontSize: '0.875rem' }}
            >
              Failed to save: {saveError}
            </Typography>
            <Button
              size="small"
              onClick={handleManualSave}
              sx={{
                color: '#dc2626',
                fontSize: '0.75rem',
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        <Box sx={{ p: 2 }}>
          {goalData.map((goal, goalIndex) => {
            const isExpanded = expandedSavings[goal.id];
            const progress =
              goal.targetAmount > 0
                ? (goal.currentBalance / goal.targetAmount) * 100
                : 0;

            return (
              <Card
                key={goal.id}
                sx={{
                  mb: goalIndex === goalData.length - 1 ? 0 : 2,
                  border: '2px solid #e2e8f0',
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
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
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    background:
                      'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    cursor: 'pointer',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
                    },
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => handleToggleSaving(goal.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0',
                        '&:hover': { bgcolor: '#f8fafc' }
                      }}
                    >
                      {isExpanded ? (
                        <ExpandLessIcon fontSize="small" />
                      ) : (
                        <ExpandMoreIcon fontSize="small" />
                      )}
                    </IconButton>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                    >
                      <Box
                        sx={{
                          cursor: 'pointer',
                          fontSize: '20px',
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
                          sx={{ fontSize: '20px', px: 0.5, py: 0.25 }}
                        >
                          {goal.icon}
                        </Typography>
                      </Box>
                      <Box>
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
                          displayVariant="h6"
                          displayTypographyProps={{
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            color: '#1f2937'
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          fontSize: '1.2rem',
                          color: '#10b981',
                          lineHeight: 1
                        }}
                      >
                        £{goal.monthlyContribution.toLocaleString()}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, goal.id)}
                      sx={{
                        color: '#9ca3af',
                        '&:hover': {
                          color: '#6b7280',
                          bgcolor: 'rgba(107, 114, 128, 0.1)'
                        },
                        width: 32,
                        height: 32
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 3 }}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 3,
                          bgcolor: '#f0fdf4',
                          borderRadius: 3,
                          border: '2px solid #10b981'
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            minWidth: '140px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: '#10b981'
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
                              parseFloat(e.target.value) || 0
                            )
                          }
                          onFocus={handleInputFocus}
                          InputProps={{
                            startAdornment: (
                              <Typography
                                variant="body2"
                                sx={{
                                  mr: 0.5,
                                  color: '#10b981',
                                  fontWeight: 700
                                }}
                              >
                                £
                              </Typography>
                            )
                          }}
                          sx={{
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: '#e2e8f0',
                                borderWidth: '2px'
                              },
                              '&:hover fieldset': { borderColor: '#cbd5e1' },
                              '&.Mui-focused fieldset': {
                                borderColor: '#10b981',
                                borderWidth: 2,
                                boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
                              }
                            },
                            '& .MuiInputBase-input': {
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              textAlign: 'right',
                              padding: '8px 12px',
                              color: '#374151'
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.8rem',
                              display: 'block',
                              mb: 0.5
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
                                parseFloat(e.target.value) || 0
                              )
                            }
                            onFocus={handleInputFocus}
                            InputProps={{
                              startAdornment: (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mr: 0.5,
                                    color: '#667eea',
                                    fontWeight: 700
                                  }}
                                >
                                  £
                                </Typography>
                              )
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                                '& fieldset': {
                                  borderColor: '#e2e8f0',
                                  borderWidth: '2px'
                                },
                                '&:hover fieldset': { borderColor: '#cbd5e1' },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#667eea',
                                  borderWidth: 2,
                                  boxShadow:
                                    '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                }
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                padding: '8px 12px',
                                color: '#374151'
                              }
                            }}
                            fullWidth
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.8rem',
                              display: 'block',
                              mb: 0.5
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
                                parseFloat(e.target.value) || 0
                              )
                            }
                            onFocus={handleInputFocus}
                            InputProps={{
                              startAdornment: (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mr: 0.5,
                                    color: '#667eea',
                                    fontWeight: 700
                                  }}
                                >
                                  £
                                </Typography>
                              )
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                                '& fieldset': {
                                  borderColor: '#e2e8f0',
                                  borderWidth: '2px'
                                },
                                '&:hover fieldset': { borderColor: '#cbd5e1' },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#667eea',
                                  borderWidth: 2,
                                  boxShadow:
                                    '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                }
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                padding: '8px 12px',
                                color: '#374151'
                              }
                            }}
                            fullWidth
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
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
                        <DatePicker
                          value={
                            getGoalValue(goal.id, 'targetDate', goal.targetDate)
                              ? dayjs(
                                  getGoalValue(
                                    goal.id,
                                    'targetDate',
                                    goal.targetDate
                                  )
                                )
                              : null
                          }
                          onChange={(newValue) =>
                            handleGoalAmountChange(
                              goal.id,
                              'targetDate',
                              newValue ? newValue.format('YYYY-MM') : ''
                            )
                          }
                          enableAccessibleFieldDOMStructure={false}
                          views={['year', 'month']}
                          slots={{ textField: TextField }}
                          slotProps={{
                            textField: {
                              size: 'small',
                              sx: {
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: 'white',
                                  borderRadius: 2,
                                  '& fieldset': {
                                    borderColor: '#e2e8f0',
                                    borderWidth: '2px'
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#cbd5e1'
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#667eea',
                                    borderWidth: 2,
                                    boxShadow:
                                      '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                  }
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: '1.1rem',
                                  fontWeight: 600,
                                  padding: '8px 12px',
                                  color: '#374151'
                                }
                              }
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Collapse>
              </Card>
            );
          })}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              mt: 3,
              py: 2,
              color: '#10b981',
              borderColor: '#e2e8f0',
              backgroundColor: '#f8fafc',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '2px dashed #cbd5e1',
              '&:hover': {
                backgroundColor: '#f1f5f9',
                borderColor: '#10b981',
                color: '#059669'
              }
            }}
            onClick={handleAddGoal}
          >
            Add New Goal
          </Button>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
            minWidth: 160
          }
        }}
      >
        {selectedGoal && (
          <>
            <MenuItem onClick={() => handleCloneGoal(selectedGoal)}>
              <ListItemIcon>
                <ContentCopyIcon sx={{ color: '#10b981' }} />
              </ListItemIcon>
              <ListItemText>Clone Goal</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDeleteGoal(selectedGoal);
                setAnchorEl(null);
              }}
              sx={{ color: '#ef4444' }}
            >
              <ListItemIcon>
                <DeleteIcon sx={{ color: '#ef4444' }} />
              </ListItemIcon>
              <ListItemText>Delete Goal</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>

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
    </Card>
  );
};

export default SavingGoals;
