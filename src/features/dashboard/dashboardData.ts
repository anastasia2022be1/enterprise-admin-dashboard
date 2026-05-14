export type KpiCardItem = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  caption: string;
};

export type StatisticItem = {
  label: string;
  value: string;
  meta: string;
};

export type ChartBarItem = {
  label: string;
  value: number;
};

export const kpiCards: KpiCardItem[] = [
  {
    label: 'Revenue',
    value: '$128.4K',
    change: '+12.8%',
    trend: 'up',
    caption: 'Compared with last month',
  },
  {
    label: 'Active Users',
    value: '24,892',
    change: '+8.2%',
    trend: 'up',
    caption: 'Across all workspaces',
  },
  {
    label: 'Open Tickets',
    value: '312',
    change: '-4.1%',
    trend: 'down',
    caption: 'Support queue volume',
  },
  {
    label: 'Conversion Rate',
    value: '7.4%',
    change: '+1.6%',
    trend: 'up',
    caption: 'Trial to paid accounts',
  },
];

export const statistics: StatisticItem[] = [
  {
    label: 'New Accounts',
    value: '1,248',
    meta: '142 enterprise plans',
  },
  {
    label: 'Avg. Session',
    value: '18m 42s',
    meta: 'Product usage health',
  },
  {
    label: 'System Uptime',
    value: '99.98%',
    meta: 'Last 30 days',
  },
];

export const revenueBars: ChartBarItem[] = [
  { label: 'Jan', value: 44 },
  { label: 'Feb', value: 58 },
  { label: 'Mar', value: 51 },
  { label: 'Apr', value: 74 },
  { label: 'May', value: 69 },
  { label: 'Jun', value: 86 },
];

export const userGrowthBars: ChartBarItem[] = [
  { label: 'Mon', value: 36 },
  { label: 'Tue', value: 48 },
  { label: 'Wed', value: 42 },
  { label: 'Thu', value: 63 },
  { label: 'Fri', value: 71 },
  { label: 'Sat', value: 56 },
  { label: 'Sun', value: 78 },
];
