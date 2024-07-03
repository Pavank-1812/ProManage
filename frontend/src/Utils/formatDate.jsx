const formatTodayDate = (inputDate) => {
  const date = new Date(inputDate);
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);

  let day = "";
  let month = "";
  let year = "";

  parts.forEach((part) => {
    switch (part.type) {
      case "day":
        day = part.value;
        break;
      case "month":
        month = part.value;
        break;
      case "year":
        year = part.value;
        break;
      default:
    }
  });

  const dayWithSuffix = getDayWithSuffix(parseInt(day, 10));

  return `${dayWithSuffix} ${month}, ${year}`;
};

const getDayWithSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return day + "th";
  }
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
};

export default formatTodayDate;
