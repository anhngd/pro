import React from 'react';
import { Box, Typography } from '@mui/material';

const ProfilePage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Profile
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Thông tin cá nhân và cài đặt tài khoản
      </Typography>
    </Box>
  );
};

export default ProfilePage;

