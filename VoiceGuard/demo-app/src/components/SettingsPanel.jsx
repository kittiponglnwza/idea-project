export default function SettingsPanel({ isOptIn, setIsOptIn, demoState, onReset }) {
  const getStatusText = () => {
    switch (demoState) {
      case 0: return "Status: Awaiting Incoming Call...";
      case 1: return "Status: Call Connected. Safe.";
      case 2: return "Status: Intercepting Audio (Live Caption)...";
      case 3: return "Status: RISK 95% DETECTED! Intrusive Warning Active.";
      case 4: return "Status: Call Terminated. Micro-learning active.";
      default: return "Status: Unknown";
    }
  };

  return (
    <div className="settings-panel">
      <h2>🎛️ Presenter Panel</h2>
      
      <div className="toggle-container">
        <span className="toggle-label">Family Opt-in Mode<br/><small style={{color: '#94a3b8'}}>(Auto-terminate)</small></span>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isOptIn} 
            onChange={(e) => setIsOptIn(e.target.checked)} 
          />
          <span className="slider"></span>
        </label>
      </div>

      <div style={{ marginTop: '2rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Controls:</p>
        <ul style={{ fontSize: '0.8rem', color: '#cbd5e1', paddingLeft: '1rem' }}>
          <li>Press <b>[Spacebar]</b> to advance demo states.</li>
        </ul>
      </div>

      <div className="status-text">
        {getStatusText()}
      </div>

      {demoState === 4 && (
        <button 
          onClick={onReset}
          style={{
            marginTop: '1rem', width: '100%', padding: '10px', 
            background: '#3b82f6', color: 'white', border: 'none', 
            borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          Reset Demo
        </button>
      )}
    </div>
  );
}
