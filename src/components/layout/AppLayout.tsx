import { NavLink, Outlet } from 'react-router-dom';

import styles from './AppLayout.module.scss';

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/settings', label: 'Settings' },
];

export const AppLayout = () => (
  <div className={styles.layout}>
    <aside className={styles.sidebar}>
      <div className={styles.brand}>Enterprise Admin</div>
      <nav className={styles.navigation} aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>

    <div className={styles.contentArea}>
      <header className={styles.header}>
        <span>Admin Workspace</span>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  </div>
);
