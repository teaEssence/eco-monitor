type LogData = Record<string, unknown>;

export function log(
  level: "info" | "error" | "warn" | "debug",
  message: string,
  data?: LogData,
) {
  console.log(
    JSON.stringify({
      level,
      message,
      data,
      time: new Date().toISOString(),
    }),
  );
}
