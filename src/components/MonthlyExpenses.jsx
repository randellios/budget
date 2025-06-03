import React, { useState } from 'react';
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
import {
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem
} from '../store/slices/expensesSlice';

const MonthlyExpenses = () => {
  const dispatch = useAppDispatch();
  const expenseCategories = useAppSelector(selectExpenseCategories);

  const [expandedCategories, setExpandedCategories] = useState({
    needs: true,
    basics: true,
    wants: true
  });
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [newItemName, setNewItemName] = useState({});
  const [addingToCategory, setAddingToCategory] = useState(null);
  const [disabledCategories, setDisabledCategories] = useState({});
  const [disabledItems, setDisabledItems] = useState({});

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

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleCategoryEnabled = (categoryId) => {
    setDisabledCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleItemEnabled = (categoryId, itemId) => {
    const key = `${categoryId}-${itemId}`;
    setDisabledItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const startEditing = (categoryId, item) => {
    setEditingItem(`${categoryId}-${item.id}`);
    setEditValue(item.name);
    setEditAmount(item.amount.toString());
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditValue('');
    setEditAmount('');
  };

  const saveEdit = (categoryId, itemId) => {
    dispatch(
      updateExpenseItem({
        categoryId,
        itemId,
        field: 'name',
        value: editValue
      })
    );
    dispatch(
      updateExpenseItem({
        categoryId,
        itemId,
        field: 'amount',
        value: parseFloat(editAmount) || 0
      })
    );
    setEditingItem(null);
    setEditValue('');
    setEditAmount('');
  };

  const handleAddItem = (categoryId) => {
    const name = newItemName[categoryId]?.trim();
    if (name) {
      dispatch(
        addExpenseItem({
          categoryId,
          item: { name, amount: 0 }
        })
      );
      setNewItemName((prev) => ({ ...prev, [categoryId]: '' }));
      setAddingToCategory(null);
    }
  };

  const handleDeleteItem = (categoryId, itemId) => {
    dispatch(deleteExpenseItem({ categoryId, itemId }));
  };

  const getCategoryTotal = (categoryId) => {
    const category = expenseCategories[categoryId];
    if (!category || disabledCategories[categoryId]) return 0;

    return category.items.reduce((total, item) => {
      const key = `${categoryId}-${item.id}`;
      if (disabledItems[key]) return total;
      return total + item.amount;
    }, 0);
  };

  const CategoryHeader = ({ categoryId, config, total, itemCount }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 2,
        cursor: 'pointer',
        borderRadius: 2,
        '&:hover': { bgcolor: '#f8fafc' },
        transition: 'background-color 0.2s ease'
      }}
      onClick={() => toggleCategory(categoryId)}
    >
      <Box sx={{ fontSize: '20px' }}>{config.icon}</Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            color: disabledCategories[categoryId] ? '#9ca3af' : '#374151',
            opacity: disabledCategories[categoryId] ? 0.6 : 1
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

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            color: config.color,
            opacity: disabledCategories[categoryId] ? 0.5 : 1
          }}
        >
          £{total}
        </Typography>

        <Tooltip
          title={
            disabledCategories[categoryId]
              ? 'Enable category'
              : 'Disable category'
          }
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleCategoryEnabled(categoryId);
            }}
            sx={{
              color: disabledCategories[categoryId] ? '#9ca3af' : config.color
            }}
          >
            {disabledCategories[categoryId] ? (
              <VisibilityOffIcon sx={{ fontSize: 18 }} />
            ) : (
              <VisibilityIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Tooltip>

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

  const ExpenseItem = ({ categoryId, item, config }) => {
    const isEditing = editingItem === `${categoryId}-${item.id}`;
    const isDisabled =
      disabledItems[`${categoryId}-${item.id}`] ||
      disabledCategories[categoryId];

    if (isEditing) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1.5,
            bgcolor: '#f0f4ff',
            borderRadius: 2,
            border: '2px solid #667eea'
          }}
        >
          <TextField
            size="small"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="Expense name"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.9rem',
                '& fieldset': { border: 'none' },
                bgcolor: 'white'
              }
            }}
          />
          <TextField
            size="small"
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            placeholder="0"
            sx={{
              width: 70,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.9rem',
                '& fieldset': { border: 'none' },
                bgcolor: 'white'
              }
            }}
          />
          <IconButton
            size="small"
            onClick={() => saveEdit(categoryId, item.id)}
            sx={{ color: '#10b981' }}
          >
            <CheckIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={cancelEdit}
            sx={{ color: '#ef4444' }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
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
          '&:hover': {
            bgcolor: isDisabled ? 'transparent' : '#f8fafc',
            '& .item-actions': {
              opacity: 1,
              visibility: 'visible'
            }
          },
          transition: 'all 0.2s ease'
        }}
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
              cursor: 'pointer',
              '&:hover': { color: config.color }
            }}
            onClick={() => !isDisabled && startEditing(categoryId, item)}
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
            sx={{ color: '#9ca3af', fontSize: '0.8rem', mt: 1 }}
          >
            20%
          </Typography>

          <Box
            className="item-actions"
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              display: 'flex',
              gap: 0.5,
              opacity: 0,
              visibility: 'hidden',
              transition: 'all 0.2s ease',
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              p: 0.5,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Tooltip title={isDisabled ? 'Enable item' : 'Disable item'}>
              <IconButton
                size="small"
                onClick={() => toggleItemEnabled(categoryId, item.id)}
                sx={{
                  color: isDisabled ? '#9ca3af' : '#6b7280',
                  '&:hover': { bgcolor: '#f9fafb' },
                  p: 0.5
                }}
              >
                {isDisabled ? (
                  <VisibilityOffIcon sx={{ fontSize: 14 }} />
                ) : (
                  <VisibilityIcon sx={{ fontSize: 14 }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete item">
              <IconButton
                size="small"
                onClick={() => handleDeleteItem(categoryId, item.id)}
                sx={{
                  color: '#ef4444',
                  '&:hover': { bgcolor: '#fef2f2' },
                  p: 0.5
                }}
              >
                <DeleteIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    );
  };

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

              <Collapse in={expandedCategories[categoryId]}>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Divider sx={{ mb: 1.5, borderColor: '#f1f5f9' }} />

                  {category?.items?.map((item) => (
                    <ExpenseItem
                      key={item.id}
                      categoryId={categoryId}
                      item={item}
                      config={config}
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
                          '& .MuiOutlinedInput-root': {
                            fontSize: '0.9rem'
                          }
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
              </Collapse>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default MonthlyExpenses;
