const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "Date inconnue";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Date invalide";

  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
};

export default formatDate;
