import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  TextField,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  VpnKey as VpnKeyIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../store/AuthContext';
import PageHeader from '../components/Layout/PageHeader';

// Mock activity data
const recentActivity = [
  {
    id: 1,
    action: 'Logged in',
    timestamp: '2024-01-20T10:30:00Z',
    device: 'Chrome on Windows',
    ip: '192.168.1.100',
  },
  {
    id: 2,
    action: 'Created new app: SuperGame Pro',
    timestamp: '2024-01-19T14:20:00Z',
    device: 'Chrome on Windows',
    ip: '192.168.1.100',
  },
  {
    id: 3,
    action: 'Updated profile settings',
    timestamp: '2024-01-18T09:15:00Z',
    device: 'Safari on MacOS',
    ip: '192.168.1.105',
  },
];

const ProfilePage: React.FC = () => {
  const { state } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: state.user?.full_name || '',
    email: state.user?.email || '',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile:', formData);
  };

  const handleCancel = () => {
    setFormData({
      fullName: state.user?.full_name || '',
      email: state.user?.email || '',
    });
    setIsEditing(false);
  };

  const tabLabels = ['Profile', 'Security', 'Notifications', 'Activity'];

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Profile"
        subtitle="Thông tin cá nhân và cài đặt tài khoản"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Profile' }
        ]}
      />

      <Grid container spacing={4}>
        {/* Profile Overview Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar
                  src={state.user?.avatar_url}
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  {state.user?.full_name?.charAt(0)}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.dark' },
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                  }}
                  size="small"
                >
                  <PhotoCameraIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="h5" fontWeight="bold" mb={1}>
                {state.user?.full_name}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                {state.user?.email}
              </Typography>
              
              <Stack direction="row" spacing={1} justifyContent="center" mb={3}>
                <Chip
                  label={state.user?.role.replace('_', ' ')}
                  color="primary"
                  variant="outlined"
                />
                {state.user?.is_verified && (
                  <Chip
                    label="Verified"
                    color="success"
                    variant="outlined"
                  />
                )}
              </Stack>

              <Typography variant="body2" color="text.secondary" mb={1}>
                Member since {new Date(state.user?.created_at || '').toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last login: {new Date().toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent sx={{ p: 0 }}>
              {/* Tabs */}
              <Box sx={{ px: 4, pt: 4, pb: 2 }}>
                <Tabs
                  value={currentTab}
                  onChange={(_e, newValue) => setCurrentTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabLabels.map((label, index) => (
                    <Tab key={index} label={label} />
                  ))}
                </Tabs>
              </Box>

              <Divider />

              <Box sx={{ p: 4 }}>
                {/* Profile Tab */}
                {currentTab === 0 && (
                  <Stack spacing={4}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6" fontWeight="bold">
                        Personal Information
                      </Typography>
                      {!isEditing ? (
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      ) : (
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                          >
                            Save Changes
                          </Button>
                        </Stack>
                      )}
                    </Stack>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Role"
                          value={state.user?.role.replace('_', ' ') || ''}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Status"
                          value={state.user?.is_active ? 'Active' : 'Inactive'}
                          disabled
                        />
                      </Grid>
                    </Grid>

                    {isEditing && (
                      <Alert severity="info">
                        Changes to your profile will be reviewed by an administrator.
                      </Alert>
                    )}
                  </Stack>
                )}

                {/* Security Tab */}
                {currentTab === 1 && (
                  <Stack spacing={4}>
                    <Typography variant="h6" fontWeight="bold">
                      Security Settings
                    </Typography>

                    <Stack spacing={3}>
                      <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <VpnKeyIcon color="primary" />
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Password
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Last changed 3 months ago
                              </Typography>
                            </Box>
                          </Stack>
                          <Button variant="outlined">Change Password</Button>
                        </Stack>
                      </Paper>

                      <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <SecurityIcon color="primary" />
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Two-Factor Authentication
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Add extra security to your account
                              </Typography>
                            </Box>
                          </Stack>
                          <Button variant="outlined">Enable 2FA</Button>
                        </Stack>
                      </Paper>

                      <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <VisibilityIcon color="primary" />
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Login Sessions
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Manage active login sessions
                              </Typography>
                            </Box>
                          </Stack>
                          <Button variant="outlined">View Sessions</Button>
                        </Stack>
                      </Paper>
                    </Stack>
                  </Stack>
                )}

                {/* Notifications Tab */}
                {currentTab === 2 && (
                  <Stack spacing={4}>
                    <Typography variant="h6" fontWeight="bold">
                      Notification Preferences
                    </Typography>

                    <Stack spacing={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.emailNotifications}
                            onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Email Notifications
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Receive important updates via email
                            </Typography>
                          </Box>
                        }
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.pushNotifications}
                            onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Push Notifications
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Receive browser push notifications
                            </Typography>
                          </Box>
                        }
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.securityAlerts}
                            onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                            disabled
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Security Alerts
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Critical security notifications (required)
                            </Typography>
                          </Box>
                        }
                      />
                    </Stack>

                    <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
                      Save Preferences
                    </Button>
                  </Stack>
                )}

                {/* Activity Tab */}
                {currentTab === 3 && (
                  <Stack spacing={4}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6" fontWeight="bold">
                        Recent Activity
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" startIcon={<GetAppIcon />}>
                          Export
                        </Button>
                        <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
                          Clear History
                        </Button>
                      </Stack>
                    </Stack>

                    <List>
                      {recentActivity.map((activity, index) => (
                        <ListItem
                          key={activity.id}
                          divider={index < recentActivity.length - 1}
                          sx={{ px: 0 }}
                        >
                          <ListItemIcon>
                            <HistoryIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.action}
                            secondary={
                              <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">
                                  {new Date(activity.timestamp).toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.device} • IP: {activity.ip}
                                </Typography>
                              </Stack>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Stack>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
