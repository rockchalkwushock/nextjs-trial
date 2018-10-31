export const getToken = (): string | null =>
  localStorage.getItem('access_token')
