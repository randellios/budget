import { Box, Typography } from '@mui/material';

const TemperatureGauge = ({
  percentage,
  targetPercentage,
  isReverse = false
}) => {
  const getZoneInfo = () => {
    if (isReverse) {
      if (percentage >= targetPercentage)
        return {
          zone: 'optimal',
          intensity: Math.min(
            (percentage - targetPercentage) / targetPercentage,
            1
          )
        };
      if (percentage >= targetPercentage * 0.7)
        return { zone: 'moderate', intensity: percentage / targetPercentage };
      return {
        zone: 'minimal',
        intensity: percentage / (targetPercentage * 0.7)
      };
    } else {
      if (percentage <= targetPercentage * 0.8)
        return {
          zone: 'optimal',
          intensity: 1 - percentage / (targetPercentage * 0.8)
        };
      if (percentage <= targetPercentage * 1.2)
        return { zone: 'moderate', intensity: 0.6 };
      return {
        zone: 'minimal',
        intensity: Math.min(percentage / (targetPercentage * 1.5), 1)
      };
    }
  };

  const { zone, intensity } = getZoneInfo();

  const zoneStyles = {
    optimal: {
      gradient: 'linear-gradient(90deg, #10b981, #34d399)',
      glow: 'rgba(16, 185, 129, 0.3)',
      text: '#166534',
      bg: '#f0fdf4'
    },
    moderate: {
      gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
      glow: 'rgba(245, 158, 11, 0.3)',
      text: '#92400e',
      bg: '#fffbeb'
    },
    minimal: {
      gradient: 'linear-gradient(90deg, #ef4444, #f87171)',
      glow: 'rgba(239, 68, 68, 0.3)',
      text: '#991b1b',
      bg: '#fef2f2'
    }
  };

  const currentStyle = zoneStyles[zone];

  // Use a fixed scale of 0-100% for positioning
  const fillPercentage = Math.min(percentage, 100);
  const targetPosition = Math.min(targetPercentage, 100);

  // Calculate good zone based on actual percentages
  const goodZoneStart = isReverse ? targetPercentage : 0;
  const goodZoneEnd = isReverse ? 100 : targetPercentage;

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          position: 'relative',
          height: 20,
          backgroundColor: '#f8fafc',
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}
      >
        {/* Good zone background */}
        <Box
          sx={{
            position: 'absolute',
            left: `${goodZoneStart}%`,
            width: `${goodZoneEnd - goodZoneStart}%`,
            height: '100%',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            borderRadius: 10
          }}
        />

        {/* Actual fill */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: currentStyle.gradient,
            width: `${fillPercentage}%`,
            borderRadius: 10,
            boxShadow: `0 0 12px ${currentStyle.glow}`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Target point marker */}
        <Box
          sx={{
            position: 'absolute',
            left: `${targetPosition}%`,
            top: -2,
            width: 3,
            height: 24,
            backgroundColor: '#10b981',
            borderRadius: 1.5,
            border: '2px solid white',
            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Target label */}
        <Box
          sx={{
            position: 'absolute',
            left: `${targetPosition}%`,
            top: -20,
            transform: 'translateX(-50%)',
            backgroundColor: '#10b981',
            color: 'white',
            px: 1.5,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.6rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {targetPercentage}%
        </Box>
      </Box>
    </Box>
  );
};

export default TemperatureGauge;
