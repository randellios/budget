// src/components/intake/MonthlyExpenses.jsx (updated)
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
import { useDebouncedCallback } from 'use-debounce';
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
import SaveStatusIndicator from '../SaveStatusIndicator';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectExpenseCategories,
  selectTotalExpenses,
  addCategory,
  updateCategory,
  deleteCategory,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
  toggleItemEssential,
  toggleItemFlexible
} from '../../store/slices/expensesSlice';
import {
  selectExpandedCategories,
  selectEditingField,
  toggleCategory,
  setEditingField
} from '../../store/slices/uiSlice';
import {
  selectSaveError,
  saveBudgetData,
  clearSaveError
} from '../../store/slices/apiSlice';
import ConfirmationModal from '../ConfirmationModal';
const MonthlyExpenses = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectExpenseCategories);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const expandedCategories = useAppSelector(selectExpandedCategories);
  const editingField = useAppSelector(selectEditingField);
  const saveError = useAppSelector(selectSaveError);
  const [isExpanded, setIsExpanded] = useState(true);
  const [localValues, setLocalValues] = useState({});
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const debouncedUpdateItem = useDebouncedCallback(
    ({ categoryId, itemId, field, value }) => {
      dispatch(updateExpenseItem({ categoryId, itemId, field, value }));
    },
    500
  );
  const debouncedUpdateCategory = useDebouncedCallback(
    ({ categoryId, field, value }) => {
      dispatch(updateCategory({ categoryId, field, value }));
    },
    500
  );
  useEffect(() => {
    if (saveError) {
      const timer = setTimeout(() => {
        dispatch(clearSaveError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [saveError, dispatch]);
  const handleToggleCategory = (categoryId) => {
    dispatch(toggleCategory(categoryId));
  };
  const handleDeleteCategory = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    const itemCount = category?.items?.length || 0;

    setConfirmModal({
      open: true,
      title: 'Delete Category',
      message: `Are you sure you want to delete "${category?.name}"?${itemCount > 0 ? ` This will also delete ${itemCount} expense item${itemCount === 1 ? '' : 's'}.` : ''} This action cannot be undone.`,
      onConfirm: () => {
        dispatch(deleteCategory(categoryId));
        setConfirmModal((prev) => ({ ...prev, open: false }));
      }
    });
  };

  const handleUpdateCategoryField = (categoryId, field, newValue) => {
    dispatch(updateCategory({ categoryId, field, value: newValue }));
    dispatch(setEditingField(null));
  };
  const handleUpdateItemField = (categoryId, itemId, field, newValue) => {
    dispatch(updateExpenseItem({ categoryId, itemId, field, value: newValue }));
    dispatch(setEditingField(null));
  };
  const handleItemAmountChange = (categoryId, itemId, value) => {
    const key = `${categoryId}-${itemId}`;
    setLocalValues((prev) => ({ ...prev, [key]: value }));
    debouncedUpdateItem({ categoryId, itemId, field: 'amount', value });
  };
  const getItemValue = (categoryId, itemId, originalValue) => {
    const key = `${categoryId}-${itemId}`;
    return localValues[key] !== undefined ? localValues[key] : originalValue;
  };
  const handleToggleItemEssential = (categoryId, itemId) => {
    dispatch(toggleItemEssential({ categoryId, itemId }));
  };
  const handleToggleItemFlexible = (categoryId, itemId) => {
    dispatch(toggleItemFlexible({ categoryId, itemId }));
  };
  const handleAddCategory = () => {
    dispatch(addCategory({ name: 'New Category', icon: '📝' }));
  };
  const handleAddItem = (categoryId, categoryName) => {
    dispatch(
      addExpenseItem({
        categoryId,
        item: {
          name: `New ${categoryName.toLowerCase()}`,
          amount: 0,
          isEssential: false,
          isFlexible: true
        }
      })
    );
  };
  const handleDeleteItem = (categoryId, itemId) => {
    if (window.confirm('Are you sure you want to delete this expense item?')) {
      dispatch(deleteExpenseItem({ categoryId, itemId }));
      const key = `${categoryId}-${itemId}`;
      setLocalValues((prev) => {
        const newValues = { ...prev };
        delete newValues[key];
        return newValues;
      });
    }
  };
  const handleManualSave = () => {
    dispatch(saveBudgetData());
  };
  const getCategoryTotal = (category) =>
    category.items.reduce((total, item) => total + item.amount, 0);
  const totalItems = categories.reduce(
    (total, category) => total + category.items.length,
    0
  );
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
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}
            >
              Monthly Expenses
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
              >
                £{totalExpenses.toLocaleString()} • {categories.length}{' '}
                categories
              </Typography>
              <SaveStatusIndicator
                showManualSave={false}
                size="small"
                context="expenses"
              />
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
      {categories.map((category) => (
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
            onClick={() => handleToggleCategory(category.id)}
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
                    dispatch(setEditingField(`category-${category.id}-name`))
                  }
                  onSave={(newValue) =>
                    handleUpdateCategoryField(category.id, 'name', newValue)
                  }
                  onCancel={() => dispatch(setEditingField(null))}
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
                    handleDeleteCategory(category.id);
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
                        dispatch(setEditingField(`item-${item.id}-name`))
                      }
                      onSave={(newValue) =>
                        handleUpdateItemField(
                          category.id,
                          item.id,
                          'name',
                          newValue
                        )
                      }
                      onCancel={() => dispatch(setEditingField(null))}
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
                          handleToggleItemEssential(category.id, item.id)
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
                        onClick={() =>
                          handleToggleItemFlexible(category.id, item.id)
                        }
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
                        value={getItemValue(category.id, item.id, item.amount)}
                        onChange={(e) =>
                          handleItemAmountChange(
                            category.id,
                            item.id,
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
                    <IconButton
                      size="small"
                      sx={{ color: 'error.main' }}
                      onClick={() => handleDeleteItem(category.id, item.id)}
                    >
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
                onClick={() => handleAddItem(category.id, category.name)}
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
        onClick={handleAddCategory}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.75rem' }}
            >
              {categories.length} categories • {totalItems} items
            </Typography>
            <SaveStatusIndicator showManualSave={false} size="small" />
          </Box>
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
export default MonthlyExpenses;
