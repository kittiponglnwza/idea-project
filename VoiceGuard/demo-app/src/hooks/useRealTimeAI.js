// src/hooks/useRealTimeAI.js
import { useState, useEffect, useRef } from 'react';
import { evaluateRisk } from '../utils/aiEngine';

export function useRealTimeAI(isLiveMode, onRiskExceeded) {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [aiLogs, setAiLogs] = useState([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // If Live Mode is off, stop listening
    if (!isLiveMode) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAiLogs(prev => [...prev, { text: "Error: Speech Recognition API not supported in this browser. Use Chrome.", type: 'alert' }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'th-TH';

    recognition.onstart = () => {
      setAiLogs([{ text: "Live Mic Activated. Listening for Thai language...", type: 'system' }]);
      setTranscript('');
      setInterimTranscript('');
      setRiskScore(0);
    };

    recognition.onresult = (event) => {
      let finalTranscriptChunk = '';
      let interimTranscriptChunk = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptChunk += event.results[i][0].transcript;
        } else {
          interimTranscriptChunk += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interimTranscriptChunk);
      
      if (finalTranscriptChunk.trim() !== '') {
        setTranscript(prev => {
          const newTranscript = prev + " " + finalTranscriptChunk;
          
          // Evaluate Risk on new text
          const riskData = evaluateRisk(newTranscript);
          setRiskScore(riskData.score);
          
          const newLogs = [
            { text: `[VOICE]: ${finalTranscriptChunk}`, isCode: true },
            ...riskData.logs
          ];
          
          setAiLogs(prevLogs => [...prevLogs, ...newLogs]);

          // Trigger cutoff if > 85
          if (riskData.score > 85 && onRiskExceeded) {
             onRiskExceeded();
          }

          return newTranscript;
        });
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech') {
         setAiLogs(prev => [...prev, { text: `Mic Error: ${event.error}`, type: 'alert' }]);
      }
    };

    recognition.onend = () => {
      // Auto-restart if we are still in Live Mode and it disconnected (e.g. timeout)
      if (isLiveMode && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error("Restart failed", e);
        }
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (recognitionRef.current) {
        // Prevent auto-restart loop
        recognitionRef.current.onend = null; 
        recognitionRef.current.stop();
      }
    };
  }, [isLiveMode]); // Note: onRiskExceeded omitted from deps intentionally to avoid reconnect loop

  return { transcript, interimTranscript, riskScore, aiLogs };
}
