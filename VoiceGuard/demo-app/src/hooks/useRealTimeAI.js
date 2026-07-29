import { useState, useEffect, useRef } from 'react';
import { evaluateRisk } from '../utils/aiEngine';

const SCAM_SCRIPT = [
  "สวัสดีครับ", "เรียนสาย", "คุณพ่อ", "ใช่ไหมครับ",
  "ผม", "ร้อยตำรวจเอก", "สมชาย", "นะ", "ครับ", 
  "ติดต่อ", "จาก", "สภ.เมือง", 
  "พอดีว่า", "ตอนนี้", "ทางเรา", "พบสมุดบัญชี", "ของคุณพ่อ", 
  "ตกอยู่ใน", "ที่เกิดเหตุ", "จับกุม", "ยาเสพติด", "ครับ",
  "และ", "มีการแอบอ้าง", "ชื่อ", "ของคุณพ่อ", "ไปทำคดี", "ฟอกเงิน", 
  "มูลค่า", "หลายสิบล้านบาท", 
  "เพื่อ", "ความบริสุทธิ์ใจ", "รบกวน", "ให้คุณพ่อ", "โอนเงิน", "ในบัญชี", "ทั้งหมด", 
  "มาเพื่อ", "ตรวจสอบ", "ด่วนครับ", 
  "และ", "ห้ามบอกใคร", "เด็ดขาดนะ"
];

export function useRealTimeAI(isLiveMode, isPaused, onMediumRisk, onHighRisk) {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [aiLogs, setAiLogs] = useState([]);
  
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);
  const wordIndexRef = useRef(0);
  const hasTriggeredMediumRef = useRef(false);

  // Handle pause/resume
  useEffect(() => {
    if (isPaused) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
  }, [isPaused]);

  useEffect(() => {
    if (!isLiveMode) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.speechSynthesis.cancel(); // Stop speaking
      return;
    }

    // 1. Play PDPA Warning (System Voice - High Pitch, Robotic)
    const systemUtterance = new SpeechSynthesisUtterance("ระบบกำลังบันทึกเสียงและวิเคราะห์สายนี้ เพื่อความปลอดภัยของคุณ");
    systemUtterance.lang = 'th-TH';
    systemUtterance.rate = 1.2;
    systemUtterance.pitch = 1.7; // Very high pitch to sound like a digital assistant
    
    // 2. Play Scammer Voice (Deep, slow, threatening)
    const fullText = SCAM_SCRIPT.join(" ");
    const scammerUtterance = new SpeechSynthesisUtterance(fullText);
    scammerUtterance.lang = 'th-TH';
    scammerUtterance.rate = 0.8; // Slower
    scammerUtterance.pitch = 0.4; // Very deep voice

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
    hasTriggeredMediumRef.current = false;

    let currentTranscript = "";

    // Delay the scammer text typing by 4 seconds to let the system warning finish playing
    timeoutRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => {
        // If paused, don't advance the transcript
        if (window.speechSynthesis.paused) {
          return;
        }

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

        // Trigger Medium Risk (60-80%)
        if (riskData.score >= 60 && riskData.score <= 80 && !hasTriggeredMediumRef.current && onMediumRisk) {
          hasTriggeredMediumRef.current = true;
          onMediumRisk();
        }

        // Trigger High Risk (>80%)
        if (riskData.score > 80 && onHighRisk) {
          clearInterval(timerRef.current);
          window.speechSynthesis.cancel(); // Stop talking when cut
          onHighRisk();
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
