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
  Tab,
  Tabs,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Campaign as CampaignIcon,
  TrendingUp,
  TrendingDown,
  People,
  AttachMoney,
  Visibility,
  MoreVert,
  PlayArrow,
  Pause,
  Edit,
  Delete,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
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
const campaignPerformanceData = [
  { month: 'Jan', spend: 15000, installs: 2400, revenue: 18000 },
  { month: 'Feb', spend: 18000, installs: 3200, revenue: 24000 },
  { month: 'Mar', spend: 12000, installs: 2100, revenue: 15600 },
  { month: 'Apr', spend: 22000, installs: 4200, revenue: 32000 },
  { month: 'May', spend: 25000, installs: 4800, revenue: 38000 },
  { month: 'Jun', spend: 20000, installs: 3600, revenue: 28000 },
];

const channelData = [
  { name: 'Google Ads', value: 45, color: '#EB001B', spend: 35000 },
  { name: 'Facebook Ads', value: 30, color: '#FF5F00', spend: 25000 },
  { name: 'Apple Search', value: 15, color: '#F79E1B', spend: 12000 },
  { name: 'Organic', value: 10, color: '#1A73E8', spend: 0 },
];

const campaigns = [
  {
    id: 1,
    name: 'SuperGame Launch Campaign',
    status: 'active',
    platform: 'Google Ads',
    budget: 15000,
    spent: 12500,
    installs: 2400,
    cpi: 5.21,
    roas: 3.2,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
  },
  {
    id: 2,
    name: 'Task Master Retargeting',
    status: 'paused',
    platform: 'Facebook',
    budget: 8000,
    spent: 6200,
    installs: 1850,
    cpi: 3.35,
    roas: 2.8,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
  },
  {
    id: 3,
    name: 'Social Connect Awareness',
    status: 'active',
    platform: 'Apple Search Ads',
    budget: 12000,
    spent: 8900,
    installs: 1680,
    cpi: 5.30,
    roas: 4.1,
    startDate: '2024-01-20',
    endDate: '2024-02-20',
  },
];

interface CampaignCardProps {
  campaign: any;
  onMenuAction: (action: string, campaign: any) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onMenuAction }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const progressPercentage = (campaign.spent / campaign.budget) * 100;
  const statusColor = campaign.status === 'active' ? 'success' : campaign.status === 'paused' ? 'warning' : 'error';

  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                width: 48,
                height: 48,
              }}
            >
              <CampaignIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={0.5}>
                {campaign.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={campaign.status.toUpperCase()}
                  size="small"
                  color={statusColor}
                  variant="outlined"
                />
                <Typography variant="body2" color="text.secondary">
                  {campaign.platform}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <IconButton size="small" onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { onMenuAction('edit', campaign); handleMenuClose(); }}>
              <Edit fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => { onMenuAction(campaign.status === 'active' ? 'pause' : 'resume', campaign); handleMenuClose(); }}>
              {campaign.status === 'active' ? <Pause fontSize="small" sx={{ mr: 1 }} /> : <PlayArrow fontSize="small" sx={{ mr: 1 }} />}
              {campaign.status === 'active' ? 'Pause' : 'Resume'}
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { onMenuAction('delete', campaign); handleMenuClose(); }} sx={{ color: 'error.main' }}>
              <Delete fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
        </Stack>

        {/* Budget Progress */}
        <Box mb={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Budget Usage
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: progressPercentage > 90 ? 'error.main' : progressPercentage > 70 ? 'warning.main' : 'primary.main',
              },
            }}
          />
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Installs
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {campaign.installs.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              CPI
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="info.main">
              ${campaign.cpi}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              ROAS
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="success.main">
              {campaign.roas}x
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              End Date
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {new Date(campaign.endDate).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const MarketingPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  
  const handleMenuAction = (action: string, campaign: any) => {
    console.log(`${action} campaign:`, campaign);
    // Handle campaign actions
  };

  const tabLabels = ['All Campaigns', 'Active', 'Paused', 'Completed'];

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Marketing"
        subtitle="Quản lý chiến dịch marketing, user acquisition và advertising"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Marketing' }
        ]}
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
            sx={{ borderRadius: 3 }}
          >
            New Campaign
          </Button>
        }
      />

      {/* Key Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <AttachMoney />
                </Box>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <TrendingUp color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    +12.3%
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                $72K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Spend
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'info.light',
                    color: 'info.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <People />
                </Box>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <TrendingUp color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    +18.7%
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                8.9K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New Installs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Visibility />
                </Box>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <TrendingDown color="error" fontSize="small" />
                  <Typography variant="body2" color="error.main" fontWeight="bold">
                    -2.1%
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                $8.10
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg. CPI
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'warning.light',
                    color: 'warning.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TrendingUp />
                </Box>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <TrendingUp color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    +5.8%
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                3.2x
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg. ROAS
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} mb={4}>
        {/* Campaign Performance Chart */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                Campaign Performance
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Monthly spend vs installs and revenue
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={campaignPerformanceData}>
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
                  <Bar dataKey="spend" fill="#EB001B" />
                  <Bar dataKey="revenue" fill="#FF5F00" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Channel Distribution */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                Channel Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Spend by marketing channel
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack spacing={2} mt={3}>
                {channelData.map((item) => (
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
                      ${item.spend.toLocaleString()}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Campaigns List */}
      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ px: 4, pt: 4, pb: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              Active Campaigns
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and monitor your marketing campaigns
            </Typography>
          </Box>
          
          <Box sx={{ px: 4, pb: 2 }}>
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

          <Box sx={{ p: 4, pt: 0 }}>
            <Grid container spacing={3}>
              {campaigns.map((campaign) => (
                <Grid item xs={12} md={6} lg={4} key={campaign.id}>
                  <CampaignCard campaign={campaign} onMenuAction={handleMenuAction} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MarketingPage;