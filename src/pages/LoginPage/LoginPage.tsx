import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createDemoToken,
  demoUserName,
  loginSuccess,
  persistAuthState,
} from '../../features/auth/authSlice';
import styles from './LoginPage.module.scss';

type LoginLocationState = {
  from?: {
    pathname?: string;
  };
};

const demoCredentials = {
  email: 'admin@example.com',
  password: 'password',
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState(demoCredentials.password);
  const [error, setError] = useState('');
  const locationState = location.state as LoginLocationState | null;
  const redirectTo = locationState?.from?.pathname ?? '/dashboard';

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (email !== demoCredentials.email || password !== demoCredentials.password) {
      setError('Use demo credentials to sign in.');
      return;
    }

    const token = createDemoToken(email);

    dispatch(loginSuccess({ email, token }));
    persistAuthState({
      token,
      user: {
        email,
        name: demoUserName,
      },
    });
    navigate(redirectTo, { replace: true });
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
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.submitButton}>
            Sign in
          </button>
        </form>

        <div className={styles.demoHint}>
          Demo: {demoCredentials.email} / {demoCredentials.password}
        </div>
      </section>
    </main>
  );
};
