import type { ChartBarItem } from '../dashboardData';
import styles from './ChartPlaceholder.module.scss';

type ChartPlaceholderProps = {
  title: string;
  description: string;
  data: ChartBarItem[];
};

export const ChartPlaceholder = ({ title, description, data }: ChartPlaceholderProps) => (
  <section className={styles.chartPanel}>
    <div className={styles.header}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span>Placeholder</span>
    </div>

    <div className={styles.chart} aria-label={`${title} chart placeholder`}>
      {data.map((item) => (
        <div className={styles.barGroup} key={item.label}>
          <div className={styles.barTrack}>
            <div className={styles.bar} style={{ height: `${item.value}%` }} />
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </section>
);
