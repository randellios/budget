import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Chip,
  Collapse,
  Switch,
  Tooltip,
  Button,
  Divider,
  Paper
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectExpenseCategories } from '../store/slices/expensesSlice';
import { selectMonthlyIncome } from '../store/slices/incomeSlice';
import {
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem
} from '../store/slices/expensesSlice';
import {
  toggleCategory,
  toggleCategoryDisabled,
  toggleItemDisabled,
  selectExpandedCategories,
  selectDisabledCategories,
  selectDisabledItems
} from '../store/slices/uiSlice';
const CustomCollapse = ({ isOpen, children }) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        maxHeight: isOpen ? '1500px' : '0px',
        opacity: isOpen ? 1 : 0
      }}
    >
      {children}
    </Box>
  );
};
const ExpenseItem = React.memo(({ categoryId, itemId }) => {
  const dispatch = useAppDispatch();
  const expenseCategories = useAppSelector(selectExpenseCategories);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const disabledCategories = useAppSelector(selectDisabledCategories);
  const disabledItems = useAppSelector(selectDisabledItems);
  const item = expenseCategories[categoryId]?.items?.find(
    (i) => i.id === itemId
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [isMouseDownInEdit, setIsMouseDownInEdit] = useState(false);
  const amountInputRef = useRef(null);
  const editContainerRef = useRef(null);
  const categoryConfig = {
    needs: {
      name: 'Needs',
      icon: '🏠',
      color: '#667eea',
      description: 'Essential expenses'
    },
    basics: {
      name: 'Basics',
      icon: '⚡',
      color: '#10b981',
      description: 'Important utilities'
    },
    wants: {
      name: 'Wants',
      icon: '🍿',
      color: '#f59e0b',
      description: 'Lifestyle & entertainment'
    }
  };
  const config = categoryConfig[categoryId];
  if (!item || !config) return null;
  const isCategoryDisabled = disabledCategories[categoryId] || false;
  const isItemDisabled = disabledItems[`${categoryId}-${itemId}`] || false;
  const isDisabled = isCategoryDisabled || isItemDisabled;
  const percentageOfIncome =
    monthlyIncome > 0 ? (item.amount / monthlyIncome) * 100 : 0;
  useEffect(() => {
    setEditValue(item.name);
    setEditAmount(item.amount.toString());
  }, [item.name, item.amount]);
  useEffect(() => {
    if (isEditing && amountInputRef.current) {
      const timer = setTimeout(() => {
        if (amountInputRef.current) {
          amountInputRef.current.focus();
          amountInputRef.current.select();
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isEditing]);
  const saveAndExit = useCallback(() => {
    if (editValue.trim()) {
      dispatch(
        updateExpenseItem({
          categoryId,
          itemId,
          field: 'name',
          value: editValue.trim()
        })
      );
    }
    dispatch(
      updateExpenseItem({
        categoryId,
        itemId,
        field: 'amount',
        value: parseFloat(editAmount) || 0
      })
    );
    setIsEditing(false);
  }, [editValue, editAmount, categoryId, itemId, dispatch]);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveAndExit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setEditValue(item.name);
        setEditAmount(item.amount.toString());
        setIsEditing(false);
      }
    },
    [saveAndExit, item.name, item.amount]
  );
  const handleNameChange = useCallback((e) => {
    setEditValue(e.target.value);
  }, []);
  const handleAmountChange = useCallback((e) => {
    setEditAmount(e.target.value);
  }, []);
  const handleItemClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isDisabled && !isEditing) {
        setIsEditing(true);
      }
    },
    [isDisabled, isEditing]
  );
  const handleToggleItem = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(toggleItemDisabled({ categoryId, itemId }));
    },
    [categoryId, itemId, dispatch]
  );
  const handleDeleteClick = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(deleteExpenseItem({ categoryId, itemId }));
    },
    [categoryId, itemId, dispatch]
  );
  const handleBlur = useCallback(
    (e) => {
      if (!isMouseDownInEdit) {
        saveAndExit();
      }
    },
    [isMouseDownInEdit, saveAndExit]
  );
  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
    setIsMouseDownInEdit(true);
  }, []);
  const handleMouseUp = useCallback((e) => {
    e.stopPropagation();
    setIsMouseDownInEdit(false);
  }, []);
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsMouseDownInEdit(false);
    };
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);
  if (isEditing) {
    return (
      <Box
        ref={editContainerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1.5,
          bgcolor: '#f0f4ff',
          borderRadius: 2,
          border: '2px solid #667eea'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={(e) => e.stopPropagation()}
      >
        <TextField
          size="small"
          value={editValue}
          onChange={handleNameChange}
          placeholder="Expense name"
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              fontSize: '0.9rem',
              '& fieldset': { border: 'none' },
              '&.Mui-focused fieldset': {
                border: '2px solid #667eea',
                borderRadius: 1
              },
              '&:hover fieldset': { border: '1px solid #cbd5e1' },
              bgcolor: 'white'
            }
          }}
        />
        <TextField
          inputRef={amountInputRef}
          size="small"
          type="number"
          value={editAmount}
          onChange={handleAmountChange}
          placeholder="0"
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          sx={{
            width: 100,
            '& .MuiOutlinedInput-root': {
              fontSize: '0.9rem',
              '& fieldset': { border: 'none' },
              '&.Mui-focused fieldset': {
                border: '2px solid #667eea',
                borderRadius: 1
              },
              '&:hover fieldset': { border: '1px solid #cbd5e1' },
              bgcolor: 'white'
            }
          }}
        />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        position: 'relative',
        p: 1.5,
        borderRadius: 2,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'default' : 'pointer',
        '&:hover': {
          bgcolor: isDisabled ? 'transparent' : '#f8fafc',
          '& .item-actions': { opacity: 1, visibility: 'visible' }
        },
        transition: 'all 0.2s ease'
      }}
      onClick={handleItemClick}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '-5px'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            fontSize: '0.9rem',
            color: isDisabled ? '#9ca3af' : '#374151',
            '&:hover': { color: config.color }
          }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            color: isDisabled ? '#9ca3af' : config.color
          }}
        >
          £{item.amount}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: '#9ca3af', fontSize: '0.75rem', mt: 1, fontWeight: 500 }}
        >
          {percentageOfIncome.toFixed(1)}% of income
        </Typography>
        <Box
          className="item-actions"
          sx={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            display: 'flex',
            gap: 0.5,
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.2s ease'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title={isItemDisabled ? 'Enable item' : 'Disable item'}>
            <IconButton
              onClick={handleToggleItem}
              sx={{
                color: isItemDisabled ? '#9ca3af' : '#6b7280',
                '&:hover': { bgcolor: '#f9fafb' },
                p: 0.5
              }}
            >
              {isItemDisabled ? (
                <VisibilityOffIcon sx={{ fontSize: 18 }} />
              ) : (
                <VisibilityIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete item">
            <IconButton
              size="small"
              onClick={handleDeleteClick}
              sx={{
                color: '#ef4444',
                '&:hover': { bgcolor: '#fef2f2' },
                p: 0.5
              }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
});
const MonthlyExpenses = () => {
  const dispatch = useAppDispatch();
  const expenseCategories = useAppSelector(selectExpenseCategories);
  const expandedCategories = useAppSelector(selectExpandedCategories);
  const disabledCategories = useAppSelector(selectDisabledCategories);
  const disabledItems = useAppSelector(selectDisabledItems);
  const [newItemName, setNewItemName] = useState({});
  const [addingToCategory, setAddingToCategory] = useState(null);
  const categoryConfig = {
    needs: {
      name: 'Needs',
      icon: '🏠',
      color: '#667eea',
      description: 'Essential expenses'
    },
    basics: {
      name: 'Basics',
      icon: '⚡',
      color: '#10b981',
      description: 'Important utilities'
    },
    wants: {
      name: 'Wants',
      icon: '🍿',
      color: '#f59e0b',
      description: 'Lifestyle & entertainment'
    }
  };
  const handleToggleCategory = useCallback(
    (categoryId) => {
      dispatch(toggleCategory(categoryId));
    },
    [dispatch]
  );
  const handleToggleCategoryEnabled = useCallback(
    (categoryId) => {
      dispatch(toggleCategoryDisabled(categoryId));
    },
    [dispatch]
  );
  const handleAddItem = useCallback(
    (categoryId) => {
      const name = newItemName[categoryId]?.trim();
      if (name) {
        dispatch(addExpenseItem({ categoryId, item: { name, amount: 0 } }));
        setNewItemName((prev) => ({ ...prev, [categoryId]: '' }));
        setAddingToCategory(null);
      }
    },
    [dispatch, newItemName]
  );
  const getCategoryTotal = useCallback(
    (categoryId) => {
      const category = expenseCategories[categoryId];
      if (!category || disabledCategories[categoryId]) return 0;
      return category.items.reduce((total, item) => {
        const itemKey = `${categoryId}-${item.id}`;
        const isItemDisabled = disabledItems[itemKey] || false;
        if (isItemDisabled) return total;
        return total + item.amount;
      }, 0);
    },
    [expenseCategories, disabledCategories, disabledItems]
  );
  const CategoryHeader = React.memo(
    ({ categoryId, config, total, itemCount }) => {
      const isCategoryDisabled = disabledCategories[categoryId] || false;
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 2,
            cursor: 'pointer',
            borderRadius: 2,
            position: 'relative',
            '&:hover': {
              bgcolor: '#f8fafc',
              '& .category-hide-button': { opacity: 1, visibility: 'visible' }
            },
            transition: 'background-color 0.2s ease'
          }}
          onClick={() => handleToggleCategory(categoryId)}
        >
          <Box sx={{ fontSize: '20px' }}>{config.icon}</Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: isCategoryDisabled ? '#9ca3af' : '#374151',
                opacity: isCategoryDisabled ? 0.6 : 1
              }}
            >
              {config.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#6b7280', fontSize: '0.8rem' }}
            >
              {itemCount} items • £{total.toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              position: 'relative'
            }}
          >
            <Tooltip
              title={
                isCategoryDisabled ? 'Enable category' : 'Disable category'
              }
            >
              <IconButton
                className="category-hide-button"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleCategoryEnabled(categoryId);
                }}
                sx={{
                  position: 'absolute',
                  right: 90,
                  opacity: isCategoryDisabled ? 1 : 0,
                  visibility: isCategoryDisabled ? 'visible' : 'hidden',
                  transition: 'all 0.2s ease',
                  color: isCategoryDisabled ? '#ef4444' : '#6b7280',
                  bgcolor: 'white',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': { bgcolor: '#f8fafc', transform: 'scale(1.05)' }
                }}
              >
                {isCategoryDisabled ? (
                  <VisibilityOffIcon sx={{ fontSize: 16 }} />
                ) : (
                  <VisibilityIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: '0.9rem',
                color: config.color,
                opacity: isCategoryDisabled ? 0.5 : 1
              }}
            >
              £{total}
            </Typography>
            <IconButton size="small" sx={{ color: '#6b7280' }}>
              {expandedCategories[categoryId] ? (
                <ExpandLessIcon sx={{ fontSize: 20 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          </Box>
        </Box>
      );
    }
  );
  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          color: '#6b7280',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          mb: 2,
          display: 'block'
        }}
      >
        Monthly Expenses
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Object.entries(categoryConfig).map(([categoryId, config]) => {
          const category = expenseCategories[categoryId];
          const total = getCategoryTotal(categoryId);
          const itemCount = category?.items?.length || 0;
          const isExpanded = expandedCategories[categoryId] !== false;
          return (
            <Paper
              key={categoryId}
              sx={{
                border: '1px solid #e2e8f0',
                borderRadius: 3,
                overflow: 'visible',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <CategoryHeader
                categoryId={categoryId}
                config={config}
                total={total}
                itemCount={itemCount}
              />
              <CustomCollapse isOpen={isExpanded}>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Divider sx={{ mb: 1.5, borderColor: '#f1f5f9' }} />
                  {category?.items?.map((item) => (
                    <ExpenseItem
                      key={`${categoryId}-${item.id}`}
                      categoryId={categoryId}
                      itemId={item.id}
                    />
                  ))}
                  {addingToCategory === categoryId ? (
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <TextField
                        size="small"
                        fullWidth
                        value={newItemName[categoryId] || ''}
                        onChange={(e) =>
                          setNewItemName((prev) => ({
                            ...prev,
                            [categoryId]: e.target.value
                          }))
                        }
                        placeholder="Enter expense name..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleAddItem(categoryId);
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': { fontSize: '0.9rem' }
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleAddItem(categoryId)}
                        sx={{ color: '#10b981' }}
                      >
                        <CheckIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setAddingToCategory(null);
                          setNewItemName((prev) => ({
                            ...prev,
                            [categoryId]: ''
                          }));
                        }}
                        sx={{ color: '#ef4444' }}
                      >
                        <CloseIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button
                      size="small"
                      startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                      onClick={() => setAddingToCategory(categoryId)}
                      sx={{
                        mt: 1,
                        color: config.color,
                        fontSize: '0.8rem',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': { bgcolor: `${config.color}08` }
                      }}
                    >
                      Add expense
                    </Button>
                  )}
                </Box>
              </CustomCollapse>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};
export default MonthlyExpenses;
