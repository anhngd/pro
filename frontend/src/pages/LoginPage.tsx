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
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
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



  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Stack spacing={4} alignItems="center">
              {/* Simple Logo */}
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="white" fontWeight="bold">
                    M
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary" mb={1}>
                  Mobile Platform
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đăng nhập để tiếp tục
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

              {/* Login Form */}
              <Box sx={{ width: '100%' }}>
                <form onSubmit={handleTempLogin}>
                  <Stack spacing={3}>
                    <TextField
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                      required
                      placeholder="anhnd"
                      variant="outlined"
                      size="medium"
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      required
                      placeholder="123123123"
                      variant="outlined"
                      size="medium"
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
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>
                  </Stack>
                </form>
              </Box>

              {/* Demo Info - Compact */}
              <Alert 
                severity="info" 
                sx={{ 
                  width: '100%',
                  '& .MuiAlert-message': { width: '100%' }
                }}
              >
                <Typography variant="caption" display="block">
                  <strong>Demo:</strong> anhnd / 123123123
                </Typography>
              </Alert>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;