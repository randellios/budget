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
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
import CollapsibleCard from '../CollapsibleCard';
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
const debts = [
  {
    id: 1,
    name: 'Credit Card',
    icon: '💳',
    startingBalance: 5000,
    currentBalance: 2000,
    interestRate: 22.9,
    monthlyPayment: 67
  },
  {
    id: 2,
    name: 'Car Loan',
    icon: '🚗',
    startingBalance: 10000,
    currentBalance: 3000,
    interestRate: 6.5,
    monthlyPayment: 100
  },
  {
    id: 3,
    name: 'Student Loan',
    icon: '🎓',
    startingBalance: 22000,
    currentBalance: 5000,
    interestRate: 3.2,
    monthlyPayment: 33
  }
];
const Debts = () => {
  const [expandedDebts, setExpandedDebts] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(null);
  const [debtData, setDebtData] = useState(debts);
  const [isExpanded, setIsExpanded] = useState(true);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showIconPicker && !event.target.closest('.icon-picker')) {
        setShowIconPicker(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showIconPicker]);
  const toggleDebt = (debtId) => {
    setExpandedDebts((prev) => ({
      ...prev,
      [debtId]: !prev[debtId]
    }));
  };
  const updateDebtField = (debtId, field, newValue) => {
    setDebtData((prev) =>
      prev.map((debt) =>
        debt.id === debtId
          ? {
              ...debt,
              [field]:
                field === 'startingBalance' ||
                field === 'currentBalance' ||
                field === 'interestRate' ||
                field === 'monthlyPayment'
                  ? parseFloat(newValue) || 0
                  : newValue
            }
          : debt
      )
    );
    setEditingField(null);
  };
  const handleIconSelect = (debtId, icon) => {
    updateDebtField(debtId, 'icon', icon);
    setShowIconPicker(null);
  };
  const totalDebtPayments = debtData.reduce(
    (total, debt) => total + debt.monthlyPayment,
    0
  );
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
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}
            >
              Debts
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              £{totalDebtPayments}/month • {debtData.length} debts
            </Typography>
          </Box>
        </Box>
      }
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
    >
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
              onClick={() => toggleDebt(debt.id)}
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
                      setShowIconPicker(debt.id);
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
                    onStartEdit={() => setEditingField(`${debt.id}-name`)}
                    onSave={(newValue) =>
                      updateDebtField(debt.id, 'name', newValue)
                    }
                    onCancel={() => setEditingField(null)}
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
                  sx={{ color: 'error.main' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Box sx={{ fontSize: '14px' }}>✕</Box>
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
                        value={debt.startingBalance}
                        onChange={(e) =>
                          updateDebtField(
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
                        value={debt.currentBalance}
                        onChange={(e) =>
                          updateDebtField(
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
                        value={debt.interestRate}
                        onChange={(e) =>
                          updateDebtField(
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
                        value={debt.monthlyPayment}
                        onChange={(e) =>
                          updateDebtField(
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
      >
        Add Debt
      </Button>
    </CollapsibleCard>
  );
};
export default Debts;
