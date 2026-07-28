import { useState, useEffect, useCallback } from 'react';
import { useRealTimeAI } from './hooks/useRealTimeAI';
import './index.css';

// Components
import AIEngineConsole from './components/AIEngineConsole';
import PhoneFrame from './components/PhoneFrame';
import FamilyDashboard from './components/FamilyDashboard';
import DocumentPage from './components/DocumentViewer';

// Screens inside PhoneFrame
import IncomingCall from './components/IncomingCall';
import ActiveCall from './components/ActiveCall';
import MicroLearning from './components/MicroLearning';

function App() {
  // Granular State Machine (0 to 7, 8 = document page)
  const [demoState, setDemoState] = useState(0);
  const [isOptIn, setIsOptIn] = useState(true);
  
  // Auto-trigger simulation when call is active (State 1 to 5)
  const isLiveMode = demoState >= 1 && demoState < 6;

  // Trigger when Live AI detects high risk
  const handleRiskExceeded = useCallback(() => {
    setDemoState(6); // Jump straight to Warning state
  }, []);

  // Zero-Click Auto Drop Effect
  useEffect(() => {
    let timeoutId;
    if (demoState === 6 && isOptIn) {
      // Flash red for 2.5s then auto terminate
      timeoutId = setTimeout(() => {
        setDemoState(7);
      }, 2500);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [demoState, isOptIn]);

  const { interimTranscript, riskScore, aiLogs } = useRealTimeAI(isLiveMode, handleRiskExceeded);

  const handleKeyPress = useCallback((event) => {
    if (demoState === 8) return; // Don't advance when on document page
    if (event.code === 'Space') {
      event.preventDefault();
      setDemoState((prev) => {
        if (prev >= 7) return prev;
        
        // Auto-terminate logic at state 6 (Warning)
        if (prev === 6 && isOptIn) {
          return 7; // Auto-cut
        } else if (prev === 6 && !isOptIn) {
          return 6; // Wait for manual hangup button
        }
        
        return prev + 1;
      });
    }
  }, [isOptIn, demoState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleManualHangup = () => {
    setDemoState(7);
  };

  const handleReset = () => {
    setDemoState(0);
  };

  // State 8 = full-page document view
  if (demoState === 8) {
    return <DocumentPage onBack={() => setDemoState(7)} />;
  }

  // Render the appropriate screen inside the Phone Frame
  const renderPhoneScreen = () => {
    if (demoState === 0) return <IncomingCall onAnswer={() => setDemoState(1)} />;
    if (demoState >= 1 && demoState <= 6) {
      return (
        <ActiveCall 
          demoState={demoState} 
          isOptIn={isOptIn} 
          onHangup={handleManualHangup} 
        />
      );
    }
    if (demoState === 7) return <MicroLearning onReset={handleReset} onViewDocument={() => setDemoState(8)} />;
    
    return <IncomingCall onAnswer={() => setDemoState(1)} />;
  };

  return (
    <div className="god-mode-layout">
      {/* Column 1: AI Backend Console (Floating Widget) */}
      {demoState >= 1 && (
        <div className="widget-left">
          <AIEngineConsole 
            demoState={demoState} 
            isLiveMode={isLiveMode}
            liveRiskScore={riskScore}
            liveLogs={aiLogs}
            interimTranscript={interimTranscript}
          />
        </div>
      )}
      
      {/* Column 2: Victim's Phone (Hero Center) */}
      <div className="phone-container">
        <PhoneFrame isShake={false}>
          {renderPhoneScreen()}
        </PhoneFrame>
      </div>

      {/* Column 3: Family Monitoring Dashboard (Floating Widget) */}
      {demoState >= 6 && (
        <div className="widget-right">
          <FamilyDashboard 
            demoState={demoState} 
            isOptIn={isOptIn} 
            setIsOptIn={setIsOptIn} 
          />
        </div>
      )}

      {/* Floating Document Button */}
      {demoState !== 8 && (
        <div 
          onClick={() => setDemoState(8)}
          style={{
            position: 'absolute', bottom: '24px', right: '24px', 
            background: 'rgba(255,255,255,0.1)', padding: '12px 20px', 
            borderRadius: '100px', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', color: 'white',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            fontWeight: '600', fontSize: '0.85rem', zIndex: 100
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <span style={{ fontSize: '1.2rem' }}>📄</span>
          Executive Summary
        </div>
      )}
    </div>
  );
}

export default App;
