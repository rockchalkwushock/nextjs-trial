export const getToken = (): string | null =>
  process.browser ? localStorage.getItem('access_token') : null
