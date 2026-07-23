import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AIEngineConsole({ demoState }) {
  const [logs, setLogs] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    if (demoState === 0) {
      setLogs([{ text: "System idle. Awaiting audio stream..." }]);
      setRiskScore(0);
    }
    
    if (demoState === 1) {
      setLogs(prev => [...prev, 
        { text: "Stream established. Scanning for known threats..." },
        { text: "Metadata checked. Caller ID: Unknown." }
      ]);
      setRiskScore(12);
    }

    if (demoState === 2) {
      setLogs(prev => [...prev, { text: "[TRANSCRIPT]: สวัสดีครับ คุณมีคดีฟอกเงินค้างชำระกับทางธนาคาร...", isCode: true }]);
    }

    if (demoState === 3) {
      setLogs(prev => [...prev, 
        { text: "Intent: Law Enforcement Impersonation detected.", type: 'intent' }
      ]);
      setRiskScore(47);
    }

    if (demoState === 4) {
      setLogs(prev => [...prev, { text: "[TRANSCRIPT]: รบกวนโอนเงินเพื่อตรวจสอบด่วนครับ ห้ามบอกใครเด็ดขาด", isCode: true }]);
    }

    if (demoState === 5) {
      setLogs(prev => [...prev, 
        { text: "Intent: Urgent Transaction Request.", type: 'intent' },
        { text: "Intent: Isolation Tactic.", type: 'intent' }
      ]);
      setRiskScore(95);
    }

    if (demoState === 6) {
      setLogs(prev => [...prev, 
        { text: "CRITICAL: Threat Confidence threshold exceeded.", type: 'alert' },
        { text: "ACTION: Intrusive Warning deployed." },
        { text: "ACTION: Family SOS dispatched." }
      ]);
    }
    
    if (demoState === 7) {
      setLogs(prev => [...prev, 
        { text: "ACTION: Call terminated." }
      ]);
    }
  }, [demoState]);

  return (
    <div className="panel console-panel">
      
      {/* Header */}
      <div className="console-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={20} color="#8e8e93" />
          <span style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px' }}>VOICEGUARD ENGINE</span>
        </div>
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', 
          background: riskScore > 80 ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)',
          color: riskScore > 80 ? '#ff3b30' : '#34c759',
          padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '600'
        }}>
          {riskScore > 80 ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
          {riskScore > 80 ? 'HIGH THREAT' : 'MONITORING'}
        </div>
      </div>
      
      {/* Risk Gauge */}
      <div style={{ padding: '24px 24px 0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>Threat Confidence</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>{riskScore}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#1c1c1e', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${riskScore}%`, 
            background: riskScore > 80 ? '#ff3b30' : (riskScore > 30 ? '#ffcc00' : '#34c759'),
            transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
            boxShadow: riskScore > 80 ? '0 0 10px #ff3b30' : 'none'
          }}></div>
        </div>
      </div>

      {/* Logs Content */}
      <div className="console-content">
        {logs.map((log, i) => (
          <div key={i} style={{ 
            fontSize: '0.85rem', 
            lineHeight: 1.5,
            color: log.isCode ? '#fff' : (log.type === 'alert' ? '#ff3b30' : (log.type === 'intent' ? '#ffcc00' : '#8e8e93')),
            fontFamily: log.isCode ? 'var(--font-mono)' : 'var(--font-main)',
            background: log.isCode ? '#1c1c1e' : 'transparent',
            padding: log.isCode ? '8px 12px' : '4px 0',
            borderRadius: log.isCode ? '8px' : '0',
            borderLeft: log.isCode ? '2px solid #34c759' : 'none',
            animation: 'smoothFadeIn 0.3s ease-out'
          }}>
            {log.text}
          </div>
        ))}
        
        {/* Skeleton AI Thinking (only visible between certain states) */}
        {(demoState === 2 || demoState === 4) && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px 0', animation: 'smoothFadeIn 0.3s' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', animation: 'skeletonLoading 1s infinite' }}></div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Parsing semantic intent...</span>
          </div>
        )}
      </div>
    </div>
  );
}
