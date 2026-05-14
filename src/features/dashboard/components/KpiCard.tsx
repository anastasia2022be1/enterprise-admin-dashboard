import type { KpiCardItem } from '../dashboardData';
import styles from './KpiCard.module.scss';

type KpiCardProps = {
  item: KpiCardItem;
};

export const KpiCard = ({ item }: KpiCardProps) => (
  <article className={styles.card}>
    <div className={styles.header}>
      <span>{item.label}</span>
      <span className={item.trend === 'up' ? styles.trendUp : styles.trendDown}>{item.change}</span>
    </div>
    <strong>{item.value}</strong>
    <p>{item.caption}</p>
  </article>
);
