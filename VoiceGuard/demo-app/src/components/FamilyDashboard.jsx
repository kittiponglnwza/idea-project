import { Activity, ShieldCheck, AlertOctagon, Phone } from 'lucide-react';

export default function FamilyDashboard({ demoState, isOptIn, setIsOptIn }) {
  return (
    <div className="panel family-panel" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
      <div className="family-content" style={{ padding: 0 }}>
        
        {/* Settings Card (Small Toggle) */}
        <div style={{ background: 'rgba(15, 15, 15, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', padding: '16px', borderRadius: '16px', marginBottom: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>Auto-Terminate</h3>
              <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px' }}>Drop calls if risk &gt; 90%</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={isOptIn} onChange={(e) => setIsOptIn(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* SOS Alert State */}
        {demoState >= 6 && (
          <div style={{ 
            background: 'rgba(255, 59, 48, 0.95)', backdropFilter: 'blur(10px)', color: 'white', padding: '20px', borderRadius: '20px', 
            boxShadow: '0 20px 40px rgba(255, 59, 48, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'smoothFadeIn 0.3s ease-out, cameraShake 0.5s infinite'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <AlertOctagon size={28} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>HIGH RISK</h3>
            </div>
            
            <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '24px' }}>
              VoiceGuard detected a highly suspicious call on Dad's device.
            </p>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Threat</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Voice Clone</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Confidence</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>96%</span>
              </div>
            </div>

            <button style={{ 
              width: '100%', padding: '16px', background: 'white', color: '#ff3b30', 
              border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
              cursor: 'pointer' 
            }}>
              <Phone size={18} />
              Call Dad Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
