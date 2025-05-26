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
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
import CollapsibleCard from '../CollapsibleCard';
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
const SavingGoals = () => {
  const [expandedSavings, setExpandedSavings] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(null);
  const [goalData, setGoalData] = useState(savingsGoals);
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
  const toggleSaving = (savingId) => {
    setExpandedSavings((prev) => ({
      ...prev,
      [savingId]: !prev[savingId]
    }));
  };
  const updateGoalField = (goalId, field, newValue) => {
    setGoalData((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              [field]:
                field === 'currentBalance' ||
                field === 'targetAmount' ||
                field === 'monthlyContribution'
                  ? parseFloat(newValue) || 0
                  : newValue
            }
          : goal
      )
    );
    setEditingField(null);
  };
  const handleIconSelect = (goalId, icon) => {
    updateGoalField(goalId, 'icon', icon);
    setShowIconPicker(null);
  };
  const totalSavings = goalData.reduce(
    (total, goal) => total + goal.monthlyContribution,
    0
  );
  return (
    <CollapsibleCard
      title="Savings Goals"
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
    >
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
                      setShowIconPicker(goal.id);
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
                    onStartEdit={() => setEditingField(`${goal.id}-name`)}
                    onSave={(newValue) =>
                      updateGoalField(goal.id, 'name', newValue)
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
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={goal.currentBalance}
                        onChange={(e) =>
                          updateGoalField(
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
                        fullWidth
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Target Amount
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={goal.targetAmount}
                        onChange={(e) =>
                          updateGoalField(
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
                        Target Date
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="month"
                        value={goal.targetDate}
                        onChange={(e) =>
                          updateGoalField(goal.id, 'targetDate', e.target.value)
                        }
                        fullWidth
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        Monthly Contribution
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={goal.monthlyContribution}
                        onChange={(e) =>
                          updateGoalField(
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
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f0fdf4',
                            '& fieldset': {
                              borderColor: '#10b981',
                              borderWidth: 2
                            },
                            '&:hover fieldset': {
                              borderColor: '#059669'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#10b981'
                            }
                          },
                          '& .MuiInputBase-input': {
                            color: '#10b981',
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
        Add Saving Goal
      </Button>
    </CollapsibleCard>
  );
};
export default SavingGoals;
