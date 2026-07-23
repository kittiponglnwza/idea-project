import { Phone, CheckCircle2 } from 'lucide-react';

export default function IncomingCall({ onAnswer }) {
  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '5rem 2rem 3rem 2rem',
    }}>
      
      {/* Contact Info */}
      <div style={{ textAlign: 'center', animation: 'smoothFadeIn 0.8s ease-out' }}>
        <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 500 }}>
          Thailand
        </h3>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '400', letterSpacing: '1px', color: 'white', marginBottom: '8px' }}>
          098-555-4321
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ffcc00', background: 'rgba(255, 204, 0, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>⚠ Unknown Caller</span>
        </div>
      </div>

      {/* Big Avatar */}
      <div style={{
        width: '140px', height: '140px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: '2px solid rgba(255,255,255,0.1)',
        marginBottom: '2rem',
        animation: 'smoothFadeIn 1s ease-out 0.2s both',
        color: 'rgba(255,255,255,0.5)'
      }}>
        <Phone size={64} />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 1rem', animation: 'smoothFadeIn 1s ease-out 0.4s both' }}>
        
        {/* Decline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div className="glass-btn" style={{ width: '75px', height: '75px', color: '#ff3b30' }}>
            <Phone size={32} style={{ transform: 'rotate(135deg)' }} />
          </div>
          <span style={{ fontSize: '0.9rem', color: 'white' }}>Decline</span>
        </div>

        {/* Answer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div 
            onClick={onAnswer}
            className="glass-btn" 
            style={{ 
              width: '75px', height: '75px', color: 'white', background: '#34c759', border: 'none',
              boxShadow: '0 0 30px rgba(52, 199, 89, 0.4)'
            }}>
            <Phone size={32} />
          </div>
          <span style={{ fontSize: '0.9rem', color: 'white' }}>Accept</span>
        </div>

      </div>
    </div>
  );
}
