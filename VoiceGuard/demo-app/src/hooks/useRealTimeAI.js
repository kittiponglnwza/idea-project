import { useState, useEffect, useRef } from 'react';
import { evaluateRisk } from '../utils/aiEngine';

const SCAM_SCRIPT = [
  "สวัสดีครับ", "ผมเป็นตำรวจ", "จาก", "สภ.เมือง", 
  "ตอนนี้", "มีการแอบอ้าง", "ชื่อคุณ", "ไป", "ฟอกเงิน", 
  "รบกวน", "ให้คุณ", "โอนเงิน", "ทั้งหมด", "มาเพื่อ", "ตรวจสอบ", "ด่วนครับ", 
  "และ", "ห้ามบอกใคร", "เด็ดขาดนะ"
];

export function useRealTimeAI(isLiveMode, onRiskExceeded) {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [aiLogs, setAiLogs] = useState([]);
  
  const timerRef = useRef(null);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    if (!isLiveMode) {
      if (timerRef.current) clearInterval(timerRef.current);
      window.speechSynthesis.cancel(); // Stop speaking
      return;
    }

    // 1. Start speaking the text (TTS)
    const fullText = SCAM_SCRIPT.join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'th-TH';
    utterance.rate = 0.9; // Slightly slower for dramatic effect
    window.speechSynthesis.speak(utterance);

    // 2. Simulate Real-time STT typing out
    setAiLogs([{ text: "Auto-Simulation Started. Generating Scam Audio...", type: 'system' }]);
    setTranscript('');
    setInterimTranscript('');
    setRiskScore(0);
    wordIndexRef.current = 0;

    let currentTranscript = "";

    timerRef.current = setInterval(() => {
      if (wordIndexRef.current >= SCAM_SCRIPT.length) {
        clearInterval(timerRef.current);
        return;
      }

      const word = SCAM_SCRIPT[wordIndexRef.current];
      currentTranscript += (wordIndexRef.current === 0 ? "" : " ") + word;
      setInterimTranscript(word + "...");
      
      // Update transcript and evaluate risk
      setTranscript(currentTranscript);
      const riskData = evaluateRisk(currentTranscript);
      setRiskScore(riskData.score);
      
      setAiLogs(prevLogs => {
        const newLogs = [{ text: `[VOICE]: ${word}`, isCode: true }];
        // Only append new unique intent logs (simplified for simulation)
        if (riskData.logs.length > 0) {
            // Find logs that aren't already in prevLogs
            const existingLogTexts = prevLogs.map(l => l.text);
            const freshLogs = riskData.logs.filter(l => !existingLogTexts.includes(l.text));
            newLogs.push(...freshLogs);
        }
        return [...prevLogs, ...newLogs];
      });

      if (riskData.score > 85 && onRiskExceeded) {
        clearInterval(timerRef.current);
        window.speechSynthesis.cancel(); // Stop talking when cut
        onRiskExceeded();
      }

      wordIndexRef.current += 1;
    }, 450); // New word every 450ms (roughly matches speaking rate)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.speechSynthesis.cancel();
    };
  }, [isLiveMode]); 
  
  // onRiskExceeded omitted from deps intentionally to avoid infinite loops

  return { transcript, interimTranscript, riskScore, aiLogs };
}
