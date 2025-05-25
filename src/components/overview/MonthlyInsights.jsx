<Box sx={{ flex: 1 }}>
  <InsightCard>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <TimelineIcon color="primary" sx={{ mr: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
        Monthly Insights
      </Typography>
    </Box>

    <Stack spacing={2}>
      {monthlyInsights.map((insight, index) => {
        const IconComponent = insight.icon;
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderRadius: 2,
              border: '1px solid #e8ecf3',
              backgroundColor: '#ffffff'
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: `${insight.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                flexShrink: 0
              }}
            >
              <IconComponent sx={{ fontSize: 18, color: insight.color }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  color: '#666',
                  display: 'block',
                  mb: 0.25
                }}
              >
                {insight.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a'
                  }}
                >
                  {insight.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.7rem',
                    color:
                      insight.trend === 'up'
                        ? '#10b981'
                        : insight.trend === 'down'
                          ? '#ef4444'
                          : '#666',
                    fontWeight: 600
                  }}
                >
                  {insight.change}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.65rem',
                  color: '#666'
                }}
              >
                {insight.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Stack>
  </InsightCard>
</Box>;
