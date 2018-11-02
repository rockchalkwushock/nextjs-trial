/**
 * Returns the user's locale from their browser.
 * Defaults to 'en-US' when running on server.
 */
export const getLocale = (): string =>
  process.browser ? Intl.DateTimeFormat().resolvedOptions().locale : 'en-US'
