import { ShieldAlert } from 'lucide-react';

export default function RiskWarning({ show, onHangup, isOptIn }) {
  if (!show) return null;

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
        SCAM RISK 95%
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: '12px', fontSize: '1.1rem', fontWeight: '400', lineHeight: 1.5 }}>
        VoiceGuard detected high-risk intent.<br/>Do not transfer money.
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
            End Call Immediately
          </button>
        </div>
      )}
      
      {isOptIn && (
        <div style={{ marginTop: '48px', textAlign: 'center', animation: 'smoothFadeIn 0.5s ease-out 0.2s both' }}>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ color: 'white', fontWeight: '500', fontSize: '1rem' }}>
              Auto-terminating call...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
