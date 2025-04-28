
import React, { lazy, Suspense } from 'react';

// Use lazy loading for GoogleAd component
const GoogleAd = lazy(() => import('../GoogleAd'));

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex justify-between">
        <div className="hidden xl:block w-64 fixed left-0 top-1/4">
          <Suspense fallback={<div className="h-[600px]"></div>}>
            <GoogleAd 
              client="YOUR-PUBLISHER-ID"
              slot="YOUR-AD-SLOT-ID"
              format="auto"
              responsive={true}
              style={{ minHeight: '600px' }}
            />
          </Suspense>
        </div>

        <main className="max-w-7xl mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8 w-full">
          {children}
        </main>

        <div className="hidden xl:block w-64 fixed right-0 top-1/4">
          <Suspense fallback={<div className="h-[600px]"></div>}>
            <GoogleAd 
              client="YOUR-PUBLISHER-ID"
              slot="YOUR-AD-SLOT-ID"
              format="auto"
              responsive={true}
              style={{ minHeight: '600px' }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
