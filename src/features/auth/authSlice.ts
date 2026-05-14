import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const AUTH_STORAGE_KEY = 'enterprise-admin-auth';

type AuthUser = {
  email: string;
  name: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
};

type PersistedAuthState = Pick<AuthState, 'token' | 'user'>;

type LoginPayload = {
  email: string;
  password: string;
};

export const demoUserName = 'Admin User';
export const demoCredentials = {
  email: 'admin@example.com',
  password: 'password',
};

const createEmptyAuthState = (): AuthState => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,
});

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
    return createEmptyAuthState();
  }

  const persistedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!persistedValue) {
    return createEmptyAuthState();
  }

  try {
    const parsedValue = JSON.parse(persistedValue) as PersistedAuthState;

    return {
      token: parsedValue.token ?? null,
      user: parsedValue.user ?? null,
      isLoading: false,
      error: null,
    };
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return createEmptyAuthState();
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

export const login = createAsyncThunk<PersistedAuthState, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    await new Promise((resolve) => window.setTimeout(resolve, 500));

    if (email !== demoCredentials.email || password !== demoCredentials.password) {
      return rejectWithValue('Use demo credentials to sign in.');
    }

    const token = createFakeJwt(email);
    const authState = {
      token,
      user: {
        email,
        name: demoUserName,
      },
    };

    persistAuthState(authState);

    return authState;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      clearPersistedAuthState();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.error = action.payload ?? 'Unable to sign in.';
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
