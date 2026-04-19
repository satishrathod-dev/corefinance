import config from "./config";

// ─── In-memory access token (NOT in localStorage — XSS safe) ──
let accessToken = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

// ─── Registration ────────────────────────────────────────────
export const Registration = async (params) => {
  const url = `${config.API_PATH}${config.apis.Registration}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data, response };
    }

    // Store access token in memory
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }

    return { response, data };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unexpected Error",
      response: null,
    };
  }
};

// ─── Login ───────────────────────────────────────────────────
export const Login = async (params) => {
  const url = `${config.API_PATH}${config.apis.Login}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends/receives cookies
      body: JSON.stringify(params),
    });
    console.log("response", response);
    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 422) {
      }
      return { error: errorData, response };
    }
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store access token in memory
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }

    return { response, data };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unexpected Error",
      response: null,
    };
  }
};

// ─── Refresh access token silently ──────────────────────────
export const refreshAccessToken = async () => {
  const url = `${config.API_PATH}${config.apis.Refresh}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include", // sends refreshToken cookie
    });

    if (!response.ok) {
      clearAccessToken();
      return null;
    }

    const data = await response.json();
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }
    return data.accessToken;
  } catch {
    clearAccessToken();
    return null;
  }
};

// ─── Logout ──────────────────────────────────────────────────
export const Logout = async () => {
  const url = `${config.API_PATH}${config.apis.Logout}`;
  try {
    await fetch(url, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    clearAccessToken();
  }
};

// ─── Fetch with auto-refresh ────────────────────────────────
// Use this for all protected API calls. It automatically:
// 1. Attaches the access token
// 2. Retries once with a refreshed token on 401
export const fetchWithAuth = async (url, options = {}) => {
  const makeRequest = (token) =>
    fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

  let response = await makeRequest(getAccessToken());

  // If 401, try refreshing the token once
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await makeRequest(newToken);
    }
  }

  return response;
};

// ─── Get current user ────────────────────────────────────────
export const getMe = async () => {
  const url = `${config.API_PATH}${config.apis.Me}`;
  const response = await fetchWithAuth(url);

  if (!response.ok) return null;

  const data = await response.json();
  return data.user;
};
