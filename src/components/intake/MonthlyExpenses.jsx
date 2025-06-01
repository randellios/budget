import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Collapse,
  TextField,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  DragIndicator as DragIcon
} from '@mui/icons-material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditableField from '../EditableField';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  selectExpenseCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
  toggleItemEssential,
  moveCategoryUp,
  moveCategoryDown,
  reorderExpenseItems
} from '../../store/slices/expensesSlice';
import {
  selectExpandedCategories,
  selectEditingField,
  toggleCategory,
  setEditingField
} from '../../store/slices/uiSlice';
import ConfirmationModal from '../ConfirmationModal';

const SortableItem = ({
  item,
  categoryId,
  editingField,
  onUpdateField,
  onToggleEssential,
  onAmountChange,
  onMenuClick,
  getItemValue,
  handleInputFocus
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `${categoryId}-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: 'grid',
        gridTemplateColumns: '18px 1fr 34px 95px 26px',
        gap: 1,
        alignItems: 'center',
        py: 1.25,
        pl: 2,
        pr: 1,
        // mr: 1,
        borderRadius: 1,
        '&:hover': {
          bgcolor: '#f8fafc'
        }
      }}
    >
      {/* Drag Handle */}
      <Box
        {...attributes}
        {...listeners}
        sx={{
          cursor: isDragging ? 'grabbing' : 'grab',
          color: '#9ca3af',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'none',
          '&:hover': { color: '#6b7280' }
        }}
      >
        <DragIcon sx={{ fontSize: 18 }} />
      </Box>

      {/* Name */}
      <Box sx={{ minWidth: 0 }}>
        <EditableField
          value={item.name}
          isEditing={editingField === `item-${item.id}-name`}
          onStartEdit={() => onUpdateField(`item-${item.id}-name`)}
          onSave={(newValue) =>
            onUpdateField(categoryId, item.id, 'name', newValue)
          }
          onCancel={() => onUpdateField(null)}
          displayVariant="body2"
          displayTypographyProps={{
            color: '#374151',
            fontSize: '0.95rem',
            fontWeight: 500,
            noWrap: true
          }}
          containerStyle={{
            minWidth: 'unset',
            width: '100%',
            px: 0
          }}
          inputStyle={{
            fontSize: '0.95rem',
            fontWeight: 500
          }}
        />
      </Box>

      {/* Essential Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          size="small"
          sx={{
            color: item.isEssential ? '#f59e0b' : '#d1d5db',
            width: 28,
            height: 28,
            '&:hover': {
              color: '#f59e0b',
              bgcolor: 'rgba(245, 158, 11, 0.1)'
            }
          }}
          onClick={() => onToggleEssential(categoryId, item.id)}
        >
          {item.isEssential ? (
            <StarIcon sx={{ fontSize: 15 }} />
          ) : (
            <StarBorderIcon sx={{ fontSize: 15 }} />
          )}
        </IconButton>
      </Box>

      {/* Amount Input */}
      <Box>
        <TextField
          variant="outlined"
          size="small"
          type="number"
          value={getItemValue(categoryId, item.id, item.amount)}
          onChange={(e) =>
            onAmountChange(categoryId, item.id, parseFloat(e.target.value) || 0)
          }
          onFocus={handleInputFocus}
          InputProps={{
            startAdornment: (
              <Typography
                variant="body2"
                sx={{
                  mr: 0.5,
                  fontSize: '0.85rem',
                  color: '#667eea',
                  fontWeight: 600
                }}
              >
                £
              </Typography>
            )
          }}
          sx={{
            width: 100,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e2e8f0'
              },
              '&:hover fieldset': {
                borderColor: '#cbd5e1'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#667eea'
              }
            },
            '& .MuiInputBase-input': {
              fontSize: '0.95rem',
              fontWeight: 600,
              textAlign: 'right',
              padding: '8px 10px'
            }
          }}
        />
      </Box>

      {/* Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          size="small"
          onClick={(e) => onMenuClick(e, categoryId, item.id)}
          sx={{
            color: '#9ca3af',
            width: 24,
            height: 24,
            '&:hover': { color: '#6b7280' }
          }}
        >
          <MoreVertIcon sx={{ fontSize: 17 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const MonthlyExpenses = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectExpenseCategories);
  const expandedCategories = useAppSelector(selectExpandedCategories);
  const editingField = useAppSelector(selectEditingField);
  const [localValues, setLocalValues] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const debouncedUpdateItem = useDebouncedCallback(
    ({ categoryId, itemId, field, value }) => {
      dispatch(updateExpenseItem({ categoryId, itemId, field, value }));
    },
    500
  );

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const [sourceCategoryId, sourceItemId] = active.id.split('-').map(Number);
    const [targetCategoryId, targetItemId] = over.id.split('-').map(Number);
    const sourceCategory = categories.find((c) => c.id === sourceCategoryId);
    const targetCategory = categories.find((c) => c.id === targetCategoryId);

    if (!sourceCategory || !targetCategory) {
      setActiveId(null);
      return;
    }

    const sourceIndex = sourceCategory.items.findIndex(
      (item) => item.id === sourceItemId
    );
    const targetIndex = targetCategory.items.findIndex(
      (item) => item.id === targetItemId
    );

    dispatch(
      reorderExpenseItems({
        sourceCategoryId,
        targetCategoryId,
        sourceIndex,
        targetIndex
      })
    );
    setActiveId(null);
  };

  const handleToggleCategory = (categoryId) =>
    dispatch(toggleCategory(categoryId));
  const handleMoveCategoryUp = (categoryId) => {
    dispatch(moveCategoryUp(categoryId));
    setAnchorEl(null);
  };
  const handleMoveCategoryDown = (categoryId) => {
    dispatch(moveCategoryDown(categoryId));
    setAnchorEl(null);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    const itemCount = category?.items?.length || 0;
    setConfirmModal({
      open: true,
      title: 'Delete Category',
      message: `Are you sure you want to delete "${category?.name}"?${itemCount > 0 ? ` This will also delete ${itemCount} expense item${itemCount === 1 ? '' : 's'}.` : ''}`,
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
    if (typeof categoryId === 'string') {
      dispatch(setEditingField(categoryId));
      return;
    }
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

  const handleToggleItemEssential = (categoryId, itemId) =>
    dispatch(toggleItemEssential({ categoryId, itemId }));

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

  const handleAddCategory = () =>
    dispatch(addCategory({ name: 'New Category' }));
  const handleAddItem = (categoryId) =>
    dispatch(
      addExpenseItem({
        categoryId,
        item: { name: 'New expense', amount: 0, isEssential: false }
      })
    );

  const getCategoryTotal = (category) =>
    category.items.reduce((total, item) => total + item.amount, 0);

  const handleInputFocus = (event) => event.target.select();

  const getActiveItem = () => {
    if (!activeId) return null;
    const [categoryId, itemId] = activeId.split('-').map(Number);
    const category = categories.find((c) => c.id === categoryId);
    return category?.items.find((item) => item.id === itemId);
  };

  return (
    <Box sx={{ mx: -1.5 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {categories.map((category) => {
          const categoryTotal = getCategoryTotal(category);
          const isExpanded = expandedCategories[category.id];
          const sortableItems = category.items.map(
            (item) => `${category.id}-${item.id}`
          );

          return (
            <Box
              key={category.id}
              sx={{
                mb: 2,
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'white'
              }}
            >
              {/* Category Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1.75,
                  px: 1.5,
                  bgcolor: '#f8fafc',
                  cursor: 'pointer',
                  borderBottom: isExpanded ? '1px solid #e2e8f0' : 'none'
                }}
                onClick={() => handleToggleCategory(category.id)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{ color: '#6b7280', width: 28, height: 28 }}
                  >
                    {isExpanded ? (
                      <ExpandLessIcon sx={{ fontSize: 19 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: 19 }} />
                    )}
                  </IconButton>
                  <Box sx={{ maxWidth: 120 }}>
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
                        handleUpdateCategoryField(category.id, 'name', newValue)
                      }
                      onCancel={() => dispatch(setEditingField(null))}
                      displayVariant="body1"
                      displayTypographyProps={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: '#374151'
                      }}
                      containerStyle={{
                        minWidth: 80,
                        width: '100%',
                        px: 0
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#667eea'
                    }}
                  >
                    £{categoryTotal.toLocaleString()}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleCategoryMenuClick(e, category.id)}
                    sx={{ color: '#9ca3af', width: 24, height: 24 }}
                  >
                    <MoreVertIcon sx={{ fontSize: 17 }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Category Items */}
              <Collapse in={isExpanded}>
                <Box sx={{ py: 1.25 }}>
                  {/* Column Headers */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '18px 1fr 34px 95px 26px',
                      gap: 1,
                      alignItems: 'center',
                      px: 1,
                      py: 0.75,
                      mb: 0.5,
                      ml: 2
                    }}
                  >
                    <Box></Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      NAME
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textAlign: 'center'
                      }}
                    >
                      ESS
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      AMOUNT
                    </Typography>
                    <Box></Box>
                  </Box>

                  <SortableContext
                    items={sortableItems}
                    strategy={verticalListSortingStrategy}
                  >
                    {category.items.map((item) => (
                      <SortableItem
                        key={`${category.id}-${item.id}`}
                        item={item}
                        categoryId={category.id}
                        editingField={editingField}
                        onUpdateField={handleUpdateItemField}
                        onToggleEssential={handleToggleItemEssential}
                        onAmountChange={handleItemAmountChange}
                        onMenuClick={handleItemMenuClick}
                        getItemValue={getItemValue}
                        handleInputFocus={handleInputFocus}
                      />
                    ))}
                  </SortableContext>

                  <Box sx={{ px: 1, pt: 1.25 }}>
                    <Button
                      startIcon={<AddIcon sx={{ fontSize: 17 }} />}
                      onClick={() => handleAddItem(category.id)}
                      sx={{
                        fontSize: '0.85rem',
                        textTransform: 'none',
                        color: '#667eea',
                        minHeight: 36,
                        py: 1,
                        '&:hover': { bgcolor: '#f0f4ff' }
                      }}
                    >
                      Add expense
                    </Button>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          );
        })}

        <DragOverlay>
          {activeId ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                border: '2px solid #667eea',
                minWidth: 200
              }}
            >
              <DragIcon sx={{ color: '#667eea', fontSize: 18 }} />
              <Typography
                sx={{ fontWeight: 600, color: '#374151', fontSize: '0.95rem' }}
              >
                {getActiveItem()?.name}
              </Typography>
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>

      <Box sx={{ px: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon sx={{ fontSize: 17 }} />}
          onClick={handleAddCategory}
          sx={{
            mt: 2,
            textTransform: 'none',
            fontSize: '0.85rem',
            borderColor: '#e2e8f0',
            color: '#6b7280',
            minHeight: 40,
            py: 1.25,
            '&:hover': {
              borderColor: '#667eea',
              color: '#667eea',
              bgcolor: '#f0f4ff'
            }
          }}
        >
          Add Category
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
            {categories.findIndex((c) => c.id === selectedCategory) > 0 && (
              <MenuItem onClick={() => handleMoveCategoryUp(selectedCategory)}>
                <ListItemIcon>
                  <ArrowUpIcon sx={{ color: '#667eea' }} />
                </ListItemIcon>
                <ListItemText>Move Up</ListItemText>
              </MenuItem>
            )}
            {categories.findIndex((c) => c.id === selectedCategory) <
              categories.length - 1 && (
              <MenuItem
                onClick={() => handleMoveCategoryDown(selectedCategory)}
              >
                <ListItemIcon>
                  <ArrowDownIcon sx={{ color: '#667eea' }} />
                </ListItemIcon>
                <ListItemText>Move Down</ListItemText>
              </MenuItem>
            )}
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
    </Box>
  );
};

export default MonthlyExpenses;
