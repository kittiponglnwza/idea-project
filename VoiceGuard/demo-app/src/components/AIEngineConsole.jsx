import { useState, useEffect, useRef } from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AIEngineConsole({ 
  demoState, 
  isLiveMode, 
  liveRiskScore, 
  liveLogs, 
  interimTranscript 
}) {
  
  const currentRiskScore = (demoState >= 2) ? liveRiskScore : getMockRiskScore(demoState);
  
  // Combine base logs (state 0,1) with live logs (state >= 2) and ending logs (state >= 6)
  let logs = [];
  if (demoState >= 0) logs.push({ text: "System idle. Awaiting audio stream..." });
  if (demoState >= 1) {
    logs.push({ text: "Stream established. Scanning for known threats..." });
    logs.push({ text: "Metadata checked. Caller ID: Unknown." });
  }
  
  if (demoState >= 2) {
    logs = [...logs, ...liveLogs];
  }
  
  if (demoState >= 6) {
    // Only add these once at the end
    logs.push({ text: "CRITICAL: Threat Confidence threshold exceeded.", type: 'alert' });
    logs.push({ text: "ACTION: Intrusive Warning deployed." });
    logs.push({ text: "ACTION: Family SOS dispatched." });
  }
  if (demoState >= 7) {
    logs.push({ text: "ACTION: Call terminated." });
  }

  // Auto-scroll logic for logs
  const logsEndRef = useRef(null);
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, interimTranscript]);

  function getMockRiskScore(state) {
    if (state >= 6) return 95;
    if (state >= 1) return 12;
    return 0;
  }

  return (
    <div className="panel console-panel">
      
      {/* Header */}
      <div className="console-header" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
        
        {/* Title Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <Activity size={20} color={demoState >= 2 ? "#ff3b30" : "#8e8e93"} className={demoState >= 2 ? "pulse-animation" : ""} />
          <span style={{ fontSize: '0.95rem', fontWeight: '700', letterSpacing: '0.5px' }}>
            VOICEGUARD ENGINE
          </span>
          <div style={{ flex: 1 }}></div>
          {/* Status Badge */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            background: currentRiskScore > 80 ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)',
            color: currentRiskScore > 80 ? '#ff3b30' : '#34c759',
            padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700'
          }}>
            {currentRiskScore > 80 ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
            {currentRiskScore > 80 ? 'HIGH THREAT' : 'MONITORING'}
          </div>
        </div>
        
      </div>
      
      {/* Risk Gauge */}
      <div style={{ padding: '24px 24px 0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>Threat Confidence</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>{currentRiskScore}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#1c1c1e', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${currentRiskScore}%`, 
            background: currentRiskScore > 80 ? '#ff3b30' : (currentRiskScore > 30 ? '#ffcc00' : '#34c759'),
            transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
            boxShadow: currentRiskScore > 80 ? '0 0 10px #ff3b30' : 'none'
          }}></div>
        </div>
      </div>

      {/* Logs Content */}
      <div className="console-content" style={{ maxHeight: '350px', overflowY: 'auto' }}>
        {logs.map((log, i) => {
          const isOlder = i < logs.length - 4;
          return (
            <div key={i} style={{ 
              fontSize: '0.85rem', 
              lineHeight: 1.5,
              color: log.isCode ? '#bbbbbb' : (log.type === 'alert' ? '#ff6b6b' : (log.type === 'intent' ? '#d4a000' : (log.type === 'system' ? '#0a84ff' : '#777777'))),
              opacity: isOlder ? 0.4 : 1,
              fontFamily: log.isCode ? 'var(--font-mono)' : 'var(--font-main)',
              background: log.isCode ? 'rgba(0,0,0,0.3)' : 'transparent',
              padding: log.isCode ? '8px 12px' : '4px 0',
              borderRadius: log.isCode ? '8px' : '0',
              borderLeft: log.isCode ? '2px solid rgba(52, 199, 89, 0.4)' : 'none',
              marginBottom: '4px'
            }}>
              {log.text}
            </div>
          );
        })}
        
        {/* Live Interim Transcript */}
        {isLiveMode && interimTranscript && (
          <div style={{ 
            fontSize: '0.85rem', lineHeight: 1.5, color: '#aaaaaa', fontStyle: 'italic', 
            padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', 
            marginTop: '8px', borderLeft: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            [LISTENING]: {interimTranscript}...
          </div>
        )}
        
        {/* Invisible element to auto-scroll to */}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
