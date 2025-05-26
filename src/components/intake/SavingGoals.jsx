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
import EditableField from '../EditableField';

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
    <Card>
      <CardHeader
        title="Savings Goals"
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              £{totalSavings}/month
            </Typography>
          </Box>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
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
                          Current balance
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
      </CardContent>
    </Card>
  );
};

export default SavingGoals;
