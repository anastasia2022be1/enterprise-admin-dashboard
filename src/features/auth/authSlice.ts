import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const AUTH_STORAGE_KEY = 'enterprise-admin-auth';

type AuthUser = {
  email: string;
  name: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

type PersistedAuthState = Pick<AuthState, 'token' | 'user'>;

type LoginPayload = {
  email: string;
  token: string;
};

export const demoUserName = 'Admin User';

const createFakeJwt = (email: string) => {
  const header = window.btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = window.btoa(
    JSON.stringify({
      sub: email,
      name: demoUserName,
      iat: Math.floor(Date.now() / 1000),
    }),
  );

  return `${header}.${payload}.fake-signature`;
};

const readPersistedAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  const persistedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!persistedValue) {
    return { token: null, user: null };
  }

  try {
    const parsedValue = JSON.parse(persistedValue) as PersistedAuthState;

    return {
      token: parsedValue.token ?? null,
      user: parsedValue.user ?? null,
    };
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return { token: null, user: null };
  }
};

export const persistAuthState = (state: PersistedAuthState) => {
  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token: state.token,
      user: state.user,
    }),
  );
};

export const clearPersistedAuthState = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

const initialState: AuthState = readPersistedAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.token;
      state.user = {
        email: action.payload.email,
        name: demoUserName,
      };
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const createDemoToken = createFakeJwt;
