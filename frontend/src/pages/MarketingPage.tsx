import React from 'react';
import { Box, Typography } from '@mui/material';

const MarketingPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Marketing
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Quản lý chiến dịch marketing, user acquisition và advertising
      </Typography>
    </Box>
  );
};

export default MarketingPage;

