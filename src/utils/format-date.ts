export function formatDate(date: string): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = targetDate.getTime() - now.getTime();
  const diffInSeconds = Math.abs(Math.floor(diffInMs / 1000));

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  // Determine if the date is in the past or future
  const isPast = diffInMs < 0;
  const multiplier = isPast ? -1 : 1;

  if (diffInSeconds < 60) {
    return rtf.format(multiplier * diffInSeconds, "second");
  } else if (diffInSeconds < 3600) {
    return rtf.format(multiplier * Math.floor(diffInSeconds / 60), "minute");
  } else if (diffInSeconds < 86400) {
    return rtf.format(multiplier * Math.floor(diffInSeconds / 3600), "hour");
  } else if (diffInSeconds < 2592000) {
    return rtf.format(multiplier * Math.floor(diffInSeconds / 86400), "day");
  } else if (diffInSeconds < 31536000) {
    return rtf.format(
      multiplier * Math.floor(diffInSeconds / 2592000),
      "month"
    );
  } else {
    return rtf.format(
      multiplier * Math.floor(diffInSeconds / 31536000),
      "year"
    );
  }
}
