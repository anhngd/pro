import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Stack,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Apps as AppsIcon,
  AttachMoney,
  People,
  Download,
  Star,
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

// Mock data for demonstration
const statsData = {
  totalApps: 24,
  publishedApps: 18,
  totalRevenue: 125000,
  activeUsers: 45000,
  totalDownloads: 1200000,
  avgRating: 4.3,
};

const revenueData = [
  { month: 'Jan', revenue: 45000, users: 12000 },
  { month: 'Feb', revenue: 52000, users: 15000 },
  { month: 'Mar', revenue: 48000, users: 14000 },
  { month: 'Apr', revenue: 61000, users: 18000 },
  { month: 'May', revenue: 75000, users: 22000 },
  { month: 'Jun', revenue: 68000, users: 20000 },
  { month: 'Jul', revenue: 82000, users: 25000 },
  { month: 'Aug', revenue: 89000, users: 28000 },
  { month: 'Sep', revenue: 95000, users: 30000 },
  { month: 'Oct', revenue: 110000, users: 35000 },
  { month: 'Nov', revenue: 118000, users: 38000 },
  { month: 'Dec', revenue: 125000, users: 45000 },
];

const appCategoryData = [
  { name: 'Games', value: 45, color: '#EB001B' },
  { name: 'Productivity', value: 25, color: '#FF5F00' },
  { name: 'Social', value: 15, color: '#F79E1B' },
  { name: 'Education', value: 10, color: '#1A73E8' },
  { name: 'Others', value: 5, color: '#34A853' },
];

const topAppsData = [
  { name: 'SuperGame Pro', downloads: 450000, revenue: 25000, rating: 4.8 },
  { name: 'Task Master', downloads: 320000, revenue: 18000, rating: 4.6 },
  { name: 'Social Connect', downloads: 280000, revenue: 15000, rating: 4.4 },
  { name: 'Learn Easy', downloads: 150000, revenue: 12000, rating: 4.7 },
];

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, color = 'primary' }) => {
  
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: `${color}.light`,
              color: `${color}.contrastText`,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </Box>
          {trend && (
            <Chip
              label={`${trend > 0 ? '+' : ''}${trend}%`}
              size="small"
              color={trend > 0 ? 'success' : 'error'}
              icon={<TrendingUp />}
            />
          )}
        </Stack>
        <Typography variant="h4" fontWeight="bold" mb={0.5}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tổng quan về hiệu suất ứng dụng và doanh thu
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard
            title="Tổng số Apps"
            value={statsData.totalApps}
            icon={<AppsIcon />}
            trend={12}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard
            title="Doanh thu"
            value={`$${statsData.totalRevenue.toLocaleString()}`}
            icon={<AttachMoney />}
            trend={8.5}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard
            title="Người dùng"
            value={statsData.activeUsers.toLocaleString()}
            icon={<People />}
            trend={15.2}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard
            title="Lượt tải"
            value={`${(statsData.totalDownloads / 1000000).toFixed(1)}M`}
            icon={<Download />}
            trend={22.1}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard
            title="Đánh giá TB"
            value={statsData.avgRating}
            icon={<Star />}
            trend={3.2}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatsCard
            title="Apps đã phát hành"
            value={statsData.publishedApps}
            icon={<AppsIcon />}
            trend={5.8}
            color="primary"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        {/* Revenue Chart */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider', height: 400 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Doanh thu và Người dùng theo Tháng
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#666666" />
                  <YAxis stroke="#666666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#EB001B"
                    fill="#EB001B"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
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

        {/* App Categories */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider', height: 400 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Phân loại Apps
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={appCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {appCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack spacing={1} mt={2}>
                {appCategoryData.map((item) => (
                  <Stack key={item.name} direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.color,
                      }}
                    />
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

      {/* Top Apps Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Top Apps Performance
              </Typography>
              <Stack spacing={2}>
                {topAppsData.map((app, index) => (
                  <Paper
                    key={app.name}
                    elevation={0}
                    sx={{
                      p: 3,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          #{index + 1} {app.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Downloads
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {app.downloads.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Revenue
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                          ${app.revenue.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Rating
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Star color="warning" fontSize="small" />
                          <Typography variant="h6" fontWeight="bold">
                            {app.rating}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
