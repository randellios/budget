import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Collapse
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
const CollapsibleCard = ({ title, children, isExpanded, onToggle }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {typeof title === 'string' ? (
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: '1.125rem' }}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
            <IconButton
              size="small"
              sx={{ color: 'text.secondary' }}
              onClick={onToggle}
            >
              {isExpanded ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        }
        sx={{
          '& .MuiCardHeader-root': { padding: '16px' },
          cursor: 'pointer',
          '&:hover': { bgcolor: '#f8fafc' }
        }}
        onClick={onToggle}
      />
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 2 }}>{children}</CardContent>
      </Collapse>
    </Card>
  );
};
export default CollapsibleCard;
