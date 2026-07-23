import { useState, useEffect, useCallback } from 'react';
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
          <AIEngineConsole demoState={demoState} />
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
    </div>
  );
}

export default App;
