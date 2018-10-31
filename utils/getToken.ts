export const getToken = (): string | null =>
  // Check if on the server or not, localStorage not available server-side.
  process.browser ? localStorage.getItem('access_token') : null
