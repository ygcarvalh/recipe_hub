export async function authFetch(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(url, { ...options, headers });
}
