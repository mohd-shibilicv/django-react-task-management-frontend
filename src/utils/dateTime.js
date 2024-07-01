export const formatDateTimeLocal = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  const isoString = date.toISOString();
  return isoString.substring(0, 16);
};
