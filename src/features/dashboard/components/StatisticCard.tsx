import type { StatisticItem } from '../dashboardData';
import styles from './StatisticCard.module.scss';

type StatisticCardProps = {
  item: StatisticItem;
};

export const StatisticCard = ({ item }: StatisticCardProps) => (
  <article className={styles.card}>
    <span>{item.label}</span>
    <strong>{item.value}</strong>
    <p>{item.meta}</p>
  </article>
);
