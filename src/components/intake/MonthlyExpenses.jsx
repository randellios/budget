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
  CardContent,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon
} from '@mui/icons-material';
import EditableField from '../EditableField';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectExpenseCategories,
  selectTotalExpenses,
  selectEssentialExpenses,
  selectNonEssentialExpenses,
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
import { selectMonthlyIncome } from '../../store/slices/incomeSlice';
import ConfirmationModal from '../ConfirmationModal';

const MonthlyExpenses = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectExpenseCategories);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  const expandedCategories = useAppSelector(selectExpandedCategories);
  const editingField = useAppSelector(selectEditingField);
  const saveError = useAppSelector(selectSaveError);
  const [localValues, setLocalValues] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const handleCloneCategory = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);

    if (category) {
      const clonedCategory = dispatch(
        addCategory({
          name: `${category.name} (Copy)`
        })
      );

      // Clone all items in the category
      category.items.forEach((item) => {
        dispatch(
          addExpenseItem({
            categoryId: clonedCategory.payload.id,
            item: {
              name: item.name,
              amount: item.amount,
              isEssential: item.isEssential
            }
          })
        );
      });
    }
    setAnchorEl(null);
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

  const handleItemMenuClick = (event, categoryId, itemId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItem({ categoryId, itemId });
    setSelectedCategory(null);
  };

  const handleCategoryMenuClick = (event, categoryId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedCategory(categoryId);
    setSelectedItem(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
    setSelectedCategory(null);
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
    setAnchorEl(null);
  };

  const handleCloneItem = (categoryId, itemId) => {
    const category = categories.find((c) => c.id === categoryId);
    const item = category?.items.find((i) => i.id === itemId);

    if (item) {
      dispatch(
        addExpenseItem({
          categoryId,
          item: {
            name: `${item.name} (Copy)`,
            amount: item.amount,
            isEssential: item.isEssential
          }
        })
      );
    }
    setAnchorEl(null);
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

  const handleManualSave = () => {
    dispatch(saveBudgetData());
  };

  const getCategoryTotal = (category) =>
    category.items.reduce((total, item) => total + item.amount, 0);

  const getCategoryEssentialTotal = (category) =>
    category.items
      .filter((item) => item.isEssential)
      .reduce((total, item) => total + item.amount, 0);

  const expensePercentage =
    monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;

  const handleInputFocus = (event) => {
    event.target.select();
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        border: '1px solid #e8ecf3',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        mb: 2,
        overflow: 'hidden'
      }}
    >
      {/* Header with gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          }
        }}
      >
        <Box
          sx={{
            p: 3,
            position: 'relative',
            zIndex: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    color: 'white',
                    lineHeight: 1.2,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Monthly Expenses
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    mt: 0.5
                  }}
                >
                  {categories.length} categories •{' '}
                  {expensePercentage.toFixed(1)}% of income
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: '2.25rem',
                  color: 'white',
                  lineHeight: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                £{totalExpenses.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Total monthly spend
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 0 }}>
        {saveError && (
          <Box
            sx={{
              m: 3,
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

        <Box sx={{ p: 3 }}>
          {categories.map((category, categoryIndex) => {
            const categoryTotal = getCategoryTotal(category);
            const essentialTotal = getCategoryEssentialTotal(category);
            const isExpanded = expandedCategories[category.id];

            return (
              <Card
                key={category.id}
                sx={{
                  mb: categoryIndex === categories.length - 1 ? 0 : 3,
                  border: '2px solid #e2e8f0',
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Category Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 3,
                    background:
                      'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    cursor: 'pointer',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
                    },
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => handleToggleCategory(category.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0',
                        '&:hover': { bgcolor: '#f8fafc' }
                      }}
                    >
                      {isExpanded ? (
                        <ExpandLessIcon fontSize="small" />
                      ) : (
                        <ExpandMoreIcon fontSize="small" />
                      )}
                    </IconButton>
                    <Box>
                      <EditableField
                        value={category.name}
                        isEditing={
                          editingField === `category-${category.id}-name`
                        }
                        onStartEdit={() =>
                          dispatch(
                            setEditingField(`category-${category.id}-name`)
                          )
                        }
                        onSave={(newValue) =>
                          handleUpdateCategoryField(
                            category.id,
                            'name',
                            newValue
                          )
                        }
                        onCancel={() => dispatch(setEditingField(null))}
                        displayVariant="h6"
                        displayTypographyProps={{
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          color: '#1f2937'
                        }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          ml: 1
                          // mt: 0.5
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#6b7280',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          {category.items.length} items
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          fontSize: '1.5rem',
                          color: '#667eea',
                          lineHeight: 1
                        }}
                      >
                        £{categoryTotal.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#6b7280',
                          fontSize: '0.75rem'
                        }}
                      >
                        monthly total
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleCategoryMenuClick(e, category.id)}
                      sx={{
                        color: '#9ca3af',
                        '&:hover': {
                          color: '#6b7280',
                          bgcolor: 'rgba(107, 114, 128, 0.1)'
                        },
                        width: 32,
                        height: 32
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Category Items */}
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box>
                    {category.items.map((item, itemIndex) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          py: 2.5,
                          px: 2,
                          border: '1px solid transparent',
                          '&:hover': {
                            bgcolor: '#f8fafc',
                            borderTop: '1px solid #e2e8f0',
                            borderBottom: '1px solid #e2e8f0'
                          }
                        }}
                      >
                        {/* Item Name */}
                        <Box sx={{ flex: 1 }}>
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
                              fontWeight: item.isEssential ? 600 : 500
                            }}
                          />
                        </Box>

                        {/* Essential Toggle - Smaller */}
                        <Tooltip
                          title={
                            item.isEssential
                              ? 'Essential expense'
                              : 'Mark as essential'
                          }
                        >
                          <IconButton
                            size="small"
                            sx={{
                              color: item.isEssential ? '#f59e0b' : '#d1d5db',
                              bgcolor: item.isEssential
                                ? '#fef3c7'
                                : 'transparent',
                              border: `1px solid ${item.isEssential ? '#f59e0b' : '#e2e8f0'}`,
                              '&:hover': {
                                color: '#f59e0b',
                                bgcolor: '#fef3c7'
                              },
                              width: 30,
                              height: 30
                            }}
                            onClick={() =>
                              handleToggleItemEssential(category.id, item.id)
                            }
                          >
                            {item.isEssential ? (
                              <StarIcon sx={{ fontSize: 16 }} />
                            ) : (
                              <StarBorderIcon sx={{ fontSize: 16 }} />
                            )}
                          </IconButton>
                        </Tooltip>

                        {/* Amount Input */}
                        <Box sx={{ width: 110 }}>
                          <TextField
                            variant="outlined"
                            size="small"
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
                            onFocus={handleInputFocus}
                            InputProps={{
                              startAdornment: (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mr: 0.5,
                                    color: '#667eea',
                                    fontWeight: 700
                                  }}
                                >
                                  £
                                </Typography>
                              )
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                                '& fieldset': {
                                  borderColor: '#e2e8f0',
                                  borderWidth: '2px'
                                },
                                '&:hover fieldset': {
                                  borderColor: '#cbd5e1'
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#667eea',
                                  borderWidth: 2,
                                  boxShadow:
                                    '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                }
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                padding: '8px 12px',
                                color: '#374151'
                              }
                            }}
                            fullWidth
                          />
                        </Box>

                        {/* Actions Menu */}
                        <IconButton
                          size="small"
                          onClick={(e) =>
                            handleItemMenuClick(e, category.id, item.id)
                          }
                          sx={{
                            color: '#9ca3af',
                            '&:hover': {
                              color: '#6b7280',
                              bgcolor: 'rgba(107, 114, 128, 0.1)'
                            },
                            width: 32,
                            height: 32
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ px: 3, pb: 3 }}>
                      <Button
                        startIcon={<AddIcon />}
                        sx={{
                          color: '#667eea',
                          fontSize: '0.875rem',
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.08)'
                          }
                        }}
                        onClick={() =>
                          handleAddItem(category.id, category.name)
                        }
                      >
                        Add {category.name.toLowerCase()} item
                      </Button>
                    </Box>
                  </Box>
                </Collapse>
              </Card>
            );
          })}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              mt: 3,
              py: 2,
              color: '#667eea',
              borderColor: '#e2e8f0',
              backgroundColor: '#f8fafc',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '2px dashed #cbd5e1',
              '&:hover': {
                backgroundColor: '#f1f5f9',
                borderColor: '#667eea',
                color: '#5a67d8'
              }
            }}
            onClick={handleAddCategory}
          >
            Add New Category
          </Button>
        </Box>
      </CardContent>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
            minWidth: 160
          }
        }}
      >
        {selectedItem && (
          <>
            <MenuItem
              onClick={() =>
                handleCloneItem(selectedItem.categoryId, selectedItem.itemId)
              }
            >
              <ListItemIcon>
                <ContentCopyIcon sx={{ color: '#667eea' }} />
              </ListItemIcon>
              <ListItemText>Clone Item</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleDeleteItem(selectedItem.categoryId, selectedItem.itemId)
              }
              sx={{ color: '#ef4444' }}
            >
              <ListItemIcon>
                <DeleteIcon sx={{ color: '#ef4444' }} />
              </ListItemIcon>
              <ListItemText>Delete Item</ListItemText>
            </MenuItem>
          </>
        )}
        {selectedCategory && (
          <>
            <MenuItem onClick={() => handleCloneCategory(selectedCategory)}>
              <ListItemIcon>
                <ContentCopyIcon sx={{ color: '#667eea' }} />
              </ListItemIcon>
              <ListItemText>Clone Category</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDeleteCategory(selectedCategory);
                setAnchorEl(null);
              }}
              sx={{ color: '#ef4444' }}
            >
              <ListItemIcon>
                <DeleteIcon sx={{ color: '#ef4444' }} />
              </ListItemIcon>
              <ListItemText>Delete Category</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>

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
