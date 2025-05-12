export function calculateDaysLeft(targetDate) {
  // Convert target date string to Date object
  const targetDateTime = new Date(targetDate).getTime();

  // Get current date and time
  const currentTime = new Date().getTime();

  // Calculate difference in milliseconds
  const differenceInMs = targetDateTime - currentTime;

  // Check if the target date is in the past
  if (differenceInMs < 0) {
    return false;
  }

  // Convert milliseconds to days
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const daysLeft = Math.floor(differenceInMs / oneDayInMs);

  return daysLeft;
}
