import LiveCaption from './LiveCaption';
import RiskWarning from './RiskWarning';
import { useState, useEffect } from 'react';
import { Mic, Grip, Volume2, Plus, Video, Pause, Phone } from 'lucide-react';

export default function ActiveCall({ demoState, isOptIn, onHangup }) {
  const [timer, setTimer] = useState("00:00");

  useEffect(() => {
    let secs = 0;
    const interval = setInterval(() => {
      secs++;
      const m = Math.floor(secs / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      setTimer(`${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '5rem 2rem 3rem 2rem',
      position: 'relative'
    }}>
      
      {/* Caller Info */}
      <div style={{ textAlign: 'center', zIndex: 5 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '400', color: 'white', marginBottom: '8px' }}>098-555-4321</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', fontFamily: 'monospace' }}>{timer}</p>
      </div>

      {/* Animated Waveform (Fake Audio) */}
      <div style={{ display: 'flex', gap: '4px', height: '60px', alignItems: 'center', zIndex: 5, marginTop: '2rem' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            width: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px',
            animation: `waveformLine 1s ease-in-out infinite ${i * 0.15}s`
          }}></div>
        ))}
      </div>

      {/* Call Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 32px', width: '100%', padding: '0 1rem', zIndex: 5, marginTop: 'auto', marginBottom: '3rem' }}>
        {[
          { icon: Mic, label: 'mute' },
          { icon: Grip, label: 'keypad' },
          { icon: Volume2, label: 'speaker' },
          { icon: Plus, label: 'add call' },
          { icon: Video, label: 'FaceTime' },
          { icon: Pause, label: 'hold' }
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="glass-btn" style={{ width: '64px', height: '64px', color: 'white' }}>
              <item.icon size={24} strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Hangup Button */}
      <div 
        onClick={onHangup}
        style={{
          width: '75px', height: '75px', borderRadius: '50%', background: '#ff3b30',
          display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white',
          cursor: 'pointer', zIndex: 5, transition: 'transform 0.2s'
        }}>
        <Phone size={32} style={{ transform: 'rotate(135deg)' }} />
      </div>

      {/* Floating Overlays */}
      <LiveCaption demoState={demoState} />
      <RiskWarning show={demoState >= 6} isOptIn={isOptIn} onHangup={onHangup} />
      
    </div>
  );
}
