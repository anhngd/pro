import React from 'react';
import { Box, Typography } from '@mui/material';

const AnalyticsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Phân tích chi tiết về hiệu suất ứng dụng, người dùng và doanh thu
      </Typography>
    </Box>
  );
};

export default AnalyticsPage;

