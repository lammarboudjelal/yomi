export const formaterDate = (dateString?: string | null) => {
  if (!dateString) return "-";

  const datePart = dateString.split(" ")[0];
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) return "-";

  return `${day}-${month}-${year}`;
};
