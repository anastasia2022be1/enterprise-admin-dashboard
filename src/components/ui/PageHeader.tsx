import styles from './PageHeader.module.scss';

type PageHeaderProps = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => (
  <div className={styles.header}>
    <h1>{title}</h1>
    {description ? <p>{description}</p> : null}
  </div>
);
