import { useState, useEffect } from 'react';

export default function LiveCaption({ demoState }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    if (demoState === 0 || demoState === 1) {
      setDisplayedText("");
    }
    
    // Scammer speaks line 1
    if (demoState === 2 || demoState === 3) {
      setDisplayedText("สวัสดีครับ คุณมีคดีฟอกเงินค้างชำระกับทางธนาคาร...");
    }
    
    // Scammer speaks line 2
    if (demoState >= 4) {
      setDisplayedText("สวัสดีครับ คุณมีคดีฟอกเงินค้างชำระกับทางธนาคาร... รบกวนโอนเงินเพื่อตรวจสอบด่วนครับ ห้ามบอกใครเด็ดขาด");
    }
  }, [demoState]);

  if (demoState < 2) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '120px', left: '20px', right: '20px',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      padding: '1.5rem',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.1)',
      animation: 'slideUp 0.3s ease-out',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', animation: 'pulseRed 1s infinite' }}></div>
        <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: '600' }}>VoiceGuard Live Caption</span>
      </div>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.5', color: 'white' }}>
        {displayedText}
        <span style={{ animation: 'fadeIn 0.5s infinite alternate' }}>|</span>
      </p>
    </div>
  );
}
