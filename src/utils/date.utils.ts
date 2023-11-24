export const getDayName = (date = new Date(), locale = 'en-US'): string => {
  return date.toLocaleDateString(locale, {weekday: 'long'})?.toLowerCase();
}