// src/utils/aiEngine.js

const SCAM_KEYWORDS = [
  { word: 'ตำรวจ', score: 25, intent: 'Law Enforcement Impersonation' },
  { word: 'สภ', score: 20, intent: 'Law Enforcement Impersonation' },
  { word: 'โอนเงิน', score: 35, intent: 'Urgent Transaction Request' },
  { word: 'บัญชีม้า', score: 25, intent: 'Money Laundering Threat' },
  { word: 'ฟอกเงิน', score: 30, intent: 'Money Laundering Threat' },
  { word: 'สรรพากร', score: 25, intent: 'Government Impersonation' },
  { word: 'พัสดุ', score: 20, intent: 'Package Scam' },
  { word: 'อายัด', score: 30, intent: 'Account Freeze Threat' },
  { word: 'ตรวจสอบ', score: 15, intent: 'Verification Request' },
  { word: 'รหัส', score: 30, intent: 'Credential Theft' },
  { word: 'otp', score: 40, intent: 'Credential Theft' },
  { word: 'ห้ามบอกใคร', score: 40, intent: 'Isolation Tactic' },
];

export function evaluateRisk(transcript) {
  if (!transcript) return { score: 0, intents: [], logs: [] };

  const text = transcript.toLowerCase();
  let totalScore = 0;
  const detectedIntents = new Set();
  const logs = [];

  SCAM_KEYWORDS.forEach(k => {
    if (text.includes(k.word)) {
      totalScore += k.score;
      detectedIntents.add(k.intent);
      logs.push({ text: `DETECTED KEYWORD: "${k.word}" (+${k.score} Risk)`, type: 'intent' });
    }
  });

  // Add derived intents
  const intentsArr = Array.from(detectedIntents);
  intentsArr.forEach(intent => {
      logs.push({ text: `Intent Identified: ${intent}`, type: 'intent' });
  });

  // Cap at 100
  const finalScore = Math.min(totalScore, 100);

  return {
    score: finalScore,
    intents: intentsArr,
    logs: logs
  };
}
