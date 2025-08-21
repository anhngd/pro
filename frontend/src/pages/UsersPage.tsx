import React from 'react';
import { Box, Typography } from '@mui/material';

const UsersPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Users Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Quản lý người dùng và phân quyền hệ thống
      </Typography>
    </Box>
  );
};

export default UsersPage;
