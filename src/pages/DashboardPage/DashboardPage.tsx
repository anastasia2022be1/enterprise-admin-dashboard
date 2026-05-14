import { PageHeader } from '../../components/ui/PageHeader';
import { ChartPlaceholder } from '../../features/dashboard/components/ChartPlaceholder';
import { KpiCard } from '../../features/dashboard/components/KpiCard';
import { StatisticCard } from '../../features/dashboard/components/StatisticCard';
import {
  kpiCards,
  revenueBars,
  statistics,
  userGrowthBars,
} from '../../features/dashboard/dashboardData';
import styles from './DashboardPage.module.scss';

export const DashboardPage = () => (
  <div className={styles.page}>
    <PageHeader
      title="Dashboard"
      description="Operational overview for revenue, user growth, and product health."
    />

    <section className={styles.kpiGrid} aria-label="Key performance indicators">
      {kpiCards.map((item) => (
        <KpiCard key={item.label} item={item} />
      ))}
    </section>

    <section className={styles.contentGrid}>
      <div className={styles.chartGrid}>
        <ChartPlaceholder
          title="Revenue Trend"
          description="Monthly recurring revenue snapshot for the current half-year."
          data={revenueBars}
        />
        <ChartPlaceholder
          title="User Growth"
          description="Weekly active user growth across enterprise accounts."
          data={userGrowthBars}
        />
      </div>

      <aside className={styles.statistics} aria-label="Business statistics">
        <h2>Business Statistics</h2>
        <div className={styles.statisticsList}>
          {statistics.map((item) => (
            <StatisticCard key={item.label} item={item} />
          ))}
        </div>
      </aside>
    </section>
  </div>
);
