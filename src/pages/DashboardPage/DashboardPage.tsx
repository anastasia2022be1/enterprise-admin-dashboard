import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PageHeader } from '../../components/ui/PageHeader';
import { ChartPlaceholder } from '../../features/dashboard/components/ChartPlaceholder';
import { KpiCard } from '../../features/dashboard/components/KpiCard';
import { StatisticCard } from '../../features/dashboard/components/StatisticCard';
import { fetchDashboardOverview } from '../../features/dashboard/dashboardSlice';
import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (!data && !isLoading) {
      dispatch(fetchDashboardOverview());
    }
  }, [data, dispatch, isLoading]);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Dashboard"
        description="Operational overview for revenue, user growth, and product health."
      />

      {isLoading ? <div className={styles.status}>Loading dashboard overview...</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}

      {data ? (
        <>
          <section className={styles.kpiGrid} aria-label="Key performance indicators">
            {data.kpis.map((item) => (
              <KpiCard key={item.label} item={item} />
            ))}
          </section>

          <section className={styles.contentGrid}>
            <div className={styles.chartGrid}>
              <ChartPlaceholder
                title="Revenue Trend"
                description="Monthly recurring revenue snapshot for the current half-year."
                data={data.charts.revenue}
              />
              <ChartPlaceholder
                title="User Growth"
                description="Weekly active user growth across enterprise accounts."
                data={data.charts.userGrowth}
              />
            </div>

            <aside className={styles.statistics} aria-label="Business statistics">
              <h2>Business Statistics</h2>
              <div className={styles.statisticsList}>
                {data.statistics.map((item) => (
                  <StatisticCard key={item.label} item={item} />
                ))}
              </div>
            </aside>
          </section>
        </>
      ) : null}
    </div>
  );
};
