
import { useEffect } from 'react';

// Add type declaration for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdProps {
  client: string;
  slot: string;
  format?: 'auto' | 'fluid';
  responsive?: boolean;
  style?: React.CSSProperties;
}

const GoogleAd = ({ client, slot, format = 'auto', responsive = true, style }: GoogleAdProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading Google ad:', error);
    }
  }, []);

  return (
    <div className="google-ad-container">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: '160px',
          maxWidth: '100%',
          ...style,
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default GoogleAd;
