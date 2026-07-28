import { useState, useEffect, useRef } from 'react';
import { Activity, ShieldCheck, AlertTriangle, Mic, MicOff } from 'lucide-react';

export default function AIEngineConsole({ 
  demoState, 
  isLiveMode, 
  setIsLiveMode, 
  liveRiskScore, 
  liveLogs, 
  interimTranscript 
}) {
  
  // Decide which data source to use
  const currentRiskScore = isLiveMode ? liveRiskScore : getMockRiskScore(demoState);
  const logs = isLiveMode ? liveLogs : getMockLogs(demoState);

  // Auto-scroll logic for logs
  const logsEndRef = useRef(null);
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, interimTranscript]);

  // Helpers for Mock Data (Spacebar mode)
  function getMockRiskScore(state) {
    if (state >= 5) return 95;
    if (state >= 3) return 47;
    if (state >= 1) return 12;
    return 0;
  }

  function getMockLogs(state) {
    let mLogs = [];
    if (state >= 0) mLogs.push({ text: "System idle. Awaiting audio stream..." });
    if (state >= 1) {
      mLogs.push({ text: "Stream established. Scanning for known threats..." });
      mLogs.push({ text: "Metadata checked. Caller ID: Unknown." });
    }
    if (state >= 2) mLogs.push({ text: "[TRANSCRIPT]: สวัสดีครับ คุณมีคดีฟอกเงินค้างชำระกับทางธนาคาร...", isCode: true });
    if (state >= 3) mLogs.push({ text: "Intent: Law Enforcement Impersonation detected.", type: 'intent' });
    if (state >= 4) mLogs.push({ text: "[TRANSCRIPT]: รบกวนโอนเงินเพื่อตรวจสอบด่วนครับ ห้ามบอกใครเด็ดขาด", isCode: true });
    if (state >= 5) {
      mLogs.push({ text: "Intent: Urgent Transaction Request.", type: 'intent' });
      mLogs.push({ text: "Intent: Isolation Tactic.", type: 'intent' });
    }
    if (state >= 6) {
      mLogs.push({ text: "CRITICAL: Threat Confidence threshold exceeded.", type: 'alert' });
      mLogs.push({ text: "ACTION: Intrusive Warning deployed." });
      mLogs.push({ text: "ACTION: Family SOS dispatched." });
    }
    if (state >= 7) mLogs.push({ text: "ACTION: Call terminated." });
    return mLogs;
  }

  return (
    <div className="panel console-panel">
      
      {/* Header */}
      <div className="console-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={20} color={isLiveMode ? "#ff3b30" : "#8e8e93"} className={isLiveMode ? "pulse-animation" : ""} />
          <span style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px' }}>
            VOICEGUARD ENGINE
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Live Mode Toggle Button */}
          <button 
            onClick={() => setIsLiveMode(!isLiveMode)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: isLiveMode ? 'rgba(255, 59, 48, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              color: isLiveMode ? '#ff3b30' : '#fff',
              border: isLiveMode ? '1px solid rgba(255, 59, 48, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
              padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {isLiveMode ? <Mic size={14} /> : <MicOff size={14} />}
            {isLiveMode ? 'LIVE AI : ON' : 'LIVE AI : OFF'}
          </button>

          {/* Status Badge */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            background: currentRiskScore > 80 ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)',
            color: currentRiskScore > 80 ? '#ff3b30' : '#34c759',
            padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '600'
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

        {/* Skeleton AI Thinking (only visible between certain states in mock mode) */}
        {!isLiveMode && (demoState === 2 || demoState === 4) && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px 0', animation: 'smoothFadeIn 0.3s' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', animation: 'skeletonLoading 1s infinite' }}></div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Parsing semantic intent...</span>
          </div>
        )}
        
        {/* Invisible element to auto-scroll to */}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
