import { Shield, Zap, Cpu, Scale, Trophy, BarChart3, ChevronLeft, FileText, AlertTriangle, Info } from 'lucide-react';

export default function DocumentPage({ onBack }) {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
      color: '#e2e8f0',
      overflowY: 'auto',
      fontFamily: "'Inter', sans-serif",
      animation: 'fadeInDoc 0.5s ease-out'
    }}>
      <style>{`
        @keyframes fadeInDoc {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .doc-section { animation: slideUp 0.6s ease-out both; }
        .doc-section:nth-child(2) { animation-delay: 0.1s; }
        .doc-section:nth-child(3) { animation-delay: 0.15s; }
        .doc-section:nth-child(4) { animation-delay: 0.2s; }
        .doc-section:nth-child(5) { animation-delay: 0.25s; }
        .doc-section:nth-child(6) { animation-delay: 0.3s; }
        .doc-section:nth-child(7) { animation-delay: 0.35s; }
        .doc-section:nth-child(8) { animation-delay: 0.4s; }
        .doc-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2rem;
          transition: border-color 0.3s, background 0.3s;
        }
        .doc-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .tip-box {
          background: rgba(52,211,153,0.08);
          border: 1px solid rgba(52,211,153,0.2);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-top: 1.5rem;
        }
        .important-box {
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.2);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 3rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px', padding: '8px 16px', color: '#94a3b8',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.2s'
        }}>
          <ChevronLeft size={18} /> กลับสู่ Demo
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={20} color="#60a5fa" />
          <span style={{ fontWeight: '600', fontSize: '0.95rem', color: '#94a3b8' }}>เอกสารสรุปโครงการฉบับสมบูรณ์</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem 2rem' }}>

        {/* Hero Header */}
        <div className="doc-section" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="badge" style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', marginBottom: '1.5rem' }}>
            <Shield size={14} /> AI-Powered Protection
          </div>
          <h1 style={{
            fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '0.75rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            🛡️ VoiceGuard
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '0.5rem' }}>(กำแพงเสียง AI)</p>
          <p style={{ fontSize: '1.3rem', color: '#60a5fa', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6, fontStyle: 'italic' }}>
            "AI Assistant ระหว่างการโทร เพื่อปกป้องผู้สูงอายุจากการหลอกลวงทางการเงินแบบ Real-time"
          </p>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '1rem' }}>
            เอกสารสรุปโครงการฉบับสมบูรณ์ สำหรับเตรียมพร้อมแข่งขัน Hackathon
          </p>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="doc-section" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <FileText size={24} color="#60a5fa" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffffff' }}>1. บทสรุปผู้บริหาร (Executive Summary)</h2>
          </div>
          <div className="doc-card">
            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1rem' }}>
              <strong style={{ color: '#ffffff' }}>VoiceGuard</strong> คือระบบป้องกันภัยคุกคามทางโทรศัพท์แบบ <strong style={{ color: '#60a5fa' }}>Active Intervention</strong> (แทรกแซงแบบเรียลไทม์) ออกแบบมาเพื่อแก้ปัญหาแก๊งคอลเซ็นเตอร์หลอกลวงผู้สูงอายุ โดยใช้ <strong style={{ color: '#60a5fa' }}>"Adaptive Risk Engine"</strong> วิเคราะห์บริบทและเนื้อหาการสนทนา (Intent) หากพบความเสี่ยงสูง ระบบจะแจ้งเตือนอย่างรุนแรงและมีระบบตัดสายอัตโนมัติ (Opt-in)
            </p>
            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1rem', marginTop: '1rem' }}>
              โครงการนี้ไม่เพียงแก้ปัญหาสังคม แต่ยังปลดล็อกโอกาสทางธุรกิจให้บริษัทประกัน (InsurTech) สามารถออกผลิตภัณฑ์ <strong style={{ color: '#f59e0b' }}>"ประกันภัยไซเบอร์สำหรับผู้สูงอายุ"</strong> ได้อย่างปลอดภัย
            </p>
          </div>
        </div>

        {/* Section 2: Problem & Why Now */}
        <div className="doc-section" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Zap size={24} color="#f59e0b" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffffff' }}>2. ปัญหาและโอกาส (Problem & "Why Now?")</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div className="doc-card">
              <h4 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.05rem' }}>💰 The 40B Baht Pain Point</h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
                ความเสียหายจากคดีหลอกลวงออนไลน์ปี 2566-2567 พุ่งสูงถึง <strong style={{ color: '#ef4444' }}>4 หมื่นล้านบาท</strong> โดยผู้สูงอายุเป็นกลุ่มที่สูญเสียเงินต่อหัวสูงสุด
              </p>
            </div>
            <div className="doc-card">
              <h4 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.05rem' }}>🤖 Generative AI Era</h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
                สแกมเมอร์เริ่มใช้ <strong style={{ color: '#e2e8f0' }}>AI Voice Clone</strong> และสคริปต์อัตโนมัติ ทำให้การหลอกลวงแนบเนียนขึ้น
              </p>
            </div>
            <div className="doc-card">
              <h4 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.05rem' }}>❌ The Status Quo Failure</h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
                แอปบล็อกเบอร์แบบเดิม (Reactive Blacklist) ตามไม่ทันซิมม้าและเบอร์ VoIP ที่เปลี่ยนใหม่ทุกวัน เราจึงต้องเปลี่ยนมาป้องกันที่ <strong style={{ color: '#e2e8f0' }}>"เนื้อหาการสนทนา"</strong> (Proactive Content-based)
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Architecture */}
        <div className="doc-section" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Cpu size={24} color="#3b82f6" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffffff' }}>3. สถาปัตยกรรมระบบ (Technical Architecture)</h2>
          </div>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            เพื่อแก้ปัญหาข้อจำกัดสิทธิ์ของระบบปฏิบัติการ (OS Permissions) VoiceGuard ถูกออกแบบมาอย่างรัดกุม 2 วิธีการ:
          </p>

          {/* 3.1 */}
          <div className="doc-card" style={{ marginBottom: '1.5rem' }}>
            <div className="badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', marginBottom: '1rem' }}>3.1</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Data Extraction Pipeline (การดึงข้อมูลเสียง)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h5 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>Method 1 (Primary for MVP)</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  เจาะจงอุปกรณ์ <strong style={{ color: '#e2e8f0' }}>Samsung Galaxy</strong> โดยใช้ Accessibility Service ดึง Text จากฟีเจอร์ "Samsung Call Captions" ซึ่งรองรับภาษาไทย 100% (ไม่ต้องดักฟัง Audio Stream เอง)
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h5 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>Method 2 (Fallback)</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  สำหรับ Android รุ่นอื่น จะรับสายใน <strong style={{ color: '#e2e8f0' }}>Protected Speaker Mode</strong> (เปิดลำโพงอัตโนมัติ) และใช้ไมโครโฟนปกติจับเสียงภายนอก ส่งเข้าโมเดล On-device Thai STT ขนาดเล็ก (เช่น Vosk หรือ Whisper.cpp Quantized)
                </p>
              </div>
            </div>
          </div>

          {/* 3.2 */}
          <div className="doc-card" style={{ marginBottom: '1.5rem' }}>
            <div className="badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', marginBottom: '1rem' }}>3.2</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Adaptive Risk Engine (เครื่องยนต์วิเคราะห์ความเสี่ยง)</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              ประมวลผลข้อมูล <strong style={{ color: '#e2e8f0' }}>On-device</strong> ทั้งหมด โดยไม่ส่งเสียงหรือข้อความขึ้น Cloud:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</div>
                <h5 style={{ color: '#e2e8f0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Call Metadata</h5>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>วิเคราะห์เบอร์แปลก, ความยาวการโทร</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧠</div>
                <h5 style={{ color: '#e2e8f0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>NLP Intent Model</h5>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>จับเจตนา เช่น "ขอ OTP", "ให้โอนเงิน", "อ้างเป็นตำรวจ"</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👤</div>
                <h5 style={{ color: '#e2e8f0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Human-in-the-loop</h5>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>เรียนรู้จาก Feedback ของผู้ใช้</p>
              </div>
            </div>
          </div>

          {/* 3.3 */}
          <div className="doc-card" style={{ marginBottom: '0' }}>
            <div className="badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', marginBottom: '1rem' }}>3.3</div>
            <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.1rem' }}>The Intervention (การแจ้งเตือนและแทรกแซง)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(251,191,36,0.06)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.15)' }}>
                <h5 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>⚠️ Risk 40-85% (Medium Risk)</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  การเตือนแบบคุกคาม (Intrusive Warning) — หน้าจอกะพริบสีแดง สั่นเตือน บล็อกเสียงฝั่งตรงข้ามชั่วคราว ผู้ใช้ต้องกดยืนยันเพื่อคุยต่อ
                </p>
              </div>
              <div style={{ background: 'rgba(239,68,68,0.06)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.15)' }}>
                <h5 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>🚨 Risk &gt;85% (High Risk / Auto-Terminate)</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  หากความเสี่ยงถึงขีดสุด และลูกหลานเปิดโหมด <strong style={{ color: '#e2e8f0' }}>Opt-in</strong> ไว้ ระบบจะสั่งตัดสายทิ้งทันที พร้อมส่งแจ้งเตือน (SOS) เข้าแอปของลูกหลาน
                </p>
              </div>
            </div>
            {/* TIP */}
            <div className="tip-box" style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <Info size={16} color="#34d399" />
                <span style={{ color: '#34d399', fontWeight: '600', fontSize: '0.85rem' }}>POST-CALL MICRO-LEARNING</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                ทันทีที่สายถูกตัด ระบบจะต่อเน็ตเพื่อดึงข้อมูลจาก Cloud (RAG) มาเจเนอเรตคำอธิบายสั้นๆ ให้ผู้สูงอายุอ่านว่า <em>"ทำไมเมื่อกี้ถึงเป็นสแกมเมอร์"</em> เป็นการให้ความรู้ในจังหวะที่ทรงพลังที่สุด (In-context Learning)
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Defense Strategy */}
        <div className="doc-section" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Scale size={24} color="#f472b6" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffffff' }}>4. การจัดการความเสี่ยงและข้อจำกัด (Defense Strategy)</h2>
          </div>

          {/* 4.1 Legal */}
          <div className="doc-card" style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#f472b6', marginBottom: '1rem', fontSize: '1.1rem' }}>4.1 Legal & Compliance (กฎหมายและ PDPA)</h4>
            <div className="important-box" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <AlertTriangle size={16} color="#fbbf24" />
                <span style={{ color: '#fbbf24', fontWeight: '600', fontSize: '0.85rem' }}>IMPORTANT</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                ทางทีมจัดทำ <strong style={{ color: '#e2e8f0' }}>DPIA (Data Protection Impact Assessment) เบื้องต้น</strong> เพื่อรองรับความเสี่ยง
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h5 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>Wiretapping (การดักฟัง)</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  แก้ไขด้วย <strong style={{ color: '#60a5fa' }}>"Transient Processing"</strong> คือแปลงเสียงเป็น Text แล้วลบจาก RAM ทันที ไม่มีการเขียนไฟล์เสียง (Audio File) ลงเครื่อง
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h5 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>PDPA (ข้อมูลของสแกมเมอร์)</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  อ้างอิงฐาน <strong style={{ color: '#60a5fa' }}>"Legitimate Interest"</strong> (ประโยชน์อันชอบธรรม) เพื่อป้องกันอาชญากรรม และประมวลผล On-device ทั้งหมด ข้อมูลเดียวที่ส่งขึ้น Cloud คือ Log สถิติแบบ Anonymous
                </p>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, marginTop: '1rem', fontStyle: 'italic', paddingLeft: '1rem', borderLeft: '3px solid rgba(255,255,255,0.1)' }}>
              "เรารับทราบว่านี่คือ Grey Area ทางกฎหมาย ขั้นตอนแรกก่อน Launch MVP คือการนำ DPIA ฉบับเต็มปรึกษาผู้เชี่ยวชาญ Cyber Law เพื่อให้ Architecture ถูกต้อง 100%"
            </p>
          </div>

          {/* 4.2 Liability */}
          <div className="doc-card">
            <h4 style={{ color: '#f472b6', marginBottom: '0.75rem', fontSize: '1.1rem' }}>4.2 Liability (ความรับผิดชอบหากตัดสายผิด)</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
              ตั้งค่า Default ให้เป็นการ <strong style={{ color: '#e2e8f0' }}>"เตือนอย่างรุนแรง" (Intrusive Warning)</strong> โดยให้สิทธิ์ผู้สูงอายุตัดสินใจวางสายเอง ระบบจะไม่มีการ Auto-terminate อัตโนมัติ เว้นแต่ลูกหลานจะเข้ามาเปิดโหมดนี้ให้เท่านั้น
            </p>
          </div>
        </div>

        {/* Section 5: Competitive Advantage */}
        <div className="doc-section" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Trophy size={24} color="#a78bfa" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffffff' }}>5. ความได้เปรียบทางการแข่งขัน (Competitive Advantage & Moat)</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="doc-card">
              <h4 style={{ color: '#a78bfa', marginBottom: '0.75rem' }}>🏆 เหนือกว่า Truecaller</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                VoiceGuard เป็น <strong style={{ color: '#34d399' }}>Proactive (จับเนื้อหา)</strong> ไม่ใช่ Reactive (รอมนุษย์แจ้งเบอร์แบน)
              </p>
            </div>
            <div className="doc-card">
              <h4 style={{ color: '#a78bfa', marginBottom: '0.75rem' }}>🏆 ต่างจาก Google Call Screen</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                เราป้องกัน <strong style={{ color: '#34d399' }}>"ระหว่างการสนทนา" (During Call)</strong> ในขณะที่ Google ทำหน้าที่แค่คัดกรองก่อนรับสาย (Pre-screening)
              </p>
            </div>
          </div>
          <div className="doc-card" style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.06) 0%, rgba(96,165,250,0.06) 100%)',
            borderColor: 'rgba(167,139,250,0.15)'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '1.25rem', textAlign: 'center' }}>Defensible Moat (ทำไมคนอื่นลอกยาก)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🇹🇭</div>
                <h5 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>Thai Scam Dataset</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>ครอบครอง Dataset บทสนทนาสแกมเมอร์บริบทภาษาไทย</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍👩‍👧‍👦</div>
                <h5 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>Family Trust Network</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>ลูกหลานผูกบัญชีร่วมกับพ่อแม่ เกิด Network Effect</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏥</div>
                <h5 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>InsurTech B2B2C</h5>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>เส้นทางสู่การเป็น Partner กับบริษัทประกัน</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Business & Roadmap */}
        <div className="doc-section" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <BarChart3 size={24} color="#34d399" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffffff' }}>6. แผนธุรกิจและ Roadmap 6 เดือน</h2>
          </div>

          {/* KPIs */}
          <div className="doc-card" style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#34d399', marginBottom: '1rem' }}>เป้าหมายตัวชี้วัด (Startup KPIs)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399', marginBottom: '0.25rem' }}>&gt;85%</div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Detection Precision</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem' }}>(ลด False Positive ในช่วง MVP)</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399', marginBottom: '0.25rem' }}>&lt;30s</div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Average Warning Time</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem' }}>นับจากรับสาย</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399', marginBottom: '0.25rem' }}>30d+</div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>User Trust Score</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Active Retention เกิน 30 วัน</p>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {[
              { month: 'M1', title: 'Prototype', desc: 'พัฒนา Prototype รันผ่าน Protected Speaker Mode (Android)', color: '#60a5fa' },
              { month: 'M2-M3', title: 'Pilot Test', desc: 'Pilot Test กับ 50 ครอบครัว และขยายสู่ 500 Users แรก', color: '#a78bfa' },
              { month: 'M4-M5', title: 'Data & Retrain', desc: 'เก็บข้อมูล Log การโทร 10,000 ครั้งแรก เพื่อ Retrain Adaptive Risk Engine', color: '#f472b6' },
              { month: 'M6', title: 'Partnership', desc: 'นำผล Success Rate ไปเสนอเป็น Partnership กับบริษัทประกันและค่ายมือถือ', color: '#34d399' }
            ].map((item, i) => (
              <div key={i} className="doc-card" style={{ textAlign: 'center', position: 'relative' }}>
                <div className="badge" style={{ background: `${item.color}20`, color: item.color, marginBottom: '1rem' }}>
                  {item.month}
                </div>
                <h4 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1rem' }}>{item.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
