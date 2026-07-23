import { useState, useEffect, useCallback } from 'react';
import './index.css';

// Components
import AIEngineConsole from './components/AIEngineConsole';
import PhoneFrame from './components/PhoneFrame';
import FamilyDashboard from './components/FamilyDashboard';

// Screens inside PhoneFrame
import IncomingCall from './components/IncomingCall';
import ActiveCall from './components/ActiveCall';
import MicroLearning from './components/MicroLearning';

function App() {
  // Granular State Machine (0 to 7)
  const [demoState, setDemoState] = useState(0);
  const [isOptIn, setIsOptIn] = useState(true);

  const handleKeyPress = useCallback((event) => {
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
  }, [isOptIn]);

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
    if (demoState === 7) return <MicroLearning onReset={handleReset} />;
    
    return <IncomingCall onAnswer={() => setDemoState(1)} />;
  };

  return (
    <div className="god-mode-layout">
      {/* Column 1: AI Backend Console */}
      <AIEngineConsole demoState={demoState} />
      
      {/* Column 2: Victim's Phone */}
      <div className="phone-container">
        <PhoneFrame isShake={demoState >= 6}>
          {renderPhoneScreen()}
        </PhoneFrame>
      </div>

      {/* Column 3: Family Monitoring Dashboard */}
      <FamilyDashboard 
        demoState={demoState} 
        isOptIn={isOptIn} 
        setIsOptIn={setIsOptIn} 
      />
    </div>
  );
}

export default App;
