import {
  daySuffix,
  monthDictionary,
  reversedDaySuffix,
  reversedMonthDictionary,
} from "@/constants";

export function convertDate(date: string) {
  const dateObject = new Date(date);

  // Extract day, month, and year from the date object
  const day = dateObject.getDate().toString();
  const month = dateObject.getMonth().toString().padStart(2, "0");
  const year = dateObject.getFullYear().toString();

  const monthName = monthDictionary[month];
  const daySuffixValue = daySuffix[day] || "th";

  return monthName + " " + day + daySuffixValue + ", " + year;
}

export function reverseDate(dateString: string): string {
  const parts = dateString.split(" ");

  const month = reversedMonthDictionary[parts[0]];

  let day = parts[1].replace(/\D/g, ""); // Remove non-numeric characters
  const daySuffix = parts[1].replace(/\d+/g, ""); // Extract suffix
  const daySuffixValue = reversedDaySuffix[daySuffix];

  // Pad day to ensure it's two digits
  day = day.padStart(2, "0");

  const year = parts[2];

  return year + "-" + month + "-" + day;
}
