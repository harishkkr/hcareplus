const API_BASE_URL = import.meta.env.VITE_API_URL || "/_/backend";

const getHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

// --- Auth ---
export async function login(data: any) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }
  return response.json();
}

export async function signup(data: any) {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Signup failed");
  }
  return response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error("Failed to send reset instructions");
  return response.json();
}

// --- Dashboard Data ---
export async function fetchStats() {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
}

export async function fetchAlerts() {
  const response = await fetch(`${API_BASE_URL}/alerts`);
  if (!response.ok) throw new Error("Failed to fetch alerts");
  return response.json();
}

export async function fetchPatients(token: string) {
  const response = await fetch(`${API_BASE_URL}/patients`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch patients");
  return response.json();
}

export async function createPatientVisit(data: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/patients`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to log patient visit");
  return response.json();
}

export async function fetchInventory(token: string) {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch inventory");
  return response.json();
}

export async function updateInventory(data: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update inventory");
  return response.json();
}

export async function fetchEnvironment(token: string) {
  const response = await fetch(`${API_BASE_URL}/environment`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch environment data");
  return response.json();
}

export async function createEnvironmentData(data: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/environment`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to log environmental data");
  return response.json();
}

export async function fetchPredictions(token: string) {
  const response = await fetch(`${API_BASE_URL}/predictions`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch predictions");
  return response.json();
}
