import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AIEngineConsole({ demoState }) {
  // Derived state for logs instead of useEffect (prevents duplicate logs from StrictMode)
  let logs = [];
  let currentRiskScore = 0;

  if (demoState >= 0) {
    logs.push({ text: "System idle. Awaiting audio stream..." });
    currentRiskScore = 0;
  }
  if (demoState >= 1) {
    logs.push({ text: "Stream established. Scanning for known threats..." });
    logs.push({ text: "Metadata checked. Caller ID: Unknown." });
    currentRiskScore = 12;
  }
  if (demoState >= 2) {
    logs.push({ text: "[TRANSCRIPT]: สวัสดีครับ คุณมีคดีฟอกเงินค้างชำระกับทางธนาคาร...", isCode: true });
  }
  if (demoState >= 3) {
    logs.push({ text: "Intent: Law Enforcement Impersonation detected.", type: 'intent' });
    currentRiskScore = 47;
  }
  if (demoState >= 4) {
    logs.push({ text: "[TRANSCRIPT]: รบกวนโอนเงินเพื่อตรวจสอบด่วนครับ ห้ามบอกใครเด็ดขาด", isCode: true });
  }
  if (demoState >= 5) {
    logs.push({ text: "Intent: Urgent Transaction Request.", type: 'intent' });
    logs.push({ text: "Intent: Isolation Tactic.", type: 'intent' });
    currentRiskScore = 95;
  }
  if (demoState >= 6) {
    logs.push({ text: "CRITICAL: Threat Confidence threshold exceeded.", type: 'alert' });
    logs.push({ text: "ACTION: Intrusive Warning deployed." });
    logs.push({ text: "ACTION: Family SOS dispatched." });
  }
  if (demoState >= 7) {
    logs.push({ text: "ACTION: Call terminated." });
  }

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
          background: currentRiskScore > 80 ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)',
          color: currentRiskScore > 80 ? '#ff3b30' : '#34c759',
          padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '600'
        }}>
          {currentRiskScore > 80 ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
          {currentRiskScore > 80 ? 'HIGH THREAT' : 'MONITORING'}
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
            transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
            boxShadow: currentRiskScore > 80 ? '0 0 10px #ff3b30' : 'none'
          }}></div>
        </div>
      </div>

      {/* Logs Content */}
      <div className="console-content" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {logs.slice(-4).map((log, i) => {
          const isOlder = i < logs.slice(-4).length - 1;
          return (
            <div key={i} style={{ 
              fontSize: '0.8rem', 
              lineHeight: 1.5,
              color: log.isCode ? '#bbbbbb' : (log.type === 'alert' ? '#ff6b6b' : (log.type === 'intent' ? '#d4a000' : '#777777')),
              opacity: isOlder ? 0.6 : 1,
              fontFamily: log.isCode ? 'var(--font-mono)' : 'var(--font-main)',
              background: log.isCode ? 'rgba(0,0,0,0.3)' : 'transparent',
              padding: log.isCode ? '8px 12px' : '4px 0',
              borderRadius: log.isCode ? '8px' : '0',
              borderLeft: log.isCode ? '2px solid rgba(52, 199, 89, 0.4)' : 'none',
              animation: 'smoothFadeIn 0.3s ease-out'
            }}>
              {log.text}
            </div>
          );
        })}
        
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
