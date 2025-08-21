import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Android as AndroidIcon,
  Apple as AppleIcon,
  Web as WebIcon,
} from '@mui/icons-material';
import { AppStatus, AppType, Platform } from '../types';

// Mock data
const mockApps: MockApp[] = [
  {
    id: 1,
    name: 'SuperGame Pro',
    package_name: 'com.company.supergame',
    app_type: AppType.GAME,
    platform: Platform.CROSS_PLATFORM,
    status: AppStatus.PUBLISHED,
    version: '2.1.0',
    icon_url: '',
    downloads: 450000,
    rating: 4.8,
    revenue: 25000,
  },
  {
    id: 2,
    name: 'Task Master',
    package_name: 'com.company.taskmaster',
    app_type: AppType.MOBILE_APP,
    platform: Platform.ANDROID,
    status: AppStatus.IN_REVIEW,
    version: '1.5.2',
    icon_url: '',
    downloads: 320000,
    rating: 4.6,
    revenue: 18000,
  },
  {
    id: 3,
    name: 'Social Connect',
    package_name: 'com.company.socialconnect',
    app_type: AppType.MOBILE_APP,
    platform: Platform.IOS,
    status: AppStatus.DRAFT,
    version: '3.0.0',
    icon_url: '',
    downloads: 280000,
    rating: 4.4,
    revenue: 15000,
  },
];

const statusColors: Record<AppStatus, 'default' | 'warning' | 'info' | 'success' | 'error'> = {
  [AppStatus.DRAFT]: 'default',
  [AppStatus.IN_REVIEW]: 'warning',
  [AppStatus.APPROVED]: 'info',
  [AppStatus.PUBLISHED]: 'success',
  [AppStatus.SUSPENDED]: 'error',
  [AppStatus.ARCHIVED]: 'default',
};

const platformIcons: Record<Platform, React.ReactElement> = {
  [Platform.ANDROID]: <AndroidIcon />,
  [Platform.IOS]: <AppleIcon />,
  [Platform.WEB]: <WebIcon />,
  [Platform.CROSS_PLATFORM]: <AndroidIcon />,
};

interface MockApp {
  id: number;
  name: string;
  package_name: string;
  app_type: AppType;
  platform: Platform;
  status: AppStatus;
  version: string;
  icon_url: string;
  downloads: number;
  rating: number;
  revenue: number;
}

interface AppCardProps {
  app: MockApp;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, appId: number) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onMenuClick }) => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: 1, 
        borderColor: 'divider', 
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.light',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                {app.name.charAt(0)}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" noWrap mb={0.5}>
                  {app.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {app.package_name}
                </Typography>
              </Box>
            </Stack>
            <IconButton
              size="small"
              onClick={(e) => onMenuClick(e, app.id)}
              sx={{ 
                opacity: 0.7,
                '&:hover': { opacity: 1 }
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Stack>

          {/* Status and Platform */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={app.status.replace('_', ' ')}
              size="small"
              color={statusColors[app.status]}
              variant="outlined"
            />
            <Chip
              icon={platformIcons[app.platform]}
              label={app.platform.replace('_', ' ')}
              size="small"
              variant="outlined"
            />
          </Stack>

          {/* Metrics */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="caption" color="text.secondary">
                Version
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {app.version}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color="text.secondary">
                Downloads
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {app.downloads.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color="text.secondary">
                Revenue
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="success.main">
                ${app.revenue.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          {/* Rating */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">Rating:</Typography>
            <Typography variant="body2" fontWeight="bold">
              ⭐ {app.rating}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const AppsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, _appId: number) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredApps = mockApps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.package_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabLabels = [
    'Tất cả',
    'Draft',
    'In Review',
    'Published',
    'Suspended',
  ];

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h3" fontWeight="bold" mb={2} color="text.primary">
            Apps Management
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            Quản lý tất cả ứng dụng di động và games
          </Typography>
          <Box 
            sx={{ 
              width: 60, 
              height: 4, 
              background: 'linear-gradient(90deg, #EB001B, #FF5F00)', 
              borderRadius: 2, 
              mt: 2 
            }} 
          />
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          sx={{ 
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          Thêm App Mới
        </Button>
      </Stack>

      {/* Filters */}
      <Card elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <TextField
              placeholder="Tìm kiếm apps..."
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
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{ borderRadius: 3 }}
            >
              Bộ lọc
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Box sx={{ mb: 3 }}>
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

      {/* Apps Grid */}
      <Grid container spacing={3}>
        {filteredApps.map((app) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
            <AppCard app={app} onMenuClick={handleMenuClick} />
          </Grid>
        ))}
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Xem chi tiết</MenuItem>
        <MenuItem onClick={handleMenuClose}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleMenuClose}>Analytics</MenuItem>
        <MenuItem onClick={handleMenuClose}>Tải APK/IPA</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Xóa
        </MenuItem>
      </Menu>

      {/* Empty State */}
      {filteredApps.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary" mb={1}>
            Không tìm thấy ứng dụng nào
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Tạo App Đầu Tiên
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AppsPage;
