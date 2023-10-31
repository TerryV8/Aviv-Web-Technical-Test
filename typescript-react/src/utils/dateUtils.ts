const formatDate = (
  date_string: string,
  position_year = 'position_year_first',
): string => {
  const date = new Date(date_string);
  const year = date.getFullYear();
  // getMonth() returns a zero-based value, so we need to add 1
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  if (position_year === 'position_year_first') return `${year}/${month}/${day}`;
  if (position_year === 'position_year_last') return `${day}/${month}/${year}`;

  //default
  return `${year}/${month}/${day}`;
};

export default formatDate;
