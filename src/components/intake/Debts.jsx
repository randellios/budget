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
  CreditCard as CreditCardIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  LocalFireDepartment as FireIcon,
  Warning as WarningIcon,
  Shield as ShieldIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectDebts,
  selectTotalDebtPayments,
  addDebt,
  updateDebt,
  deleteDebt
} from '../../store/slices/debtsSlice';
import {
  selectExpandedDebts,
  selectEditingField,
  selectShowIconPicker,
  toggleDebt,
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

const availableIcons = [
  '💳',
  '🚗',
  '🎓',
  '🏠',
  '💰',
  '📱',
  '🛍️',
  '⚡',
  '🍔',
  '🎯'
];

const Debts = () => {
  const dispatch = useAppDispatch();
  const debtData = useAppSelector(selectDebts);
  const totalDebtPayments = useAppSelector(selectTotalDebtPayments);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const expandedDebts = useAppSelector(selectExpandedDebts);
  const editingField = useAppSelector(selectEditingField);
  const showIconPicker = useAppSelector(selectShowIconPicker);
  const saveError = useAppSelector(selectSaveError);
  const [localValues, setLocalValues] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const debouncedUpdateDebt = useDebouncedCallback(
    ({ debtId, field, value }) => {
      dispatch(updateDebt({ debtId, field, value }));
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

  const handleToggleDebt = (debtId) => {
    dispatch(toggleDebt(debtId));
  };

  const updateDebtField = (debtId, field, newValue) => {
    dispatch(updateDebt({ debtId, field, value: newValue }));
    dispatch(setEditingField(null));
  };

  const handleIconSelect = (debtId, icon) => {
    dispatch(updateDebt({ debtId, field: 'icon', value: icon }));
    dispatch(setShowIconPicker(null));
  };

  const handleDeleteDebt = (debtId) => {
    const debt = debtData.find((d) => d.id === debtId);
    setConfirmModal({
      open: true,
      title: 'Delete Debt',
      message: `Are you sure you want to delete "${debt?.name}"? This action cannot be undone.`,
      onConfirm: () => {
        dispatch(deleteDebt(debtId));
        setConfirmModal((prev) => ({ ...prev, open: false }));
      }
    });
  };

  const handleDebtAmountChange = (debtId, field, value) => {
    const key = `${debtId}-${field}`;
    setLocalValues((prev) => ({ ...prev, [key]: value }));
    debouncedUpdateDebt({ debtId, field, value });
  };

  const getDebtValue = (debtId, field, originalValue) => {
    const key = `${debtId}-${field}`;
    return localValues[key] !== undefined ? localValues[key] : originalValue;
  };

  const handleAddDebt = () => {
    dispatch(addDebt({ name: 'New Debt', icon: '💳' }));
  };

  const handleManualSave = () => {
    dispatch(saveBudgetData());
  };

  const handleMenuClick = (event, debtId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedDebt(debtId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDebt(null);
  };

  const handleCloneDebt = (debtId) => {
    const debt = debtData.find((d) => d.id === debtId);
    if (debt) {
      dispatch(
        addDebt({
          name: `${debt.name} (Copy)`,
          icon: debt.icon,
          startingBalance: debt.startingBalance,
          currentBalance: debt.currentBalance,
          interestRate: debt.interestRate,
          monthlyPayment: debt.monthlyPayment,
          minimumPayment: debt.minimumPayment,
          priority: debt.priority
        })
      );
    }
    setAnchorEl(null);
  };

  const handleInputFocus = (event) => {
    event.target.select();
  };

  const getDebtPriorityInfo = (debt) => {
    if (debt.interestRate > 15) {
      return {
        icon: FireIcon,
        color: '#dc2626',
        label: 'High Priority',
        description: 'Attack first'
      };
    } else if (debt.interestRate > 8) {
      return {
        icon: WarningIcon,
        color: '#d97706',
        label: 'Medium Priority',
        description: 'Pay extra'
      };
    } else {
      return {
        icon: ShieldIcon,
        color: '#059669',
        label: 'Low Priority',
        description: 'Minimum only'
      };
    }
  };

  const debtPercentage =
    monthlyIncome > 0 ? (totalDebtPayments / monthlyIncome) * 100 : 0;

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
          background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          }
        }}
      >
        <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <CreditCardIcon sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    color: 'white',
                    lineHeight: 1.2,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Debts
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    mt: 0.5
                  }}
                >
                  {debtData.length} debts • {debtPercentage.toFixed(1)}% of
                  income
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: '2.25rem',
                  color: 'white',
                  lineHeight: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                £{totalDebtPayments.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Monthly payments
              </Typography>
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

        <Box sx={{ p: 3 }}>
          {debtData.map((debt, debtIndex) => {
            const isExpanded = expandedDebts[debt.id];
            const priorityInfo = getDebtPriorityInfo(debt);
            const PriorityIcon = priorityInfo.icon;
            const progress =
              debt.startingBalance > 0
                ? ((debt.startingBalance - debt.currentBalance) /
                    debt.startingBalance) *
                  100
                : 0;

            return (
              <Card
                key={debt.id}
                sx={{
                  mb: debtIndex === debtData.length - 1 ? 0 : 3,
                  border: `2px solid ${priorityInfo.color}40`,
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  position: 'relative'
                }}
              >
                {showIconPicker === debt.id && (
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
                        onClick={() => handleIconSelect(debt.id, icon)}
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
                    p: 3,
                    background: `linear-gradient(135deg, ${priorityInfo.color}08 0%, ${priorityInfo.color}04 100%)`,
                    cursor: 'pointer',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${priorityInfo.color}12 0%, ${priorityInfo.color}08 100%)`
                    },
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => handleToggleDebt(debt.id)}
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
                          dispatch(setShowIconPicker(debt.id));
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: '20px', px: 0.5, py: 0.25 }}
                        >
                          {debt.icon}
                        </Typography>
                      </Box>
                      <Box>
                        <EditableField
                          value={debt.name}
                          isEditing={editingField === `${debt.id}-name`}
                          onStartEdit={() =>
                            dispatch(setEditingField(`${debt.id}-name`))
                          }
                          onSave={(newValue) =>
                            updateDebtField(debt.id, 'name', newValue)
                          }
                          onCancel={() => dispatch(setEditingField(null))}
                          displayVariant="h6"
                          displayTypographyProps={{
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            color: '#1f2937'
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            ml: 1
                          }}
                        >
                          <PriorityIcon
                            sx={{ fontSize: 14, color: priorityInfo.color }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: priorityInfo.color,
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            {priorityInfo.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#6b7280',
                              fontSize: '0.75rem'
                            }}
                          >
                            - {debt.interestRate}% APR
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          fontSize: '1.5rem',
                          color: '#ef4444',
                          lineHeight: 1
                        }}
                      >
                        £{debt.monthlyPayment.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#6b7280', fontSize: '0.75rem' }}
                      >
                        monthly
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, debt.id)}
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
                          bgcolor: '#fef2f2',
                          borderRadius: 3,
                          border: '2px solid #ef4444'
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            minWidth: '140px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: '#ef4444'
                          }}
                        >
                          Monthly Payment:
                        </Typography>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          value={getDebtValue(
                            debt.id,
                            'monthlyPayment',
                            debt.monthlyPayment
                          )}
                          onChange={(e) =>
                            handleDebtAmountChange(
                              debt.id,
                              'monthlyPayment',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          onFocus={handleInputFocus}
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
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: '#ef4444',
                                borderWidth: 2
                              },
                              '&:hover fieldset': {
                                borderColor: '#dc2626'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#ef4444',
                                boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
                              }
                            },
                            '& .MuiInputBase-input': {
                              color: '#ef4444',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              textAlign: 'right',
                              padding: '8px 12px'
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
                            Starting Balance:
                          </Typography>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            value={getDebtValue(
                              debt.id,
                              'startingBalance',
                              debt.startingBalance
                            )}
                            onChange={(e) =>
                              handleDebtAmountChange(
                                debt.id,
                                'startingBalance',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            onFocus={handleInputFocus}
                            InputProps={{
                              startAdornment: (
                                <Typography variant="body2" sx={{ mr: 0.5 }}>
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
                                  borderWidth: 2
                                },
                                '&:hover fieldset': {
                                  borderColor: '#cbd5e1'
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#667eea',
                                  boxShadow:
                                    '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                }
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '1rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                padding: '8px 12px'
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
                            Current Balance:
                          </Typography>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            value={getDebtValue(
                              debt.id,
                              'currentBalance',
                              debt.currentBalance
                            )}
                            onChange={(e) =>
                              handleDebtAmountChange(
                                debt.id,
                                'currentBalance',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            onFocus={handleInputFocus}
                            InputProps={{
                              startAdornment: (
                                <Typography variant="body2" sx={{ mr: 0.5 }}>
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
                                  borderWidth: 2
                                },
                                '&:hover fieldset': {
                                  borderColor: '#cbd5e1'
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#667eea',
                                  boxShadow:
                                    '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                }
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '1rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                padding: '8px 12px'
                              }
                            }}
                            fullWidth
                          />
                        </Box>
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
                            Interest Rate (APR):
                          </Typography>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            value={getDebtValue(
                              debt.id,
                              'interestRate',
                              debt.interestRate
                            )}
                            onChange={(e) =>
                              handleDebtAmountChange(
                                debt.id,
                                'interestRate',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            onFocus={handleInputFocus}
                            InputProps={{
                              endAdornment: (
                                <Typography variant="body2" sx={{ ml: 0.5 }}>
                                  %
                                </Typography>
                              )
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                                '& fieldset': {
                                  borderColor: '#e2e8f0',
                                  borderWidth: 2
                                },
                                '&:hover fieldset': {
                                  borderColor: '#cbd5e1'
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#667eea',
                                  boxShadow:
                                    '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                }
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '1rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                padding: '8px 12px'
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
                            Minimum Payment:
                          </Typography>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            value={getDebtValue(
                              debt.id,
                              'minimumPayment',
                              debt.minimumPayment
                            )}
                            onChange={(e) =>
                              handleDebtAmountChange(
                                debt.id,
                                'minimumPayment',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            onFocus={handleInputFocus}
                            InputProps={{
                              startAdornment: (
                                <Typography variant="body2" sx={{ mr: 0.5 }}>
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
                                  borderWidth: 2
                                },
                                '&:hover fieldset': {
                                  borderColor: '#cbd5e1'
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#667eea',
                                  boxShadow:
                                    '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                }
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '1rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                padding: '8px 12px'
                              }
                            }}
                            fullWidth
                          />
                        </Box>
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
              color: '#ef4444',
              borderColor: '#e2e8f0',
              backgroundColor: '#f8fafc',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '2px dashed #cbd5e1',
              '&:hover': {
                backgroundColor: '#f1f5f9',
                borderColor: '#ef4444',
                color: '#dc2626'
              }
            }}
            onClick={handleAddDebt}
          >
            Add New Debt
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
        {selectedDebt && (
          <>
            <MenuItem onClick={() => handleCloneDebt(selectedDebt)}>
              <ListItemIcon>
                <ContentCopyIcon sx={{ color: '#ef4444' }} />
              </ListItemIcon>
              <ListItemText>Clone Debt</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDeleteDebt(selectedDebt);
                setAnchorEl(null);
              }}
              sx={{ color: '#ef4444' }}
            >
              <ListItemIcon>
                <DeleteIcon sx={{ color: '#ef4444' }} />
              </ListItemIcon>
              <ListItemText>Delete Debt</ListItemText>
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

export default Debts;
