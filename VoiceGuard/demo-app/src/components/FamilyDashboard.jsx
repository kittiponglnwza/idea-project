import { Activity, ShieldCheck, AlertOctagon, Phone } from 'lucide-react';

export default function FamilyDashboard({ demoState, isOptIn, setIsOptIn }) {
  return (
    <div className="panel family-panel">
      {/* Header */}
      <div className="family-header">
        <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>FamilyCare</h2>
      </div>

      <div className="family-content">
        
        {/* Settings Card */}
        <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'white' }}>Auto-Terminate</h3>
              <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '4px' }}>Drop calls if risk &gt; 90%</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={isOptIn} onChange={(e) => setIsOptIn(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <h3 style={{ fontSize: '0.9rem', color: '#888', fontWeight: '600', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Dad's Device
        </h3>

        {/* Safe State */}
        {demoState < 6 && (
          <div style={{ 
            background: '#111111', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', 
            display: 'flex', alignItems: 'flex-start', gap: '16px',
            animation: 'smoothFadeIn 0.3s'
          }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#34c759' }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 style={{ fontWeight: '600', fontSize: '1.1rem', color: 'white' }}>Protected</h4>
              <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '4px' }}>Last scan: 2 mins ago</p>
            </div>
          </div>
        )}

        {/* SOS Alert State */}
        {demoState >= 6 && (
          <div style={{ 
            background: '#ff3b30', color: 'white', padding: '24px', borderRadius: '16px', 
            boxShadow: '0 0 40px rgba(255, 59, 48, 0.4)',
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
