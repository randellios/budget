import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Collapse,
  Tooltip,
  TextField,
  Typography,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Tune as TuneIcon,
  Lock as LockIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
import CollapsibleCard from '../CollapsibleCard';
const expenseCategories = [
  {
    id: 1,
    name: 'Home',
    icon: '🏠',
    items: [
      {
        id: 1,
        name: 'Mortgage',
        amount: 1000,
        isEssential: true,
        isFlexible: false
      },
      {
        id: 2,
        name: 'Council Tax',
        amount: 150,
        isEssential: true,
        isFlexible: false
      },
      {
        id: 3,
        name: 'Home Insurance',
        amount: 150,
        isEssential: true,
        isFlexible: false
      }
    ]
  },
  {
    id: 2,
    name: 'Utilities',
    icon: '⚡',
    items: [
      {
        id: 4,
        name: 'Electricity',
        amount: 120,
        isEssential: true,
        isFlexible: false
      },
      { id: 5, name: 'Gas', amount: 80, isEssential: true, isFlexible: false },
      {
        id: 6,
        name: 'Water',
        amount: 45,
        isEssential: true,
        isFlexible: false
      },
      {
        id: 7,
        name: 'Internet',
        amount: 35,
        isEssential: false,
        isFlexible: true
      }
    ]
  },
  {
    id: 3,
    name: 'Entertainment',
    icon: '🍿',
    items: [
      {
        id: 8,
        name: 'Netflix',
        amount: 15,
        isEssential: false,
        isFlexible: true
      },
      {
        id: 9,
        name: 'Spotify',
        amount: 12,
        isEssential: false,
        isFlexible: true
      },
      {
        id: 10,
        name: 'Dining Out',
        amount: 150,
        isEssential: false,
        isFlexible: true
      }
    ]
  }
];
const MonthlyExpenses = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [expenses, setExpenses] = useState(expenseCategories);
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  const deleteCategory = (categoryId) => {
    setExpenses((prev) =>
      prev.filter((category) => category.id !== categoryId)
    );
  };
  const updateCategoryField = (categoryId, field, newValue) => {
    setExpenses((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, [field]: newValue }
          : category
      )
    );
    setEditingField(null);
  };
  const updateItemField = (categoryId, itemId, field, newValue) => {
    setExpenses((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return {
                  ...item,
                  [field]:
                    field === 'amount' ? parseFloat(newValue) || 0 : newValue
                };
              }
              return item;
            })
          };
        }
        return category;
      })
    );
    setEditingField(null);
  };
  const toggleItemEssential = (categoryId, itemId) => {
    setExpenses((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, isEssential: !item.isEssential };
              }
              return item;
            })
          };
        }
        return category;
      })
    );
  };
  const toggleItemFlexible = (categoryId, itemId) => {
    setExpenses((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, isFlexible: !item.isFlexible };
              }
              return item;
            })
          };
        }
        return category;
      })
    );
  };
  const getCategoryTotal = (category) =>
    category.items.reduce((total, item) => total + item.amount, 0);
  const totalExpenses = expenses.reduce(
    (total, category) => total + getCategoryTotal(category),
    0
  );
  const totalItems = expenses.reduce(
    (total, category) => total + category.items.length,
    0
  );
  const getExpenseSummary = () => {
    let essential = 0,
      nonEssential = 0;
    let flexible = 0,
      fixed = 0;
    expenses.forEach((category) => {
      category.items.forEach((item) => {
        if (item.isEssential) essential += item.amount;
        else nonEssential += item.amount;
        if (item.isFlexible) flexible += item.amount;
        else fixed += item.amount;
      });
    });
    return { essential, nonEssential, flexible, fixed };
  };
  const summary = getExpenseSummary();
  return (
    <CollapsibleCard
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: '#667eea',
              borderRadius: 1.5,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 18, color: 'white' }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}
            >
              Monthly Expenses
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              £{totalExpenses.toLocaleString()} • {expenses.length} categories
            </Typography>
          </Box>
        </Box>
      }
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
    >
      {expenses.map((category) => (
        <Box key={category.id} sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1,
              bgcolor: '#f8fafc',
              borderRadius: 1,
              border: '1px solid #e2e8f0',
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#f1f5f9'
              }
            }}
            onClick={() => toggleCategory(category.id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                {expandedCategories[category.id] ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle2">{category.icon}</Typography>
                <EditableField
                  value={category.name}
                  isEditing={editingField === `category-${category.id}-name`}
                  onStartEdit={() =>
                    setEditingField(`category-${category.id}-name`)
                  }
                  onSave={(newValue) =>
                    updateCategoryField(category.id, 'name', newValue)
                  }
                  onCancel={() => setEditingField(null)}
                  displayVariant="subtitle2"
                  displayTypographyProps={{
                    fontWeight: 600
                  }}
                  displayStyle={{
                    minWidth: 100
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                £{getCategoryTotal(category).toLocaleString()}
              </Typography>
              <Tooltip title="Delete category">
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
                    deleteCategory(category.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Collapse
            in={expandedCategories[category.id]}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ ml: 2, borderLeft: '2px solid #e2e8f0', pl: 2 }}>
              {category.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1,
                    '&:hover': {
                      bgcolor: '#f8fafc',
                      borderRadius: 1,
                      mx: -1,
                      px: 1
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      flex: 1
                    }}
                  >
                    <EditableField
                      value={item.name}
                      isEditing={editingField === `item-${item.id}-name`}
                      onStartEdit={() =>
                        setEditingField(`item-${item.id}-name`)
                      }
                      onSave={(newValue) =>
                        updateItemField(category.id, item.id, 'name', newValue)
                      }
                      onCancel={() => setEditingField(null)}
                      displayVariant="body2"
                      displayTypographyProps={{
                        color: 'text.secondary'
                      }}
                      displayStyle={{
                        minWidth: 120
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip
                      title={
                        item.isEssential
                          ? 'Mark as optional'
                          : 'Mark as essential'
                      }
                    >
                      <IconButton
                        size="small"
                        sx={{
                          color: item.isEssential ? '#f59e0b' : '#d1d5db',
                          '&:hover': {
                            color: item.isEssential ? '#d97706' : '#9ca3af',
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                        onClick={() =>
                          toggleItemEssential(category.id, item.id)
                        }
                      >
                        {item.isEssential ? (
                          <StarIcon fontSize="small" />
                        ) : (
                          <StarBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        item.isFlexible
                          ? 'Click to make fixed amount'
                          : 'Click to make flexible amount'
                      }
                    >
                      <IconButton
                        size="small"
                        sx={{
                          color: item.isFlexible ? '#64748b' : '#e2e8f0',
                          '&:hover': {
                            color: item.isFlexible ? '#475569' : '#cbd5e1',
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                        onClick={() => toggleItemFlexible(category.id, item.id)}
                      >
                        {item.isFlexible ? (
                          <TuneIcon fontSize="small" />
                        ) : (
                          <LockIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Box sx={{ width: 115 }}>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          updateItemField(
                            category.id,
                            item.id,
                            'amount',
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
                    <IconButton size="small" sx={{ color: 'error.main' }}>
                      <Box sx={{ fontSize: '14px' }}>✕</Box>
                    </IconButton>
                  </Box>
                </Box>
              ))}
              <Button
                size="small"
                startIcon={<AddIcon />}
                sx={{
                  mt: 1,
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  textTransform: 'none'
                }}
              >
                Add {category.name.toLowerCase()}
              </Button>
            </Box>
          </Collapse>
        </Box>
      ))}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          mt: 2,
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
        Add Category
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
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.75rem' }}
          >
            {expenses.length} categories • {totalItems} items
          </Typography>
          <Chip
            label={`£${totalExpenses.toLocaleString()}`}
            size="small"
            sx={{
              backgroundColor: '#e0e7ff',
              color: '#3730a3',
              fontSize: '0.7rem',
              fontWeight: 500,
              height: 20
            }}
          />
        </Box>
      )}
    </CollapsibleCard>
  );
};
export default MonthlyExpenses;
