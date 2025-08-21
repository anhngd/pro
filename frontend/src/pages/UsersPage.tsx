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
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Check as CheckIcon,
  FilterList as FilterListIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { UserRole } from '../types';
import PageHeader from '../components/Layout/PageHeader';

// Mock data
const users = [
  {
    id: 1,
    fullName: 'Anh Nguyen',
    email: 'anhnd@demo.com',
    role: UserRole.ADMIN,
    isActive: true,
    isVerified: true,
    lastLogin: '2024-01-20T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    avatarUrl: '',
  },
  {
    id: 2,
    fullName: 'Minh Tran',
    email: 'minh.tran@company.com',
    role: UserRole.EXECUTIVE,
    isActive: true,
    isVerified: true,
    lastLogin: '2024-01-19T14:20:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    avatarUrl: '',
  },
  {
    id: 3,
    fullName: 'Thu Pham',
    email: 'thu.pham@company.com',
    role: UserRole.MARKETING_MANAGER,
    isActive: true,
    isVerified: true,
    lastLogin: '2024-01-18T09:15:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    avatarUrl: '',
  },
  {
    id: 4,
    fullName: 'Duc Le',
    email: 'duc.le@company.com',
    role: UserRole.PRODUCT_MANAGER,
    isActive: false,
    isVerified: true,
    lastLogin: '2024-01-15T16:45:00Z',
    createdAt: '2024-01-08T00:00:00Z',
    avatarUrl: '',
  },
  {
    id: 5,
    fullName: 'Linh Do',
    email: 'linh.do@company.com',
    role: UserRole.DEVELOPER,
    isActive: true,
    isVerified: false,
    lastLogin: '2024-01-20T11:30:00Z',
    createdAt: '2024-01-12T00:00:00Z',
    avatarUrl: '',
  },
];

const roleColors = {
  [UserRole.ADMIN]: 'error',
  [UserRole.EXECUTIVE]: 'primary',
  [UserRole.BUSINESS_MANAGER]: 'success',
  [UserRole.MARKETING_MANAGER]: 'warning',
  [UserRole.PRODUCT_MANAGER]: 'info',
  [UserRole.DEVELOPER]: 'secondary',
  [UserRole.ANALYST]: 'default',
} as const;

const roleLabels = {
  [UserRole.ADMIN]: 'Admin',
  [UserRole.EXECUTIVE]: 'Executive',
  [UserRole.BUSINESS_MANAGER]: 'Business Manager',
  [UserRole.MARKETING_MANAGER]: 'Marketing Manager',
  [UserRole.PRODUCT_MANAGER]: 'Product Manager',
  [UserRole.DEVELOPER]: 'Developer',
  [UserRole.ANALYST]: 'Analyst',
};

interface UserActionMenuProps {
  user: any;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onAction: (action: string, user: any) => void;
}

const UserActionMenu: React.FC<UserActionMenuProps> = ({ user, anchorEl, onClose, onAction }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => { onAction('edit', user); onClose(); }}>
        <EditIcon fontSize="small" sx={{ mr: 1 }} />
        Edit User
      </MenuItem>
      <MenuItem onClick={() => { onAction(user.isActive ? 'deactivate' : 'activate', user); onClose(); }}>
        {user.isActive ? <BlockIcon fontSize="small" sx={{ mr: 1 }} /> : <CheckIcon fontSize="small" sx={{ mr: 1 }} />}
        {user.isActive ? 'Deactivate' : 'Activate'}
      </MenuItem>
      <MenuItem onClick={() => { onAction('delete', user); onClose(); }} sx={{ color: 'error.main' }}>
        <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
        Delete User
      </MenuItem>
    </Menu>
  );
};

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleUserAction = (action: string, user: any) => {
    console.log(`${action} user:`, user);
    // Handle user actions
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.isActive) ||
                         (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    verified: users.filter(u => u.isVerified).length,
    admins: users.filter(u => u.role === UserRole.ADMIN).length,
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Users Management"
        subtitle="Quản lý người dùng và phân quyền hệ thống"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Users' }
        ]}
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
            sx={{ borderRadius: 3 }}
            onClick={() => setOpenDialog(true)}
          >
            Add User
          </Button>
        }
      />

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <PersonAddIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {userStats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                  <CheckIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {userStats.active}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
                  <CheckIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {userStats.verified}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Verified Users
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
                  <PersonAddIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {userStats.admins}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrators
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <TextField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="medium"
              sx={{ minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControl size="medium" sx={{ minWidth: 150 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                {Object.entries(roleLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="medium" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{ borderRadius: 3 }}
            >
              More Filters
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          src={user.avatarUrl}
                          sx={{ width: 40, height: 40 }}
                        >
                          {user.fullName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {user.fullName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={roleLabels[user.role]}
                        size="small"
                        color={roleColors[user.role]}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={user.isActive ? 'Active' : 'Inactive'}
                          size="small"
                          color={user.isActive ? 'success' : 'default'}
                          variant="outlined"
                        />
                        {user.isVerified && (
                          <Chip
                            label="Verified"
                            size="small"
                            color="info"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(user.lastLogin).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, user)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Action Menu */}
      <UserActionMenu
        user={selectedUser}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onAction={handleUserAction}
      />

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                defaultValue={UserRole.ANALYST}
              >
                {Object.entries(roleLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;