import { BatteryMedium, Signal, Wifi } from 'lucide-react';

export default function PhoneFrame({ children, isShake }) {
  return (
    <div className={`phone-bezel ${isShake ? 'shaking' : ''}`} style={{
      animation: isShake ? 'cameraShake 0.5s infinite' : 'none'
    }}>
      {/* Dynamic Island */}
      <div className="dynamic-island">
        <div style={{ width: '8px', height: '8px', background: '#34c759', borderRadius: '50%', opacity: 0.8 }}></div>
        <div style={{ width: '12px', height: '12px', background: '#1c1c1e', borderRadius: '50%', boxShadow: 'inset 0 0 2px rgba(255,255,255,0.2)' }}></div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <span>9:41</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Signal size={14} />
          <Wifi size={14} />
          <BatteryMedium size={16} />
        </div>
      </div>

      {/* Content */}
      <div className="phone-screen-content">
        {children}
      </div>

      {/* Gesture Bar */}
      <div className="gesture-bar"></div>
    </div>
  );
}
