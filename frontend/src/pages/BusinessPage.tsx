import React from 'react';
import { Box, Typography } from '@mui/material';

const BusinessPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Business
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Quản lý doanh thu, monetization strategies và financial reports
      </Typography>
    </Box>
  );
};

export default BusinessPage;

