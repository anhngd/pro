import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Assessment,
  Download,
  Receipt,
} from '@mui/icons-material';
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PageHeader from '../components/Layout/PageHeader';

// Mock data
const revenueData = [
  { month: 'Jan', total: 45000, subscriptions: 28000, oneTime: 12000, ads: 5000, cost: 15000 },
  { month: 'Feb', total: 52000, subscriptions: 32000, oneTime: 14000, ads: 6000, cost: 18000 },
  { month: 'Mar', total: 48000, subscriptions: 30000, oneTime: 13000, ads: 5000, cost: 16000 },
  { month: 'Apr', total: 61000, subscriptions: 38000, oneTime: 16000, ads: 7000, cost: 20000 },
  { month: 'May', total: 75000, subscriptions: 45000, oneTime: 20000, ads: 10000, cost: 24000 },
  { month: 'Jun', total: 68000, subscriptions: 42000, oneTime: 18000, ads: 8000, cost: 22000 },
];

const appFinancials = [
  {
    id: 1,
    name: 'SuperGame Pro',
    revenue: 125000,
    cost: 45000,
    profit: 80000,
    margin: 64,
    users: 45000,
    arpu: 2.78,
    ltv: 35.50,
  },
  {
    id: 2,
    name: 'Task Master',
    revenue: 89000,
    cost: 32000,
    profit: 57000,
    margin: 64,
    users: 32000,
    arpu: 2.78,
    ltv: 28.20,
  },
  {
    id: 3,
    name: 'Social Connect',
    revenue: 67000,
    cost: 28000,
    profit: 39000,
    margin: 58,
    users: 28000,
    arpu: 2.39,
    ltv: 22.80,
  },
];

const kpiData = [
  { name: 'Customer Acquisition Cost', value: '$12.50', change: -8.2, description: 'Average cost to acquire one customer' },
  { name: 'Lifetime Value', value: '$285.60', change: 15.7, description: 'Expected revenue per customer' },
  { name: 'Churn Rate', value: '3.2%', change: -12.5, description: 'Monthly customer churn rate' },
  { name: 'Monthly Recurring Revenue', value: '$425K', change: 18.3, description: 'Predictable monthly revenue' },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, description }) => {
  const isPositive = change > 0;
  
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2}>
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
          {value}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const BusinessPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [currentTab, setCurrentTab] = useState(0);

  const tabLabels = ['Revenue Overview', 'App Performance', 'Financial Reports'];

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageHeader
        title="Business"
        subtitle="Quản lý doanh thu, monetization strategies và financial reports"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Business' }
        ]}
        actions={
          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Period</InputLabel>
              <Select
                value={timeRange}
                label="Period"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="1m">1 Month</MenuItem>
                <MenuItem value="3m">3 Months</MenuItem>
                <MenuItem value="6m">6 Months</MenuItem>
                <MenuItem value="1y">1 Year</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{ borderRadius: 3 }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Receipt />}
              sx={{ borderRadius: 3 }}
            >
              Generate Report
            </Button>
          </Stack>
        }
      />

      {/* Key Business Metrics */}
      <Grid container spacing={3} mb={4}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard
              title={kpi.name}
              value={kpi.value}
              change={kpi.change}
              icon={<AttachMoney />}
              description={kpi.description}
            />
          </Grid>
        ))}
      </Grid>

      {/* Tabs Navigation */}
      <Box sx={{ mb: 4 }}>
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

      {/* Tab Content */}
      {currentTab === 0 && (
        <Grid container spacing={4}>
          {/* Revenue Trend Chart */}
          <Grid item xs={12} lg={8}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  Revenue & Cost Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                  Monthly revenue breakdown with operational costs
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={revenueData}>
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
                      dataKey="total"
                      fill="#EB001B"
                      fillOpacity={0.3}
                      stroke="#EB001B"
                      strokeWidth={2}
                    />
                    <Bar dataKey="cost" fill="#FF5F00" />
                    <Line type="monotone" dataKey="subscriptions" stroke="#F79E1B" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Breakdown */}
          <Grid item xs={12} lg={4}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  Revenue Sources
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                  Current month breakdown
                </Typography>
                
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Subscriptions
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        $42K (62%)
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={62}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: '#EB001B',
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        One-time Purchases
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        $18K (26%)
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={26}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: '#FF5F00',
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Ad Revenue
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        $8K (12%)
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={12}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: '#F79E1B',
                        },
                      }}
                    />
                  </Box>
                </Stack>

                <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    $68,000
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <TrendingUp color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" fontWeight="bold">
                      +12.3% vs last month
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              App Financial Performance
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Detailed financial metrics for each application
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>App</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Cost</TableCell>
                    <TableCell align="right">Profit</TableCell>
                    <TableCell align="right">Margin</TableCell>
                    <TableCell align="right">ARPU</TableCell>
                    <TableCell align="right">LTV</TableCell>
                    <TableCell align="right">Users</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appFinancials.map((app) => (
                    <TableRow key={app.id} hover>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            sx={{
                              bgcolor: 'primary.light',
                              color: 'primary.contrastText',
                              width: 40,
                              height: 40,
                            }}
                          >
                            {app.name.charAt(0)}
                          </Avatar>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {app.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold" color="success.main">
                          ${app.revenue.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" color="error.main">
                          ${app.cost.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold">
                          ${app.profit.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                          <Typography variant="body1" fontWeight="bold">
                            {app.margin}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={app.margin}
                            sx={{
                              width: 50,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: app.margin > 60 ? 'success.main' : 'warning.main',
                              },
                            }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">
                          ${app.arpu}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold">
                          ${app.ltv}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">
                          {app.users.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {currentTab === 2 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Financial Reports
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Assessment />}
                    sx={{ justifyContent: 'flex-start', p: 2 }}
                  >
                    Monthly Revenue Report
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Assessment />}
                    sx={{ justifyContent: 'flex-start', p: 2 }}
                  >
                    Cost Analysis Report
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Assessment />}
                    sx={{ justifyContent: 'flex-start', p: 2 }}
                  >
                    Profitability Analysis
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Receipt />}
                    sx={{ justifyContent: 'flex-start', p: 2 }}
                  >
                    Financial Summary
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Quick Insights
                </Typography>
                <Stack spacing={3}>
                  <Box sx={{ p: 3, bgcolor: 'success.light', borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="success.dark">
                      Best Performing App
                    </Typography>
                    <Typography variant="h6" color="success.dark">
                      SuperGame Pro
                    </Typography>
                    <Typography variant="body2" color="success.dark">
                      $125K revenue with 64% margin
                    </Typography>
                  </Box>
                  
                  <Box sx={{ p: 3, bgcolor: 'warning.light', borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="warning.dark">
                      Growth Opportunity
                    </Typography>
                    <Typography variant="h6" color="warning.dark">
                      Social Connect
                    </Typography>
                    <Typography variant="body2" color="warning.dark">
                      Lower ARPU but high user engagement
                    </Typography>
                  </Box>
                  
                  <Box sx={{ p: 3, bgcolor: 'info.light', borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="info.dark">
                      Cost Optimization
                    </Typography>
                    <Typography variant="h6" color="info.dark">
                      -8.2% CAC Reduction
                    </Typography>
                    <Typography variant="body2" color="info.dark">
                      Improved marketing efficiency
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default BusinessPage;
