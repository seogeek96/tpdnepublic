export const SITE_DATE = process.env.NEXT_PUBLIC_DATE || "April 16th, 2026";

const monthNumbers: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

export const SITE_DATE_YEAR = SITE_DATE.match(/\b\d{4}\b/)?.[0] || "2026";

export const applySiteDateYear = (value: string) => {
  return value.replace(/\b2025\b/g, SITE_DATE_YEAR);
};

export const SITE_DATE_ISO = (() => {
  const match = SITE_DATE.match(
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?,\s+(\d{4})$/i
  );

  if (!match) return "2026-04-16";

  const [, month, day, year] = match;
  const monthNumber = monthNumbers[month.toLowerCase()];
  const dayNumber = day.padStart(2, "0");

  return `${year}-${monthNumber}-${dayNumber}`;
})();
