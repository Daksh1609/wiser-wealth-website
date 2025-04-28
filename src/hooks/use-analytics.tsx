
interface AnalyticsEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: any
    ) => void;
  }
}

export const useAnalytics = () => {
  const trackPageView = (path: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-LLE94DFJJY', {
        page_path: path,
      });
    }
  };

  const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  return { trackPageView, trackEvent };
};
