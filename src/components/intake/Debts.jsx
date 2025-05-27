import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Chip,
  Button,
  IconButton,
  Divider,
  Collapse,
  Tooltip,
  TextField,
  Typography
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CreditCard as CreditCardIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
import CollapsibleCard from '../CollapsibleCard';
import SaveStatusIndicator from '../SaveStatusIndicator';
import ConfirmationModal from '../ConfirmationModal';
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
  const expandedDebts = useAppSelector(selectExpandedDebts);
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
  return (
    <CollapsibleCard
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: '#ef4444',
              borderRadius: 1.5,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CreditCardIcon sx={{ fontSize: 18, color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}
            >
              Debts
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
              >
                £{totalDebtPayments}/month • {debtData.length} debts
              </Typography>
              <SaveStatusIndicator context="debts" />
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
      {debtData.map((debt) => {
        return (
          <Box
            key={debt.id}
            sx={{
              mb: 2,
              border: '1px solid #fca5a5',
              borderLeft: '4px solid #ef4444',
              borderRadius: 2,
              bgcolor: '#fefefe',
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
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#fdf8f8'
                }
              }}
              onClick={() => handleToggleDebt(debt.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  {expandedDebts[debt.id] ? (
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
                      dispatch(setShowIconPicker(debt.id));
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: '18px', px: 0.5, py: 0.25 }}
                    >
                      {debt.icon}
                    </Typography>
                  </Box>
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
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#ef4444' }}
                >
                  £{debt.monthlyPayment}/month
                </Typography>
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
                    handleDeleteDebt(debt.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Collapse in={expandedDebts[debt.id]} timeout="auto" unmountOnExit>
              <Box sx={{ p: 2, pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Starting Balance
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
                        fullWidth
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Current Balance
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
                        fullWidth
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Interest Rate (APR)
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
                            e.target.value
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              %
                            </Typography>
                          )
                        }}
                        fullWidth
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Monthly Payment
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
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#fef2f2',
                            '& fieldset': {
                              borderColor: '#ef4444',
                              borderWidth: 2
                            },
                            '&:hover fieldset': {
                              borderColor: '#dc2626'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ef4444'
                            }
                          },
                          '& .MuiInputBase-input': {
                            color: '#ef4444',
                            fontWeight: 600
                          }
                        }}
                        fullWidth
                      />
                    </Box>
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
        onClick={handleAddDebt}
      >
        Add Debt
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
              {debtData.length} debts
            </Typography>
            <SaveStatusIndicator context="debts" />
          </Box>
          <Chip
            label={`£${totalDebtPayments.toLocaleString()}`}
            size="small"
            sx={{
              backgroundColor: '#fecaca',
              color: '#991b1b',
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
export default Debts;
