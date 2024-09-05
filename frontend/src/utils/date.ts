//Передаём дату или ничего, если ничего то значит сегодня
export const getDateFormat = (
  dateString: string | undefined = undefined
): string => {
  let date;
  if (dateString) {
    const parts: Array<string> = dateString.split(".");
    date = new Date(Number(parts[2]), parts[1] - 1, Number(parts[0]));
  } else {
    date = new Date();
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
