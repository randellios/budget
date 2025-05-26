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
  Collapse,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';

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
    <Card>
      <CardHeader
        title="Debts"
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              £{totalDebtPayments}/month
            </Typography>
          </Box>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
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

              <Collapse
                in={expandedDebts[debt.id]}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ p: 2, pt: 0 }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mb: 0.5 }}
                        >
                          Starting Balance
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: '#f8fafc',
                            borderRadius: 1,
                            border: '1px solid #e2e8f0',
                            px: 1.5,
                            py: 0.5
                          }}
                        >
                          <EditableField
                            value={debt.startingBalance}
                            displayValue={`£${debt.startingBalance.toLocaleString()}`}
                            isEditing={
                              editingField === `${debt.id}-startingBalance`
                            }
                            onStartEdit={() =>
                              setEditingField(`${debt.id}-startingBalance`)
                            }
                            onSave={(newValue) =>
                              updateDebtField(
                                debt.id,
                                'startingBalance',
                                newValue
                              )
                            }
                            onCancel={() => setEditingField(null)}
                            parseValue={(val) => parseFloat(val) || 0}
                            containerStyle={{
                              bgcolor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              px: 0.5,
                              py: 0
                            }}
                            displayStyle={{
                              px: 0.5,
                              py: 0,
                              minWidth: 'auto'
                            }}
                          />
                        </Box>
                      </Box>

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
                            defaultValue={debt.currentBalance}
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
                          Interest Rate (APR)
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
                          <input
                            style={{
                              border: 'none',
                              background: 'transparent',
                              outline: 'none',
                              width: '100%',
                              fontSize: '14px'
                            }}
                            defaultValue={debt.interestRate}
                          />
                          <Typography variant="body2">%</Typography>
                        </Box>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mb: 0.5 }}
                        >
                          Monthly Payment
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: '#fef2f2',
                            borderRadius: 1,
                            border: '2px solid #ef4444',
                            px: 1.5,
                            py: 0.5
                          }}
                        >
                          <Typography variant="body2" sx={{ color: '#ef4444' }}>
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
                              color: '#ef4444'
                            }}
                            defaultValue={debt.monthlyPayment}
                          />
                        </Box>
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
      </CardContent>
    </Card>
  );
};

export default Debts;
