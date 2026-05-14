import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { kpiCards, revenueBars, statistics, userGrowthBars } from './dashboardData';
import type { ChartBarItem, KpiCardItem, StatisticItem } from './dashboardData';

type DashboardOverview = {
  kpis: KpiCardItem[];
  statistics: StatisticItem[];
  charts: {
    revenue: ChartBarItem[];
    userGrowth: ChartBarItem[];
  };
};

type DashboardState = {
  data: DashboardOverview | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchDashboardOverview = createAsyncThunk<
  DashboardOverview,
  void,
  { rejectValue: string }
>('dashboard/fetchOverview', async () => {
  await new Promise((resolve) => window.setTimeout(resolve, 400));

  return {
    kpis: kpiCards,
    statistics,
    charts: {
      revenue: revenueBars,
      userGrowth: userGrowthBars,
    },
  };
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardOverview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unable to load dashboard overview.';
      });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
