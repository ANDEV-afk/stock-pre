// Filter console warnings for known library issues
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args: any[]) => {
  const message = args.join(" ");

  // Filter out known Recharts defaultProps warnings
  if (
    message.includes(
      "Support for defaultProps will be removed from function components",
    ) &&
    (message.includes("XAxis") || message.includes("YAxis"))
  ) {
    return;
  }

  // Call original warn for other warnings
  originalWarn.apply(console, args);
};

console.error = (...args: any[]) => {
  const message = args.join(" ");

  // Filter out known Recharts defaultProps errors
  if (
    message.includes(
      "Support for defaultProps will be removed from function components",
    ) &&
    (message.includes("XAxis") || message.includes("YAxis"))
  ) {
    return;
  }

  // Call original error for other errors
  originalError.apply(console, args);
};

export {};
