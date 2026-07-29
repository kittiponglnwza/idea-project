import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function RiskWarning({ demoState, onHangup, onAcknowledge, isOptIn }) {
  // Show only in states 6 (Medium) and 7 (High)
  if (demoState !== 6 && demoState !== 7) return null;

  const isMediumRisk = demoState === 6;

  if (isMediumRisk) {
    return (
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 20, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', padding: '2rem',
        background: 'rgba(255, 165, 0, 0.95)', // Orange/Amber background
        backdropFilter: 'blur(10px)',
        animation: 'edgePulseOrange 1s infinite alternate'
      }}>
        <div style={{
          background: 'white', borderRadius: '50%', width: '80px', height: '80px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: '#ff9500', marginBottom: '24px', animation: 'smoothFadeIn 0.3s ease-out'
        }}>
          <AlertTriangle size={40} strokeWidth={2.5} />
        </div>
        
        <h1 style={{ color: 'white', fontSize: '1.8rem', textAlign: 'center', fontWeight: '700' }}>
          เตือนอย่างรุนแรง!
        </h1>
        <p style={{ color: 'white', textAlign: 'center', marginTop: '12px', fontSize: '1.1rem', fontWeight: '500', lineHeight: 1.5 }}>
          ระบบตรวจพบความเสี่ยงระดับกลาง (60-80%)<br/>
          เครื่องสั่นเตือนต่อเนื่อง กรุณาตั้งสติ
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '48px' }}>
          <button 
            onClick={onAcknowledge}
            style={{
              background: 'white', color: '#ff9500', border: 'none',
              padding: '16px 32px', borderRadius: '100px', fontSize: '1.1rem',
              fontWeight: '700', cursor: 'pointer', width: '100%',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
            }}>
            รับทราบ (Acknowledge)
          </button>
        </div>
      </div>
    );
  }

  // High Risk View (demoState === 7)
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 20, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', padding: '2rem',
      // The Cinematic Red Vignette & Bloom effect
      background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(255, 59, 48, 0.4) 100%)',
      boxShadow: 'inset 0 0 100px rgba(255, 59, 48, 0.8)',
      backdropFilter: 'blur(8px)',
      animation: 'edgePulse 1.5s infinite ease-in-out'
    }}>
      
      <div style={{
        background: '#ff3b30', borderRadius: '50%', width: '100px', height: '100px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        boxShadow: '0 0 40px rgba(255, 59, 48, 0.6)', color: 'white',
        marginBottom: '24px', animation: 'smoothFadeIn 0.3s ease-out'
      }}>
        <ShieldAlert size={48} strokeWidth={2} />
      </div>
      
      <h1 style={{ color: 'white', fontSize: '2rem', textAlign: 'center', fontWeight: '700', letterSpacing: '-0.5px' }}>
        แจ้งเตือนระดับสูงสุด!
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: '12px', fontSize: '1.1rem', fontWeight: '400', lineHeight: 1.5 }}>
        สายนี้อันตรายมาก มีความเสี่ยงเป็นมิจฉาชีพ<br/>
        <span style={{ color: '#ffb3b0', fontSize: '0.9rem' }}>* ส่ง SMS แจ้งเตือนฉุกเฉินหาครอบครัวแล้ว</span>
      </p>

      {!isOptIn && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '48px', animation: 'smoothFadeIn 0.5s ease-out 0.2s both' }}>
          <button 
            onClick={onHangup}
            style={{
              background: 'white', color: '#ff3b30', border: 'none',
              padding: '16px 32px', borderRadius: '100px', fontSize: '1.1rem',
              fontWeight: '600', cursor: 'pointer', width: '100%',
              boxShadow: '0 16px 32px rgba(255, 59, 48, 0.4)'
            }}>
            ตัดสายทิ้งทันที (End Call)
          </button>
        </div>
      )}
      
      {isOptIn && (
        <div 
          onClick={onHangup}
          style={{ 
            marginTop: '48px', 
            textAlign: 'center', 
            animation: 'smoothFadeIn 0.5s ease-out 0.2s both',
            cursor: 'pointer'
          }}>
          <div style={{ 
            background: 'rgba(0,0,0,0.5)', 
            padding: '12px 24px', 
            borderRadius: '100px', 
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.7)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            <p style={{ color: 'white', fontWeight: '500', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <span style={{ display: 'inline-block', animation: 'edgePulse 1.5s infinite ease-in-out' }}>⏸️</span> 
              ระบบจะตัดสายอัตโนมัติ...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
