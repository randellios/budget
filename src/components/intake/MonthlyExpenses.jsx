import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Collapse,
  Tooltip,
  TextField,
  Typography,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
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
  toggleItemEssential
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

  const handleAddCategory = () => {
    dispatch(addCategory({ name: 'New Category' }));
  };

  const handleAddItem = (categoryId, categoryName) => {
    dispatch(
      addExpenseItem({
        categoryId,
        item: {
          name: `New ${categoryName.toLowerCase()}`,
          amount: 0,
          isEssential: false
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

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        mb: 2
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)',
            borderBottom: '1px solid #e8ecf3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#1f2937',
                  lineHeight: 1.2
                }}
              >
                Monthly Expenses
              </Typography>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  £{totalExpenses.toLocaleString()} • {categories.length}{' '}
                  categories
                </Typography>
                <SaveStatusIndicator context="expenses" />
              </Box>
            </Box>
          </Box>
          <Chip
            label={`£${totalExpenses.toLocaleString()}`}
            sx={{
              backgroundColor: '#e0e7ff',
              color: '#3730a3',
              fontSize: '0.875rem',
              fontWeight: 600,
              height: 32,
              px: 1
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {saveError && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                backgroundColor: '#fef2f2',
                border: '1px solid #fca5a5',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: '#dc2626', fontSize: '0.875rem' }}
              >
                Failed to save: {saveError}
              </Typography>
              <Button
                size="small"
                onClick={handleManualSave}
                sx={{
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  minWidth: 'auto'
                }}
              >
                Retry
              </Button>
            </Box>
          )}

          {categories.map((category, categoryIndex) => (
            <Box
              key={category.id}
              sx={{
                mb: categoryIndex === categories.length - 1 ? 0 : 3,
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                overflow: 'hidden',
                background: '#ffffff'
              }}
            >
              {/* Category Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2.5,
                  bgcolor: '#f8fafc',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#f1f5f9'
                  },
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => handleToggleCategory(category.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton size="small" sx={{ color: '#64748b' }}>
                    {expandedCategories[category.id] ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </IconButton>
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
                    displayVariant="h6"
                    displayTypographyProps={{
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#64748b'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: '#667eea'
                    }}
                  >
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

              {/* Category Items */}
              <Collapse
                in={expandedCategories[category.id]}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ p: 2.5, pt: 0 }}>
                  {category.items.map((item, itemIndex) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        py: 2.5,
                        borderBottom:
                          itemIndex === category.items.length - 1
                            ? 'none'
                            : '1px solid #f1f5f9',
                        '&:hover': {
                          bgcolor: '#f8fafc',
                          borderRadius: 1,
                          mx: -1,
                          px: 1
                        }
                      }}
                    >
                      {/* Item Name - Takes most space */}
                      <Box sx={{ flex: 1, mr: 3 }}>
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
                          displayVariant="body1"
                          displayTypographyProps={{
                            color: '#374151',
                            fontSize: '1rem',
                            fontWeight: 500
                          }}
                        />
                      </Box>

                      {/* Essential Icon */}
                      <Box sx={{ mr: 2 }}>
                        <Tooltip
                          title={
                            item.isEssential
                              ? 'Essential expense'
                              : 'Optional expense'
                          }
                        >
                          <IconButton
                            size="small"
                            sx={{
                              color: item.isEssential ? '#f59e0b' : '#d1d5db',
                              '&:hover': {
                                color: item.isEssential ? '#d97706' : '#f59e0b',
                                bgcolor: 'rgba(245, 158, 11, 0.1)'
                              },
                              width: 36,
                              height: 36
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
                      </Box>

                      {/* Delete Icon */}
                      <Box sx={{ mr: 2 }}>
                        <Tooltip title="Delete item">
                          <IconButton
                            size="small"
                            sx={{
                              color: '#d1d5db',
                              '&:hover': {
                                color: '#ef4444',
                                bgcolor: 'rgba(239, 68, 68, 0.1)'
                              },
                              width: 36,
                              height: 36
                            }}
                            onClick={() =>
                              handleDeleteItem(category.id, item.id)
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Amount Input - Rightmost */}
                      <Box sx={{ width: 140 }}>
                        <TextField
                          variant="outlined"
                          size="medium"
                          type="number"
                          value={getItemValue(
                            category.id,
                            item.id,
                            item.amount
                          )}
                          onChange={(e) =>
                            handleItemAmountChange(
                              category.id,
                              item.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          InputProps={{
                            startAdornment: (
                              <Typography
                                variant="body1"
                                sx={{
                                  mr: 0.5,
                                  color: '#6b7280',
                                  fontWeight: 600
                                }}
                              >
                                £
                              </Typography>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              height: '48px',
                              '& fieldset': {
                                borderColor: '#e2e8f0',
                                borderWidth: '1.5px'
                              },
                              '&:hover fieldset': {
                                borderColor: '#cbd5e1'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea',
                                borderWidth: 2
                              }
                            },
                            '& input': {
                              fontSize: '1rem',
                              fontWeight: 600,
                              textAlign: 'right',
                              padding: '12px 8px'
                            }
                          }}
                          fullWidth
                        />
                      </Box>
                    </Box>
                  ))}
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{
                      mt: 2,
                      color: '#667eea',
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: 'rgba(102, 126, 234, 0.08)'
                      }
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
              mt: 3,
              py: 1.5,
              color: '#6b7280',
              borderColor: '#e2e8f0',
              backgroundColor: '#f8fafc',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#f1f5f9',
                borderColor: '#cbd5e1',
                color: '#374151'
              }
            }}
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </Box>
      </CardContent>

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
    </Card>
  );
};

export default MonthlyExpenses;
