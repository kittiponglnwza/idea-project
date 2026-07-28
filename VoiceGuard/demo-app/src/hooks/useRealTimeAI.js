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
  const timeoutRef = useRef(null);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    if (!isLiveMode) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.speechSynthesis.cancel(); // Stop speaking
      return;
    }

    // 1. Play PDPA Warning (System Voice)
    const systemUtterance = new SpeechSynthesisUtterance("สายนี้อยู่ภายใต้การคุ้มครองของ เอไอ เพื่อความปลอดภัย");
    systemUtterance.lang = 'th-TH';
    systemUtterance.rate = 1.0;
    systemUtterance.pitch = 1.2; // Slightly higher pitch for system voice
    
    // 2. Play Scammer Voice
    const fullText = SCAM_SCRIPT.join(" ");
    const scammerUtterance = new SpeechSynthesisUtterance(fullText);
    scammerUtterance.lang = 'th-TH';
    scammerUtterance.rate = 0.85; // Slower, deeper
    scammerUtterance.pitch = 0.8;

    window.speechSynthesis.speak(systemUtterance);
    window.speechSynthesis.speak(scammerUtterance);

    // Initial Logs
    setAiLogs([
      { text: "Auto-Simulation Started.", type: 'system' },
      { text: "ACTION: Playing PDPA Warning (Implied Consent)", type: 'system' }
    ]);
    setTranscript('');
    setInterimTranscript('');
    setRiskScore(0);
    wordIndexRef.current = 0;

    let currentTranscript = "";

    // Delay the scammer text typing by 4 seconds to let the system warning finish playing
    timeoutRef.current = setTimeout(() => {
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
      }, 450); // New word every 450ms
    }, 4000); // 4 seconds delay for system warning

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.speechSynthesis.cancel();
    };
  }, [isLiveMode]); 
  
  return { transcript, interimTranscript, riskScore, aiLogs };
}
