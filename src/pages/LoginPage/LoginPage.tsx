import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearAuthError, demoCredentials, login } from '../../features/auth/authSlice';
import styles from './LoginPage.module.scss';

type LoginLocationState = {
  from?: {
    pathname?: string;
  };
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isLoading, token } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState(demoCredentials.password);
  const locationState = location.state as LoginLocationState | null;
  const redirectTo = locationState?.from?.pathname ?? '/dashboard';

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Enterprise Admin</span>
          <h1>Sign in</h1>
          <p>Use the demo account to access the dashboard workspace.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              value={email}
              autoComplete="email"
              disabled={isLoading}
              onChange={(event) => {
                dispatch(clearAuthError());
                setEmail(event.target.value);
              }}
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              disabled={isLoading}
              onChange={(event) => {
                dispatch(clearAuthError());
                setPassword(event.target.value);
              }}
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className={styles.demoHint}>
          Demo: {demoCredentials.email} / {demoCredentials.password}
        </div>
      </section>
    </main>
  );
};
