'use client';

import { useState } from 'react';


export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <OceanIntro onFinish={() => setShowIntro(false)} />}
      
      {/* Your normal website content */}
      <div style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        {children}
      </div>
    </>
  );
}
