type AnalyticsData = Record<string, unknown>;

export function trackEvent(name: string, data?: AnalyticsData) {
  console.log("Analytics event:", name, data);
}
