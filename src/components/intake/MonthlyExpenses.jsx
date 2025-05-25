import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Collapse,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Tune as TuneIcon,
  Lock as LockIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Sample data with simplified structure
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
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [expenses, setExpenses] = useState(expenseCategories);

  const categoryInputRef = useRef(null);
  const itemInputRef = useRef(null);

  // Auto-focus when editing starts
  useEffect(() => {
    if (editingCategoryId && categoryInputRef.current) {
      categoryInputRef.current.focus();
      categoryInputRef.current.select();
    }
  }, [editingCategoryId]);

  useEffect(() => {
    if (editingItemId && itemInputRef.current) {
      itemInputRef.current.focus();
      itemInputRef.current.select();
    }
  }, [editingItemId]);

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
    <Card>
      <CardHeader title="Monthly Expenses" sx={{ pb: 1 }} />

      {/* Expense Summary */}
      <CardContent sx={{ pt: 0, pb: 2 }}>
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

                  {/* Editable Category Name */}
                  {editingCategoryId === category.id ? (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Box
                        sx={{
                          bgcolor: 'white',
                          borderRadius: 1,
                          border: '2px solid #667eea',
                          px: 1,
                          py: 0.25,
                          minWidth: 100
                        }}
                      >
                        <input
                          ref={categoryInputRef}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '14px',
                            fontWeight: 600
                          }}
                          defaultValue={category.name}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingCategoryId(null);
                            } else if (e.key === 'Escape') {
                              setEditingCategoryId(null);
                            }
                          }}
                        />
                      </Box>
                      <IconButton
                        size="small"
                        sx={{ color: 'success.main' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCategoryId(null);
                        }}
                      >
                        <Box sx={{ fontSize: '14px' }}>✓</Box>
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: 'error.main' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCategoryId(null);
                        }}
                      >
                        <Box sx={{ fontSize: '14px' }}>✕</Box>
                      </IconButton>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        cursor: 'text',
                        '&:hover': {
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          outline: '1px solid rgba(102, 126, 234, 0.3)'
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategoryId(category.id);
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {category.name}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  £{getCategoryTotal(category).toLocaleString()}
                </Typography>

                {/* Delete Category Button */}
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
                      {/* Editable Item Name */}
                      {editingItemId === item.id ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: 'white',
                              borderRadius: 1,
                              border: '2px solid #667eea',
                              px: 1,
                              py: 0.25,
                              minWidth: 120
                            }}
                          >
                            <input
                              ref={itemInputRef}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                width: '100%',
                                fontSize: '14px'
                              }}
                              defaultValue={item.name}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingItemId(null);
                                } else if (e.key === 'Escape') {
                                  setEditingItemId(null);
                                }
                              }}
                            />
                          </Box>
                          <IconButton
                            size="small"
                            sx={{ color: 'success.main' }}
                            onClick={() => setEditingItemId(null)}
                          >
                            <Box sx={{ fontSize: '14px' }}>✓</Box>
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: 'error.main' }}
                            onClick={() => setEditingItemId(null)}
                          >
                            <Box sx={{ fontSize: '14px' }}>✕</Box>
                          </IconButton>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            cursor: 'text',
                            minWidth: 120,
                            '&:hover': {
                              bgcolor: 'rgba(102, 126, 234, 0.1)',
                              outline: '1px solid rgba(102, 126, 234, 0.3)'
                            }
                          }}
                          onClick={() => setEditingItemId(item.id)}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {item.name}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {/* Essential Toggle */}
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

                      {/* Flexibility Toggle - Very subtle */}
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
                          onClick={() =>
                            toggleItemFlexible(category.id, item.id)
                          }
                        >
                          {item.isFlexible ? (
                            <TuneIcon fontSize="small" />
                          ) : (
                            <LockIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: '#f8fafc',
                          borderRadius: 1,
                          border: '1px solid #e2e8f0',
                          px: 1.5,
                          py: 0.5,
                          minWidth: 80
                        }}
                      >
                        <Typography variant="body2">£</Typography>
                        <input
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '60px',
                            textAlign: 'right',
                            fontSize: '14px'
                          }}
                          defaultValue={item.amount}
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
      </CardContent>
    </Card>
  );
};

export default MonthlyExpenses;
