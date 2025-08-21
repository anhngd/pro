import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Visibility,
  People,
  AttachMoney,
  Download,
  Star,
  Phone,
  Tablet,
  Computer,
  MoreVert,
  FilterList,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import PageHeader from '../components/Layout/PageHeader';

// Mock data
const userGrowthData = [
  { month: 'Jan', users: 12000, newUsers: 2400, activeUsers: 9600 },
  { month: 'Feb', users: 15000, newUsers: 3200, activeUsers: 11800 },
  { month: 'Mar', users: 14000, newUsers: 2800, activeUsers: 11200 },
  { month: 'Apr', users: 18000, newUsers: 4200, activeUsers: 13800 },
  { month: 'May', users: 22000, newUsers: 4800, activeUsers: 17200 },
  { month: 'Jun', users: 20000, newUsers: 3600, activeUsers: 16400 },
];

const deviceData = [
  { name: 'Mobile', value: 65, color: '#EB001B' },
  { name: 'Desktop', value: 25, color: '#FF5F00' },
  { name: 'Tablet', value: 10, color: '#F79E1B' },
];

const topAppsAnalytics = [
  {
    id: 1,
    name: 'SuperGame Pro',
    users: 45000,
    sessions: 125000,
    retention: 78,
    revenue: 25000,
    trend: 12.5,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Task Master',
    users: 32000,
    sessions: 89000,
    retention: 65,
    revenue: 18000,
    trend: -3.2,
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Social Connect',
    users: 28000,
    sessions: 76000,
    retention: 72,
    revenue: 15000,
    trend: 8.7,
    rating: 4.4,
  },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change > 0;
  
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: `${color}.light`,
              color: `${color}.contrastText`,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </Box>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {isPositive ? (
              <TrendingUp color="success" fontSize="small" />
            ) : (
              <TrendingDown color="error" fontSize="small" />
            )}
            <Typography
              variant="body2"
              color={isPositive ? 'success.main' : 'error.main'}
              fontWeight="bold"
            >
              {isPositive ? '+' : ''}{change}%
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedApp, setSelectedApp] = useState('all');

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Analytics"
        subtitle="Phân tích chi tiết về hiệu suất ứng dụng, người dùng và doanh thu"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Analytics' }
        ]}
        actions={
          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="7d">7 days</MenuItem>
                <MenuItem value="30d">30 days</MenuItem>
                <MenuItem value="90d">90 days</MenuItem>
                <MenuItem value="1y">1 year</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>App</InputLabel>
              <Select
                value={selectedApp}
                label="App"
                onChange={(e) => setSelectedApp(e.target.value)}
              >
                <MenuItem value="all">All Apps</MenuItem>
                <MenuItem value="1">SuperGame Pro</MenuItem>
                <MenuItem value="2">Task Master</MenuItem>
                <MenuItem value="3">Social Connect</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: 3 }}
            >
              Filters
            </Button>
          </Stack>
        }
      />

      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Users"
            value="1.2M"
            change={15.3}
            icon={<People />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Page Views"
            value="5.8M"
            change={8.7}
            icon={<Visibility />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Revenue"
            value="$127K"
            change={12.1}
            icon={<AttachMoney />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Downloads"
            value="342K"
            change={-2.4}
            icon={<Download />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} mb={4}>
        {/* User Growth Chart */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Box>
                  <Typography variant="h5" fontWeight="bold" mb={1}>
                    User Growth Trends
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly active users and new user acquisition
                  </Typography>
                </Box>
                <Chip label="Last 6 months" variant="outlined" size="small" />
              </Stack>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#666666" />
                  <YAxis stroke="#666666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#EB001B"
                    fill="#EB001B"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stackId="2"
                    stroke="#FF5F00"
                    fill="#FF5F00"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Device Distribution */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                Device Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                User device preferences
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack spacing={2} mt={3}>
                {deviceData.map((item) => (
                  <Stack key={item.name} direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.name === 'Mobile' && <Phone sx={{ color: item.color, mr: 1 }} />}
                      {item.name === 'Desktop' && <Computer sx={{ color: item.color, mr: 1 }} />}
                      {item.name === 'Tablet' && <Tablet sx={{ color: item.color, mr: 1 }} />}
                    </Box>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {item.value}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Apps Performance */}
      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
            <Box>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                App Performance Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed metrics for top performing applications
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ borderRadius: 3 }}>
              View All
            </Button>
          </Stack>
          
          <Grid container spacing={3}>
            {topAppsAnalytics.map((app) => (
              <Grid item xs={12} md={4} key={app.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 3,
                    '&:hover': {
                      boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                          width: 48,
                          height: 48,
                        }}
                      >
                        {app.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {app.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Star color="warning" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {app.rating}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Stack>

                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Users
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {app.users.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Sessions
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {app.sessions.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box mb={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Retention Rate
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {app.retention}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={app.retention}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          bgcolor: app.retention > 70 ? 'success.main' : app.retention > 50 ? 'warning.main' : 'error.main',
                        },
                      }}
                    />
                  </Box>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Revenue
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="success.main">
                        ${app.revenue.toLocaleString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${app.trend > 0 ? '+' : ''}${app.trend}%`}
                      size="small"
                      color={app.trend > 0 ? 'success' : 'error'}
                      icon={app.trend > 0 ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                    />
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsPage;