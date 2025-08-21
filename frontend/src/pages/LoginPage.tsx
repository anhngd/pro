import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Divider,
} from '@mui/material';
import { Google as GoogleIcon, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../store/AuthContext';
import { useSnackbar } from 'notistack';

declare global {
  interface Window {
    google: any;
  }
}

const LoginPage: React.FC = () => {
  const { state, tempLogin, clearError } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTempLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (username === 'anhnd' && password === '123123123') {
        await tempLogin();
        enqueueSnackbar('Đăng nhập thành công!', { variant: 'success' });
      } else {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
      }
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Đăng nhập thất bại', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    enqueueSnackbar('Tính năng Google OAuth sẽ được triển khai sau', { variant: 'info' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #EB001B 0%, #FF5F00 50%, #F79E1B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Stack spacing={4} alignItems="center">
              {/* Logo and Title */}
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(45deg, #EB001B, #FF5F00)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                  }}
                >
                  Mobile Platform
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Publishing Hub
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Nền tảng quản lý và phát hành ứng dụng di động
                </Typography>
              </Box>

              {/* Error Display */}
              {state.error && (
                <Alert
                  severity="error"
                  onClose={clearError}
                  sx={{ width: '100%' }}
                >
                  {state.error}
                </Alert>
              )}

              {/* Demo Login Section */}
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" textAlign="center" mb={3}>
                  Đăng nhập Demo
                </Typography>

                <form onSubmit={handleTempLogin}>
                  <Stack spacing={3}>
                    <TextField
                      label="Tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                      required
                      placeholder="anhnd"
                      variant="outlined"
                    />
                    <TextField
                      label="Mật khẩu"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      required
                      placeholder="123123123"
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <LoginIcon />
                        )
                      }
                      disabled={isLoading || state.isLoading}
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                      }}
                    >
                      {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>
                  </Stack>
                </form>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    hoặc
                  </Typography>
                </Divider>

                {/* Google Login (Disabled for now) */}
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                  disabled
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    opacity: 0.5,
                  }}
                >
                  Đăng nhập với Google (Coming soon)
                </Button>
              </Box>

              {/* Demo Credentials */}
              <Box sx={{ width: '100%', mt: 4 }}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                    Tài khoản Demo:
                  </Typography>
                  <Typography variant="body2">
                    • Username: <strong>anhnd</strong>
                  </Typography>
                  <Typography variant="body2">
                    • Password: <strong>123123123</strong>
                  </Typography>
                </Alert>
              </Box>

              {/* Features */}
              <Box sx={{ width: '100%', mt: 4 }}>
                <Typography variant="subtitle2" color="text.secondary" textAlign="center" mb={2}>
                  Tính năng chính
                </Typography>
                <Stack spacing={1}>
                  {[
                    'Quản lý ứng dụng di động và games',
                    'Analytics và báo cáo chi tiết',
                    'Quản lý chiến dịch marketing',
                    'Theo dõi doanh thu và KPIs',
                    'Phân quyền theo vai trò',
                  ].map((feature, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                        }}
                      />
                      {feature}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Footer */}
        <Typography
          variant="caption"
          color="white"
          textAlign="center"
          sx={{ display: 'block', mt: 3, opacity: 0.8 }}
        >
          © 2024 Mobile Publishing Platform. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;